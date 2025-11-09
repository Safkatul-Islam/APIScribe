package com.apiscribe.apiScribe.service;

import com.apiscribe.apiScribe.dto.AiRequest;
import com.apiscribe.apiScribe.dto.AiResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AiService {

    @Value("${openai.api.key}")
    private String openAiKey;

    private final RestTemplate restTemplate;

    private static final String OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

    public AiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String generateCode(String userPrompt) {

        String finalPrompt = """
            You are an expert code generator. A user has provided a request.
            Convert this request into a clean, copy-paste-ready code snippet
            for each of the following languages/libraries:
            1. JavaScript (using fetch)
            2. JavaScript (using axios)
            3. Java (using Spring WebClient)
            4. Python (using requests)
            
            CRITICAL: Return *only* a valid JSON object.
            Do not provide any explanation, intro, or markdown "```json" tags.
            
            The JSON object must have these exact keys:
            "javascriptFetch"
            "javascriptAxios"
            "javaSpring"
            "pythonRequests"
            
            IMPORTANT: The *value* for each key MUST be a single string
            containing the complete, runnable code snippet.
            DO NOT return a JSON object as the value for a key.
            
            User Request:
            %s
            """
                .formatted(userPrompt);

        AiRequest aiRequest = new AiRequest("gpt-4o", finalPrompt);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(openAiKey);

        HttpEntity<AiRequest> httpEntity = new HttpEntity<>(aiRequest, headers);

        try {
            AiResponse aiResponse = restTemplate.postForObject(
                    OPENAI_API_URL,
                    httpEntity,
                    AiResponse.class
            );

            if (aiResponse != null && !aiResponse.getChoices().isEmpty()) {
                return aiResponse.getChoices().get(0).getMessage().getContent().trim();
            } else {
                return "Error: No response from AI.";
            }
        } catch (Exception e) {
            System.err.println("Error calling OpenAI API: " + e.getMessage());
            return "Error: Failed to call AI. Check backend logs.";
        }
    }
}