package com.framework.notification.controller;

import com.framework.common.dto.NotificationRequest;
import com.framework.notification.service.NotificationProducerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationProducerService producerService;

    @PostMapping("/send")
    public ResponseEntity<String> sendNotification(@RequestBody NotificationRequest request) {
        producerService.sendNotification(request);
        return ResponseEntity.ok("Notification queued successfully. Correlation ID: " + request.getCorrelationId());
    }
}
