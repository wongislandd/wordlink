package com.wongislandd.wordlink.services

import com.wongislandd.wordlink.utils.BaseLogger
import org.springframework.core.io.ResourceLoader
import org.springframework.stereotype.Service
import java.io.File

/**
 * Responsible for knowing the mapping of gameId <-> file
 */
@Service
class GameToFileService(private val resourceLoader: ResourceLoader) : BaseLogger() {

    fun findFile(gameId: Long): File {
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