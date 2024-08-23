package de.fumix.sipgator.common.api

import kotlin.math.roundToInt

@JsExport
fun generateCssGradient(bytes: ByteArray): String = (
  bytes.toList().chunked(3).mapNotNull {
    if (it.size == 3) {
      "hsl(${it[0].toRange(0..360)}, ${it[1].toRange(0..100)}%, ${it[2].toRange(25..75)}%)"
    } else null
  }.takeIf { it.isNotEmpty() } ?: listOf("#ff9c00")
)
  .take(3)
  .joinToString(", ", prefix = "linear-gradient(to bottom right, ", postfix = ")")

fun Byte.toRange(range: IntRange) = ((toUByte().toDouble() / UByte.MAX_VALUE.toDouble()) * (range.last - range.first) + range.first).roundToInt().coerceIn(range)
