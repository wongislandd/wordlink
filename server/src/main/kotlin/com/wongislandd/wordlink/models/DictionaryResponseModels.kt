package com.wongislandd.wordlink.models

data class DictionaryEntry(
    val word: String,
    val phonetic: String?,
    val phonetics: List<Phonetic>,
    val meanings: List<Meaning>,
    val license: License?,
    val sourceUrls: List<String>?
)

data class Phonetic(
    val text: String?,
    val audio: String?,
    val sourceUrl: String?,
    val license: License?
)

data class Meaning(
    val partOfSpeech: String?,
    val definitions: List<Definition>,
    val synonyms: List<String>?,
    val antonyms: List<String>?
)

data class Definition(
    val definition: String?,
    val example: String?,
    val synonyms: List<String>?,
    val antonyms: List<String>?
)

data class License(
    val name: String?,
    val url: String?
)