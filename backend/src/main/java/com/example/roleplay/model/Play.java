package com.example.roleplay.model;

import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.*;

@Entity
@Table(name = "plays")
@Getter
@Setter
public class Play {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 1000)
    private String plot;

    private String genre;

    private Integer duration; // Duration in minutes, for example

    private Integer actorsCount; // Number of actors involved

    @Lob
    @Column(name = "script", columnDefinition = "TEXT") 
    private String script; // Script with embedded timing metadata and styling markers
}
