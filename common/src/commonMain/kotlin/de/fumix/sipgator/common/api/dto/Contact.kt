package de.fumix.sipgator.common.api.dto

import kotlin.js.JsExport
import kotlinx.serialization.Serializable

@JsExport
@Serializable
data class Contact(
  val id: String,
  val name: String,
  val numbers: Array<Number>?,
  val scope: String?
) {

  @Serializable
  data class Number(val number: String, val type: Array<String>?)
}
