package com.government.subsidy.controller;

import com.government.subsidy.model.Application;
import com.government.subsidy.model.ApplicationStatus;
import com.government.subsidy.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    @Autowired
    private ApplicationRepository applicationRepository;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('FIELD_OFFICER') or hasRole('DISTRICT_OFFICER') or hasRole('FINANCE_OFFICER')")
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Application> getApplicationById(@PathVariable Long id) {
        return applicationRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('CITIZEN')")
    public Application submitApplication(@RequestBody Application application) {
        application.setStatus(ApplicationStatus.SUBMITTED);
        // Eligibility logic could be called here
        return applicationRepository.save(application);
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN') or hasRole('FIELD_OFFICER') or hasRole('DISTRICT_OFFICER') or hasRole('FINANCE_OFFICER')")
    public ResponseEntity<Application> updateApplicationStatus(@PathVariable Long id, @RequestParam ApplicationStatus status, @RequestParam(required = false) String remarks) {
        return applicationRepository.findById(id).map(app -> {
            app.setStatus(status);
            if (remarks != null) {
                app.setRemarks(remarks);
            }
            return ResponseEntity.ok(applicationRepository.save(app));
        }).orElse(ResponseEntity.notFound().build());
    }
}
