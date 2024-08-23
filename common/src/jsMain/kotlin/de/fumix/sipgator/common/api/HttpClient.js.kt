package de.fumix.sipgator.common.api

import io.ktor.client.HttpClient
import io.ktor.client.engine.js.Js

actual fun httpClient(): HttpClient = HttpClient(Js) {
  httpClientConfiguration(this)
}
