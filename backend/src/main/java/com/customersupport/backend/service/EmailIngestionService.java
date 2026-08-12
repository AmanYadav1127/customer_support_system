package com.customersupport.backend.service;

import jakarta.mail.*;
import jakarta.mail.search.FlagTerm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Properties;

@Service
public class EmailIngestionService {

    private final TicketService ticketService;

    @Value("${app.email.imap.host}")
    private String imapHost;

    @Value("${app.email.imap.port}")
    private String imapPort;

    @Value("${app.email.imap.username}")
    private String imapUsername;

    @Value("${app.email.imap.password}")
    private String imapPassword;

    @Value("${app.email.imap.protocol}")
    private String imapProtocol;

    @Autowired
    public EmailIngestionService(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    // @Scheduled(fixedDelay = 60000) // Disabled: Moved to SendGrid Webhook
    public void pollEmails() {
        if ("your-email@example.com".equals(imapUsername) || imapUsername == null || imapUsername.isEmpty()) {
            // Skip if credentials are not configured yet
            return;
        }
        
        System.out.println("Polling for new emails...");
        try {
            Properties properties = new Properties();
            properties.put("mail.store.protocol", imapProtocol);
            properties.put("mail." + imapProtocol + ".host", imapHost);
            properties.put("mail." + imapProtocol + ".port", imapPort);
            // Some providers need this for IMAPS
            if ("imaps".equals(imapProtocol)) {
                properties.put("mail.imaps.ssl.enable", "true");
            }

            Session emailSession = Session.getDefaultInstance(properties);
            Store store = emailSession.getStore(imapProtocol);
            store.connect(imapHost, imapUsername, imapPassword);

            Folder inbox = store.getFolder("INBOX");
            inbox.open(Folder.READ_WRITE);

            // Search for unread messages
            Message[] messages = inbox.search(new FlagTerm(new Flags(Flags.Flag.SEEN), false));
            System.out.println("Found " + messages.length + " unread messages.");

            for (Message message : messages) {
                try {
                    String from = ((jakarta.mail.internet.InternetAddress) message.getFrom()[0]).getAddress();
                    String subject = message.getSubject();
                    String body = extractBody(message);

                    System.out.println("Processing email from: " + from);
                    ticketService.createTicketFromEmail(from, subject, body);

                    // Mark as read
                    message.setFlag(Flags.Flag.SEEN, true);
                } catch (Exception e) {
                    System.err.println("Error processing individual message: " + e.getMessage());
                    e.printStackTrace();
                }
            }

            inbox.close(false);
            store.close();
        } catch (Exception e) {
            System.err.println("Error during email polling: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private String extractBody(Message message) throws Exception {
        Object content = message.getContent();
        if (content instanceof String) {
            return (String) content;
        } else if (content instanceof Multipart) {
            Multipart multipart = (Multipart) content;
            StringBuilder result = new StringBuilder();
            for (int i = 0; i < multipart.getCount(); i++) {
                BodyPart bodyPart = multipart.getBodyPart(i);
                if (bodyPart.isMimeType("text/plain")) {
                    result.append((String) bodyPart.getContent());
                } else if (bodyPart.isMimeType("text/html")) {
                    // Ideally we'd parse HTML, but for simplicity we'll just append it if plain text isn't found
                    // In a real app we might want to strip HTML tags or handle them properly
                    if (result.length() == 0) {
                        result.append((String) bodyPart.getContent());
                    }
                }
            }
            return result.toString();
        }
        return "Unsupported email format";
    }
}
