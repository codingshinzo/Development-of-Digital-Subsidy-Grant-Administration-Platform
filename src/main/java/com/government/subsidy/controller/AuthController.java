package com.government.subsidy.controller;

import com.government.subsidy.dto.LoginRequest;
import com.government.subsidy.dto.SignupRequest;
import com.government.subsidy.model.Beneficiary;
import com.government.subsidy.model.BeneficiaryProfile;
import com.government.subsidy.model.Officer;
import com.government.subsidy.model.Role;
import com.government.subsidy.model.User;
import com.government.subsidy.repository.BeneficiaryProfileRepository;
import com.government.subsidy.repository.UserRepository;
import com.government.subsidy.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping({"/api/v1/auth", "/api/auth"})
public class AuthController {
    
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    BeneficiaryProfileRepository profileRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        String identifier = loginRequest.getEmail();
        User user = userRepository.findByEmail(identifier)
                .orElseGet(() -> userRepository.findByPhone(identifier).orElse(null));

        if (user == null) {
            return ResponseEntity.badRequest().body(Map.of("status", "error", "message", "Error: User with provided credentials not found!"));
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Login successful");
        response.put("token", jwt);
        response.put("email", user.getEmail());
        response.put("fullName", user.getFullName());
        response.put("role", user.getRole().name());
        response.put("id", user.getId());

        return ResponseEntity.ok(response);
    }

    @PostMapping({"/signup", "/register"})
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signupRequest) {
        if (signupRequest.getEmail() != null && userRepository.existsByEmail(signupRequest.getEmail())) {
            return ResponseEntity.badRequest().body(Map.of("status", "error", "message", "Error: Email is already registered!"));
        }
        if (signupRequest.getPhone() != null && userRepository.existsByPhone(signupRequest.getPhone())) {
            return ResponseEntity.badRequest().body(Map.of("status", "error", "message", "Error: Mobile phone number is already registered!"));
        }

        Role userRole = Role.CITIZEN;
        if (signupRequest.getRole() != null) {
            String roleStr = signupRequest.getRole().toUpperCase().replace(" ", "_");
            if (roleStr.equals("BENEFICIARY")) roleStr = "CITIZEN";
            try {
                userRole = Role.valueOf(roleStr);
            } catch (IllegalArgumentException e) {
                userRole = Role.CITIZEN;
            }
        }

        User savedUser;
        if (userRole == Role.CITIZEN) {
            Beneficiary beneficiary = new Beneficiary();
            beneficiary.setEmail(signupRequest.getEmail());
            beneficiary.setPassword(encoder.encode(signupRequest.getPassword()));
            beneficiary.setFullName(signupRequest.getFullName());
            beneficiary.setPhone(signupRequest.getPhone());
            beneficiary.setRole(Role.CITIZEN);
            
            beneficiary.setAadhaarNumber(signupRequest.getAadhaarNumber() != null ? signupRequest.getAadhaarNumber() : "000000000000");
            beneficiary.setCategory(signupRequest.getCategory() != null ? signupRequest.getCategory() : "GENERAL");
            beneficiary.setIncome(signupRequest.getIncome() != null ? signupRequest.getIncome() : 150000.0);
            beneficiary.setAddress(signupRequest.getAddress() != null ? signupRequest.getAddress() : "Address N/A");
            beneficiary.setBankAccountNumber(signupRequest.getBankAccountNumber() != null ? signupRequest.getBankAccountNumber() : "999988887777");
            beneficiary.setIfscCode(signupRequest.getIfscCode() != null ? signupRequest.getIfscCode() : "SBIN0001234");

            savedUser = userRepository.save(beneficiary);

            BeneficiaryProfile profile = new BeneficiaryProfile();
            profile.setUser(savedUser);
            profile.setAadhaarNumber(beneficiary.getAadhaarNumber());
            profile.setAddress(beneficiary.getAddress());
            profile.setBankAccountNumber(beneficiary.getBankAccountNumber());
            profile.setIfscCode(beneficiary.getIfscCode());
            profileRepository.save(profile);

        } else {
            Officer officer = new Officer();
            officer.setEmail(signupRequest.getEmail());
            officer.setPassword(encoder.encode(signupRequest.getPassword()));
            officer.setFullName(signupRequest.getFullName());
            officer.setPhone(signupRequest.getPhone());
            officer.setRole(userRole);

            officer.setDesignation(signupRequest.getDesignation() != null ? signupRequest.getDesignation() : "Officer");
            officer.setDepartment(signupRequest.getDepartment() != null ? signupRequest.getDepartment() : "Revenue Department");
            officer.setDistrict(signupRequest.getDistrict() != null ? signupRequest.getDistrict() : "District Central");

            savedUser = userRepository.save(officer);
        }

        return ResponseEntity.ok(Map.of(
            "status", "success",
            "message", "User registered successfully in database!",
            "userId", savedUser.getId()
        ));
    }
}