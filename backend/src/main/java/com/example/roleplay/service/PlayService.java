package com.example.roleplay.service;

import com.example.roleplay.model.Play;
import com.example.roleplay.repository.PlayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlayService {

    @Autowired
    private PlayRepository playRepository;

    // Save a new play
    public Play savePlay(Play play) {
        return playRepository.save(play);
    }

    // Find all plays
    public List<Play> findAllPlays() {
        return playRepository.findAll();
    }

    // Find play by ID
    public Optional<Play> findPlayById(Long id) {
        return playRepository.findById(id);
    }

    // Delete play by ID
    public void deletePlay(Long id) {
        playRepository.deleteById(id);
    }
}
