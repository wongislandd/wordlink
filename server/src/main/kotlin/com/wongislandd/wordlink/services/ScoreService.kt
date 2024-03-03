package com.wongislandd.wordlink.services

import com.wongislandd.wordlink.resources.Score
import com.wongislandd.wordlink.utils.BaseLogger
import com.wongislandd.wordlink.models.Entry
import org.springframework.stereotype.Service

/**
 * Scores a guess on a game
 */
@Service
class ScoreService(private val gameReaderService: GameReaderService) : BaseLogger() {

    fun identifyScore(word: String, gameId: Long): Score {
        val entriesForGame = gameReaderService.getEntriesForGame(gameId)
        val entryFound = binarySearch(entriesForGame, word)
        if (entryFound == null) {
            LOGGER.warn("Couldn't find an associated entry with the guess $word")
            return Score(
                    word = word,
                    score = entriesForGame.size.toLong(),
                    unrelated = true
            )
        }
        return Score(
                word = word,
                score = entryFound.score
        )
    }

    private fun binarySearch(entries: List<Entry>, target: String): Entry? {
        var left = 0
        var right = entries.size - 1

        while (left <= right) {
            val mid = left + (right - left) / 2
            val midVal = entries[mid]

            when {
                target < midVal.word -> right = mid - 1
                target > midVal.word -> left = mid + 1
                else -> return entries[mid] // target found
            }
        }

        return null
    }
}