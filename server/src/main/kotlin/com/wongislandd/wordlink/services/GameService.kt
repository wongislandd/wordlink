package com.wongislandd.wordlink.services

import com.wongislandd.wordlink.models.Association
import com.wongislandd.wordlink.utils.BaseLogger
import com.wongislandd.wordlink.models.GameFile
import com.wongislandd.wordlink.utils.FileUtils
import com.wongislandd.wordlink.utils.WeirdCache
import org.springframework.core.io.ResourceLoader
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import java.io.File

/**
 * Takes in gameId -> gives results for the game.
 */
@Service
class GameService(private val resourceLoader: ResourceLoader): BaseLogger() {

    // Slight caching optimization
    private val weirdCache: WeirdCache<Long, GameFile> = WeirdCache()

    fun getAssociationsForGame(gameId: Long): List<Association> {
        return getGameFile(gameId)?.associations ?: listOf()
    }

    fun getHintsForGame(gameId: Long): List<String> {
        return getGameFile(gameId)?.hints ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "No hints found for $gameId")
    }

    private fun getGameFile(gameId: Long): GameFile? {
        // Check if we have this in the cache
        val cachedResult = weirdCache.get(gameId)
        if (cachedResult != null) {
            return cachedResult
        }
        val associatedFile = findFile(gameId)
        return FileUtils.parseFile(associatedFile)?.also {
            weirdCache.put(gameId, it)
        }
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
        private const val GAMES_RESOURCE_PATH = "classpath*:games"
    }
}