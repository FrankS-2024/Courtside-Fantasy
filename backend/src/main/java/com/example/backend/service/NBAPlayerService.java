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

        // Calculate means, standard deviations, and root-mean-square deviations
        double meanPoints = calculateMean(players.stream().mapToDouble(NBAPlayer::getPointsPerGame).toArray());
        double stdDevPoints = calculateStdDev(players.stream().mapToDouble(NBAPlayer::getPointsPerGame).toArray(), meanPoints);
        double rmsDevPoints = calculateRMSDev(players.stream().mapToDouble(NBAPlayer::getPointsPerGame).toArray());

        double meanRebounds = calculateMean(players.stream().mapToDouble(NBAPlayer::getRebounds).toArray());
        double stdDevRebounds = calculateStdDev(players.stream().mapToDouble(NBAPlayer::getRebounds).toArray(), meanRebounds);
        double rmsDevRebounds = calculateRMSDev(players.stream().mapToDouble(NBAPlayer::getRebounds).toArray());

        double meanAssists = calculateMean(players.stream().mapToDouble(NBAPlayer::getAssistsPerGame).toArray());
        double stdDevAssists = calculateStdDev(players.stream().mapToDouble(NBAPlayer::getAssistsPerGame).toArray(), meanAssists);
        double rmsDevAssists = calculateRMSDev(players.stream().mapToDouble(NBAPlayer::getAssistsPerGame).toArray());

        double meanThreePointsMade = calculateMean(players.stream().mapToDouble(NBAPlayer::getThreePointsMade).toArray());
        double stdDevThreePointsMade = calculateStdDev(players.stream().mapToDouble(NBAPlayer::getThreePointsMade).toArray(), meanThreePointsMade);
        double rmsDevThreePointsMade = calculateRMSDev(players.stream().mapToDouble(NBAPlayer::getThreePointsMade).toArray());

        double meanFieldGoalPercentage = calculateMean(players.stream().mapToDouble(NBAPlayer::getFieldGoalPercentage).toArray());
        double stdDevFieldGoalPercentage = calculateStdDev(players.stream().mapToDouble(NBAPlayer::getFieldGoalPercentage).toArray(), meanFieldGoalPercentage);
        double rmsDevFieldGoalPercentage = calculateRMSDev(players.stream().mapToDouble(NBAPlayer::getFieldGoalPercentage).toArray());

        double meanTurnovers = calculateMean(players.stream().mapToDouble(NBAPlayer::getTurnoversPerGame).toArray());
        double stdDevTurnovers = calculateStdDev(players.stream().mapToDouble(NBAPlayer::getTurnoversPerGame).toArray(), meanTurnovers);
        double rmsDevTurnovers = calculateRMSDev(players.stream().mapToDouble(NBAPlayer::getTurnoversPerGame).toArray());

        double meanFreeThrowPercentage = calculateMean(players.stream().mapToDouble(NBAPlayer::getFreeThrowPercentage).toArray());
        double stdDevFreeThrowPercentage = calculateStdDev(players.stream().mapToDouble(NBAPlayer::getFreeThrowPercentage).toArray(), meanFreeThrowPercentage);
        double rmsDevFreeThrowPercentage = calculateRMSDev(players.stream().mapToDouble(NBAPlayer::getFreeThrowPercentage).toArray());

        double meanSteals = calculateMean(players.stream().mapToDouble(NBAPlayer::getStealsPerGame).toArray());
        double stdDevSteals = calculateStdDev(players.stream().mapToDouble(NBAPlayer::getStealsPerGame).toArray(), meanSteals);
        double rmsDevSteals = calculateRMSDev(players.stream().mapToDouble(NBAPlayer::getStealsPerGame).toArray());

        double meanBlocks = calculateMean(players.stream().mapToDouble(NBAPlayer::getBlocksPerGame).toArray());
        double stdDevBlocks = calculateStdDev(players.stream().mapToDouble(NBAPlayer::getBlocksPerGame).toArray(), meanBlocks);
        double rmsDevBlocks = calculateRMSDev(players.stream().mapToDouble(NBAPlayer::getBlocksPerGame).toArray());

        // Calculate ranking scores for each player
        for (NBAPlayer player : players) {
            double gPoints = (player.getPointsPerGame() - meanPoints) / Math.sqrt(rmsDevPoints * rmsDevPoints + stdDevPoints * stdDevPoints);
            double gRebounds = (player.getRebounds() - meanRebounds) / Math.sqrt(rmsDevRebounds * rmsDevRebounds + stdDevRebounds * stdDevRebounds);
            double gAssists = (player.getAssistsPerGame() - meanAssists) / Math.sqrt(rmsDevAssists * rmsDevAssists + stdDevAssists * stdDevAssists);
            double gThreePointsMade = (player.getThreePointsMade() - meanThreePointsMade) / Math.sqrt(rmsDevThreePointsMade * rmsDevThreePointsMade + stdDevThreePointsMade * stdDevThreePointsMade);

            double gFieldGoalPercentage = (player.getFieldGoalPercentage() - meanFieldGoalPercentage) * player.getFieldGoalsAttempted() / meanFieldGoalAttempts(players) / Math.sqrt(rmsDevFieldGoalPercentage * rmsDevFieldGoalPercentage + stdDevFieldGoalPercentage * stdDevFieldGoalPercentage);
            double gTurnovers = (meanTurnovers - player.getTurnoversPerGame()) / Math.sqrt(rmsDevTurnovers * rmsDevTurnovers + stdDevTurnovers * stdDevTurnovers);
            double gFreeThrowPercentage = (player.getFreeThrowPercentage() - meanFreeThrowPercentage) * player.getFreeThrowsAttempted() / meanFreeThrowAttempts(players) / Math.sqrt(rmsDevFreeThrowPercentage * rmsDevFreeThrowPercentage + stdDevFreeThrowPercentage * stdDevFreeThrowPercentage);
            double gSteals = (player.getStealsPerGame() - meanSteals) / Math.sqrt(rmsDevSteals * rmsDevSteals + stdDevSteals * stdDevSteals);
            double gBlocks = (player.getBlocksPerGame() - meanBlocks) / Math.sqrt(rmsDevBlocks * rmsDevBlocks + stdDevBlocks * stdDevBlocks);

            // Combine scores into a final ranking score
            double rankingScore = gPoints + gRebounds + gAssists + gThreePointsMade + gFieldGoalPercentage + gTurnovers + gFreeThrowPercentage + gSteals + gBlocks;

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

    private double calculateRMSDev(double[] values) {
        return Math.sqrt(DoubleStream.of(values).map(v -> v * v).average().orElse(0.0));
    }

    private double meanFieldGoalAttempts(List<NBAPlayer> players) {
        return players.stream().mapToDouble(NBAPlayer::getFieldGoalsAttempted).average().orElse(0.0);
    }

    private double meanFreeThrowAttempts(List<NBAPlayer> players) {
        return players.stream().mapToDouble(NBAPlayer::getFreeThrowsAttempted).average().orElse(0.0);
    }
}

