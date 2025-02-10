package com.backend.Nalam.AI.repositories;


import com.backend.Nalam.AI.models.ERole;
import com.backend.Nalam.AI.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface RoleRepository  extends JpaRepository<Role,Long> {


    Optional<Role> findByName(ERole name);
}