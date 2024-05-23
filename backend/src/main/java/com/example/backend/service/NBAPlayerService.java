package com.example.backend.service;

import com.example.backend.model.NBAPlayer;
import com.example.backend.repository.NBAPlayerRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

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
            fetchAndStoreSeasonAverages(nbaPlayers); //Gets the player averages for the newly updated list of ActiveNBAPlayers
        } catch (Exception e) {
            e.printStackTrace();
        }

        return nbaPlayers;
    }

    private void fetchAndStoreSeasonAverages(List<NBAPlayer> nbaPlayers) {
        String url = "https://api.balldontlie.io/v1/season_averages";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", apiKey);
        ObjectMapper mapper = new ObjectMapper();
        for (NBAPlayer player : nbaPlayers) {
            try {
                String playerIDUrl = String.format("%s?season=2023&player_ids[]=%d", url, player.getId());
                System.out.println("Request URL: " + playerIDUrl); // Print the request URL to debug
                HttpEntity<String> entity = new HttpEntity<>(headers);
                ResponseEntity<String> response = restTemplate.exchange(playerIDUrl, HttpMethod.GET, entity, String.class);
                JsonNode root = mapper.readTree(response.getBody());
                JsonNode data = root.path("data");

                // Print the raw response body
                String responseBody = response.getBody();
                System.out.println("Raw Response Body: " + responseBody);

                if(data.isArray()  && !data.isEmpty()){
                    for(JsonNode dataArray : data){
                        player.setPointsPerGame(dataArray.path("pts").asDouble());
                        player.setAssistsPerGame(dataArray.path("ast").asDouble());
                        player.setTurnoversPerGame(dataArray.path("turnover").asDouble());
                        player.setFieldGoalsAttempted(dataArray.path("fga").asDouble());
                        player.setFieldGoalsMade(dataArray.path("fgm").asDouble());
                        player.setFreeThrowsAttempted(dataArray.path("fta").asDouble());
                        player.setFreeThrowsMade(dataArray.path("ftm").asDouble());
                        player.setThreePointsAttempted(dataArray.path("fg3a").asDouble());
                        player.setThreePointsMade(dataArray.path("fg3m").asDouble());
                        player.setRebounds(dataArray.path("reb").asDouble());
                        player.setStealsPerGame(dataArray.path("stl").asDouble());
                        player.setBlocksPerGame(dataArray.path("blk").asDouble());
                        player.setFieldGoalPercentage(dataArray.path("fg_pct").asDouble());
                        player.setThreePointPercentage(dataArray.path("fg3_pct").asDouble());
                        player.setFreeThrowPercentage(dataArray.path("ft_pct").asDouble());
                        player.setMinutesPerGame(dataArray.path("min").asText());
                        player.setGamesPlayed(dataArray.path("games_played").asInt());
                        player.setSeason(dataArray.path("season").asInt());

                        playerRepository.save(player); // Save updated player to the repository
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}

