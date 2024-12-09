package com.example.roleplay.controller;

import com.example.roleplay.model.Play;
import com.example.roleplay.service.PlayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/plays")
public class PlayController {

    @Autowired
    private PlayService playService;

    @PostMapping
    public Play createPlay(@RequestBody Play play) {
        return playService.savePlay(play);
    }

    @GetMapping
    public List<Play> getAllPlays() {
        return playService.findAllPlays();
    }

    @GetMapping("/{id}")
    public Optional<Play> getPlayById(@PathVariable Long id) {
        return playService.findPlayById(id);
    }

    @DeleteMapping("/{id}")
    public void deletePlay(@PathVariable Long id) {
        playService.deletePlay(id);
    }
}
