import { html, LitElement, TemplateResult } from "lit"
import { customElement, property, state } from "lit/decorators.js"
import { classMap } from "lit/directives/class-map.js"
import { Nullable, SipgateApiCredentials, StorageUtil } from "SipGator-common"
import { getCurrentNavigationPath, NavigationPath } from "./navigation-path.ts"
import "./sipgator-login.ts"
import "./sipgator-page-contacts.ts"
import "./sipgator-page-history.ts"
import "./sipgator-page-numbers.ts"
import "./sipgator-light-dark-switch.ts"
import { PageDef, SipgatorPage } from "./sipgator-page.ts"

@customElement("sipgator-app")
export class SipgatorApp extends LitElement {

  static pages: PageDef[] = [
    SipgatorPage.pageNumbers,
    SipgatorPage.pageHistory,
    SipgatorPage.pageContacts
  ]

  @property({ type: String })
  path: typeof SipgatorApp.pages[number]["path"] = "numbers"

  @state()
  credential: Nullable<SipgateApiCredentials> = undefined

  render() {
    return html`
      <nav class="bottom" style="justify-content: space-between;overflow-x: auto">
        <header>
          <img class="circle" src="./favicon.svg" alt="SipGator-Logo">
        </header>
        ${
          SipgatorApp.pages.map(p =>
            html`<a @click="${ () => this.navigateTo(p.path) }" class="${classMap({ active: this.path === p.path }) }"><i>${p.icon}</i><span>${p.label}</span></a>`
          )
        }
        <span>
          <sipgator-light-dark-switch></sipgator-light-dark-switch>
          <sipgator-login .credential="${this.credential}" @credential-update="${this.handleCredentialUpdate}"></sipgator-login>
        </span>
      </nav>
      <link href="./beercss/beer.min.css" rel="stylesheet">
      <main class="responsive" style="margin-bottom: 8rem">
        ${ this.componentForPath(this.path) }
      </main>
    `;
  }

  componentForPath(path: NavigationPath): TemplateResult<1> {
    if (path === "numbers") {
      return html`<sipgator-page-numbers .credential="${this.credential}"></sipgator-page-numbers>`
    } else if (path === "history") {
      return html`<sipgator-page-history .credential="${this.credential}"></sipgator-page-history>`
    } else if (path === "contacts") {
      return html`<sipgator-page-contacts .credential="${this.credential}"></sipgator-page-contacts>`
    } else {
      return html``
    }
  }

  handleCredentialUpdate() {
    this.credential = StorageUtil.getInstance().currentCredential
  }

  navigateTo(path: NavigationPath): true {
    this.path = path
    window.location.replace("#" + path)
    return true
  }

  connectedCallback() {
    super.connectedCallback()
    this.path = getCurrentNavigationPath(window)
    console.log("Detected path as " + this.path)
    window.location.hash = this.path
  }
}
