package com.government.subsidy.service;

import com.government.subsidy.exception.ResourceNotFoundException;
import com.government.subsidy.model.BeneficiaryProfile;
import com.government.subsidy.model.User;
import com.government.subsidy.repository.BeneficiaryProfileRepository;
import com.government.subsidy.repository.UserRepository;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BeneficiaryService {
    private final BeneficiaryProfileRepository profileRepository;
    private final UserRepository userRepository;

    public BeneficiaryService(BeneficiaryProfileRepository profileRepository, UserRepository userRepository) {
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public BeneficiaryProfile createProfile(@NonNull Long userId, BeneficiaryProfile profile) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + userId));
        profile.setUser(user);
        return profileRepository.save(profile);
    }

    public BeneficiaryProfile getProfile(@NonNull Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + userId));

        return profileRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Beneficiary profile not found for user " + userId));
    }
}
