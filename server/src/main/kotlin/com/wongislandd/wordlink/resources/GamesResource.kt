package com.wongislandd.wordlink.resources

import com.wongislandd.wordlink.models.GameDetails
import com.wongislandd.wordlink.services.GameReaderService
import com.wongislandd.wordlink.services.GameToFileService
import com.wongislandd.wordlink.utils.BaseLogger
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/games")
class GamesResource(
    private val gameReaderService: GameReaderService,
    private val gameToFileService: GameToFileService
) : BaseLogger() {

    @GetMapping
    @CrossOrigin
    fun getGameIds(): List<Int> {
        return (0 until gameToFileService.countGames()).toList()
    }

    // setup details
    @GetMapping("/details")
    @CrossOrigin
    fun getGameDetails(@RequestParam gameId: Long): GameDetails {
        val totalAssociations = gameReaderService.getEntriesForGame(gameId).size
        return GameDetails(gameId, totalAssociations)
    }
}