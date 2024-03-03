package com.wongislandd.wordlink.models

data class Score(val word: String, val score: Long, val unrelated: Boolean = false)