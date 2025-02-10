package com.backend.Nalam.AI.controllers;

import com.backend.Nalam.AI.models.BlockchainLog;
import com.backend.Nalam.AI.repositories.BlockchainLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/blockchain-logs")
public class BlockchainLogController {

    @Autowired
    private BlockchainLogRepository blockchainLogRepository;

    @GetMapping
    public List<BlockchainLog> getAllLogs() {
        return blockchainLogRepository.findAll();
    }


    @PostMapping
    public BlockchainLog createLog(@RequestBody BlockchainLog log) {
        return blockchainLogRepository.save(log);
    }

}

