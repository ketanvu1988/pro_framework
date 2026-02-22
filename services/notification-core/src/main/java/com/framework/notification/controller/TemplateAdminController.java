package com.framework.notification.controller;

import com.framework.notification.model.NotificationTemplate;
import com.framework.notification.repository.NotificationTemplateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin/templates")
@RequiredArgsConstructor
public class TemplateAdminController {

    private final NotificationTemplateRepository repository;

    @GetMapping
    public List<NotificationTemplate> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public NotificationTemplate create(@RequestBody NotificationTemplate template) {
        return repository.save(template);
    }

    @PutMapping("/{id}")
    public NotificationTemplate update(@PathVariable Long id, @RequestBody NotificationTemplate template) {
        template.setId(id);
        return repository.save(template);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
