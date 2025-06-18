import PromptInlineSource from "../editor/prompt/inline_source"
import { COMMAND_PRIORITY_HIGH } from "lexical";
import { createElement } from "../helpers/html_helper";

export default class LexicalPromptElement extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.source = this.#createSource()

    this.#addTriggerListener()
  }

  disconnectedCallback() {
    this.source = null
    this.popoverElement = null
    this.#popoverElement.remove()
  }

  get trigger() {
    return this.getAttribute("trigger")
  }

  #createSource() {
    const sourceElement = document.getElementById(this.getAttribute("source"))
    return new PromptInlineSource(sourceElement.querySelectorAll("lexical-prompt-item"))
  }

  #addTriggerListener() {
    console.debug("INVOKED!");
    this.#editorElement.addEventListener("keydown", (event) => {
      if (event.key === this.trigger) {
        this.#showPopover()
      }
    }, COMMAND_PRIORITY_HIGH)
  }

  get #editor() {
    return this.#editorElement.editor
  }

  get #editorElement() {
    return this.closest("lexical-editor")
  }

  get #selection() {
    return this.#editorElement.selection
  }

  #showPopover() {
    console.debug("Show popover at", this.#selection.cursorPosition)
    const { x, y } = this.#selection.cursorPosition

    this.#popoverElement.style.left = `${x}px`
    this.#popoverElement.style.top = `${y}px`
    this.#popoverElement.toggleAttribute("hidden", false)
  }

  get #popoverElement() {
    this.popoverElement ??= this.#buildPopover()
    return this.popoverElement
  }

  #buildPopover() {
    const popoverContainer = createElement("div", { hidden: true }) // Avoiding [popover] due to not being able to position at an arbitrary X, Y position.
    popoverContainer.style.position = "absolute"
    popoverContainer.append(...this.source.buildListItemElements())
    this.#editorElement.appendChild(popoverContainer)
    return popoverContainer
  }
}

customElements.define("lexical-prompt", LexicalPromptElement)
