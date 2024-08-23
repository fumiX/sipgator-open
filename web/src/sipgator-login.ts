import { css, html, LitElement } from "lit"
import { customElement, property, state } from "lit/decorators.js"
import { classMap } from "lit/directives/class-map.js"
import { until } from "lit/directives/until.js"
import { JsSipgateApiV2, SipgateApiCredentials, StorageUtil, Nullable, generateCssGradient } from "SipGator-common"
import { CredentialUpdateEvent } from "./credential-update-event.ts"
import { showSnackbar } from "./util-snackbar.ts"

@customElement("sipgator-login")
export class SipgatorLogin extends LitElement {

  @state()
  availableUsers: SipgateApiCredentials[] = []
  @property({ type: Object })
  credential: Nullable<SipgateApiCredentials> = undefined
  @state()
  newUser: SipgateApiCredentials = new SipgateApiCredentials("", "")

  static styles = css`
    .circle {
      transition: 1s ease background;
    }
    dialog {
      background: transparent !important;
      backdrop-filter: blur(0px) !important;
      transition: 1s ease backdrop-filter;
    }
    dialog[open]{
      backdrop-filter: blur(3px) saturate(.25) brightness(.5) !important;
    }
  `;

  render() {
    return html`
      <button style="padding:0" class="right-padding"  @click="${() => this.loginDialog()?.showModal() }">
        ${ html`<i class="circle small-padding primary-container" style="background: ${ until(this.colorForCredentials(this.credential), "transparent") }">${ this.credential ? "person" : "person_off" }</i>`}
        ${
        this.credential
          ? html`<strong>${this.credential.tokenName}</strong>`
          : "nicht angemeldet"
      }</button>
      <dialog id="login-dialog" class="max">
        <aside style="position:fixed;top:.5rem;right:.5rem"><button class="square round extra" @click="${ () => this.loginDialog()?.close() }"><i>close</i></button></aside>
        <main class="responsive">
        ${
          this.availableUsers.map(u => html`
            <div class="row padding primary-container">
              <i class="circle large padding" style="background:${until(this.colorForCredentials(u), "transparent")}">person</i>
              <div class="max">
                <h6 class="small">${u.tokenName} ${ u.equals(this.credential) ? html`<span class="chip primary">angemeldet</span>` : "" }</h6>
              </div>
              ${ this.loginButton(u) }
              ${ this.deleteButton(u) }
            </div>
            <div class="space"></div>
          `)
        }
        <span class="row padding secondary-container">
          <i class="circle large padding" style="background: ${until(this.colorForCredentials(this.newUser))}">person_add</i>
          <div class="field border">
            <input type="text" placeholder="Token ID" name="username" .value="${ this.newUser.tokenName }" @input="${ this.setNewUsername }">
          </div>
          <div class="field border">
            <input type="password" placeholder="Token" name="password" .value="${ this.newUser.token }" @input="${ this.setNewPassword }">
          </div>
          <button @click="${ () => {
            JsSipgateApiV2.getInstance().userInfo(this.newUser)
              .then(ui => {
                StorageUtil.getInstance().currentCredential = this.newUser
                this.reloadCredentials()
                this.newUser = new SipgateApiCredentials("", "")
                this.loginDialog()?.close()
                showSnackbar(null, `User ${ ui.sub } added`, "primary")
              })
              .catch(e => {
                console.log("Error getting user info", e)
                showSnackbar(this.loginDialog(), "Error: " + e?.message, "error")
              })
          } }"><i>person_add</i> Hinzufügen</button>
        </span>
        </main>
      </dialog>
      <link href="/beercss/beer.min.css" rel="stylesheet">
    `;
  }

  setNewUsername(event: InputEvent) {
    this.newUser = new SipgateApiCredentials((event.target as HTMLInputElement)?.value ?? "", this.newUser.token)
  }
  setNewPassword(event: InputEvent) {
    this.newUser = new SipgateApiCredentials(this.newUser.tokenName, (event.target as HTMLInputElement)?.value ?? "")
  }

  loginDialog(): HTMLDialogElement | null | undefined {
    return this.shadowRoot?.querySelector<HTMLDialogElement>("dialog#login-dialog");
  }

  async colorForCredentials(text: Nullable<SipgateApiCredentials>): Promise<string> {
    if (!text) {
      return "transparent"
    }
    const hash = new Int8Array(
      await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${ text.tokenName }:${ text.token }`))
    )
    return generateCssGradient(hash)
  }

  connectedCallback() {
    super.connectedCallback()
    this.reloadCredentials()
    this.availableUsers = StorageUtil.getInstance().allCredentials
  }

  reloadCredentials() {
    this.availableUsers = StorageUtil.getInstance().allCredentials
    this.dispatchEvent(new CredentialUpdateEvent())
  }

  loginButton(c: SipgateApiCredentials) {
    const doLogout = c.equals(this.credential)
    return html`
      <button class="${ classMap({ primary: !doLogout, secondary: doLogout }) }" @click="${ () => {
        StorageUtil.getInstance().currentCredential = doLogout ? null : c
        this.reloadCredentials();
        if (!doLogout) {
          this.loginDialog()?.close();
        }
      } }">
        <i>${ doLogout ? "logout" : "login" }</i>
        ${ doLogout ? "Abmelden" : "Anmelden" }
      </button>`
  }

  deleteButton(c: SipgateApiCredentials) {
    return html`
        <button class="error" @click="${ () => {
          this.yesNoDialog("Really?", `Soll ${c.tokenName} wirklich gelöscht werden?`, () => {
            StorageUtil.getInstance().removeCredential(c)
            this.reloadCredentials()
          })
        } }"><i>delete</i> Entfernen</button>
    `
  }

  yesNoDialog(title: string, question: string, onYes: () => void) {
    const dialogElement = document.createElement("dialog")
    dialogElement.className = "max primary-container"
    const yesButton = document.createElement("button")
    yesButton.innerText = "Ja"
    yesButton.className = "transparent link"
    yesButton.onclick = () => {
      onYes()
      dialogElement.close();
    }
    const noButton = document.createElement("button")
    noButton.innerText = "Nein"
    noButton.className = "transparent link"
    noButton.onclick = () => dialogElement.close()

    dialogElement.innerHTML = `<h5>${ title }</h5><div>${ question }</div><nav class="right-align no-space"></nav>`
    dialogElement.querySelector("nav")?.append(noButton, yesButton)

    this.loginDialog()?.append(dialogElement)
    dialogElement.showModal()
  }
}
