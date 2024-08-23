package de.fumix.sipgator.common.api

import io.ktor.client.call.body
import io.ktor.client.plugins.resources.get
import io.ktor.client.request.accept
import io.ktor.client.request.basicAuth
import io.ktor.client.request.host
import io.ktor.client.statement.bodyAsText
import io.ktor.http.ContentType
import io.ktor.http.URLProtocol
import io.ktor.http.headers
import io.ktor.http.isSuccess
import kotlin.js.ExperimentalJsExport
import kotlin.js.JsExport
import kotlin.js.Promise
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import de.fumix.sipgator.common.api.dto.BasicList
import de.fumix.sipgator.common.api.dto.Contact
import de.fumix.sipgator.common.api.dto.Device
import de.fumix.sipgator.common.api.dto.HistoryEntry
import de.fumix.sipgator.common.api.dto.PagedList
import de.fumix.sipgator.common.api.dto.UserInfo
import de.fumix.sipgator.common.model.SipgateApiCredentials

@OptIn(ExperimentalJsExport::class)
@JsExport
object JsSipgateApiV2 {
  private val client = httpClient()

  fun userInfo(
    credentials: SipgateApiCredentials
  ): Promise<UserInfo> = normalGetPromise(
    credentials,
    SipgateApiV2.Authorization.UserInfo()
  )

  fun contacts(
    credentials: SipgateApiCredentials
  ): Promise<Array<Contact>> = normalGetPromise<SipgateApiV2.Contacts, PagedList<Contact>, Array<Contact>>(
    credentials,
    SipgateApiV2.Contacts()
  ) { it.items.toTypedArray() }

  fun history(
    credentials: SipgateApiCredentials
  ): Promise<Array<HistoryEntry>> = normalGetPromise<SipgateApiV2.History, PagedList<HistoryEntry>, Array<HistoryEntry>>(
    credentials,
    SipgateApiV2.History(limit = 50)
  ) { it.items.toTypedArray() }

  fun userDevices(
    credentials: SipgateApiCredentials,
    userId: String
  ): Promise<Array<Device>> = normalGetPromise<SipgateApiV2.UserId.Devices, BasicList<Device>, Array<Device>>(
    credentials,
    SipgateApiV2.UserId.Devices(SipgateApiV2.UserId(userId = userId))
  ) { it.items.toTypedArray() }

  private inline fun <reified R: Any, reified T: Any> normalGetPromise(credential: SipgateApiCredentials, resource: R): Promise<T> = normalGetPromise<R, T, T>(credential, resource) { it }

  private inline fun <reified R: Any, reified S: Any, reified T: Any> normalGetPromise(credential: SipgateApiCredentials, resource: R, crossinline f: (S) -> T): Promise<T> = Promise { resolve, reject ->
    GlobalScope.launch(Dispatchers.Default) {
      val response = client.get(resource) {
        host = "api.sipgate.com"
        url { protocol = URLProtocol.HTTPS }
        headers {
          accept(ContentType.Application.Json)
          basicAuth(credential.tokenName, credential.token)
        }
      }
      if (response.status.isSuccess()) {
        try {
          resolve(f(response.body<S>()))
        } catch (e: Exception) {
          reject(SipgateApiException.Decode(response.status, "Failed to decode API response! " + e.message))
        }
      } else {
        reject(SipgateApiException.Http(response.status, "Request failed for resource ${resource::class.simpleName}!"))
      }
    }
  }
}
