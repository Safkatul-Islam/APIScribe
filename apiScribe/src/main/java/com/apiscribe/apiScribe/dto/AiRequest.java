package com.apiscribe.apiScribe.dto;

import lombok.Data;
import java.util.List;
import java.util.ArrayList;

@Data
public class AiRequest {

    private String model;
    private List<Message> messages;

    public AiRequest(String model, String userPrompt) {
        this.model = model;
        this.messages = new ArrayList<>();
        this.messages.add(new Message("user", userPrompt));
    }

    @Data
    public static class Message {
        private String role;
        private String content;

        public Message(String role, String content) {
            this.role = role;
            this.content = content;
        }
    }
}