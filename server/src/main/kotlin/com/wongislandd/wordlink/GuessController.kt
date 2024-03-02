package com.wongislandd.wordlink

import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/guess")
class GuessController {

    @PostMapping("")
    fun test(word: String?, gameId: Int?): String {
        return "$word $gameId"
    }
}