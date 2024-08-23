import { html, LitElement } from "lit"
import { customElement, property } from "lit/decorators.js"
import { StorageUtil, ThemeMode } from "SipGator-common"

@customElement("sipgator-light-dark-switch")
export class SipgatorLightDarkSwitch extends LitElement {
  static modes = ["light", "dark"] as const

  @property()
  mode: ThemeMode = ThemeMode.LIGHT

  connectedCallback() {
    super.connectedCallback()
    this.updateCssClass()
  }

  updateCssClass() {
    this.mode = StorageUtil.getInstance().themeMode
    this.ownerDocument.body.classList.remove(...ThemeMode.values().filter(it => this.mode.name !== it.name).map(it => it.cssClass))
    this.ownerDocument.body.classList.add(this.mode.cssClass)
  }

  onClick(newMode: ThemeMode) {
    StorageUtil.getInstance().themeMode = newMode
    this.updateCssClass()
  }

  override render() {
    return html`
      <label class="switch icon padding" style="display: inline-block">
        <input type="checkbox" .checked="${ this.mode.name === ThemeMode.LIGHT.name }" @change="${ (e: Event) => {
          this.onClick((e.target as HTMLInputElement)?.checked ? ThemeMode.LIGHT : ThemeMode.DARK)
        } }">
        <span>
          <i>dark_mode</i>
          <i>light_mode</i>
        </span>
      </label>
      <link href="/beercss/beer.min.css" rel="stylesheet">
    `
  }
}
