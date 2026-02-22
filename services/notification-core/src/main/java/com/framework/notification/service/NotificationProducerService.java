package com.framework.notification.service;

import com.framework.common.dto.NotificationRequest;
import com.framework.notification.config.RabbitMQConfig;
import com.framework.notification.model.NotificationTemplate;
import com.framework.notification.repository.NotificationTemplateRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationProducerService {

    private final RabbitTemplate rabbitTemplate;
    private final TemplateService templateService;
    private final NotificationTemplateRepository templateRepository;

    public void sendNotification(NotificationRequest request) {
        log.info("Processing notification request: {}", request.getCorrelationId());

        NotificationTemplate template = templateRepository.findByCode(request.getTemplateCode())
                .orElseThrow(() -> new RuntimeException("Template not found: " + request.getTemplateCode()));

        String resolvedContent = templateService.resolveTemplate(template.getContent(), request.getPlaceholders());

        // Update request with resolved content and subject from template if needed
        request.setSubject(template.getSubject());
        // For the sake of this demo, we'll put the resolved content back into the
        // templateCode field
        // or a dedicated field in a more advanced DTO.
        request.setTemplateCode(resolvedContent);

        String routingKey;
        switch (template.getChannel().toUpperCase()) {
            case "SMS":
                routingKey = RabbitMQConfig.SMS_ROUTING_KEY;
                break;
            case "WHATSAPP":
                routingKey = RabbitMQConfig.WHATSAPP_ROUTING_KEY;
                break;
            case "EMAIL":
            default:
                routingKey = RabbitMQConfig.EMAIL_ROUTING_KEY;
                break;
        }

        log.info("Sending notification to exchange: {}, routingKey: {}, request: {}",
                RabbitMQConfig.EXCHANGE, routingKey, request);

        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE, routingKey, request);
    }
}
