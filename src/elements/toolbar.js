export default class LexicalToolbarElement extends HTMLElement {
  setEditor(editor) {
    this.#bindButtons(editor)
  }

  #bindButtons(editor) {
    const buttons = this.querySelectorAll("[data-command]")
    for (const button of buttons) {
      const command = button.getAttribute("data-command")
      const payload = button.getAttribute("data-payload") || undefined

      button.addEventListener("click", () => {
        editor.dispatchCommand(command, payload)
      })
    }
  }
}

customElements.define("lexical-toolbar", LexicalToolbarElement)
