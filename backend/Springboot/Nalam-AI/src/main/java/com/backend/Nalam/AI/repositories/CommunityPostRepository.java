package com.backend.Nalam.AI.repositories;

import com.backend.Nalam.AI.models.CommunityPost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityPostRepository extends JpaRepository<CommunityPost, Long> {
}

