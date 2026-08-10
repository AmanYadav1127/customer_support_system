package com.customersupport.backend.component;

import com.customersupport.backend.model.Message;
import com.customersupport.backend.model.SenderType;
import com.customersupport.backend.model.Ticket;
import com.customersupport.backend.model.TicketStatus;
import com.customersupport.backend.repository.MessageRepository;
import com.customersupport.backend.repository.TicketRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataSeeder implements CommandLineRunner {

    private final TicketRepository ticketRepository;
    private final MessageRepository messageRepository;

    public DataSeeder(TicketRepository ticketRepository, MessageRepository messageRepository) {
        this.ticketRepository = ticketRepository;
        this.messageRepository = messageRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (ticketRepository.count() == 0) {
            Ticket t1 = new Ticket("Login issue on website", "john.doe@example.com");
            t1.setCategory("Technical Support");
            t1.setStatus(TicketStatus.OPEN);
            ticketRepository.save(t1);
            
            Message m1 = new Message(t1, SenderType.CUSTOMER, "Hi, I cannot login to my account. It says invalid password but I am sure it is correct.");
            Message m2 = new Message(t1, SenderType.ADMIN, "Hello John, I understand you are having login issues. Could you please try resetting your password using the 'Forgot Password' link?");
            Message m3 = new Message(t1, SenderType.CUSTOMER, "I tried that but I never received the reset email.");
            messageRepository.saveAll(Arrays.asList(m1, m2, m3));

            Ticket t2 = new Ticket("Billing question for last invoice", "sarah.smith@example.com");
            t2.setCategory("Billing");
            t2.setStatus(TicketStatus.NEW);
            ticketRepository.save(t2);

            Message m4 = new Message(t2, SenderType.CUSTOMER, "Hi there, my last invoice seems to have an extra charge of $15. Can you explain what this is for?");
            messageRepository.save(m4);
            
            Ticket t3 = new Ticket("Feature request: Dark Mode", "mike.jones@example.com");
            t3.setCategory("Feedback");
            t3.setStatus(TicketStatus.RESOLVED);
            ticketRepository.save(t3);

            Message m5 = new Message(t3, SenderType.CUSTOMER, "Please add a dark mode to the dashboard, it is too bright at night.");
            Message m6 = new Message(t3, SenderType.ADMIN, "Hi Mike, thanks for the feedback! We have actually just released dark mode today. You can enable it in your profile settings.");
            messageRepository.saveAll(Arrays.asList(m5, m6));
        }
    }
}
