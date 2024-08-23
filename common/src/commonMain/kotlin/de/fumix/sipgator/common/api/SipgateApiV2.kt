package de.fumix.sipgator.common.api

import io.ktor.client.plugins.resources.get
import io.ktor.resources.Resource
import kotlin.js.JsExport

@Resource("/v2")
class SipgateApiV2 {
  @Resource("/authorization")
  class Authorization(val parent: SipgateApiV2 = SipgateApiV2()) {
    @Resource("/userinfo")
    class UserInfo(val parent: Authorization = Authorization())
  }
  @Resource("/contacts")
  class Contacts(val parent: SipgateApiV2 = SipgateApiV2())
  @Resource("/history")
  class History(val parent: SipgateApiV2 = SipgateApiV2(), val limit: Int = 10)
  @Resource("/{userId}")
  class UserId(val parent: SipgateApiV2 = SipgateApiV2(), val userId: String) {
    @Resource("/devices")
    class Devices(val parent: UserId)
  }
}
