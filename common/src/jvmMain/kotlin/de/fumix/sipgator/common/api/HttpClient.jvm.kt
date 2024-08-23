package de.fumix.sipgator.common.api

import io.ktor.client.HttpClient
import io.ktor.client.engine.android.Android

actual fun httpClient(): HttpClient = HttpClient(Android) {
  httpClientConfiguration(this)
}
