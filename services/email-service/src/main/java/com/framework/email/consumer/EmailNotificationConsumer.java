package com.framework.email.consumer;

import com.framework.common.dto.NotificationRequest;
import com.framework.email.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class EmailNotificationConsumer {

    private final EmailService emailService;

    @RabbitListener(queues = "notification.email.queue")
    public void consumeEmailNotification(NotificationRequest request) {
        log.info("Received email notification request: {}", request);
        try {
            emailService.sendSimpleEmail(request.getRecipient(), request.getSubject(), request.getTemplateCode());
            log.info("Email sent successfully for correlationId: {}", request.getCorrelationId());
        } catch (Exception e) {
            log.error("Failed to send email for correlationId: {}", request.getCorrelationId(), e);
        }
    }
}
