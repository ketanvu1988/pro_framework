package com.framework.notification.config;

import org.springframework.amqp.core.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String EXCHANGE = "notification.direct.exchange";
    public static final String EMAIL_QUEUE = "notification.email.queue";
    public static final String SMS_QUEUE = "notification.sms.queue";
    public static final String WHATSAPP_QUEUE = "notification.whatsapp.queue";

    public static final String EMAIL_ROUTING_KEY = "notification.email";
    public static final String SMS_ROUTING_KEY = "notification.sms";
    public static final String WHATSAPP_ROUTING_KEY = "notification.whatsapp";

    @Bean
    public DirectExchange exchange() {
        return new DirectExchange(EXCHANGE);
    }

    @Bean
    public Queue emailQueue() {
        return new Queue(EMAIL_QUEUE);
    }

    @Bean
    public Queue smsQueue() {
        return new Queue(SMS_QUEUE);
    }

    @Bean
    public Queue whatsappQueue() {
        return new Queue(WHATSAPP_QUEUE);
    }

    @Bean
    public Binding emailBinding(Queue emailQueue, DirectExchange exchange) {
        return BindingBuilder.bind(emailQueue).to(exchange).with(EMAIL_ROUTING_KEY);
    }

    @Bean
    public Binding smsBinding(Queue smsQueue, DirectExchange exchange) {
        return BindingBuilder.bind(smsQueue).to(exchange).with(SMS_ROUTING_KEY);
    }

    @Bean
    public Binding whatsappBinding(Queue whatsappQueue, DirectExchange exchange) {
        return BindingBuilder.bind(whatsappQueue).to(exchange).with(WHATSAPP_ROUTING_KEY);
    }
}
