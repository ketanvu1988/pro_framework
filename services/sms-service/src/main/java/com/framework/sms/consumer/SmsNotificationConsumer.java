package com.framework.sms.consumer;

import com.framework.common.dto.NotificationRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class SmsNotificationConsumer {

    @RabbitListener(queues = "notification.sms.queue")
    public void consumeSmsNotification(NotificationRequest request) {
        log.info("Received SMS notification request for {}: {}", request.getRecipient(), request.getTemplateCode());
        // STUB: Integration with SMS provider like Twilio would go here
        log.info("SMS delivered successfully for correlationId: {}", request.getCorrelationId());
    }
}
