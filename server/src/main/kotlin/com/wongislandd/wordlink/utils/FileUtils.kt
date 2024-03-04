package com.wongislandd.wordlink.utils

import com.google.gson.Gson
import com.wongislandd.wordlink.models.GameFile
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.io.File
import java.io.FileReader
import java.io.IOException

/**
 * Custom parsing helper
 */
object FileUtils {

    private val LOGGER: Logger = LoggerFactory.getLogger(this::class.java.simpleName)
    private val gson = Gson()

    fun parseFile(file: File): GameFile? {
        try {
            val reader = FileReader(file)
            val gameFile = gson.fromJson(reader, GameFile::class.java)
            return gameFile
        } catch (e: IOException) {
            file.path
            LOGGER.error("Unable to parse file at ${file.path}", e)
        }
        return null
    }
}