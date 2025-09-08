import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  $isTextNode
} from "lexical"
import { $isListNode, $isListItemNode } from "@lexical/list"
import { $isQuoteNode, $isHeadingNode } from "@lexical/rich-text"
import { $isCodeNode, $isCodeHighlightNode } from "@lexical/code"
import { $isLinkNode } from "@lexical/link"
import { getListType } from "../helpers/lexical_helper";

export default class LexicalToolbarElement extends HTMLElement {
  constructor() {
    super()
    this.internals = this.attachInternals()
    this.internals.role = "toolbar"
  }

  connectedCallback() {
    this.#refreshToolbarOverflow()
    window.addEventListener("resize", this.#refreshToolbarOverflow)
  }

  disconnectedCallback() {
    window.removeEventListener("resize", this.#refreshToolbarOverflow)
  }

  setEditor(editorElement) {
    this.editorElement = editorElement
    this.editor = editorElement.editor
    this.#bindButtons()
    this.#bindHotkeys()
    this.#assignButtonTabindex()
    this.#monitorSelectionChanges()
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
    const dialog = document.getElementById(button.dataset.dialogTarget).parentNode

    if (dialog.open) {
      dialog.close()
    } else {
      dialog.show()
    }
  }

  #bindHotkeys() {
    this.editorElement.addEventListener('keydown', (event) => {
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

    return [ ...modifiers, pressedKey ].join('+')
  }

  #assignButtonTabindex() {
    const baseTabIndex = parseInt(this.editorElement.editorContentElement.getAttribute("tabindex") ?? "0")
    this.#buttons.forEach((button, index) => {
      button.setAttribute("tabindex", `${baseTabIndex + index + 1}`)
    })
  }

  #monitorSelectionChanges() {
    this.editor.registerUpdateListener(() => {
      this.editor.getEditorState().read(() => {
        this.#updateButtonStates()
      })
    })
  }

  #updateButtonStates() {
    const selection = $getSelection()
    if (!$isRangeSelection(selection)) return

    const anchorNode = selection.anchor.getNode()
    if (!anchorNode.getParent()) { return }

    const topLevelElement = anchorNode.getTopLevelElementOrThrow()

    const isBold = selection.hasFormat("bold")
    const isItalic = selection.hasFormat("italic")
    const isInCode = $isCodeNode(topLevelElement) || selection.hasFormat("code")
    const isInList = this.#isInList(anchorNode)
    const listType = getListType(anchorNode)
    const isInQuote = $isQuoteNode(topLevelElement)
    const isInHeading = $isHeadingNode(topLevelElement)
    const isInLink = this.#isInLink(anchorNode)

    this.#setButtonPressed("bold", isBold)
    this.#setButtonPressed("italic", isItalic)
    this.#setButtonPressed("code", isInCode)
    this.#setButtonPressed("unordered-list", isInList && listType === "bullet")
    this.#setButtonPressed("ordered-list", isInList && listType === "number")
    this.#setButtonPressed("quote", isInQuote)
    this.#setButtonPressed("heading", isInHeading)
    this.#setButtonPressed("link", isInLink)
  }

  #isSelectionInInlineCode(selection) {
    const nodes = selection.getNodes()
    return nodes.some(node => {
      if ($isCodeHighlightNode(node)) return true
      // Check parent for text nodes inside code highlight
      if ($isTextNode(node)) {
        const parent = node.getParent()
        if (parent && $isCodeHighlightNode(parent)) return true
      }
      return false
    })
  }

  #isInList(node) {
    let current = node
    while (current) {
      if ($isListNode(current) || $isListItemNode(current)) return true
      current = current.getParent()
    }
    return false
  }

  #isInLink(node) {
    let current = node
    while (current) {
      if ($isLinkNode(current)) return true
      current = current.getParent()
    }
    return false
  }

  #setButtonPressed(name, isPressed) {
    const button = this.querySelector(`[name="${name}"]`)
    if (button) {
      button.setAttribute("aria-pressed", isPressed.toString())
    }
  }

  #toolbarIsOverflowing() {
    return this.scrollWidth > this.clientWidth
  }

  #refreshToolbarOverflow = () => {
    this.#resetToolbar()
    this.#compactMenu()

    this.#overflow.style.display = this.#overflowMenu.children.length ? "block" : "none";
  }

  get #overflow() {
    return this.querySelector(".lexxy-editor__toolbar-overflow")
  }

  get #overflowMenu() {
    return this.querySelector(".lexxy-editor__toolbar-overflow-menu")
  }

  #resetToolbar() {
    while (this.#overflowMenu.children.length > 0) {
      this.insertBefore(this.#overflowMenu.children[0], this.#overflow);
    }
  }

  #compactMenu() {
    const buttons = this.#buttons.reverse()
    let movedToOverflow = false

    for (const button of buttons) {
      if (this.#toolbarIsOverflowing()) {
        this.#overflowMenu.appendChild(button)
        movedToOverflow = true
      } else {
        if (movedToOverflow) this.#overflowMenu.appendChild(button)
        break
      }
    }
  }

  get #buttons() {
    return Array.from(this.querySelectorAll(":scope > button"))
  }

  static get defaultTemplate() {
    return `
      <button class="lexxy-editor__toolbar-button" type="button" name="bold" data-command="bold" title="Bold">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5 22V2h8.337c1.797 0 3.233.435 4.308 1.304 1.074.87 1.611 2.076 1.611 3.62 0 .8-.151 1.503-.454 2.109a3.955 3.955 0 01-1.216 1.465 5 5 0 01-1.758.806v.176a5.402 5.402 0 012.212.703c.674.381 1.216.923 1.627 1.627.41.693.615 1.543.615 2.549 0 1.192-.298 2.207-.894 3.048-.596.84-1.416 1.484-2.461 1.934-1.045.44-2.247.659-3.605.659H5zM8.927 4.974v5.348h2.608c.889 0 1.611-.107 2.168-.322.567-.215.982-.523 1.246-.923.273-.41.41-.904.41-1.48 0-.82-.259-1.46-.777-1.92-.508-.468-1.226-.703-2.153-.703H8.927zm0 8.103v5.949h2.93c1.563 0 2.686-.245 3.37-.733.684-.498 1.026-1.221 1.026-2.168 0-.635-.137-1.178-.41-1.627-.274-.459-.68-.81-1.217-1.055-.527-.244-1.177-.366-1.948-.366H8.927z" /></svg>
      </button>

      <button class="lexxy-editor__toolbar-button" type="button" name="italic" data-command="italic" title="Italic">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.967 18.994c-.25 1.192-.083 1.427 1.966 1.663L14.657 22H6l.29-1.343c2.148-.236 2.425-.471 2.674-1.663l2.978-13.988c.25-1.192.083-1.469-1.967-1.663L10.252 2h8.657l-.291 1.343c-2.147.236-2.424.471-2.673 1.663l-2.978 13.988z"/></svg>
      </button>

      <button class="lexxy-editor__toolbar-button" type="button" name="link" title="Link" data-dialog-target="link-dialog" data-hotkey="cmd+k ctrl+k">
        <svg viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_449_506)"><path d="M14.525 9.253a5.5 5.5 0 010 7.778l-3.535 3.536a5.5 5.5 0 01-7.779 0 5.499 5.499 0 010-7.778l3.536-3.536a1.5 1.5 0 01.354-.263 6.52 6.52 0 00.352 3.8l-2.12 2.12a2.499 2.499 0 000 3.535 2.499 2.499 0 003.535 0l3.536-3.535a2.5 2.5 0 000-3.536 1.5 1.5 0 012.121-2.121z"/><path d="M20.89 2.89a5.5 5.5 0 010 7.777l-3.536 3.536a1.5 1.5 0 01-.355.262 6.522 6.522 0 00-.351-3.8l2.12-2.12a2.5 2.5 0 10-3.536-3.535l-3.535 3.536a2.499 2.499 0 000 3.536 1.5 1.5 0 11-2.122 2.12 5.499 5.499 0 010-7.777l3.536-3.536a5.5 5.5 0 017.778 0z"/></g><defs><clipPath id="clip0_449_506"><path d="M0 0h24v24H0z"/></clipPath></defs></svg>
      </button>

      <lexxy-link-dialog class="lexxy-link-dialog">
        <dialog id="link-dialog" closedby="any">
          <form method="dialog">
            <input type="url" placeholder="Enter a URL…" class="input" required>
            <div class="lexxy-dialog-actions">
              <button type="submit" class="btn" value="link">Link</button>
              <button type="button" class="btn" value="unlink">Unlink</button>
            </div>
          </form>
        </dialog>
      </lexxy-link-dialog>

      <button class="lexxy-editor__toolbar-button" type="button" name="quote" data-command="insertQuoteBlock" title="Quote">
        <svg viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6.5 5C8.985 5 11 7.09 11 9.667c0 2.694-.962 5.006-2.188 6.644-.612.82-1.299 1.481-1.977 1.943-.668.454-1.375.746-2.022.746a.563.563 0 01-.52-.36.601.601 0 01.067-.57l.055-.066.009-.009.042-.048c.038-.045.097-.116.168-.21.142-.188.335-.47.53-.839a6.748 6.748 0 00.75-2.606C3.704 13.994 2 12.038 2 9.667 2 7.09 4.015 5 6.5 5zM17.5 5C19.985 5 22 7.09 22 9.667c0 2.694-.962 5.006-2.188 6.644-.612.82-1.299 1.481-1.977 1.943-.668.454-1.375.746-2.023.746a.563.563 0 01-.519-.36.601.601 0 01.067-.57l.055-.066.009-.009.042-.048c.038-.045.097-.116.168-.21.142-.188.335-.47.53-.839a6.748 6.748 0 00.75-2.606C14.704 13.994 13 12.038 13 9.667 13 7.09 15.015 5 17.5 5z"/></svg>
      </button>

      <button class="lexxy-editor__toolbar-button" type="button" name="heading" data-command="rotateHeadingFormat" title="Heading">
        <svg viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16 6h-5.5v15h-3V6H2V3h14v3z"/><path d="M22 12h-3.5v9h-3v-9H12V9h10v3z"/></svg>
      </button>

      <button class="lexxy-editor__toolbar-button" type="button" name="code" data-command="insertCodeBlock" title="Code">
        <svg viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9.06 7.06L4.122 12l4.94 4.94-2.122 2.12-6-6a1.5 1.5 0 010-2.12l6-6 2.122 2.12zM14.94 7.06L19.879 12l-4.94 4.94 2.122 2.12 6-6a1.5 1.5 0 000-2.12l-6-6-2.121 2.12z"/></svg>
      </button>

      <button class="lexxy-editor__toolbar-button" type="button" name="unordered-list" data-command="insertUnorderedList" title="Bullet list">
        <svg viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4 17a2 2 0 110 4 2 2 0 010-4zM20.5 17.5a1.5 1.5 0 010 3h-11a1.5 1.5 0 010-3h11zM4 10a2 2 0 110 4 2 2 0 010-4zM20.5 10.5a1.5 1.5 0 010 3h-11a1.5 1.5 0 010-3h11zM4 3a2 2 0 110 4 2 2 0 010-4zM20.5 3.5a1.5 1.5 0 010 3h-11a1.5 1.5 0 110-3h11z"/></svg>
      </button>

      <button class="lexxy-editor__toolbar-button" type="button" name="ordered-list" data-command="insertOrderedList" title="Numbered list">
        <svg viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4.465 16.574c.393-.002.732.056 1.015.176.287.12.507.287.66.5.157.21.236.454.239.73.003.25-.052.46-.164.63-.11.169-.242.3-.399.394a1.21 1.21 0 01-.421.164v.066c.169.013.34.067.515.16.175.094.32.232.438.415.12.18.18.41.183.691a1.37 1.37 0 01-.168.7c-.114.2-.27.366-.468.5a2.246 2.246 0 01-.676.3 3.15 3.15 0 01-.79.098c-.437 0-.804-.073-1.1-.22a1.622 1.622 0 01-.677-.581 1.498 1.498 0 01-.238-.79h1.164a.53.53 0 00.121.317.745.745 0 00.301.219 1.14 1.14 0 00.867-.008.687.687 0 00.293-.246.646.646 0 00.106-.363.631.631 0 00-.102-.352.66.66 0 00-.281-.25.97.97 0 00-.446-.094H3.84v-.949h.574a.846.846 0 00.383-.082.653.653 0 00.254-.226.602.602 0 00.09-.325.552.552 0 00-.211-.449.774.774 0 00-.512-.172.815.815 0 00-.305.055.713.713 0 00-.383.34.542.542 0 00-.058.226h-1.18c.008-.234.057-.446.149-.636.09-.193.22-.358.386-.496.17-.141.374-.25.614-.325.242-.078.517-.117.824-.117zM20.5 17.5a1.5 1.5 0 010 3h-11a1.5 1.5 0 010-3h11zM4.484 9.574c.388 0 .726.067 1.012.2.29.132.512.313.668.542.159.227.238.483.238.77 0 .258-.05.486-.148.684a2.339 2.339 0 01-.363.535c-.146.161-.292.32-.438.476L4.38 13.926v.058h2.11V15H2.644v-.79l1.914-1.98c.093-.096.184-.196.273-.3.091-.104.165-.215.223-.332.06-.12.09-.248.09-.383a.59.59 0 00-.09-.324.655.655 0 00-.246-.23.703.703 0 00-.352-.087.7.7 0 00-.367.094.636.636 0 00-.235.25.717.717 0 00-.078.332v.082H2.57v-.07a1.652 1.652 0 01.46-1.148c.157-.165.355-.295.595-.391.242-.1.529-.149.86-.149zM20.5 10.5a1.5 1.5 0 010 3h-11a1.5 1.5 0 010-3h11zM5.543 8h-1.27V3.848h-.062c-.133.09-.266.183-.399.277l-.796.563V3.554a131.745 131.745 0 001.258-.887h1.269V8zM20.5 3.5a1.5 1.5 0 010 3h-11a1.5 1.5 0 110-3h11z"/></svg>
      </button>

      <button class="lexxy-editor__toolbar-button" type="button" name="upload" data-command="uploadAttachments" title="Upload file">
        <svg viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16 8a2 2 0 110 4 2 2 0 010-4z"/><path d="M22 3a1 1 0 011 1v16a1 1 0 01-1 1H2a1 1 0 01-1-1V4a1 1 0 011-1h20zM3 17.714L9 10l5.25 6.75L17 14l4 4V5H3v12.714z"/></svg>
      </button>

      <details class="lexxy-editor__toolbar-overflow">
        <summary class="lexxy-editor__toolbar-button" aria-label="Show more toolbar buttons">•••</summary>
        <div class="lexxy-editor__toolbar-overflow-menu" aria-label="More toolbar buttons"></div>
      </details>
    `
  }
}

customElements.define("lexxy-toolbar", LexicalToolbarElement)
