package com.backend.Nalam.AI.controllers;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/community-forum")
public class CommunityForumController {

    private List<String> forumPosts = new ArrayList<>();

    @GetMapping
    public List<String> getAllPosts() {
        return forumPosts;
    }

    @PostMapping
    public String createPost(@RequestBody String post) {
        forumPosts.add(post);
        return "Post added successfully!";
    }
}
