package com.customersupport.backend.dto;

public class MessageCreateDto {
    private String body;

    public MessageCreateDto() {}
    public MessageCreateDto(String body) { this.body = body; }

    public String getBody() { return body; }
    public void setBody(String body) { this.body = body; }
}
