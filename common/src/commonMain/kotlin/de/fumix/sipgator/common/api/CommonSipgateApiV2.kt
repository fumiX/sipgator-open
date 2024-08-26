package de.fumix.sipgator.common.api

import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.plugins.resources.get
import io.ktor.client.request.accept
import io.ktor.client.request.basicAuth
import io.ktor.client.request.headers
import io.ktor.client.request.host
import io.ktor.http.ContentType
import io.ktor.http.URLProtocol
import io.ktor.http.isSuccess
import de.fumix.sipgator.common.api.dto.BasicList
import de.fumix.sipgator.common.api.dto.Contact
import de.fumix.sipgator.common.api.dto.Device
import de.fumix.sipgator.common.api.dto.HistoryEntry
import de.fumix.sipgator.common.api.dto.PagedList
import de.fumix.sipgator.common.api.dto.UserInfo
import de.fumix.sipgator.common.model.SipgateApiCredentials

data class CommonSipgateApiV2(private val credential: SipgateApiCredentials) {
  private val client: HttpClient = httpClient()

  val contacts = basicGet<SipgateApiV2.Contacts, PagedList<Contact>, Array<Contact>>(SipgateApiV2.Contacts()) { it.items.toTypedArray() }
  val history = basicGet<SipgateApiV2.History, PagedList<HistoryEntry>, Array<HistoryEntry>>(SipgateApiV2.History()) { it.items.toTypedArray() }
  fun userDevices(userId: String) = basicGet<SipgateApiV2.UserId.Devices, BasicList<Device>, Array<Device>>(SipgateApiV2.UserId.Devices(SipgateApiV2.UserId(userId = userId))) { it.items.toTypedArray() }
  val userInfo: suspend ((UserInfo) -> Unit, (Throwable) -> Unit) -> Unit = basicGet(SipgateApiV2.Authorization.UserInfo())

  private inline fun <reified R: Any, reified T: Any> basicGet(resource: R): suspend ((T) -> Unit, (Throwable) -> Unit) -> Unit = basicGet<R, T, T>(resource) { it }

  private inline fun <reified R: Any, reified S: Any, T: Any> basicGet(resource: R, crossinline f: (S) -> T): suspend ((T) -> Unit, (Throwable) -> Unit) -> Unit {
    return { resolve, reject ->
      val response = client.get(resource) {
        host = "api.sipgate.com"
        url {
          protocol = URLProtocol.HTTPS
        }
        headers {
          accept(ContentType.Application.Json)
          basicAuth(credential.tokenName, credential.token)
        }
      }

      if (response.status.isSuccess()) {
        try {
          resolve(f(response.body<S>()))
        } catch (e: Exception) {
          println("A")
          reject(SipgateApiException.Decode(response.status, "Failed to decode API response! ${e}"))
        }
      } else {
        println("B")
        reject(SipgateApiException.Http(response.status, "Request failed for resource ${resource::class.simpleName}!"))
      }
    }
  }
}
