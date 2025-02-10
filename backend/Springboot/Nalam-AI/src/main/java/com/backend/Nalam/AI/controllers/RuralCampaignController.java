package com.backend.Nalam.AI.controllers;

import com.backend.Nalam.AI.models.RuralCampaign;
import com.backend.Nalam.AI.repositories.RuralCampaignRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rural-campaigns")
public class RuralCampaignController {
    @Autowired
    private RuralCampaignRepository ruralCampaignRepository;

    @GetMapping
    public List<RuralCampaign> getAllCampaigns() {
        return ruralCampaignRepository.findAll();
    }

    @PostMapping
    public RuralCampaign createCampaign(@RequestBody RuralCampaign campaign) {
        return ruralCampaignRepository.save(campaign);
    }
}

