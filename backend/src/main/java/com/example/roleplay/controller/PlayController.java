package com.example.roleplay.controller;

import com.example.roleplay.model.Play;
import com.example.roleplay.service.PlayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    // New PUT endpoint for updating a play
    @PutMapping("/{id}")
    public ResponseEntity<Play> updatePlay(@PathVariable Long id, @RequestBody Play updatedPlay) {
        Optional<Play> existingPlayOpt = playService.findPlayById(id);

        if (existingPlayOpt.isPresent()) {
            Play existingPlay = existingPlayOpt.get();
            existingPlay.setTitle(updatedPlay.getTitle());
            existingPlay.setPlot(updatedPlay.getPlot());
            existingPlay.setGenre(updatedPlay.getGenre());
            existingPlay.setDuration(updatedPlay.getDuration());
            existingPlay.setActorsCount(updatedPlay.getActorsCount());
            existingPlay.setScript(updatedPlay.getScript());

            Play savedPlay = playService.savePlay(existingPlay);
            return ResponseEntity.ok(savedPlay); // Return the updated play with 200 OK
        } else {
            return ResponseEntity.notFound().build(); // Return 404 if the play does not exist
        }
    }
}
