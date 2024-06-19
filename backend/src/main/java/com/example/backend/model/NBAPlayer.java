package com.example.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class NBAPlayer {
    @Id
    private Long id;
    private String firstName;
    private String lastName;
    private String teamAbbreviation;
    private String position;
    private double pointsPerGame;
    private double threePointsMade;
    private double rebounds;
    private double assistsPerGame;
    private double stealsPerGame;
    private double blocksPerGame;
    private double fieldGoalPercentage;
    private double fieldGoalsMade;
    private double fieldGoalsAttempted;
    private double freeThrowPercentage;
    private double freeThrowsMade;
    private double freeThrowsAttempted;
    private double turnoversPerGame;
    private String minutesPerGame;
    private int gamesPlayed;
    private int season;
    private double threePointPercentage;
    private double threePointsAttempted;
    private String playerImg;
    private double rankingScore;
    private double pointV;
    private double reboundV;
    private double assistV;
    private double threepointsMadeV;
    private double stealV;
    private double blockV;
    private double fieldGoalV;
    private double freeThrowV;
    private double turnoverV;

    // Default constructor
    public NBAPlayer() {
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getTeamAbbreviation() {
        return teamAbbreviation;
    }

    public void setTeamAbbreviation(String teamAbbreviation) {
        this.teamAbbreviation = teamAbbreviation;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public double getPointsPerGame() {
        return pointsPerGame;
    }

    public void setPointsPerGame(double pointsPerGame) {
        this.pointsPerGame = pointsPerGame;
    }

    public double getAssistsPerGame() {
        return assistsPerGame;
    }

    public void setAssistsPerGame(double assistsPerGame) {
        this.assistsPerGame = assistsPerGame;
    }

    public double getTurnoversPerGame() {
        return turnoversPerGame;
    }

    public void setTurnoversPerGame(double turnoversPerGame) {
        this.turnoversPerGame = turnoversPerGame;
    }

    public double getFieldGoalsAttempted() {
        return fieldGoalsAttempted;
    }

    public void setFieldGoalsAttempted(double fieldGoalsAttempted) {
        this.fieldGoalsAttempted = fieldGoalsAttempted;
    }

    public double getFieldGoalsMade() {
        return fieldGoalsMade;
    }

    public void setFieldGoalsMade(double fieldGoalsMade) {
        this.fieldGoalsMade = fieldGoalsMade;
    }

    public double getFreeThrowsAttempted() {
        return freeThrowsAttempted;
    }

    public void setFreeThrowsAttempted(double freeThrowsAttempted) {
        this.freeThrowsAttempted = freeThrowsAttempted;
    }

    public double getFreeThrowsMade() {
        return freeThrowsMade;
    }

    public void setFreeThrowsMade(double freeThrowsMade) {
        this.freeThrowsMade = freeThrowsMade;
    }

    public double getThreePointsAttempted() {
        return threePointsAttempted;
    }

    public void setThreePointsAttempted(double threePointsAttempted) {
        this.threePointsAttempted = threePointsAttempted;
    }

    public double getThreePointsMade() {
        return threePointsMade;
    }

    public void setThreePointsMade(double threePointsMade) {
        this.threePointsMade = threePointsMade;
    }

    public double getRebounds() {
        return rebounds;
    }

    public void setRebounds(double rebounds) {
        this.rebounds = rebounds;
    }

    public double getStealsPerGame() {
        return stealsPerGame;
    }

    public void setStealsPerGame(double stealsPerGame) {
        this.stealsPerGame = stealsPerGame;
    }

    public double getBlocksPerGame() {
        return blocksPerGame;
    }

    public void setBlocksPerGame(double blocksPerGame) {
        this.blocksPerGame = blocksPerGame;
    }

    public double getFieldGoalPercentage() {
        return fieldGoalPercentage;
    }

    public void setFieldGoalPercentage(double fieldGoalPercentage) {
        this.fieldGoalPercentage = fieldGoalPercentage;
    }

    public double getThreePointPercentage() {
        return threePointPercentage;
    }

    public void setThreePointPercentage(double threePointPercentage) {
        this.threePointPercentage = threePointPercentage;
    }

    public double getFreeThrowPercentage() {
        return freeThrowPercentage;
    }

    public void setFreeThrowPercentage(double freeThrowPercentage) {
        this.freeThrowPercentage = freeThrowPercentage;
    }

    public String getMinutesPerGame() {
        return minutesPerGame;
    }

    public void setMinutesPerGame(String minutesPerGame) {
        this.minutesPerGame = minutesPerGame;
    }

    public int getGamesPlayed() {
        return gamesPlayed;
    }

    public void setGamesPlayed(int gamesPlayed) {
        this.gamesPlayed = gamesPlayed;
    }

    public int getSeason() {
        return season;
    }

    public void setSeason(int season) {
        this.season = season;
    }

    public String getPlayerImg() {
        return playerImg;
    }

    public void setPlayerImg(String playerImg) {
        this.playerImg = playerImg;
    }

    public double getRankingScore() {
        return rankingScore;
    }

    public void setRankingScore(double rankingScore) {
        this.rankingScore = rankingScore;
    }

    public double getPointV() {
        return pointV;
    }

    public void setPointV(double pointV) {
        this.pointV = pointV;
    }

    public double getReboundV() {
        return reboundV;
    }

    public void setReboundV(double reboundV) {
        this.reboundV = reboundV;
    }

    public double getAssistV() {
        return assistV;
    }

    public void setAssistV(double assistV) {
        this.assistV = assistV;
    }

    public double getThreepointsMadeV() {
        return threepointsMadeV;
    }

    public void setThreepointsMadeV(double threepointsMadeV) {
        this.threepointsMadeV = threepointsMadeV;
    }

    public double getStealV() {
        return stealV;
    }

    public void setStealV(double stealV) {
        this.stealV = stealV;
    }

    public double getBlockV() {
        return blockV;
    }

    public void setBlockV(double blockV) {
        this.blockV = blockV;
    }

    public double getFieldGoalV() {
        return fieldGoalV;
    }

    public void setFieldGoalV(double fieldGoalV) {
        this.fieldGoalV = fieldGoalV;
    }

    public double getFreeThrowV() {
        return freeThrowV;
    }

    public void setFreeThrowV(double freeThrowV) {
        this.freeThrowV = freeThrowV;
    }

    public double getTurnoverV() {
        return turnoverV;
    }

    public void setTurnoverV(double turnoverV) {
        this.turnoverV = turnoverV;
    }
}
