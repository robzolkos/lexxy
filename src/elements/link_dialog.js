import { createElement } from "../helpers/html_helper";

export class LinkDialog extends HTMLElement {
  connectedCallback() {
    this.dialog = this.querySelector("dialog")
    this.input = this.querySelector("input")

    this.addEventListener("submit", this.#handleSubmit.bind(this))
    this.querySelector("[value='unlink']").addEventListener("click", this.#handleUnlink.bind(this))
    this.addEventListener("keydown", this.#handleKeyDown.bind(this))
  }

  show() {
    this.dialog.show()
  }

  close() {
    this.dialog.close()
  }

  #handleSubmit(event) {
    const command = event.submitter?.value
    this.#editor.dispatchCommand(command, this.input.value)
  }

  #handleUnlink(event) {
    this.#editor.dispatchCommand("unlink")
    this.close()
  }

  #handleKeyDown(event) {
    if (event.key === "Escape") {
      event.stopPropagation()
    }
  }

  get #editor() {
    return this.closest("lexical-toolbar").editor
  }
}

// We should extend the native dialog and avoid the intermediary <dialog> but not
// supported by Safari yet: customElements.define("lexical-link-dialog", LinkDialog, { extends: "dialog" })
customElements.define("lexical-link-dialog", LinkDialog)
