package com.government.subsidy.controller;

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
