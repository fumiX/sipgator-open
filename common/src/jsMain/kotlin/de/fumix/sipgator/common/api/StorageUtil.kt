package de.fumix.sipgator.common.api

import kotlinx.browser.window
import kotlinx.serialization.SerializationException
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import de.fumix.sipgator.common.model.SipgateApiCredentials

@JsExport
object StorageUtil {
  private val json = Json { ignoreUnknownKeys = true }

  private const val STORAGE_KEY_SAVED_CREDENTIALS = "SAVED_CREDENTIALS"
  private const val STORAGE_KEY_CURRENT_CREDENTIAL = "CURRENT_CREDENTIAL"

  var allCredentials: Array<SipgateApiCredentials>
    get() = window.localStorage.getItem(STORAGE_KEY_SAVED_CREDENTIALS)
      ?.let {
        try {
          json.decodeFromString<List<SipgateApiCredentials>>(it)
        } catch (e: SerializationException) {
          console.error("Could not read saved credentials, failed to decode!")
          null
        } catch (e: IllegalArgumentException) {
          console.error("Could not read saved credentials, unknown format!")
          null
        }
      }
      ?.distinct()
      ?.sortedBy { it.tokenName }
      ?.toTypedArray()
      ?: arrayOf()
    set(value) {
      try {
        window.localStorage.setItem(STORAGE_KEY_SAVED_CREDENTIALS, json.encodeToString(value.distinct().sortedBy { it.tokenName }))
      } catch (e: SerializationException) {
        console.error("Could not save credentials, failed to encode!")
      } catch (e: IllegalArgumentException) {
        console.error("Could not save credentials, invalid format!")
      }
    }

  fun addCredential(credential: SipgateApiCredentials) {
    val currentCredentials = allCredentials
    if (currentCredentials.none { it == credential }) {
      allCredentials = currentCredentials + credential
    }
  }

  fun removeCredential(credential: SipgateApiCredentials) {
    allCredentials = allCredentials.filter { it != credential }.toTypedArray()
  }

  var currentCredential: SipgateApiCredentials?
    get() = window.localStorage.getItem(STORAGE_KEY_CURRENT_CREDENTIAL)?.let { json.decodeFromString(it) }
    set(value) {
      if (value != null) {
        addCredential(value)
        window.localStorage.setItem(STORAGE_KEY_CURRENT_CREDENTIAL, json.encodeToString(value))
      } else {
        window.localStorage.removeItem(STORAGE_KEY_CURRENT_CREDENTIAL)
      }
    }

  var themeMode: ThemeMode
    get() {
      return window.localStorage.getItem("themeMode")?.let {
        ThemeMode.fromString(it)
      } ?: (if (
        js("typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined'") as Boolean &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) ThemeMode.DARK else ThemeMode.LIGHT).also {
        window.localStorage.setItem("themeMode", it.name)
      }
    }
    set(value) {
      window.localStorage.setItem("themeMode", value.name)
    }
}
