# Customer Support System - Tech Stack

This document outlines the technology stack for the MVP of the Customer Support System. The focus is on simplicity, performance, and ease of development.

## Frontend
*   **Framework:** React (initialized with Vite for fast development and builds)
*   **Routing:** React Router (for SPA navigation)
*   **Styling:** Tailwind CSS (for rapid, utility-first, modern styling)
*   **State Management:** React Context API (keeping it lightweight and simple for the MVP)
*   **Data Visualization:** Recharts (for dashboard metrics and charts)
*   **HTTP Client:** Axios (for communicating with the backend APIs)

## Backend
*   **Framework:** Spring Boot (Java)
*   **Architecture:** RESTful APIs
*   **Security:** Spring Security (for single-admin authentication and securing endpoints)
*   **File Handling:** Standard Spring Boot multipart file upload (for PDF/DOC knowledge base uploads)
*   **AI Framework:** Spring AI (acting as the framework/bridge to an LLM like OpenAI) for auto-categorization of tickets and drafting responses.

## Database
*   **Relational Database:** PostgreSQL (Robust and reliable for ticket and user data)
*   **ORM / Data Access:** Spring Data JPA (Hibernate)

## External Integrations
*   **Email Ingestion:** Webhooks via a third-party email provider. The exact provider (e.g., SendGrid, Mailgun, Postmark) will be decided later as the webhook payload structures are similar and easy to swap.
