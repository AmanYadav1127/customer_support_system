package com.customersupport.backend.dto;

import com.customersupport.backend.model.SenderType;
import java.time.LocalDateTime;

public class MessageDto {
    private Long id;
    private Long ticketId;
    private SenderType senderType;
    private String body;
    private LocalDateTime createdAt;

    public MessageDto() {}

    public MessageDto(Long id, Long ticketId, SenderType senderType, String body, LocalDateTime createdAt) {
        this.id = id;
        this.ticketId = ticketId;
        this.senderType = senderType;
        this.body = body;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Long getTicketId() { return ticketId; }
    public void setTicketId(Long ticketId) { this.ticketId = ticketId; }

    public SenderType getSenderType() { return senderType; }
    public void setSenderType(SenderType senderType) { this.senderType = senderType; }

    public String getBody() { return body; }
    public void setBody(String body) { this.body = body; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
