package com.example.backend.repository;

import com.example.backend.model.NBAPlayer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NBAPlayerRepository extends JpaRepository <NBAPlayer, Long>{
}