package com.backend.Nalam.AI.models;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "hospital_reports")
public class HospitalReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reportId;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private User patient;

    @ManyToOne
    @JoinColumn(name = "uploaded_by")
    private User uploadedBy;

    private String reportContent;
    private String analysis;
    private LocalDateTime createdAt;

    // Getters and Setters
}
