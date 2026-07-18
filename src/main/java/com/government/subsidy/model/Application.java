package com.government.subsidy.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "applications")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "scheme_id", nullable = false)
    private Scheme scheme;

    @ManyToOne
    @JoinColumn(name = "beneficiary_id", nullable = false)
    private BeneficiaryProfile beneficiary;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApplicationStatus status = ApplicationStatus.SUBMITTED;

    private LocalDateTime submittedDate = LocalDateTime.now();
    
    private Integer eligibilityScore;

    @Column(columnDefinition = "TEXT")
    private String remarks;
}
