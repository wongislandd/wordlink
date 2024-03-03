package com.wongislandd.wordlink.client

import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.wongislandd.wordlink.models.DictionaryEntry
import org.springframework.boot.web.client.RestTemplateBuilder
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate
import org.springframework.web.client.getForObject

@Service
class DictionaryClient {


    private val gson = Gson()

    fun checkDictionary(word: String): Boolean {
        val restTemplate = RestTemplateBuilder().errorHandler(
            DictionaryClientErrorHandler(word)
        ).build()
        val response: String = restTemplate.getForObject(
            buildDictionaryRequestUrl(word)
        )
        val listType = object : TypeToken<List<DictionaryEntry>>() {}.type
        val parsed: List<DictionaryEntry> = gson.fromJson(response, listType)
        val firstResult = parsed.firstOrNull()
        return firstResult?.meanings?.isNotEmpty() ?: false
    }

    private fun buildDictionaryRequestUrl(word: String): String {
        return DICTIONARY_URL + word
    }

    companion object {
        private const val DICTIONARY_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/"
    }
}