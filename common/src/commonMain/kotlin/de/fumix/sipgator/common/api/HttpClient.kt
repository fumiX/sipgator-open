package de.fumix.sipgator.common.api

import io.ktor.client.HttpClient
import io.ktor.client.HttpClientConfig
import io.ktor.client.engine.HttpClientEngineConfig
import io.ktor.client.plugins.HttpRequestRetry
import io.ktor.client.plugins.contentnegotiation.ContentNegotiation
import io.ktor.client.plugins.resources.Resources
import io.ktor.serialization.kotlinx.json.json
import kotlinx.serialization.json.Json

expect fun httpClient(): HttpClient

internal fun <T: HttpClientEngineConfig> httpClientConfiguration(config: HttpClientConfig<T>) {
  config.install(HttpRequestRetry) {
    retryOnServerErrors(maxRetries = 5)
    exponentialDelay()
  }
  config.install(ContentNegotiation) {
    json(Json {
      ignoreUnknownKeys = true
      prettyPrint = true
    })
  }
  config.install(Resources)
}
