package com.wongislandd.wordlink

import org.springframework.stereotype.Service
import org.springframework.util.ResourceUtils
import java.io.IOException

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

        val fileName = gameToFileService.getFileName(gameId) ?: return listOf()
        val results = openResults(fileName)
        return results
    }

    private fun openResults(path: String): List<Entry> {
        val location = "classpath:results/$path"
        try {
            val file = ResourceUtils.getFile(location)
            return FileUtils.parseFile(file)
        } catch (e: IOException) {
            LOGGER.error("Couldn't find path $location", e)
        }
        return listOf()
    }
}