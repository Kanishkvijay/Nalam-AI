package com.backend.Nalam.AI.controllers;

import com.backend.Nalam.AI.models.HealthRecord;
import com.backend.Nalam.AI.models.User;
import com.backend.Nalam.AI.repositories.HealthRecordRepository;
import com.backend.Nalam.AI.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/health-records")
public class HealthRecordController {
    @Autowired
    private HealthRecordRepository healthRecordRepository;

    @GetMapping
    public List<HealthRecord> getAllRecords() {
        return healthRecordRepository.findAll();
    }

    @PostMapping
    public HealthRecord createRecord(@RequestBody HealthRecord record) {
        return healthRecordRepository.save(record);
    }
}

