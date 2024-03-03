package com.wongislandd.wordlink.services

import com.wongislandd.wordlink.utils.BaseLogger
import com.wongislandd.wordlink.models.Entry
import com.wongislandd.wordlink.utils.FileUtils
import com.wongislandd.wordlink.utils.WeirdCache
import org.springframework.core.io.ResourceLoader
import org.springframework.stereotype.Service
import java.io.File

/**
 * Takes in gameId -> gives results for the game.
 */
@Service
class GameService(private val resourceLoader: ResourceLoader): BaseLogger() {

    // Slight caching optimization
    private val weirdCache: WeirdCache<Long, List<Entry>> = WeirdCache()

    fun getEntriesForGame(gameId: Long): List<Entry> {
        // Check if we have this in the cache
        val cachedResult = weirdCache.get(gameId)
        if (cachedResult != null) {
            return cachedResult
        }
        val associatedFile = findFile(gameId)
        val results = FileUtils.parseFile(associatedFile)
        return results
    }

    private fun findFile(gameId: Long): File {
        val dir = resourceLoader.getResource(GAMES_RESOURCE_PATH).file

        // Check if the directory path exists and is indeed a directory
        if (!dir.exists() || !dir.isDirectory) {
            throw IllegalStateException("No games directory found.")
        }

        // Filter files in the directory that start with the specified number
        val matchingFiles = dir.listFiles { file ->
            file.isFile && file.name.startsWith(gameId.toString())
        }

        // Assuming you want to read the first matching file
        val fileToRead = matchingFiles?.firstOrNull()
        if (fileToRead != null) {
            return fileToRead
        } else {
            throw IllegalStateException("No file starting with $gameId found in the game directory.")
        }
    }

    fun countGames(): Int {
        val dir = resourceLoader.getResource(GAMES_RESOURCE_PATH).file

        // Check if the directory path exists and is indeed a directory
        if (!dir.exists() || !dir.isDirectory) {
            throw IllegalStateException("No games directory found.")
        }

        return dir.listFiles()?.size ?: 0

    }

    companion object {
        private const val GAMES_RESOURCE_PATH = "classpath:games"
    }
}