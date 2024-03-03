package com.wongislandd.wordlink.services

import org.springframework.stereotype.Service

@Service
class GuessValidationService {

    private fun isValidWord(word: String): Boolean {
        return true
    }

    fun consider(word: String): String? {
        return if (isValidWord(word)) word else null
    }
}