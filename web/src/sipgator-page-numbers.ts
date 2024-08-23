import { html } from "lit"
import { customElement, property } from "lit/decorators.js"
import { until } from "lit/directives/until.js"
import { JsSipgateApiV2, Nullable, SipgateApiCredentials } from "SipGator-common"
import { SipgatorPage } from "./sipgator-page.ts"

@customElement("sipgator-page-numbers")
export class SipgatorPageNumbers extends SipgatorPage {
  @property({ type: Object })
  credential: Nullable<SipgateApiCredentials> = undefined

  constructor() {
    super(SipgatorPageNumbers.pageNumbers)
  }

  protected render() {
    return this.renderWithCredentials((credentials) =>
      html`${until(this.numberComponent(credentials), html`<progress class="circle"></progress> Lade Nummern …`)}`
    )
  }

  private async numberComponent(credentials: SipgateApiCredentials) {
    return JsSipgateApiV2.getInstance().userInfo(credentials).then(it =>
        JsSipgateApiV2.getInstance().userDevices(credentials, it.sub)
          .then(s => s.map(s2 => html`
            <h2>${s2.alias}</h2>
            <p>Auf diesem Gerät aktive eingehende Telefonleitungen:</p>
            <p>${ s2.activePhonelines.concat(s2.activeGroups).map(l => html`<span class="chip">${l.alias}</span>`) }</p>
          `))
      ).catch(() => html`Error getting user info`)
  }
}