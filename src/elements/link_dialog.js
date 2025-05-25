export class LinkDialog extends HTMLDialogElement {
  connectedCallback() {
    this.input = this.querySelector("input")

    this.addEventListener("submit", this.#handleSubmit.bind(this))
    this.querySelector("[value='unlink']").addEventListener("click", this.#handleUnlink.bind(this))
  }

  #handleSubmit(event) {
    const command = event.submitter?.value
    this.#editor.dispatchCommand(command, this.input.value)
  }

  #handleUnlink(event) {
    this.#editor.dispatchCommand("unlink")
    this.close()
  }

  get #editor() {
    return this.closest("lexical-toolbar").editor
  }
}

customElements.define("lexical-link-dialog", LinkDialog, { extends: "dialog" })
