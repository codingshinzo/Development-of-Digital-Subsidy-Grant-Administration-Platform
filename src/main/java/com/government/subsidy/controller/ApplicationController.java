package com.government.subsidy.controller;

import com.government.subsidy.model.Application;
import com.government.subsidy.model.ApplicationStatus;
import com.government.subsidy.service.ApplicationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('FIELD_OFFICER') or hasRole('DISTRICT_OFFICER') or hasRole('FINANCE_OFFICER')")
    public List<Application> getAllApplications() {
        return applicationService.getAllApplications();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Application> getApplicationById(@PathVariable @NonNull Long id) {
        return ResponseEntity.ok(applicationService.getApplicationById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('CITIZEN')")
    public Application submitApplication(@Valid @RequestBody Application application) {
        return applicationService.submitApplication(application);
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN') or hasRole('FIELD_OFFICER') or hasRole('DISTRICT_OFFICER') or hasRole('FINANCE_OFFICER')")
    public ResponseEntity<Application> updateApplicationStatus(@PathVariable @NonNull Long id,
                                                              @RequestParam ApplicationStatus status,
                                                              @RequestParam(required = false) String remarks) {
        return ResponseEntity.ok(applicationService.updateApplicationStatus(id, status, remarks));
    }
}
