package com.wongislandd.wordlink.resources

import com.wongislandd.wordlink.services.HintService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/hint")
class HintResource(private val hintService: HintService) {

    @GetMapping
    @CrossOrigin
    fun getGameDetails(@RequestParam gameId: Long): String {
        return hintService.getHint(gameId)
    }

}