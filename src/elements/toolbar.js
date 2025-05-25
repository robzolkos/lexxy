export default class LexicalToolbarElement extends HTMLElement {
  setEditor(editor) {
    this.editor = editor
    this.#bindButtons()
    this.#bindHotkeys()
  }

  #bindButtons() {
    this.addEventListener("click", this.#handleButtonClicked.bind(this))
  }

  #handleButtonClicked({ target }) {
    this.#handleTargetClicked(target, "[data-command]", this.#dispatchButtonCommand.bind(this))
    this.#handleTargetClicked(target, "[data-dialog-target]", this.#toggleDialog.bind(this))
  }

  #handleTargetClicked(target, selector, callback) {
    const button = target.closest(selector)
    if (button) {
      callback(button)
    }
  }

  #dispatchButtonCommand(button) {
    const { command, payload } = button.dataset
    this.editor.dispatchCommand(command, payload)
  }

  // Not using popover because of CSS anchoring still not widely available.
  #toggleDialog(button) {
    const dialog = document.getElementById(button.dataset.dialogTarget)

    if (dialog.open) {
      dialog.close()
    } else {
      dialog.show()
    }
  }

  #bindHotkeys() {
    this.editor.getRootElement().addEventListener('keydown', (event) => {
      const buttons = this.querySelectorAll("[data-hotkey]")
      buttons.forEach((button) => {
        const hotkeys = button.dataset.hotkey.toLowerCase().split(/\s+/)
        if (hotkeys.includes(this.#keyCombinationFor(event))) {
          event.preventDefault()
          event.stopPropagation()
          button.click()
        }
      })
    })
  }

  #keyCombinationFor(event) {
    const pressedKey = event.key.toLowerCase()
    const modifiers = [
      event.ctrlKey ? 'ctrl' : null,
      event.metaKey ? 'cmd' : null,
      event.altKey ? 'alt' : null,
      event.shiftKey ? 'shift' : null,
    ].filter(Boolean)

    return [...modifiers, pressedKey].join('+')
  }

  static get defaultTemplate() {
    return `
      <button type="button" data-command="bold" title="Bold">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path d="m4.1 23c-.5 0-.7-.4-.7-.7v-20.6c0-.4.4-.7.7-.7h8.9c2 0 3.8.6 4.9 1.5 1.2 1 1.8 2.4 1.8 4.1s-.9 3.2-2.3 4.1c-.2 0-.3.3-.3.5s0 .4.3.5c1.9.8 3.2 2.7 3.2 5s-.7 3.6-2.1 4.7-3.3 1.7-5.6 1.7h-8.8zm4.2-18.1v5.1h3c1.2 0 2-.3 2.7-.7.6-.5.9-1.1.9-1.9s-.3-1.4-.8-1.8-1.3-.6-2.3-.6-2.4 0-3.5 0zm0 8.5v5.8h3.7c1.3 0 2.2-.3 2.8-.7s.9-1.2.9-2.2-.4-1.7-1-2.1-1.7-.7-2.9-.7-2.4 0-3.5 0z" fill-rule="evenodd"/> </svg>
      </button>
      
      <button type="button" data-command="italic" title="Italic">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path d="m9.3 1h10.2v3.1h-3.5l-3.7 15.7h3.2v3.2h-11v-3.1h3.8l3.7-15.7h-2.8v-3.2z" fill-rule="evenodd"/> </svg>
      </button>
      
      <button type="button" title="Link" data-dialog-target="link-dialog" data-hotkey="cmd+k ctrl+k">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path d="m9.4 14.5c-2.3-2.3-2.3-5.9 0-8.2l4.6-4.6c1.1-1 2.6-1.7 4.2-1.7s3 .5 4.1 1.7c2.3 2.3 2.3 5.9 0 8.2l-2.7 2.3c-.5.5-1.2.5-1.8 0-.5-.5-.5-1.2 0-1.7l2.7-2.3c1.4-1.3 1.4-3.4 0-4.7-.7-.7-1.5-.9-2.3-.9s-1.8.4-2.5.9l-4.7 4.5c-1.4 1.3-1.4 3.4 0 4.7.5.5.5 1.2 0 1.7-.1.3-.4.4-.8.4s-.5-.1-.8-.3z"/> <path d="m1.7 22.3c-2.3-2.3-2.3-5.9 0-8.2l2.6-2.5c.5-.5 1.2-.5 1.8 0 .5.5.5 1.2 0 1.7l-2.6 2.5c-1.4 1.3-1.4 3.4 0 4.7.7.7 1.5.9 2.3.9s1.8-.4 2.3-.9l4.6-4.6c1.4-1.3 1.4-3.4 0-4.7-.5-.4-.5-1.2 0-1.7s1.2-.5 1.8 0c2.3 2.3 2.3 5.9 0 8.2l-4.6 4.6c-1 1-2.5 1.7-4.1 1.7s-3-.7-4.1-1.7z"/> </svg>
      </button>
      <dialog is="lexical-link-dialog" id="link-dialog">
        <form method="dialog">
          <input type="url" placeholder="Enter a URL…" required>
          <button type="submit" value="link">Link</button>
          <button type="button" value="unlink">Unlink</button>
        </form>  
      </dialog>
      
      <button type="button" data-command="insertQuoteBlock" title="Quote">
        <svg viewBox="0 0 24 22" xmlns="http://www.w3.org/2000/svg"> <path d="m1.1 5.2c.6-.7 1.4-1.3 2.4-1.4 2.6-.4 4.2.4 5.3 1.9 2 2.3 1.9 5.1.6 7.6-1.3 2.4-4 4.6-7.2 5.1-.4 0-.7-.1-1-.4-.1-.3-.1-.7.3-1.1l1.1-1.1c.3-.4.6-.7.7-1.1s.3-.9 0-1.3c0-.4-.6-.7-1-1-1.2-.8-2.3-2.2-2.3-4.1.1-1.4.4-2.4 1.1-3.1z"/> <path d="m14.6 5.2c.6-.7 1.6-1.1 2.6-1.4 2.4-.4 4.2.4 5.3 1.9 2 2.3 1.9 5.1.6 7.6-1.3 2.4-4 4.6-7.2 5.1-.4 0-.7-.1-1-.4-.1-.3-.1-.7.3-1.1l1.1-1.1c.3-.4.6-.7.7-1.1s.3-.9 0-1.3c-.1-.4-.6-.7-1-1-1.3-.6-2.4-2-2.4-3.9s.4-2.6 1-3.3z"/> </svg>
      </button>
      
      <button type="button" data-command="formatElement" data-payload="h2" title="Heading">
        <strong>H</strong>
      </button>
            
      <button type="button" data-command="insertCodeBlock" title="Code">
        <svg viewBox="0 0 24 22" xmlns="http://www.w3.org/2000/svg"> <path d="m.4 10.1c-.5.5-.5 1.4 0 1.9l5.3 5.3c.5.5 1.4.5 1.9 0s.5-1.4 0-1.9l-4.4-4.4 4.4-4.4c.5-.5.5-1.4 0-1.9s-1.3-.5-1.9 0c0 0-5.3 5.4-5.3 5.4zm17.9 7.2 5.3-5.3c.5-.5.5-1.4 0-1.9l-5.3-5.3c-.5-.5-1.4-.5-1.9 0s-.5 1.4 0 1.9l4.4 4.4-4.4 4.4c-.5.5-.5 1.4 0 1.9.5.4 1.4.4 1.9-.1z" fill-rule="evenodd"/> </svg>
      </button>
      
      <button type="button" data-command="insertUnorderedList" title="Bullet list">
        <svg viewBox="0 0 24 22" xmlns="http://www.w3.org/2000/svg"> <path d="m2.1 4.8c1.1 0 2.1-.9 2.1-2.1s-1-2-2.1-2-2.1.9-2.1 2.1.9 2 2.1 2zm4.1-2c0-.8.6-1.4 1.4-1.4h15.1c.7 0 1.3.6 1.3 1.4s-.6 1.4-1.4 1.4h-15.1c-.7 0-1.3-.7-1.3-1.4zm1.3 6.8c-.8 0-1.4.6-1.4 1.4s.6 1.4 1.4 1.4h15.1c.8 0 1.4-.6 1.4-1.4s-.6-1.4-1.4-1.4zm0 8.3c-.8 0-1.4.6-1.4 1.4s.6 1.4 1.4 1.4h15.1c.8 0 1.4-.6 1.4-1.4s-.6-1.4-1.4-1.4zm-3.4-6.9c0 1.1-.9 2.1-2.1 2.1s-2-1-2-2.1.9-2.1 2.1-2.1 2 1 2 2.1zm-2 10.3c1.1 0 2.1-.9 2.1-2.1s-.9-2.1-2.1-2.1-2.1 1-2.1 2.1.9 2.1 2.1 2.1z" fill-rule="evenodd"/> </svg> 
      </button>
      
      <button type="button" data-command="insertOrderedList" title="Numbered list">
        <svg viewBox="0 0 24 22" xmlns="http://www.w3.org/2000/svg"> <path d="m0 .3h2.7v5.3h-1.4v-4h-1.3zm6.7 2.7c0-.7.6-1.3 1.3-1.3h14.7c.7 0 1.3.6 1.3 1.3s-.6 1.3-1.3 1.3h-14.7c-.7 0-1.3-.6-1.3-1.3zm1.3 6.7c-.7 0-1.3.6-1.3 1.3s.6 1.3 1.3 1.3h14.7c.7 0 1.3-.6 1.3-1.3s-.6-1.3-1.3-1.3zm0 8c-.7 0-1.3.6-1.3 1.3s.6 1.3 1.3 1.3h14.7c.7 0 1.3-.6 1.3-1.3s-.6-1.3-1.3-1.3zm-4.7-9.4h.7v1.3l-2 2.7h2v1.3h-4v-1.3l2.2-2.7h-2.2v-1.3zm-3.3 9.4v-1.3h4v5.3h-4v-1.3h2.7v-.7h-1.4v-1.3h1.3v-.7z" fill-rule="evenodd"/> </svg>
      </button>
      
      <button type="button" data-command="uploadAttachments" title="Add Image">
        <svg viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg"> <path d="m22 20h-20c-1.1 0-2-.9-2-2.1v-15.8c0-1.2.9-2.1 2-2.1h20c1.1 0 2 .9 2 2.1v15.8c0 1.1-.9 2.1-2 2.1zm0-2.9v-14.5c0-.3-.2-.5-.5-.5h-19c-.3 0-.5.2-.5.5v14.5c0 .1.1.2.2.2s.2 0 .2-.1l2.2-3.3c.1-.2.3-.3.5-.3h.7l2.6-4c.1-.2.3-.3.5-.3h.7c.2 0 .4.1.5.3l5.3 8c0 .1.2.2.3.2h.3c.2 0 .4-.2.4-.4s0-.2 0-.2l-1.3-1.9c-.2-.2-.2-.6 0-.8l1.2-1.6c.1-.2.3-.3.5-.3h1.1c.2 0 .4 0 .5.3l3.2 4.4c0 .1.3.2.4 0 .2 0 .2 0 .2-.2zm-5.5-7.6c-1.4 0-2.5-1.2-2.5-2.6s1.1-2.6 2.5-2.6 2.5 1.2 2.5 2.6-1.1 2.6-2.5 2.6z" fill-rule="evenodd"/> </svg>
      </button>
    `
  }
}

customElements.define("lexical-toolbar", LexicalToolbarElement)
