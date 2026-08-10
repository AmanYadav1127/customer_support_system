package com.customersupport.backend.repository;

import com.customersupport.backend.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import com.customersupport.backend.model.TicketStatus;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByStatus(TicketStatus status);

    long countByCreatedAtAfter(LocalDateTime date);
}
