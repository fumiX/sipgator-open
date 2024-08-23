package de.fumix.sipgator.common.api.dto

import kotlin.js.JsExport
import kotlinx.serialization.Serializable

@JsExport
@Serializable
data class UserInfo(
  val userId: String,
  val sub: String,
  val domain: String,
  val masterSipId: String,
  val locale: String,
  val isTestAccount: Boolean,
  val isAdmin: Boolean
)
