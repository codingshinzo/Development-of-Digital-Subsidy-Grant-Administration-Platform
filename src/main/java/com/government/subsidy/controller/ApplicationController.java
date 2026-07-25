package com.government.subsidy.controller;

import com.government.subsidy.model.Application;
import com.government.subsidy.model.ApplicationStatus;
import com.government.subsidy.model.Scheme;
import com.government.subsidy.repository.ApplicationRepository;
import com.government.subsidy.repository.SchemeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping({"/api/v1/applications", "/api/applications"})
public class ApplicationController {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private SchemeRepository schemeRepository;

    @GetMapping
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Application> getApplicationById(@PathVariable Long id) {
        return applicationRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/status")
    public ResponseEntity<Map<String, Object>> getApplicationStatus(@PathVariable Long id) {
        return applicationRepository.findById(id).map(app -> {
            Map<String, Object> statusMap = new HashMap<>();
            statusMap.put("id", app.getId());
            statusMap.put("status", app.getStatus());
            statusMap.put("eligibilityScore", app.getEligibilityScore());
            statusMap.put("submittedDate", app.getSubmittedDate());
            statusMap.put("remarks", app.getRemarks());
            return ResponseEntity.ok(statusMap);
        }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> submitApplication(@RequestBody Map<String, Object> payload) {
        try {
            Long schemeId = Long.parseLong(payload.getOrDefault("schemeId", "1").toString());
            Scheme scheme = schemeRepository.findById(schemeId).orElse(null);
            if (scheme == null) {
                List<Scheme> allSchemes = schemeRepository.findAll();
                if (!allSchemes.isEmpty()) scheme = allSchemes.get(0);
            }

            Application application = new Application();
            application.setScheme(scheme);
            application.setSubmittedDate(LocalDateTime.now());

            int incomeScore = 30; 
            int categoryScore = 40;
            int documentScore = 30;

            if (payload.containsKey("income")) {
                double income = Double.parseDouble(payload.get("income").toString());
                if (income > 300000) incomeScore = 10;
                else if (income > 150000) incomeScore = 20;
            }

            int totalScore = incomeScore + categoryScore + documentScore;
            application.setEligibilityScore(totalScore);

            if (totalScore >= 60) {
                application.setStatus(ApplicationStatus.SUBMITTED);
                application.setRemarks("Auto-eligibility score: " + totalScore + "/100. Assigned to Level 1: Field Officer Review.");
            } else {
                application.setStatus(ApplicationStatus.FIELD_REJECTED);
                application.setRemarks("Auto-flagged/Rejected. Score: " + totalScore + "/100 below minimum threshold of 60.");
            }

            Application saved = applicationRepository.save(application);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("status", "error", "message", e.getMessage()));
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Application> updateApplicationStatus(
            @PathVariable Long id,
            @RequestParam(required = false) ApplicationStatus status,
            @RequestBody(required = false) Map<String, Object> body) {

        ApplicationStatus targetStatus = status;
        String remarks = null;

        if (body != null) {
            if (body.containsKey("status")) {
                try {
                    targetStatus = ApplicationStatus.valueOf(body.get("status").toString().toUpperCase());
                } catch (Exception ignored) {}
            }
            if (body.containsKey("remarks")) {
                remarks = body.get("remarks").toString();
            }
        }

        final ApplicationStatus finalStatus = targetStatus;
        final String finalRemarks = remarks;

        return applicationRepository.findById(id).map(app -> {
            if (finalStatus != null) {
                app.setStatus(finalStatus);
            }
            if (finalRemarks != null) {
                app.setRemarks(finalRemarks);
            }
            return ResponseEntity.ok(applicationRepository.save(app));
        }).orElse(ResponseEntity.notFound().build());
    }
}
