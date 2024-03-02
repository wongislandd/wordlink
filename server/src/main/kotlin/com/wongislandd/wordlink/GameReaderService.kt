package com.wongislandd.wordlink

import org.springframework.stereotype.Service

/**
 * Takes in gameId -> gives results for the game.
 */
@Service
class GameReaderService(private val gameToFileService: GameToFileService): Logger() {

    // Slight caching optimization
    private val weirdCache: WeirdCache<Long, List<Entry>> = WeirdCache()

    fun getEntriesForGame(gameId: Long): List<Entry> {
        // Check if we have this in the cache
        val cachedResult = weirdCache.get(gameId)
        if (cachedResult != null) {
            return cachedResult
        }
        val associatedFile = gameToFileService.findFile(gameId)
        val results = FileUtils.parseFile(associatedFile)
        return results
    }
}