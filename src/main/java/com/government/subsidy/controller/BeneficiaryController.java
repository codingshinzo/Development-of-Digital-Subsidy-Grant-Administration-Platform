package com.government.subsidy.controller;

import com.government.subsidy.model.BeneficiaryProfile;
import com.government.subsidy.service.BeneficiaryService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/beneficiaries")
public class BeneficiaryController {

    private final BeneficiaryService beneficiaryService;

    public BeneficiaryController(BeneficiaryService beneficiaryService) {
        this.beneficiaryService = beneficiaryService;
    }

    @PostMapping("/{userId}")
    @PreAuthorize("hasRole('CITIZEN')")
    public ResponseEntity<?> createProfile(@PathVariable @NonNull Long userId, @Valid @RequestBody BeneficiaryProfile profile) {
        return ResponseEntity.ok(beneficiaryService.createProfile(userId, profile));
    }

    @GetMapping("/{userId}")
    @PreAuthorize("hasRole('CITIZEN') or hasRole('ADMIN')")
    public ResponseEntity<BeneficiaryProfile> getProfile(@PathVariable @NonNull Long userId) {
        return ResponseEntity.ok(beneficiaryService.getProfile(userId));
    }
}
