import PromptInlineSource from "../editor/prompt/inline_source"
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
    this.#editorElement.addEventListener("keydown", (event) => {
      if (event.key === this.trigger) {
        this.#showPopover()
      }
    })
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
    this.#positionPopover()
    this.#editorElement.addEventListener("actiontext:change", this.#filterOptions)
  }

  #positionPopover() {
    const { x, y } = this.#selection.cursorPosition
    const popoverRect = this.#popoverElement.getBoundingClientRect()
    this.#popoverElement.style.left = `${x}px`
    this.#popoverElement.style.top = `${y + popoverRect.height/2 }px`
  }

  #hidePopover() {
    this.#popoverElement.classList.toggle("lexical-prompt-menu--visible", false)
    this.#editorElement.removeEventListener("actiontext:change", this.#filterOptions)
  }

  #filterOptions = () => {
    if (this.#editorContents.containsBackwardsFromCursor(this.trigger)) {
      this.#showFilteredOptions()
    } else {
      this.#hidePopover()
    }
  }

  #showFilteredOptions() {
    const filter = this.#editorContents.textBefore(this.trigger)
    const filteredListItems = this.source.buildListItemElements(filter)
    this.#popoverElement.innerHTML = ""
    this.#popoverElement.append(...filteredListItems)
  }

  get #popoverElement() {
    this.popoverElement ??= this.#buildPopover()
    return this.popoverElement
  }

  get #editorContents() {
    return this.#editorElement.contents
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
