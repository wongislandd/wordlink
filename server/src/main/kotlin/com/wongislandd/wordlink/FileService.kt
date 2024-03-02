package com.wongislandd.wordlink

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.KotlinModule
import com.fasterxml.jackson.module.kotlin.readValue
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import org.springframework.util.ResourceUtils
import java.io.IOException

@Service
class FileService {

    private val LOGGER: Logger = LoggerFactory.getLogger(FileService::class.java.simpleName)

    fun openResults(path: String): List<Entry> {
        val location = "classpath:results/$path"
        try {
            val file = ResourceUtils.getFile(location)
            return FileUtils.parseFile(file)
        } catch (e: IOException) {
            LOGGER.error("Couldn't find path $location", e)
        }
        return listOf()
    }
}