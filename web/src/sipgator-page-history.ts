import { html } from "lit"
import { customElement, property } from "lit/decorators.js"
import { until } from "lit/directives/until.js"
import { JsSipgateApiV2, Nullable, SipgateApiCredentials } from "SipGator-common"
import { SipgatorPage } from "./sipgator-page.ts"

@customElement("sipgator-page-history")
export class SipgatorPageHistory extends SipgatorPage {
  @property({ type: Object })
  credential: Nullable<SipgateApiCredentials> = undefined

  constructor() {
    super(SipgatorPageHistory.pageHistory)
  }

  protected render() {
    return this.renderWithCredentials((credential) =>
      html`${ until(this.historyComponent(credential), html`<progress class="circle"></progress> Lade Historie …`) }`
    )
  }

  private async historyComponent(credential: SipgateApiCredentials) {
    return new JsSipgateApiV2(credential).history().then(it => it.map(h => html`
      <div class="row padding surface-container wave">
        <i>${h.incoming ? (h.status === "NOPICKUP" ? "call_missed" : "call_received") : "call_made"}</i>
        <span class="badge none padding">${ h.type }</span>
        <div class="max">${ h.incoming ? "von" : "an" } ${ h.remoteNumber }</div>
        <span>${h.created}</span>
      </p>
    `))
      .catch(() => html`Error getting history`)
  }
}
