package com.example.backend.controller;
import com.example.backend.model.NBAPlayer;
import com.example.backend.repository.NBAPlayerRepository;
import com.example.backend.service.NBAPlayerService;
import com.opencsv.exceptions.CsvException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

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

    @PostMapping("/analyze-trade")
    public ResponseEntity<Map<String, Double>> analyzeTrade(@RequestBody TradeRequest tradeRequest) {
        Map<String, Double> analysisResult = playerService.analyzeTrade(tradeRequest.getTradingAwayIds(), tradeRequest.getReceivingIds(), tradeRequest.getFilters());
        return ResponseEntity.ok(analysisResult);
    }

    // Add a TradeRequest class
    public static class TradeRequest {
        private List<Long> tradingAwayIds;
        private List<Long> receivingIds;
        private List<String> filters;

        public List<Long> getTradingAwayIds() {
            return tradingAwayIds;
        }

        public void setTradingAwayIds(List<Long> tradingAwayIds) {
            this.tradingAwayIds = tradingAwayIds;
        }

        public List<Long> getReceivingIds() {
            return receivingIds;
        }

        public void setReceivingIds(List<Long> receivingIds) {
            this.receivingIds = receivingIds;
        }

        public List<String> getFilters() {
            return filters;
        }

        public void setFilters(List<String> filters) {
            this.filters = filters;
        }
    }
}