package com.wongislandd.wordlink

import org.apache.catalina.connector.Connector
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory
import org.springframework.boot.web.servlet.server.ServletWebServerFactory
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.env.Environment

@Configuration
class TomcatConfig {

    @Bean
    fun servletContainer(environment: Environment): ServletWebServerFactory {
        val tomcat = TomcatServletWebServerFactory()
        tomcat.addAdditionalTomcatConnectors(createStandardConnector(environment))
        return tomcat
    }

    private fun createStandardConnector(environment: Environment): Connector {
        val connector = Connector(TomcatServletWebServerFactory.DEFAULT_PROTOCOL)
        val httpPort = environment.getProperty("http.port", Int::class.java, 8080)
        connector.port = httpPort
        return connector
    }
}