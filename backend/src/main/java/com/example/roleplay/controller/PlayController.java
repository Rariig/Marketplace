package com.example.roleplay.controller;

import com.example.roleplay.model.Play;
import com.example.roleplay.service.PlayService;
import com.example.roleplay.service.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/plays")
public class PlayController {

    @Autowired
    private PlayService playService;

    @Autowired
    private S3Service s3Service; // Autowire the S3Service to handle file uploads

    // Create Play
    @PostMapping
    public Play createPlay(@RequestBody Play play) {
        return playService.savePlay(play);
    }

    // Get All Plays
    @GetMapping
    public List<Play> getAllPlays() {
        return playService.findAllPlays();
    }

    // Get Play by ID
    @GetMapping("/{id}")
    public Optional<Play> getPlayById(@PathVariable Long id) {
        return playService.findPlayById(id);
    }

    // Delete Play by ID
    @DeleteMapping("/{id}")
    public void deletePlay(@PathVariable Long id) {
        playService.deletePlay(id);
    }

    // Update Play
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

    // Upload Play Background Image to S3
    @PostMapping("/upload-image")
    public String uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        // Convert the MultipartFile to a File
        File imageFile = new File(file.getOriginalFilename());
        file.transferTo(imageFile);

        // Upload the file to S3 and return the file URL
        return s3Service.uploadFile(imageFile);
    }
}
