package com.customersupport.backend.service;

import com.customersupport.backend.dto.MessageDto;
import com.customersupport.backend.dto.TicketDto;
import com.customersupport.backend.model.Message;
import com.customersupport.backend.model.SenderType;
import com.customersupport.backend.model.Ticket;
import com.customersupport.backend.model.TicketStatus;
import com.customersupport.backend.repository.MessageRepository;
import com.customersupport.backend.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;
    private final MessageRepository messageRepository;

    @Autowired
    public TicketService(TicketRepository ticketRepository, MessageRepository messageRepository) {
        this.ticketRepository = ticketRepository;
        this.messageRepository = messageRepository;
    }

    public List<TicketDto> getAllTickets(TicketStatus status) {
        List<Ticket> tickets = (status == null) ? 
                ticketRepository.findAll() : 
                ticketRepository.findByStatus(status);
                
        return tickets.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public TicketDto getTicketById(Long id) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
        TicketDto dto = mapToDto(ticket);
        
        List<MessageDto> messages = messageRepository.findByTicketIdOrderByCreatedAtAsc(id).stream()
                .map(this::mapMessageToDto)
                .collect(Collectors.toList());
        dto.setMessages(messages);
        
        return dto;
    }

    @Transactional
    public TicketDto updateTicketStatus(Long id, TicketStatus newStatus) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
        ticket.setStatus(newStatus);
        return mapToDto(ticketRepository.save(ticket));
    }

    @Transactional
    public MessageDto addAdminMessage(Long ticketId, String body) {
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
        
        Message message = new Message(ticket, SenderType.ADMIN, body);
        message = messageRepository.save(message);
        
        // Auto update status to OPEN when admin replies if it was NEW
        if (ticket.getStatus() == TicketStatus.NEW) {
            ticket.setStatus(TicketStatus.OPEN);
            ticketRepository.save(ticket);
        }
        
        return mapMessageToDto(message);
    }

    private TicketDto mapToDto(Ticket ticket) {
        TicketDto dto = new TicketDto();
        dto.setId(ticket.getId());
        dto.setSubject(ticket.getSubject());
        dto.setCustomerEmail(ticket.getCustomerEmail());
        dto.setStatus(ticket.getStatus());
        dto.setCategory(ticket.getCategory());
        dto.setCreatedAt(ticket.getCreatedAt());
        dto.setUpdatedAt(ticket.getUpdatedAt());
        return dto;
    }

    private MessageDto mapMessageToDto(Message message) {
        return new MessageDto(
                message.getId(),
                message.getTicket().getId(),
                message.getSenderType(),
                message.getBody(),
                message.getCreatedAt()
        );
    }
}
