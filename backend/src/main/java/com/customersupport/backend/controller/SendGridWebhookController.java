package com.customersupport.backend.controller;

import com.customersupport.backend.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/webhooks")
public class SendGridWebhookController {

    private final TicketService ticketService;
    private static final Pattern EMAIL_PATTERN = Pattern.compile("<([^>]+)>");

    @Autowired
    public SendGridWebhookController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping(value = "/sendgrid", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<String> handleSendGridWebhook(
            @RequestParam(value = "from", required = false) String from,
            @RequestParam(value = "subject", required = false) String subject,
            @RequestParam(value = "text", required = false) String text,
            @RequestParam(value = "html", required = false) String html
    ) {
        try {
            System.out.println("Received SendGrid webhook request.");
            System.out.println("From: " + from);
            System.out.println("Subject: " + subject);

            if (from == null || from.isEmpty()) {
                return ResponseEntity.badRequest().body("Missing 'from' field");
            }

            // Parse actual email if formatted like "Name" <email@domain.com>
            String customerEmail = from;
            Matcher matcher = EMAIL_PATTERN.matcher(from);
            if (matcher.find()) {
                customerEmail = matcher.group(1);
            }

            // Use text body if available, fallback to html, then fallback to empty string
            String body = text != null ? text : (html != null ? html : "");
            
            // Limit body length or sanitize if necessary in a real app
            
            ticketService.createTicketFromEmail(customerEmail, subject, body);
            
            return ResponseEntity.ok("Webhook processed successfully");
        } catch (Exception e) {
            System.err.println("Error processing SendGrid webhook: " + e.getMessage());
            e.printStackTrace();
            // Still return 200 to SendGrid so they don't retry unnecessarily for bad payloads
            return ResponseEntity.ok("Error processed");
        }
    }
}
