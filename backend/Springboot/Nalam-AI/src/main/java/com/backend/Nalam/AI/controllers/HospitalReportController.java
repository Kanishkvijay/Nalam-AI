package com.backend.Nalam.AI.controllers;

import com.backend.Nalam.AI.models.HospitalReport;
import com.backend.Nalam.AI.repositories.HospitalReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hospital-reports")
public class HospitalReportController {
    @Autowired
    private HospitalReportRepository hospitalReportRepository;

    @GetMapping
    public List<HospitalReport> getAllReports() {
        return hospitalReportRepository.findAll();
    }

    @PostMapping
    public HospitalReport createReport(@RequestBody HospitalReport report) {
        return hospitalReportRepository.save(report);
    }
}

