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
    this.#popoverElement.classList.toggle("lexical-prompt-menu--visible", true)

    const { x, y } = this.#selection.cursorPosition
    const popoverRect = this.#popoverElement.getBoundingClientRect()

    console.debug("Es", y);
    this.#popoverElement.style.left = `${x}px`
    this.#popoverElement.style.top = `${y + popoverRect.height/2 }px`
  }
  get #popoverElement() {
    this.popoverElement ??= this.#buildPopover()
    return this.popoverElement
  }

  #buildPopover() {
    const popoverContainer = createElement("ul") // Avoiding [popover] due to not being able to position at an arbitrary X, Y position.
    popoverContainer.classList.add("lexical-prompt-menu")
    popoverContainer.style.position = "absolute"
    popoverContainer.append(...this.source.buildListItemElements())
    this.#editorElement.appendChild(popoverContainer)
    return popoverContainer
  }
}

customElements.define("lexical-prompt", LexicalPromptElement)
