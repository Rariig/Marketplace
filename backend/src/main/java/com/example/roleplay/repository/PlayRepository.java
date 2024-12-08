package com.example.roleplay.repository;

import com.example.roleplay.model.Play;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayRepository extends JpaRepository<Play, Long> {
    // Custom queries or methods can be added here
}
