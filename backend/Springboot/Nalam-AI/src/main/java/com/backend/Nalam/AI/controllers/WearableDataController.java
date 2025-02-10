package com.backend.Nalam.AI.controllers;

import com.backend.Nalam.AI.models.WearableData;
import com.backend.Nalam.AI.models.User;
import com.backend.Nalam.AI.repositories.WearableDataRepository;
import com.backend.Nalam.AI.repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/wearable-data")
public class WearableDataController {

    private final WearableDataRepository wearableDataRepository;
    private final UserRepository userRepository;

    public WearableDataController(WearableDataRepository wearableDataRepository, UserRepository userRepository) {
        this.wearableDataRepository = wearableDataRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<WearableData> getAllWearableData() {
        return wearableDataRepository.findAll();
    }

    @PostMapping("/{userId}")
    public WearableData addWearableData(@PathVariable Long userId, @RequestBody WearableData wearableData) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            wearableData.setUser(user);
            return wearableDataRepository.save(wearableData);
        }
        return null;
    }
}
