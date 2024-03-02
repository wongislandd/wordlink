package com.wongislandd.wordlink

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.io.File
import java.io.IOException

/**
 * Custom parsing helper
 */
object FileUtils {

    private val LOGGER: Logger = LoggerFactory.getLogger(this::class.java.simpleName)

    fun parseFile(file: File): List<Entry> {
        val entries = mutableListOf<Entry>()

        try {
            file.forEachLine { line ->
                val data = line.split(",")
                if (data.size >= 2) {
                    val model = Entry(data[0], data[1].toLong())
                    entries.add(model)
                }
            }
        } catch (e: IOException) {
            file.path
            LOGGER.error("Unable to parse file at ${file.path}", e)
        }

        return entries
    }
}