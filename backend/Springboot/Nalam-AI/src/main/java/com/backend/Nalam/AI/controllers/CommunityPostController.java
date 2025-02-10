package com.backend.Nalam.AI.controllers;

import com.backend.Nalam.AI.models.CommunityPost;
import com.backend.Nalam.AI.repositories.CommunityPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/community-posts")
public class CommunityPostController {
    @Autowired
    private CommunityPostRepository communityPostRepository;

    @GetMapping
    public List<CommunityPost> getAllPosts() {
        return communityPostRepository.findAll();
    }

    @PostMapping
    public CommunityPost createPost(@RequestBody CommunityPost post) {
        return communityPostRepository.save(post);
    }
}

