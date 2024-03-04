package com.wongislandd.wordlink.services

import org.springframework.stereotype.Service

@Service
class HintService(private val gameService: GameService) {

    fun getHint(gameId: Long): String {
        return gameService.getHintsForGame(gameId).random()
    }
}