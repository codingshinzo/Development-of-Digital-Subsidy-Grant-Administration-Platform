package com.government.subsidy.model;

import jakarta.persistence.*;
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
    private String aadhaarNumber;

    @Column(columnDefinition = "TEXT")
    private String address;

    @Column(nullable = false)
    private String bankAccountNumber;

    @Column(nullable = false)
    private String ifscCode;
}
