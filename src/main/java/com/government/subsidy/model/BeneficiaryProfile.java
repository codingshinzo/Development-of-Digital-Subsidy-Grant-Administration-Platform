package com.government.subsidy.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "beneficiary_profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BeneficiaryProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(unique = true, nullable = false)
    @NotBlank(message = "Aadhaar number is required")
    private String aadhaarNumber;

    @Column(columnDefinition = "TEXT")
    @NotBlank(message = "Address is required")
    private String address;

    @Column(nullable = false)
    @NotBlank(message = "Bank account number is required")
    private String bankAccountNumber;

    @Column(nullable = false)
    @NotBlank(message = "IFSC code is required")
    private String ifscCode;
}
