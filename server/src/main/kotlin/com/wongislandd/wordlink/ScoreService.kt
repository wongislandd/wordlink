package com.wongislandd.wordlink

import org.springframework.stereotype.Service


@Service
class ScoreService(private val fileService: FileService) {

    fun identifyScore(word: String, gameId: Long) {
        println(fileService.openResults(word))
    }
}