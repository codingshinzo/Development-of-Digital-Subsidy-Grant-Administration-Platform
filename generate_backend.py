import os

BASE_PKG = "c:/Users/Priyanksu Banerjee/Downloads/Government-Subsidy-Tracking-System-main/Government-Subsidy-Tracking-System-main/backend/src/main/java/com/government/subsidy"

directories = [
    f"{BASE_PKG}/model",
    f"{BASE_PKG}/repository",
    f"{BASE_PKG}/service",
    f"{BASE_PKG}/controller",
    f"{BASE_PKG}/security",
    f"{BASE_PKG}/dto"
]

for d in directories:
    os.makedirs(d, exist_ok=True)

# Generate Entities
entities = {
    "Scheme.java": """package com.government.subsidy.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "schemes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Scheme {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String eligibilityCriteria;

    private Double budget;

    @Column(nullable = false)
    private boolean active = true;
}
""",
    "BeneficiaryProfile.java": """package com.government.subsidy.model;

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
""",
    "ApplicationStatus.java": """package com.government.subsidy.model;

public enum ApplicationStatus {
    SUBMITTED,
    FIELD_VERIFIED,
    FIELD_REJECTED,
    DISTRICT_VERIFIED,
    DISTRICT_REJECTED,
    APPROVED_FOR_PAYMENT,
    PAYMENT_SUCCESSFUL,
    PAYMENT_FAILED
}
""",
    "Application.java": """package com.government.subsidy.model;

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
""",
    "PaymentRecord.java": """package com.government.subsidy.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "payment_records")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "application_id", nullable = false)
    private Application application;

    @Column(nullable = false)
    private Double amount;

    private LocalDateTime paymentDate = LocalDateTime.now();

    @Column(nullable = false)
    private String transactionId;

    @Column(nullable = false)
    private String status;
}
""",
    "AuditLog.java": """package com.government.subsidy.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuditLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String action;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private LocalDateTime timestamp = LocalDateTime.now();

    @Column(columnDefinition = "TEXT")
    private String details;
}
"""
}

for name, content in entities.items():
    with open(f"{BASE_PKG}/model/{name}", "w") as f:
        f.write(content)

# Generate Repositories
repositories = {
    "UserRepository.java": "User, Long",
    "SchemeRepository.java": "Scheme, Long",
    "BeneficiaryProfileRepository.java": "BeneficiaryProfile, Long",
    "ApplicationRepository.java": "Application, Long",
    "PaymentRecordRepository.java": "PaymentRecord, Long",
    "AuditLogRepository.java": "AuditLog, Long"
}

for name, types in repositories.items():
    content = f"""package com.government.subsidy.repository;

import com.government.subsidy.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface {name.replace('.java', '')} extends JpaRepository<{types}> {{
"""
    if name == "UserRepository.java":
        content += "    Optional<User> findByEmail(String email);\n"
    if name == "BeneficiaryProfileRepository.java":
        content += "    Optional<BeneficiaryProfile> findByUser(User user);\n"
    
    content += "}\n"
    with open(f"{BASE_PKG}/repository/{name}", "w") as f:
        f.write(content)

print("Entities and Repositories generated successfully.")
