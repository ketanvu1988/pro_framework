package com.framework.notification.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class TemplateService {

    private final SpringTemplateEngine templateEngine;

    public String resolveTemplate(String templateBody, Map<String, Object> placeholders) {
        Context context = new Context();
        if (placeholders != null) {
            context.setVariables(placeholders);
        }
        // Assuming templateBody is the raw string template for now
        // For production, this would load from database or classpath templates
        return templateEngine.process(templateBody, context);
    }
}
