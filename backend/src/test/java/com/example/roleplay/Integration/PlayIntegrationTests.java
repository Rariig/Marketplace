package com.example.roleplay.Integration;

import com.example.roleplay.model.Play;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;
import com.example.roleplay.repository.PlayRepository;
@SpringBootTest
public class PlayIntegrationTests {

    @Autowired
    private PlayRepository playRepository;

    private Play testPlay;

    @BeforeEach
    public void setUp() {
        testPlay = new Play();
        testPlay.setTitle("Hamlet");
        testPlay.setPlot("The tragic story of Hamlet, Prince of Denmark.");
        testPlay.setGenre("Tragedy");
        testPlay.setDuration(120);
        testPlay.setActorsCount(5);
    }

    @Test
    public void testCreatePlay() {
        Play savedPlay = playRepository.save(testPlay);
        assertThat(savedPlay).isNotNull();
        assertThat(savedPlay.getId()).isNotNull();
    }

    @Test
    public void testFindById() {
        Play savedPlay = playRepository.save(testPlay);
        Long playId = savedPlay.getId();
        Play foundPlay = playRepository.findById(playId).orElse(null);
        assertThat(foundPlay).isNotNull();
        assertThat(foundPlay.getTitle()).isEqualTo(testPlay.getTitle());
    }

    @Test
    public void testDeletePlay() {
        Play savedPlay = playRepository.save(testPlay);
        playRepository.deleteById(savedPlay.getId());
        assertThat(playRepository.findById(savedPlay.getId())).isEmpty();
    }
}
