import os

BASE_PKG = "c:/Users/Priyanksu Banerjee/Downloads/Government-Subsidy-Tracking-System-main/Government-Subsidy-Tracking-System-main/backend/src/main/java/com/government/subsidy"

files = {
    "service/SchemeService.java": """package com.government.subsidy.service;

import com.government.subsidy.model.Scheme;
import com.government.subsidy.repository.SchemeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SchemeService {
    @Autowired
    private SchemeRepository schemeRepository;

    public List<Scheme> getAllSchemes() {
        return schemeRepository.findAll();
    }

    public Optional<Scheme> getSchemeById(Long id) {
        return schemeRepository.findById(id);
    }

    public Scheme createScheme(Scheme scheme) {
        return schemeRepository.save(scheme);
    }

    public Scheme updateScheme(Long id, Scheme schemeDetails) {
        return schemeRepository.findById(id).map(scheme -> {
            scheme.setName(schemeDetails.getName());
            scheme.setDescription(schemeDetails.getDescription());
            scheme.setEligibilityCriteria(schemeDetails.getEligibilityCriteria());
            scheme.setBudget(schemeDetails.getBudget());
            scheme.setActive(schemeDetails.isActive());
            return schemeRepository.save(scheme);
        }).orElseThrow(() -> new RuntimeException("Scheme not found with id " + id));
    }

    public void deleteScheme(Long id) {
        schemeRepository.deleteById(id);
    }
}
""",
    "controller/SchemeController.java": """package com.government.subsidy.controller;

import com.government.subsidy.model.Scheme;
import com.government.subsidy.service.SchemeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schemes")
public class SchemeController {

    @Autowired
    private SchemeService schemeService;

    @GetMapping
    public List<Scheme> getAllSchemes() {
        return schemeService.getAllSchemes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Scheme> getSchemeById(@PathVariable Long id) {
        return schemeService.getSchemeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Scheme createScheme(@RequestBody Scheme scheme) {
        return schemeService.createScheme(scheme);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Scheme> updateScheme(@PathVariable Long id, @RequestBody Scheme schemeDetails) {
        try {
            return ResponseEntity.ok(schemeService.updateScheme(id, schemeDetails));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteScheme(@PathVariable Long id) {
        schemeService.deleteScheme(id);
        return ResponseEntity.ok().build();
    }
}
""",
    "controller/ApplicationController.java": """package com.government.subsidy.controller;

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
""",
    "controller/BeneficiaryController.java": """package com.government.subsidy.controller;

import com.government.subsidy.model.BeneficiaryProfile;
import com.government.subsidy.model.User;
import com.government.subsidy.repository.BeneficiaryProfileRepository;
import com.government.subsidy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/beneficiaries")
public class BeneficiaryController {

    @Autowired
    private BeneficiaryProfileRepository profileRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/{userId}")
    @PreAuthorize("hasRole('CITIZEN')")
    public ResponseEntity<?> createProfile(@PathVariable Long userId, @RequestBody BeneficiaryProfile profile) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }
        profile.setUser(user);
        return ResponseEntity.ok(profileRepository.save(profile));
    }

    @GetMapping("/{userId}")
    @PreAuthorize("hasRole('CITIZEN') or hasRole('ADMIN')")
    public ResponseEntity<BeneficiaryProfile> getProfile(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) return ResponseEntity.notFound().build();
        
        return profileRepository.findByUser(user)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
"""
}

for name, content in files.items():
    with open(f"{BASE_PKG}/{name}", "w") as f:
        f.write(content)

print("REST API components generated successfully.")
