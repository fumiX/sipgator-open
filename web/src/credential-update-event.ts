export class CredentialUpdateEvent extends CustomEvent<undefined> {
  constructor() {
    super("credential-update", { detail: undefined, bubbles: true, composed: true});
  }
}
