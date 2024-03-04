package com.wongislandd.wordlink.resources

import com.wongislandd.wordlink.models.GameDetails
import com.wongislandd.wordlink.services.GameService
import com.wongislandd.wordlink.utils.BaseLogger
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/games")
class GamesResource(
    private val gameService: GameService,
) : BaseLogger() {

    @GetMapping
    @CrossOrigin
    fun getGameIds(): List<Int> {
        return (0 until gameService.countGames()).toList()
    }

    // setup details
    @GetMapping("/details")
    @CrossOrigin
    fun getGameDetails(@RequestParam gameId: Long): GameDetails {
        val totalAssociations = gameService.getAssociationsForGame(gameId).size
        return GameDetails(gameId, totalAssociations)
    }
}