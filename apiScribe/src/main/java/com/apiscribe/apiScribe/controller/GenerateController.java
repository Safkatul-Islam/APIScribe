package com.apiscribe.apiScribe.controller;

import com.apiscribe.apiScribe.dto.PromptRequest;
import com.apiscribe.apiScribe.service.AiService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map; // <-- Import Map

@RestController
@RequestMapping("/api")
public class GenerateController {

    private final AiService aiService;

    public GenerateController(AiService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/generate")
    public Map<String, String> generate(@RequestBody PromptRequest request) {
        String userPrompt = request.getPrompt();
        String generatedCode = aiService.generateCode(userPrompt);
        return Map.of("code", generatedCode);
    }
}