import PromptInlineSource from "../editor/prompt/inline_source"
import { createElement } from "../helpers/html_helper";
import { COMMAND_PRIORITY_HIGH, KEY_ENTER_COMMAND } from "lexical";
import { CustomActionTextAttachmentNode } from "../nodes/custom_action_text_attachment_node";

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
  }

  get name() {
    return this.getAttribute("name")
  }

  get trigger() {
    return this.getAttribute("trigger")
  }

  #createSource() {
    const sourceElement = document.getElementById(this.getAttribute("src"))
    return new PromptInlineSource(sourceElement.querySelectorAll("lexical-prompt-item"))
  }

  #addTriggerListener() {
    this.#editorElement.addEventListener("keydown", (event) => {
      if (event.key === this.trigger) {
        this.initialPrompt = true
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
    this.#filterOptions()
    this.#selectFirstOption()
    this.#positionPopover()

    this.#editorElement.addEventListener("keydown", this.#handleKeydownOnPopover)
    this.#editorElement.addEventListener("actiontext:change", this.#filterOptions)
    // We can't use a regular keydown for Enter as Lexical handles it first
    this.unregisterEnterListener = this.#editor.registerCommand(KEY_ENTER_COMMAND, this.#handleSelectedOption.bind(this), COMMAND_PRIORITY_HIGH)
  }

  #selectFirstOption() {
    const firstOption = this.#listItemElements[0]

    if (firstOption) {
      this.#selectOption(firstOption)
    }
  }

  get #listItemElements() {
    return Array.from(this.#popoverElement.querySelectorAll("li"))
  }

  #selectOption(option) {
    this.#listItemElements.forEach((item) => { item.toggleAttribute("aria-selected", false) })
    option.toggleAttribute("aria-selected", true)
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
    this.#editorElement.removeEventListener("keydown", this.#handleKeydownOnPopover)
    this.unregisterEnterListener()
  }

  #filterOptions = () => {
    if (this.initialPrompt) {
      this.initialPrompt = false
      return
    }

    if (this.#editorContents.containsTextBackUntil(this.trigger)) {
      this.#showFilteredOptions()
    } else {
      this.#hidePopover()
    }
  }

  #showFilteredOptions() {
    const filter = this.#editorContents.textBackUntil(this.trigger)
    const filteredListItems = this.source.buildListItemElements(filter)
    this.#popoverElement.innerHTML = ""
    this.#popoverElement.append(...filteredListItems)
    this.#selectFirstOption()
  }

  #handleKeydownOnPopover = (event) => {
    if (event.key === "Escape") {
      this.#hidePopover()
      this.#editorElement.focus()
      event.stopPropagation()
    } else if (event.key === "ArrowDown") {
      this.#moveSelectionDown()
      event.preventDefault()
    } else if (event.key === "ArrowUp") {
      this.#moveSelectionUp()
      event.preventDefault()
    }
  }

  #moveSelectionDown() {
    const nextIndex = this.#selectedIndex + 1
    if (nextIndex < this.#listItemElements.length) this.#selectOption(this.#listItemElements[nextIndex])
  }

  #moveSelectionUp() {
    const previousIndex = this.#selectedIndex - 1
    if (previousIndex >= 0) this.#selectOption(this.#listItemElements[previousIndex])
  }

  get #selectedIndex() {
    return this.#listItemElements.findIndex((item) => item.hasAttribute("aria-selected"))
  }

  get #selectedListItem() {
    return this.#listItemElements[this.#selectedIndex]
  }

  #handleSelectedOption(event) {
    event.preventDefault()

    this.#replaceTriggerWithSelectedItem()
    this.#hidePopover()
    this.#editorElement.focus()

    return true
  }

  #replaceTriggerWithSelectedItem() {
    const promptItem = this.source.promptItemFor(this.#selectedListItem)

    if (!promptItem) { return }

    const template = promptItem.querySelector("template[type='editor']")
    const stringToReplace = `${this.trigger}${this.#editorContents.textBackUntil(this.trigger)}`
    const attachmentNode = new CustomActionTextAttachmentNode({ sgid: promptItem.getAttribute("sgid"), alt: "Some attachment", innerHtml: template.innerHTML })
    this.#editorContents.replaceTextBackUntil(stringToReplace, attachmentNode)
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
