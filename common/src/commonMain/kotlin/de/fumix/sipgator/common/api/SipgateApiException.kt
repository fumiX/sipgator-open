package de.fumix.sipgator.common.api

import io.ktor.http.HttpStatusCode
import kotlin.js.JsExport

@JsExport
sealed class SipgateApiException: Throwable() {
  abstract override val message: String
  data class Decode(val status: HttpStatusCode, override val message: String): SipgateApiException()
  data class Http(val status: HttpStatusCode, override val message: String) : SipgateApiException()
  data class Other(override val message: String): SipgateApiException()
}
