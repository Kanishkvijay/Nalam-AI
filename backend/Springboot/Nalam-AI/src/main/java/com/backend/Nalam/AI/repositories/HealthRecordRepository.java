package com.backend.Nalam.AI.repositories;

import com.backend.Nalam.AI.models.HealthRecord;
import com.backend.Nalam.AI.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HealthRecordRepository extends JpaRepository<HealthRecord, Long> {
    List<HealthRecord> findByPatient(User patient);
}
