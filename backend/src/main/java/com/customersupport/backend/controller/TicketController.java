package com.customersupport.backend.controller;

import com.customersupport.backend.dto.MessageCreateDto;
import com.customersupport.backend.dto.MessageDto;
import com.customersupport.backend.dto.StatusUpdateDto;
import com.customersupport.backend.dto.TicketDto;
import com.customersupport.backend.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketService ticketService;

    @Autowired
    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping
    public ResponseEntity<List<TicketDto>> getAllTickets(@RequestParam(required = false) com.customersupport.backend.model.TicketStatus status) {
        return ResponseEntity.ok(ticketService.getAllTickets(status));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TicketDto> getTicketById(@PathVariable Long id) {
        return ResponseEntity.ok(ticketService.getTicketById(id));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<TicketDto> updateTicketStatus(@PathVariable Long id, @RequestBody StatusUpdateDto statusUpdate) {
        return ResponseEntity.ok(ticketService.updateTicketStatus(id, statusUpdate.getStatus()));
    }

    @PostMapping("/{id}/messages")
    public ResponseEntity<MessageDto> addMessage(@PathVariable Long id, @RequestBody MessageCreateDto messageCreate) {
        return ResponseEntity.ok(ticketService.addAdminMessage(id, messageCreate.getBody()));
    }
}
