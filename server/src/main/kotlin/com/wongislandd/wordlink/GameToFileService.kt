package com.wongislandd.wordlink

import org.springframework.stereotype.Service

/**
 * Responsible for knowing the mapping of gameId <-> file
 */
@Service
class GameToFileService: Logger() {

    private val gameToFileMap: Map<Long, String> = mapOf(
        1L to "entrance.txt"
    )

    fun getFileName(gameId: Long): String? {
        return gameToFileMap.get(gameId) ?: run {
            LOGGER.error("Found request for unmapped game file $gameId")
            return null
        }
    }
}