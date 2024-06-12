package com.example.backend.controller;
import com.example.backend.model.NBAPlayer;
import com.example.backend.repository.NBAPlayerRepository;
import com.example.backend.service.NBAPlayerService;
import com.opencsv.exceptions.CsvException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class NBAPlayerController {

    @Autowired
    private NBAPlayerService playerService;

    @GetMapping("/fetch-players")
    public ResponseEntity<String> fetchPlayers() throws IOException, CsvException {
        playerService.fetchAndStoreActivePlayers();
        return ResponseEntity.ok("Players fetched and stored successfully");
    }

    @GetMapping("/get-players")
    public ResponseEntity<List<NBAPlayer>> getPlayers() {
        List<NBAPlayer> players = playerService.getAllPlayers();
        return ResponseEntity.ok(players);
    }

    @GetMapping("/rank-players")
    public ResponseEntity<String> rankPlayers() {
        playerService.calculatePlayerRankings();
        return ResponseEntity.ok("Players ranked successfully");
    }
}