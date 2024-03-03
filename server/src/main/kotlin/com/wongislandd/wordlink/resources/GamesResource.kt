package com.wongislandd.wordlink.resources

import com.wongislandd.wordlink.services.GameToFileService
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/games")
class GamesResource(private val gameToFileService: GameToFileService) {

    @GetMapping
    @CrossOrigin
    fun getGameIds(): List<Int> {
        return (0 until gameToFileService.countGames()).toList()
    }
}