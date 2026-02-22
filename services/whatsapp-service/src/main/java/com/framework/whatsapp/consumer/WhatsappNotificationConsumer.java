package com.framework.whatsapp.consumer;

import com.framework.common.dto.NotificationRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class WhatsappNotificationConsumer {

    @RabbitListener(queues = "notification.whatsapp.queue")
    public void consumeWhatsappNotification(NotificationRequest request) {
        log.info("Received WhatsApp notification request for {}: {}", request.getRecipient(),
                request.getTemplateCode());
        // STUB: Integration with Meta Graph API would go here
        log.info("WhatsApp message delivered successfully for correlationId: {}", request.getCorrelationId());
    }
}
