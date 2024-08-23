package de.fumix.sipgator.common.api.dto

import kotlin.js.JsExport
import kotlinx.serialization.Serializable

@JsExport
@Serializable
data class BasicList<T: Any>(override val items: List<T>): IList<T>
