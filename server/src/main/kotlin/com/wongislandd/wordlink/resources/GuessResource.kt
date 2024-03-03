package com.wongislandd.wordlink.resources

import com.wongislandd.wordlink.models.Score
import com.wongislandd.wordlink.services.GuessValidationService
import com.wongislandd.wordlink.services.ScoreService
import com.wongislandd.wordlink.utils.BaseLogger
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.server.ResponseStatusException

/**
 * External facing resource which takes in a guess on a game and provides a score
 */
@RestController
@RequestMapping("/guess")
class GuessResource(private val scoreService: ScoreService, private val guessValidationService: GuessValidationService): BaseLogger() {

    /**
     * Allows a user to guess a word on a game.
     */
    @PostMapping
    @CrossOrigin
    fun guess(word: String?, gameId: Long?): Score {
        if (word != null && gameId != null) {
            val validWord = guessValidationService.consider(word)
            validWord?.let {
                return scoreService.identifyScore(it, gameId)
            } ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid word!")
        } else {
            LOGGER.error("Found request with invalid input! Word: $word, GameId: $gameId")
            throw ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Word: $word, GameId: $gameId"
            )
        }
    }
}