import { html, LitElement, TemplateResult } from "lit"
import { customElement } from "lit/decorators.js"
import googlePlayBadge from "./assets/google-play-badge.png"

@customElement("sipgator-logged-out-message")
export class SipgatorLoggedOutMessage extends LitElement {

  protected render(): TemplateResult<1> {
    return html`
      <div class="round padding primary-container top-margin">
        <p>
          Willkommen im webbasierten SipGator, der Ihnen ein paar Basisfunktionen zur Verwaltung ihrer Sipgate-Anschlüsse bietet.
        </p>
        <div>
          Momentan können Sie hier:
          <ul style="list-style: none;padding-left: 1rem;margin:0">
            <li><i class="circle primary small-padding small-margin">dialpad</i> die aktiven Anschlüsse Ihrer Geräte einsehen</li>
            <li><i class="circle primary small-padding small-margin">history</i> die letzten eingehenden und ausgehenden Anrufe/Faxe/Nachrichten sehen</li>
            <li><i class="circle primary small-padding small-margin">contacts</i> die Telefonnummern ihrer Kontakte einsehen</li>
          </ul>
        </div>
        <p>
          Fürs Erste haben wir uns bei der Webapp auf das reine Anzeigen von Informationen beschränkt.<br>
          Unsere Android-App SipGator bietet hier einen größeren Funktionsumfang,
          inklusive Änderung der ausgehenden Telefonnummer sowie der eingehenden Telefonleitungen,
          oder Markierung der Einträge in der Historie und noch einiges mehr.<br>
          Schauen Sie sich also gerne auch die Android-Version an:
          <a style="vertical-align: middle" href="https://play.google.com/store/apps/details?id=de.fumix.sipgator">
            <img alt="Jetzt bei Google Play" style="max-height: 3rem;border-radius: 0" class="underline" src="${googlePlayBadge}"/>
          </a>
        </p>
        <p>
          Übrigens: Diese Seite ist komplett browserbasiert, ihr Browser kommuniziert also direkt mit Sipgate, ohne die Tokens oder die angezeigten Daten mit Dritten zu teilen.
        </p>
      </div>
      <div class="row round secondary-container">
        <div>
          <i class="circle padding error margin">person_off</i><br>
          <i class="circle padding secondary margin">bottom_right_click</i>
        </div>
        <div class="max vertical-padding right-padding">
          <p><strong>Sie sind gerade nicht angemeldet.</strong> Diese Seite können Sie nur anschauen, wenn Sie bereits ein Nutzerkonto bei <a href="https://www.sipgate.de" class="button secondary-border border">SipGate <i style="border-radius:0">open_in_new</i></a> besitzen.</p>
          <p>
            Um ein Token für die Anmeldung zu bekommen, besuchen Sie die Seite
            <a href="https://app.sipgate.com/personal-settings" class="button secondary-border border" target="_blank">
              „Personal-Access-Token“ in den User-Einstellungen von Sipgate <i style="border-radius:0">open_in_new</i>
            </a>.
          </p>
          <p>
          Erstellen Sie sich dort ein Token mit den OAuth-Scopes <code>history:read</code>, <code>contacts:read</code> und <code>devices:read</code>.
          </p>
          <p>
            Anschließend können Sie sich anmelden, indem Sie den Knopf ganz unten rechts auf dieser Seite anklicken und dort die Token-ID und das Token dort eintragen.
          </p>
        </div>
      </div>
    <link href="/beercss/beer.min.css" rel="stylesheet">`
  }
}
