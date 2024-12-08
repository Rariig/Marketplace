package com.example.roleplay.Unit;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

import com.example.roleplay.model.Play;

public class PlayUnitTests {

    @Test
    void testGettersAndSetters() {
        Play play = new Play();

        play.setId(1L);
        play.setTitle("Hamlet");
        play.setGenre("Tragedy");
        play.setPlot("The story of Prince Hamlet seeking revenge.");
        play.setDuration(180);

        assertEquals(1L, play.getId());
        assertEquals("Hamlet", play.getTitle());
        assertEquals("Tragedy", play.getGenre());
        assertEquals("The story of Prince Hamlet seeking revenge.", play.getPlot());
        assertEquals(180, play.getDuration());
    }

    @Test
    void testDefaultValues() {
        Play play = new Play();

        assertNull(play.getId());
        assertNull(play.getTitle());
        assertNull(play.getGenre());
        assertNull(play.getPlot());
        assertNull(play.getDuration());
    }
}
