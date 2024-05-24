package com.example.backend.controller;
import com.example.backend.model.NBAPlayer;
import com.example.backend.repository.NBAPlayerRepository;
import com.example.backend.service.NBAPlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class NBAPlayerController {

    @Autowired
    private NBAPlayerService playerService;

    @GetMapping("/fetch-players")
    public ResponseEntity<String> fetchPlayers() {
        playerService.fetchAndStoreActivePlayers();
        return ResponseEntity.ok("Players fetched and stored successfully");
    }

    @GetMapping("/get-players")
    public ResponseEntity<List<NBAPlayer>> getPlayers() {
        List<NBAPlayer> players = playerService.getAllPlayers();
        return ResponseEntity.ok(players);
    }
}