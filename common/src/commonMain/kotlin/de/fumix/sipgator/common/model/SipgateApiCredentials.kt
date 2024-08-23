package de.fumix.sipgator.common.model

import kotlin.js.JsExport
import kotlinx.serialization.Serializable

@JsExport
@Serializable
data class SipgateApiCredentials(
  val tokenName: String,
  val token: String
)
