package de.fumix.sipgator.common.api.dto

import kotlin.js.JsExport
import kotlinx.serialization.Serializable

@JsExport
@Serializable
data class HistoryEntry(
  val id: String,
  val source: String,
  val status: String,
  val target: String,
  val type: String,
  val incoming: Boolean,
  val created: String,
) {
  val localNumber: String = if (incoming) target else source
  val remoteNumber: String = if (incoming) source else target
}
