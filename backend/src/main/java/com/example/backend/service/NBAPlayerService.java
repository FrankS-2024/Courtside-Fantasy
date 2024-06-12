package com.example.backend.service;

import com.example.backend.model.NBAPlayer;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import org.springframework.core.io.ClassPathResource;
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

import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.DoubleStream;

@Service
public class NBAPlayerService {

    @Value("${api.balldontlie.api_key}")
    private String apiKey;

    @Autowired
    private NBAPlayerRepository playerRepository;
    private static final String CSV_FILE_PATH = "NBA_Player_IDs.csv";
    private static final String IMAGE_URL_PREFIX = "https://cdn.nba.com/headshots/nba/latest/1040x760/";

    private final RestTemplate restTemplate = new RestTemplate();

    public List<NBAPlayer> getAllPlayers() {
        return playerRepository.findAll();
    }

    public List<NBAPlayer> fetchAndStoreActivePlayers() throws IOException, CsvException {
        String url = "https://api.balldontlie.io/v1/players/active";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", apiKey);
        List<NBAPlayer> nbaPlayers = new ArrayList<>();
        ObjectMapper mapper = new ObjectMapper();

        CSVReader csvReader = new CSVReader(new InputStreamReader(new ClassPathResource(CSV_FILE_PATH).getInputStream()));
        List<String[]> records = csvReader.readAll();
        Map<String, String> playerIds = new HashMap<>();

        for (String[] record : records) {
            String playerName = record[0];
            String playerId = record[1];
            playerIds.put(playerName, playerId);
        }

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

                        if(playerIds.containsKey(playerNode.path("first_name").asText() + " " + playerNode.path("last_name").asText())){
                            String playerId = playerIds.get(playerNode.path("first_name").asText() + " " + playerNode.path("last_name").asText());
                            if(playerId.startsWith("http")){
                                player.setPlayerImg(playerId);
                            }else{
                                String playerImg = IMAGE_URL_PREFIX + playerId + ".png";
                                player.setPlayerImg(playerImg);
                            }
                        }
                        else{
                            player.setPlayerImg("N/A");
                        }
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

    private void fetchAndStoreSeasonAverages(List<NBAPlayer> nbaPlayers) throws IOException, CsvException {
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

    public void calculatePlayerRankings() {
        List<NBAPlayer> players = playerRepository.findAll();

        if (players.isEmpty()) {
            System.out.println("No players found.");
            return;
        }

        // Calculate means and standard deviations
        double meanPoints = calculateMean(players.stream().mapToDouble(NBAPlayer::getPointsPerGame).toArray());
        double stdDevPoints = calculateStdDev(players.stream().mapToDouble(NBAPlayer::getPointsPerGame).toArray(), meanPoints);

        double meanRebounds = calculateMean(players.stream().mapToDouble(NBAPlayer::getRebounds).toArray());
        double stdDevRebounds = calculateStdDev(players.stream().mapToDouble(NBAPlayer::getRebounds).toArray(), meanRebounds);

        double meanAssists = calculateMean(players.stream().mapToDouble(NBAPlayer::getAssistsPerGame).toArray());
        double stdDevAssists = calculateStdDev(players.stream().mapToDouble(NBAPlayer::getAssistsPerGame).toArray(), meanAssists);

        double meanThreePointsMade = calculateMean(players.stream().mapToDouble(NBAPlayer::getThreePointsMade).toArray());
        double stdDevThreePointsMade = calculateStdDev(players.stream().mapToDouble(NBAPlayer::getThreePointsMade).toArray(), meanThreePointsMade);

        double meanFieldGoalPercentage = calculateMean(players.stream().mapToDouble(NBAPlayer::getFieldGoalPercentage).toArray());
        double stdDevFieldGoalPercentage = calculateStdDev(players.stream().mapToDouble(NBAPlayer::getFieldGoalPercentage).toArray(), meanFieldGoalPercentage);

        double meanTurnovers = calculateMean(players.stream().mapToDouble(NBAPlayer::getTurnoversPerGame).toArray());
        double stdDevTurnovers = calculateStdDev(players.stream().mapToDouble(NBAPlayer::getTurnoversPerGame).toArray(), meanTurnovers);

        double meanFreeThrowPercentage = calculateMean(players.stream().mapToDouble(NBAPlayer::getFreeThrowPercentage).toArray());
        double stdDevFreeThrowPercentage = calculateStdDev(players.stream().mapToDouble(NBAPlayer::getFreeThrowPercentage).toArray(), meanFreeThrowPercentage);

        double meanSteals = calculateMean(players.stream().mapToDouble(NBAPlayer::getStealsPerGame).toArray());
        double stdDevSteals = calculateStdDev(players.stream().mapToDouble(NBAPlayer::getStealsPerGame).toArray(), meanSteals);

        double meanBlocks = calculateMean(players.stream().mapToDouble(NBAPlayer::getBlocksPerGame).toArray());
        double stdDevBlocks = calculateStdDev(players.stream().mapToDouble(NBAPlayer::getBlocksPerGame).toArray(), meanBlocks);

        // Debugging: Print out mean and standard deviation for each stat
        System.out.println("Mean and StdDev for each stat:");
        System.out.println("Points: Mean=" + meanPoints + ", StdDev=" + stdDevPoints);
        System.out.println("Rebounds: Mean=" + meanRebounds + ", StdDev=" + stdDevRebounds);
        System.out.println("Assists: Mean=" + meanAssists + ", StdDev=" + stdDevAssists);
        System.out.println("ThreePointsMade: Mean=" + meanThreePointsMade + ", StdDev=" + stdDevThreePointsMade);
        System.out.println("FieldGoalPercentage: Mean=" + meanFieldGoalPercentage + ", StdDev=" + stdDevFieldGoalPercentage);
        System.out.println("Turnovers: Mean=" + meanTurnovers + ", StdDev=" + stdDevTurnovers);
        System.out.println("FreeThrowPercentage: Mean=" + meanFreeThrowPercentage + ", StdDev=" + stdDevFreeThrowPercentage);
        System.out.println("Steals: Mean=" + meanSteals + ", StdDev=" + stdDevSteals);
        System.out.println("Blocks: Mean=" + meanBlocks + ", StdDev=" + stdDevBlocks);

        // Calculate ranking scores for each player
        for (NBAPlayer player : players) {
            double rankingScore = calculateRankingScore(player, meanPoints, stdDevPoints, meanRebounds, stdDevRebounds,
                    meanAssists, stdDevAssists, meanThreePointsMade, stdDevThreePointsMade, meanFieldGoalPercentage,
                    stdDevFieldGoalPercentage, meanTurnovers, stdDevTurnovers, meanFreeThrowPercentage, stdDevFreeThrowPercentage,
                    meanSteals, stdDevSteals, meanBlocks, stdDevBlocks);
            player.setRankingScore(rankingScore);
            playerRepository.save(player);
            // Debugging: Print out each player's ranking score
            System.out.println(player.getFirstName() + " " + player.getLastName() + ": RankingScore=" + rankingScore);
        }
    }

    private double calculateMean(double[] values) {
        return DoubleStream.of(values).average().orElse(0.0);
    }

    private double calculateStdDev(double[] values, double mean) {
        return Math.sqrt(DoubleStream.of(values).map(v -> Math.pow(v - mean, 2)).average().orElse(0.0));
    }

    private double calculateRankingScore(NBAPlayer player, double meanPoints, double stdDevPoints,
                                         double meanRebounds, double stdDevRebounds, double meanAssists, double stdDevAssists,
                                         double meanThreePointsMade, double stdDevThreePointsMade, double meanFieldGoalPercentage,
                                         double stdDevFieldGoalPercentage, double meanTurnovers, double stdDevTurnovers,
                                         double meanFreeThrowPercentage, double stdDevFreeThrowPercentage, double meanSteals,
                                         double stdDevSteals, double meanBlocks, double stdDevBlocks) {

        double gPoints = (player.getPointsPerGame() - meanPoints) / stdDevPoints;
        double gRebounds = (player.getRebounds() - meanRebounds) / stdDevRebounds;
        double gAssists = (player.getAssistsPerGame() - meanAssists) / stdDevAssists;
        double gThreePointsMade = (player.getThreePointsMade() - meanThreePointsMade) / stdDevThreePointsMade;

        double zFieldGoalPercentage = (player.getFieldGoalPercentage() - meanFieldGoalPercentage) / stdDevFieldGoalPercentage;
        double zTurnovers = (player.getTurnoversPerGame() - meanTurnovers) / stdDevTurnovers;
        double zFreeThrowPercentage = (player.getFreeThrowPercentage() - meanFreeThrowPercentage) / stdDevFreeThrowPercentage;
        double zSteals = (player.getStealsPerGame() - meanSteals) / stdDevSteals;
        double zBlocks = (player.getBlocksPerGame() - meanBlocks) / stdDevBlocks;

        // Adjust field goal and free throw percentages by the number of attempts
        zFieldGoalPercentage *= player.getFieldGoalsAttempted();
        zFreeThrowPercentage *= player.getFreeThrowsAttempted();

        // Combine scores into a final ranking score
        return gPoints * 0.2 + gRebounds * 0.2 + gAssists * 0.2 + gThreePointsMade * 0.1 +
                zFieldGoalPercentage * 0.1 + zTurnovers * 0.1 + zFreeThrowPercentage * 0.05 +
                zSteals * 0.025 + zBlocks * 0.025;
    }
}

