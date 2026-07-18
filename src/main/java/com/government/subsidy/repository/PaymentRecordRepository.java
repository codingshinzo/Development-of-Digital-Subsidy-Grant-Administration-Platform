package com.government.subsidy.repository;

import com.government.subsidy.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface PaymentRecordRepository extends JpaRepository<PaymentRecord, Long> {
}
