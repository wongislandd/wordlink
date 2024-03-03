package com.wongislandd.wordlink.client

import org.springframework.http.HttpStatus
import org.springframework.http.client.ClientHttpResponse
import org.springframework.web.client.ResponseErrorHandler
import org.springframework.web.server.ResponseStatusException

class DictionaryClientErrorHandler(private val word: String): ResponseErrorHandler {
    override fun hasError(response: ClientHttpResponse): Boolean {
        return response.statusCode.is4xxClientError || response.statusCode.is5xxServerError
    }

    override fun handleError(response: ClientHttpResponse) {
        if (response.statusCode == HttpStatus.NOT_FOUND) {
            throw ResponseStatusException(
                HttpStatus.NOT_FOUND, "$word is not a valid word!"
            )
        } else {
            throw ResponseStatusException(
                HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong with the dictionary API!"
            )
        }

    }
}