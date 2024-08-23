package de.fumix.sipgator.common.api.dto

import kotlin.js.JsExport
import kotlinx.serialization.Serializable

@JsExport
@Serializable
data class Device(
  val id: String,
  val alias: String,
  val activePhonelines: Array<IdAndAlias>,
  val activeGroups: Array<IdAndAlias>
)
