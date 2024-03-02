package com.wongislandd.wordlink

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/guess")
class GuessResource(val scoreService: ScoreService) {

    @PostMapping("")
    fun test(word: String?, gameId: Long?): String? {
        return word?.let {
            return gameId?.let {
                scoreService.identifyScore(word, gameId)
                return "$word $gameId"
            }
        }
    }
}