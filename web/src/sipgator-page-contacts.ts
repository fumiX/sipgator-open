import { html } from "lit"
import { customElement, property } from "lit/decorators.js"
import { until } from "lit/directives/until.js"
import { JsSipgateApiV2, Nullable, SipgateApiCredentials } from "SipGator-common"
import { SipgatorPage } from "./sipgator-page.ts"
import "./sipgator-logged-out-message.ts"

@customElement("sipgator-page-contacts")
export class SipgatorPageContacts extends SipgatorPage {
  @property({ type: Object })
  credential: Nullable<SipgateApiCredentials> = undefined

  constructor() {
    super(SipgatorPageContacts.pageContacts)
  }

  render() {
    return this.renderWithCredentials((credential) => html`
        ${ until(this.contactComponent(credential), html`<progress class="circle"></progress> Lade Kontakte …`) }
    `)
  }

  async contactComponent(credential: SipgateApiCredentials) {
    return new JsSipgateApiV2(credential).contacts()
      .then(it =>
        html`${it.map(c => html`<a class="row padding surface-container">
          <div class="max">
            <h6 class="small">${c.name} ${
              c.scope && c.scope !== "SHARED" ? html`<span class="badge none small-padding">${c.scope}</span>`: ""
            }</h6>

          </div>${
          c.numbers?.map(n => html`<a class="chip" href="tel:${n.number}"><i>phone</i>${n.number}${ n.type && n.type.length > 0 ? " (" + n.type.join(", ") + ")" : ""}</a>`)
        }
        </a><div class="space"></div>`)}`
      )
      .catch(it => { console.error(it); return html`Error getting contacts` })
  }

}
