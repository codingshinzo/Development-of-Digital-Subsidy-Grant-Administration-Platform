package com.government.subsidy.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

@Entity
@Table(name = "eligibility_rules")
@Getter
@Setter
public class EligibilityRule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ruleId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "scheme_id", nullable = false)
    private Scheme scheme;

    private String ruleDescription;
    private String criteriaType;
    private BigDecimal minValue;
    private BigDecimal maxValue;
    private Boolean isActive;
}