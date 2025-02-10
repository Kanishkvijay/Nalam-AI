package com.backend.Nalam.AI.repositories;

import com.backend.Nalam.AI.models.BlockchainLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlockchainLogRepository extends JpaRepository<BlockchainLog, Long> {
}

