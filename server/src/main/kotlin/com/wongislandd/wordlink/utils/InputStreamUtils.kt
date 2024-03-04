package com.wongislandd.wordlink.utils

import com.google.gson.Gson
import com.wongislandd.wordlink.models.GameFile
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.io.IOException
import java.io.InputStream
import java.io.InputStreamReader

/**
 * Custom parsing helper
 */
object InputStreamUtils {

    private val LOGGER: Logger = LoggerFactory.getLogger(this::class.java.simpleName)
    private val gson = Gson()

    fun     parseStream(inputStream: InputStream): GameFile? {
        try {
            val reader = InputStreamReader(inputStream)
            val gameFile = gson.fromJson(reader, GameFile::class.java)
            return gameFile
        } catch (e: IOException) {
            LOGGER.error("Unable to parse file!", e)
        } finally {
            inputStream.close()
        }
        return null
    }
}