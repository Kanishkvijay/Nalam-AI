package com.backend.Nalam.AI.repositories;

import com.backend.Nalam.AI.models.WearableData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface WearableDataRepository extends JpaRepository<WearableData, Long> {
    List<WearableData> findByUserId(Long userId);
}
