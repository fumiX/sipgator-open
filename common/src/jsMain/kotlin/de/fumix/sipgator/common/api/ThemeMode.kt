package de.fumix.sipgator.common.api

@JsExport
enum class ThemeMode {
  LIGHT, DARK;

  val cssClass: String = name.lowercase()

  companion object {
    fun fromString(string: String?) = if ("light".equals(string, ignoreCase = true)) LIGHT else DARK
  }
}
