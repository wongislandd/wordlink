package com.wongislandd.wordlink.resources

import com.wongislandd.wordlink.services.ScoreService
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

/**
 * External facing resource which takes in a guess on a game and provides a score
 */
@RestController
@RequestMapping("/guess")
class GuessResource(val scoreService: ScoreService) {

    /**
     * Allows a user to guess a word on a game.
     */
    @PostMapping
    @CrossOrigin
    fun guess(word: String?, gameId: Long?): String? {
        return word?.let {
            return gameId?.let {
                return scoreService.identifyScore(word, gameId)
            }
        }
    }
}