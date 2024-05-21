package com.example.backend.service;

import com.example.backend.model.NBAPlayer;
import com.example.backend.repository.NBAPlayerRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class NBAPlayerService {

    @Value("${api.balldontlie.api_key}")
    private String apiKey;

    @Autowired
    private NBAPlayerRepository playerRepository;

    private final RestTemplate restTemplate = new RestTemplate();

    public List<NBAPlayer> fetchAndStoreActivePlayers() {
        String url = "https://api.balldontlie.io/v1/players/active";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", apiKey);
        List<NBAPlayer> nbaPlayers = new ArrayList<>();
        ObjectMapper mapper = new ObjectMapper();
        try {
            String nextCursor = null;
            boolean moreResults = true;

            while (moreResults) {
                String paginatedUrl = url + "?per_page=100" + (nextCursor != null ? "&cursor=" + nextCursor : "");
                HttpEntity<String> entity = new HttpEntity<>(headers);
                ResponseEntity<String> response = restTemplate.exchange(paginatedUrl, HttpMethod.GET, entity, String.class);

                JsonNode root = mapper.readTree(response.getBody());
                JsonNode data = root.path("data");

                if (data.isArray() && data.size() > 0) {
                    for (JsonNode playerNode : data) {
                        NBAPlayer player = new NBAPlayer();
                        player.setId(playerNode.path("id").asLong());
                        player.setFirstName(playerNode.path("first_name").asText());
                        player.setLastName(playerNode.path("last_name").asText());
                        player.setPosition(playerNode.path("position").asText());
                        player.setTeamAbbreviation(playerNode.path("team").path("abbreviation").asText());

                        nbaPlayers.add(player);
                    }

                    JsonNode meta = root.path("meta");
                    nextCursor = meta.path("next_cursor").asText(null);  // Get the next cursor
                    if (nextCursor == null) {
                        moreResults = false;  // No more pages if next_cursor is null
                    }
                } else {
                    moreResults = false;  // No more data to fetch
                }
            }
            playerRepository.saveAll(nbaPlayers); // Save players to the repository
        } catch (Exception e) {
            e.printStackTrace();
        }

        return nbaPlayers;
    }

//    public void fetchAndStorePlayerAverages(Long playerId) {
//        String url = "https://api.balldontlie.io/v1/season_averages?season=2023&player_ids[]=" + playerId;
//        HttpHeaders headers = new HttpHeaders();
//        headers.set("Authorization", apiKey);
//        HttpEntity<String> entity = new HttpEntity<>(headers);
//
//        ResponseEntity<AveragesResponse> response = restTemplate.exchange(url, HttpMethod.GET, entity, AveragesResponse.class);
//        List<SeasonAverage> averages = response.getBody().getData();
//
//        if (!averages.isEmpty()) {
//            SeasonAverage avg = averages.get(0);
//            NBAPlayer player = playerRepository.findById(playerId).orElseThrow();
//            player.setPointsPerGame(avg.getPts());
//            player.setAssistsPerGame(avg.getAst());
//            player.setTurnoversPerGame(avg.getTurnover());
//            player.setFieldGoalsAttempted(avg.getFga());
//            player.setFieldGoalsMade(avg.getFgm());
//            player.setFreeThrowsAttempted(avg.getFta());
//            player.setFreeThrowsMade(avg.getFtm());
//            player.setThreePointsAttempted(avg.getFg3a());
//            player.setThreePointsMade(avg.getFg3m());
//            player.setRebounds(avg.getReb());
//            player.setStealsPerGame(avg.getStl());
//            player.setBlocksPerGame(avg.getBlk());
//            player.setFieldGoalPercentage(avg.getFgPct());
//            player.setThreePointPercentage(avg.getFg3Pct());
//            player.setFreeThrowPercentage(avg.getFtPct());
//            player.setMinutesPerGame(avg.getMin());
//            player.setGamesPlayed(avg.getGamesPlayed());
//            player.setSeason(avg.getSeason());
//
//            playerRepository.save(player);
//        }
//    }
}

//@Data
//class PlayersResponse {
//    private List<NBAPlayer> data;
//    private Meta meta;
//
//    @Data
//    public static class Meta {
//        private Integer nextCursor;
//        private Integer perPage;
//    }
//}

//@Data
//class AveragesResponse {
//    private List<SeasonAverage> data;
//}

//@Data
//class SeasonAverage {
//    private double pts;
//    private double ast;
//    private double turnover;
//    private double fga;
//    private double fgm;
//    private double fta;
//    private double ftm;
//    private double fg3a;
//    private double fg3m;
//    private double reb;
//    private double stl;
//    private double blk;
//    private double fgPct;
//    private double fg3Pct;
//    private double ftPct;
//    private String min;
//    private int gamesPlayed;
//    private int playerId;
//    private int season;
//}

