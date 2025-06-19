import { createElement, generateDomId, parseHtml } from "../helpers/html_helper";
import { COMMAND_PRIORITY_HIGH, KEY_ENTER_COMMAND } from "lexical";
import { CustomActionTextAttachmentNode } from "../nodes/custom_action_text_attachment_node";
import { isPath, isUrl } from "../helpers/string_helper";
import InlinePromptSource from "../editor/prompt/inline_source";
import DeferredPromptSource from "../editor/prompt/deferred_source";
import RemoteFilterSource from "../editor/prompt/remote_filter_source";
import { $generateNodesFromDOM } from "@lexical/html";

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
    const src = this.getAttribute("src");
    if (isUrl(src) || isPath(src)) {
      if (this.hasAttribute("remote-filtering")) {
        return new RemoteFilterSource(src)
      } else {
        return new DeferredPromptSource(src)
      }
    } else {
      return new InlinePromptSource(document.getElementById(src).querySelectorAll("lexical-prompt-item"))
    }
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

  async #showPopover() {
    this.popoverElement ??= await this.#buildPopover()
    this.popoverElement.classList.toggle("lexical-prompt-menu--visible", true)
    await this.#filterOptions()
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
    return Array.from(this.popoverElement.querySelectorAll("li"))
  }

  #selectOption(listItem) {
    this.#clearSelection();
    listItem.toggleAttribute("aria-selected", true)
    this.#editorContentElement.setAttribute("aria-controls", this.popoverElement.id)
    this.#editorContentElement.setAttribute("aria-activedescendant", listItem.id)
    this.#editorContentElement.setAttribute("aria-haspopup", "listbox")
  }

  #clearSelection() {
    this.#listItemElements.forEach((item) => { item.toggleAttribute("aria-selected", false) })
    this.#editorContentElement.removeAttribute("aria-controls")
    this.#editorContentElement.removeAttribute("aria-activedescendant")
    this.#editorContentElement.removeAttribute("aria-haspopup")
  }

  #positionPopover() {
    const { x, y } = this.#selection.cursorPosition
    const editorRect = this.#editorElement.getBoundingClientRect()
    const contentRect = this.#editorContentElement.getBoundingClientRect()
    const verticalOffset = contentRect.top - editorRect.top

    this.popoverElement.style.left = `${x}px`
    this.popoverElement.style.top = `${y + verticalOffset}px`
  }

  #hidePopover() {
    this.#clearSelection()
    this.popoverElement.classList.toggle("lexical-prompt-menu--visible", false)
    this.#editorElement.removeEventListener("actiontext:change", this.#filterOptions)
    this.#editorElement.removeEventListener("keydown", this.#handleKeydownOnPopover)
    this.unregisterEnterListener()
  }

  #filterOptions = async () => {
    if (this.initialPrompt) {
      this.initialPrompt = false
      return
    }

    if (this.#editorContents.containsTextBackUntil(this.trigger)) {
      await this.#showFilteredOptions()
    } else {
      this.#hidePopover()
    }
  }

  async #showFilteredOptions() {
    const filter = this.#editorContents.textBackUntil(this.trigger)
    const filteredListItems = await this.source.buildListItems(filter)
    this.popoverElement.innerHTML = ""
    this.popoverElement.append(...filteredListItems)
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

    if (this.hasAttribute("insert-editable-text")) {
      this.#insertTemplateAsEditableText(template, stringToReplace)
    } else {
      this.#insertTemplateAsAttachment(promptItem, template, stringToReplace)
    }
  }

  #insertTemplateAsEditableText(template, stringToReplace) {
    const nodes = $generateNodesFromDOM(this.#editor, parseHtml(`${template.innerHTML}`))
    this.#editorContents.replaceTextBackUntil(stringToReplace, nodes)
  }

  #insertTemplateAsAttachment(promptItem, template, stringToReplace) {
    const attachmentNode = new CustomActionTextAttachmentNode({ sgid: promptItem.getAttribute("sgid"), alt: "Some attachment", innerHtml: template.innerHTML })
    this.#editorContents.replaceTextBackUntil(stringToReplace, attachmentNode)
  }

  get #editorContents() {
    return this.#editorElement.contents
  }

  get #editorContentElement() {
    return this.#editorElement.editorContentElement
  }

  async #buildPopover() {
    const popoverContainer = createElement("ul", { role: "listbox", id: generateDomId("prompt-popover") }) // Avoiding [popover] due to not being able to position at an arbitrary X, Y position.
    popoverContainer.classList.add("lexical-prompt-menu")
    popoverContainer.style.position = "absolute"
    popoverContainer.append(...(await this.source.buildListItems()))
    this.#editorElement.appendChild(popoverContainer)
    return popoverContainer
  }
}

customElements.define("lexical-prompt", LexicalPromptElement)
