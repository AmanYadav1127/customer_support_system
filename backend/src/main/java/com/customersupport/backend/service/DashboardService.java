package com.customersupport.backend.service;

import com.customersupport.backend.dto.DashboardMetricsDto;
import com.customersupport.backend.model.Message;
import com.customersupport.backend.model.SenderType;
import com.customersupport.backend.model.Ticket;
import com.customersupport.backend.model.TicketStatus;
import com.customersupport.backend.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final TicketRepository ticketRepository;

    @Autowired
    public DashboardService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public DashboardMetricsDto getMetrics() {
        DashboardMetricsDto metrics = new DashboardMetricsDto();
        LocalDateTime now = LocalDateTime.now();

        metrics.setTotalTicketsDaily(ticketRepository.countByCreatedAtAfter(now.minusDays(1)));
        metrics.setTotalTicketsWeekly(ticketRepository.countByCreatedAtAfter(now.minusDays(7)));

        List<Ticket> allTickets = ticketRepository.findAll();
        
        if (allTickets.isEmpty()) {
            metrics.setStatusBreakdown(new HashMap<>());
            metrics.setCategoryBreakdown(new HashMap<>());
            return metrics;
        }

        // Status Breakdown
        Map<String, Long> statusBreakdown = allTickets.stream()
                .collect(Collectors.groupingBy(
                        t -> t.getStatus().name(),
                        Collectors.counting()
                ));
        metrics.setStatusBreakdown(statusBreakdown);

        // Category Breakdown
        Map<String, Long> categoryBreakdown = allTickets.stream()
                .filter(t -> t.getCategory() != null)
                .collect(Collectors.groupingBy(
                        Ticket::getCategory,
                        Collectors.counting()
                ));
        metrics.setCategoryBreakdown(categoryBreakdown);

        // Resolution Rate
        long resolvedOrClosed = allTickets.stream()
                .filter(t -> t.getStatus() == TicketStatus.RESOLVED || t.getStatus() == TicketStatus.CLOSED)
                .count();
        metrics.setResolutionRatePercentage((double) resolvedOrClosed / allTickets.size() * 100);

        // AI vs Human ratio and Response Time
        long aiHandled = 0;
        long humanHandled = 0;
        long totalResponseTimeMinutes = 0;
        long ticketsWithResponses = 0;

        for (Ticket ticket : allTickets) {
            boolean hasAi = false;
            boolean hasHuman = false;
            LocalDateTime firstResponseTime = null;

            for (Message msg : ticket.getMessages()) {
                if (msg.getSenderType() == SenderType.AI) {
                    hasAi = true;
                    if (firstResponseTime == null || msg.getCreatedAt().isBefore(firstResponseTime)) {
                        firstResponseTime = msg.getCreatedAt();
                    }
                } else if (msg.getSenderType() == SenderType.ADMIN) {
                    hasHuman = true;
                    if (firstResponseTime == null || msg.getCreatedAt().isBefore(firstResponseTime)) {
                        firstResponseTime = msg.getCreatedAt();
                    }
                }
            }

            if (hasAi) aiHandled++;
            if (hasHuman) humanHandled++;

            if (firstResponseTime != null && ticket.getCreatedAt() != null) {
                totalResponseTimeMinutes += Duration.between(ticket.getCreatedAt(), firstResponseTime).toMinutes();
                ticketsWithResponses++;
            }
        }

        metrics.setAiHandledTickets(aiHandled);
        metrics.setHumanHandledTickets(humanHandled);
        long totalHandled = aiHandled + humanHandled;
        if (totalHandled > 0) {
            metrics.setAiHandledRatio((double) aiHandled / totalHandled);
        } else {
            metrics.setAiHandledRatio(0);
        }

        if (ticketsWithResponses > 0) {
            metrics.setAverageResponseTimeHours((double) totalResponseTimeMinutes / ticketsWithResponses / 60.0);
        } else {
            metrics.setAverageResponseTimeHours(0);
        }

        return metrics;
    }
}
