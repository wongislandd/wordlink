package com.wongislandd.wordlink.services

import com.wongislandd.wordlink.client.DictionaryClient
import org.springframework.stereotype.Service

@Service
class GuessValidationService(private val dictionaryClient: DictionaryClient) {

    private fun isValidWord(word: String): Boolean {
        return dictionaryClient.checkDictionary(word)
    }

    private fun format(word: String): String {
        return word.lowercase().replace(" ","");
    }

    fun consider(word: String): String? {
        return if (isValidWord(word)) format(word) else null
    }
}