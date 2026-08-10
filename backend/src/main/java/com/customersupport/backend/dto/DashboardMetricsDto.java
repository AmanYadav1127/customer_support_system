package com.customersupport.backend.dto;

import java.util.Map;

public class DashboardMetricsDto {
    private long totalTicketsDaily;
    private long totalTicketsWeekly;
    private Map<String, Long> statusBreakdown;
    private Map<String, Long> categoryBreakdown;
    private double aiHandledRatio; // e.g. 0.45 for 45%
    private long aiHandledTickets;
    private long humanHandledTickets;
    private double averageResponseTimeHours;
    private double resolutionRatePercentage;

    public DashboardMetricsDto() {
    }

    public long getTotalTicketsDaily() {
        return totalTicketsDaily;
    }

    public void setTotalTicketsDaily(long totalTicketsDaily) {
        this.totalTicketsDaily = totalTicketsDaily;
    }

    public long getTotalTicketsWeekly() {
        return totalTicketsWeekly;
    }

    public void setTotalTicketsWeekly(long totalTicketsWeekly) {
        this.totalTicketsWeekly = totalTicketsWeekly;
    }

    public Map<String, Long> getStatusBreakdown() {
        return statusBreakdown;
    }

    public void setStatusBreakdown(Map<String, Long> statusBreakdown) {
        this.statusBreakdown = statusBreakdown;
    }

    public Map<String, Long> getCategoryBreakdown() {
        return categoryBreakdown;
    }

    public void setCategoryBreakdown(Map<String, Long> categoryBreakdown) {
        this.categoryBreakdown = categoryBreakdown;
    }

    public double getAiHandledRatio() {
        return aiHandledRatio;
    }

    public void setAiHandledRatio(double aiHandledRatio) {
        this.aiHandledRatio = aiHandledRatio;
    }

    public long getAiHandledTickets() {
        return aiHandledTickets;
    }

    public void setAiHandledTickets(long aiHandledTickets) {
        this.aiHandledTickets = aiHandledTickets;
    }

    public long getHumanHandledTickets() {
        return humanHandledTickets;
    }

    public void setHumanHandledTickets(long humanHandledTickets) {
        this.humanHandledTickets = humanHandledTickets;
    }

    public double getAverageResponseTimeHours() {
        return averageResponseTimeHours;
    }

    public void setAverageResponseTimeHours(double averageResponseTimeHours) {
        this.averageResponseTimeHours = averageResponseTimeHours;
    }

    public double getResolutionRatePercentage() {
        return resolutionRatePercentage;
    }

    public void setResolutionRatePercentage(double resolutionRatePercentage) {
        this.resolutionRatePercentage = resolutionRatePercentage;
    }
}
