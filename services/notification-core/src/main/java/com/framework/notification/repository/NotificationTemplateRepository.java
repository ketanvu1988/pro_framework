package com.framework.notification.repository;

import com.framework.notification.model.NotificationTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface NotificationTemplateRepository extends JpaRepository<NotificationTemplate, Long> {
    Optional<NotificationTemplate> findByCode(String code);
}
