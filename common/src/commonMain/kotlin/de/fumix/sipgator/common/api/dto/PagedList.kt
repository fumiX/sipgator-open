package de.fumix.sipgator.common.api.dto

import kotlin.js.JsExport
import kotlinx.serialization.Serializable

@JsExport
@Serializable
data class PagedList<T>(override val items: List<T>, val totalCount: Int): IList<T>
