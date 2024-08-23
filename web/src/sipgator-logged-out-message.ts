import { html, LitElement, TemplateResult } from "lit"
import { customElement } from "lit/decorators.js"

@customElement("sipgator-logged-out-message")
export class SipgatorLoggedOutMessage extends LitElement {

  protected render(): TemplateResult<1> {
    return html`
      <p class="round secondary-container"><i class="circle padding extra secondary margin">bottom_right_click</i> Diese Seite können Sie nur anschauen, wenn Sie sich über den Knopf unten rechts anmelden.</p>

    <link href="/beercss/beer.min.css" rel="stylesheet">`
  }
}
