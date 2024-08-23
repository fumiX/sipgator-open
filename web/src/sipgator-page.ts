import { html, LitElement, TemplateResult } from "lit"
import { NavigationPath } from "./navigation-path.ts"
import { Nullable, SipgateApiCredentials } from  "SipGator-common"
import { when } from "lit/directives/when.js"

export type PageDef = {
  path: NavigationPath,
  icon: string,
  label: string,
};

export abstract class SipgatorPage extends LitElement {

  static pageNumbers: PageDef = {
    path: "numbers",
    icon: "dialpad",
    label: "Nummern",
  }
  static pageHistory: PageDef = {
    path: "history",
    icon: "history",
    label: "Historie"
  }
  static pageContacts: PageDef = {
    path: "contacts",
    icon: "contacts",
    label: "Kontakte"
  }

  abstract credential: Nullable<SipgateApiCredentials>

  private pageDef: PageDef

  protected constructor(pageDef: PageDef) {
    super()
    this.pageDef = pageDef
  }

  get path(): NavigationPath {
    return this.pageDef.path
  }
  get icon(): string {
    return this.pageDef.icon
  }
  get label(): string {
    return this.pageDef.label
  }

  renderWithCredentials(renderWithCredentials: (credentials: SipgateApiCredentials) => TemplateResult<1>) {
    const fallback = html`<sipgator-logged-out-message></sipgator-logged-out-message>`
    return html`
      <h1 class="small"><i class="extra padding">${ this.icon }</i>${ this.label }</h1>
      ${ when(this.credential, () => this.credential ? renderWithCredentials(this.credential) : fallback, () => fallback) }
      <link rel="stylesheet" href="/beercss/beer.min.css" />
    `
  }
}
