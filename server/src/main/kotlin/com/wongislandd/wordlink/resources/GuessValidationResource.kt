package com.wongislandd.wordlink.resources

import com.wongislandd.wordlink.models.Score
import com.wongislandd.wordlink.services.GuessValidationService
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.server.ResponseStatusException

/**
 * Check if a word is valid
 */
@RestController
@RequestMapping("/validate")
class GuessValidationResource(private val guessValidationService: GuessValidationService) {

    @PostMapping
    @CrossOrigin
    fun guess(word: String): Boolean {
        return guessValidationService.isValidWord(word)
    }
}