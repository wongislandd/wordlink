package com.wongislandd.wordlink.services

import com.wongislandd.wordlink.models.Association
import com.wongislandd.wordlink.models.GameFile
import com.wongislandd.wordlink.utils.BaseLogger
import com.wongislandd.wordlink.utils.InputStreamUtils
import com.wongislandd.wordlink.utils.WeirdCache
import org.springframework.core.io.ResourceLoader
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import java.io.BufferedReader
import java.io.InputStream
import java.io.InputStreamReader


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
        val associatedStream = findInputStream(gameId)
        return InputStreamUtils.parseStream(associatedStream)?.also {
            weirdCache.put(gameId, it)
        }
    }

    private fun findInputStream(gameId: Long): InputStream {
        val dir = resourceLoader.getResource(GAMES_RESOURCE_PATH).inputStream
        val br = BufferedReader(InputStreamReader(dir))
        val matchedFileName = br.lines().toList().find { it.split("-").first() == gameId.toString() }
        br.close()
        if (matchedFileName == null) {
            throw IllegalStateException("No file starting with $gameId found in the game directory.")
        } else {
            return getInputStreamForFilePath("$GAMES_RESOURCE_PATH/$matchedFileName")
        }
    }

    fun countGames(): Int {
        val dir = resourceLoader.getResource(GAMES_RESOURCE_PATH).inputStream
        val br = BufferedReader(InputStreamReader(dir))
        return br.lines().toList().size
    }

    private fun getInputStreamForFilePath(path: String): InputStream {
        val stream = resourceLoader.getResource(path).inputStream
        return stream
    }

    companion object {
        private const val GAMES_RESOURCE_PATH = "classpath:games"
    }
}