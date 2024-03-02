package com.wongislandd.wordlink.utils

import org.slf4j.Logger
import org.slf4j.LoggerFactory

open class BaseLogger {

    val LOGGER: Logger = LoggerFactory.getLogger(this::class.java.simpleName)

}