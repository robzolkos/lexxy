import { createElement } from "../helpers/html_helper"

export class LinkDialog extends HTMLElement {
  connectedCallback() {
    this.dialog = createElement("dialog")
    this.input = createElement("input", {
      type: "text",
      placeholder: "Enter URL"
    })

    const buttonContainer = createElement("div", {
      className: "button-container"
    })

    const linkButton = createElement("button", {
      textContent: "Link",
      onclick: () => {
        const linkUrl = this.input.value.trim() === "" ? null : this.input.value

        this.dispatchEvent(new CustomEvent("link-dialog:link", { bubbles: true, composed: true, detail: { url: linkUrl } }))
        this.close()
      }
    })

    const unlinkButton = createElement("button", {
      textContent: "Unlink",
      onclick: () => {
        this.dispatchEvent(new CustomEvent("link-dialog:unlink", { bubbles: true, composed: true }))
        this.close()
      }
    })

    buttonContainer.appendChild(linkButton)
    buttonContainer.appendChild(unlinkButton)
    this.dialog.appendChild(this.input)
    this.dialog.appendChild(buttonContainer)

    document.body.appendChild(this.dialog)
  }


  open(url = "") {
    this.input.value = url
    this.dialog.showModal()
    this.input.focus()
  }

  close() {
    this.dialog?.close()

    if (document.body.contains(this)) {
      document.body.removeChild(this)
    }
  }
}

customElements.define("link-dialog", LinkDialog)

export function createLinkDialog() {
  let dialog = document.querySelector("link-dialog")
  if (!dialog) {
    dialog = document.createElement("link-dialog")
    document.body.appendChild(dialog)
  }
  return dialog
}
