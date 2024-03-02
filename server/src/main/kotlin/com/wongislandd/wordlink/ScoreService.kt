package com.wongislandd.wordlink

import org.springframework.stereotype.Service

/**
 * Scores a guess on a game
 */
@Service
class ScoreService(private val gameReaderService: GameReaderService) : Logger() {

    fun identifyScore(word: String, gameId: Long): String {
        val entriesForGame = gameReaderService.getEntriesForGame(gameId)
        val entryFound = binarySearch(entriesForGame, word)
        if (entryFound == null) {
            LOGGER.warn("Couldn't find an associated entry with the guess $word")
            return  "${entriesForGame.size}+"
        }
        return entryFound.score.toString()
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