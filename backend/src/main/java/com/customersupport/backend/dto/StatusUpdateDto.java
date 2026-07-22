package com.customersupport.backend.dto;

import com.customersupport.backend.model.TicketStatus;

public class StatusUpdateDto {
    private TicketStatus status;

    public StatusUpdateDto() {}
    public StatusUpdateDto(TicketStatus status) { this.status = status; }

    public TicketStatus getStatus() { return status; }
    public void setStatus(TicketStatus status) { this.status = status; }
}
