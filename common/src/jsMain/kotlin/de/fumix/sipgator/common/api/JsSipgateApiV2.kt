package de.fumix.sipgator.common.api

import kotlin.js.Promise
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import de.fumix.sipgator.common.api.dto.Contact
import de.fumix.sipgator.common.api.dto.Device
import de.fumix.sipgator.common.api.dto.HistoryEntry
import de.fumix.sipgator.common.api.dto.UserInfo
import de.fumix.sipgator.common.model.SipgateApiCredentials

@JsExport
class JsSipgateApiV2(credentials: SipgateApiCredentials) {
  private val api = CommonSipgateApiV2(credentials)

  fun contacts(): Promise<Array<Contact>> = asPromise(api.contacts)
  fun history(): Promise<Array<HistoryEntry>> = asPromise(api.history)
  fun userDevices(userId: String): Promise<Array<Device>> = asPromise(api.userDevices(userId))
  fun userInfo(): Promise<UserInfo> = asPromise(api.userInfo)

  private fun <T: Any> asPromise(
    f: suspend ((T) -> Unit, (Throwable) -> Unit) -> Unit
  ): Promise<T> = Promise { resolve, reject ->
    GlobalScope.launch(Dispatchers.Default) {
      f(resolve, reject)
    }
  }
}
