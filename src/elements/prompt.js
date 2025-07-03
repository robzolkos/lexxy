import { createElement, generateDomId, parseHtml } from "../helpers/html_helper"
import { COMMAND_PRIORITY_HIGH, KEY_ENTER_COMMAND, KEY_TAB_COMMAND, $isTextNode, $isRangeSelection, $getSelection, $isNodeSelection, $getNodeByKey } from "lexical"
import { CustomActionTextAttachmentNode } from "../nodes/custom_action_text_attachment_node"
import { isPath, isUrl } from "../helpers/string_helper"
import InlinePromptSource from "../editor/prompt/inline_source"
import DeferredPromptSource from "../editor/prompt/deferred_source"
import RemoteFilterSource from "../editor/prompt/remote_filter_source"
import { $generateNodesFromDOM } from "@lexical/html"

const NOTHING_FOUND_DEFAULT_MESSAGE = "Nothing found"

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
    const src = this.getAttribute("src")
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
    const unregister = this.#editor.registerUpdateListener(() => {
      this.#editor.read(() => {
        const selection = $getSelection()
        if (!selection) return
        let node
        if ($isRangeSelection(selection)) {
          node = selection.anchor.getNode()
        } else if ($isNodeSelection(selection)) {
          [ node ] = selection.getNodes()
        }

        if (!node) return

        if ($isTextNode(node)) {
          const text = node.getTextContent().trim()
          const lastChar = [ ...text ].pop()

          if (lastChar === this.trigger) {
            unregister()
            this.#showPopover()
          }
        }
      })
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
    await this.#filterOptions()
    this.#positionPopover()
    this.popoverElement.classList.toggle("lexical-prompt-menu--visible", true)
    this.#selectFirstOption()

    this.#editorElement.addEventListener("keydown", this.#handleKeydownOnPopover)
    this.#editorElement.addEventListener("actiontext:change", this.#filterOptions)
    // We can't use a regular keydown for Enter as Lexical handles it first
    this.unregisterEnterListener = this.#editor.registerCommand(KEY_ENTER_COMMAND, this.#handleSelectedOption.bind(this), COMMAND_PRIORITY_HIGH)
    this.unregisterTabListener = this.#editor.registerCommand(KEY_TAB_COMMAND, this.#handleSelectedOption.bind(this), COMMAND_PRIORITY_HIGH)
  }

  #selectFirstOption() {
    const firstOption = this.#listItemElements[0]

    if (firstOption) {
      this.#selectOption(firstOption)
    }
  }

  get #listItemElements() {
    return Array.from(this.popoverElement.querySelectorAll(".lexical-prompt-menu__item"))
  }

  #selectOption(listItem) {
    this.#clearSelection()
    listItem.toggleAttribute("aria-selected", true)
    listItem.focus()
    this.#editorElement.focus()
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
    const { x, y, fontSize } = this.#selection.cursorPosition
    const editorRect = this.#editorElement.getBoundingClientRect()
    const contentRect = this.#editorContentElement.getBoundingClientRect()
    const verticalOffset = contentRect.top - editorRect.top

    if (this.popoverElement.hasAttribute("data-positioned")) { return }

    const popoverRect = this.popoverElement.getBoundingClientRect()
    const isClippedAtBottom = popoverRect.bottom > window.innerHeight

    this.popoverElement.style.left = `${x}px`

    if (isClippedAtBottom) {
      this.popoverElement.style.bottom = `${y - verticalOffset + fontSize}px`
    } else {
      this.popoverElement.style.top = `${y + verticalOffset}px`
    }

    this.popoverElement.toggleAttribute("data-positioned", true)
  }

  #hidePopover() {
    this.#clearSelection()
    this.popoverElement.classList.toggle("lexical-prompt-menu--visible", false)
    this.#editorElement.removeEventListener("actiontext:change", this.#filterOptions)
    this.#editorElement.removeEventListener("keydown", this.#handleKeydownOnPopover)
    this.unregisterEnterListener()
    this.unregisterTabListener()
    this.#addTriggerListener()
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

    if (filteredListItems.length > 0) {
      this.#showResults(filteredListItems)
    } else {
      this.#showEmptyResults()
    }
    this.#selectFirstOption()
  }

  #showResults(filteredListItems) {
    this.popoverElement.classList.remove("lexical-prompt-menu--empty")
    this.popoverElement.append(...filteredListItems)
  }

  #showEmptyResults() {
    this.popoverElement.classList.add("lexical-prompt-menu--empty")
    const el = createElement("li", { innerHTML: this.#emptyResultsMessage })
    el.classList.add("lexical-prompt-menu__item--empty")
    this.popoverElement.append(el)
  }

  get #emptyResultsMessage() {
    return this.getAttribute("empty-results") || NOTHING_FOUND_DEFAULT_MESSAGE
  }

  #handleKeydownOnPopover = (event) => {
    if (event.key === "Escape") {
      this.#hidePopover()
      this.#editorElement.focus()
      event.stopPropagation()
    } else if (event.key === "ArrowDown") {
      this.#moveSelectionDown()
      event.preventDefault()
      event.stopPropagation()
    } else if (event.key === "ArrowUp") {
      this.#moveSelectionUp()
      event.preventDefault()
      event.stopPropagation()
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
    event.stopPropagation()
    this.#optionWasSelected()
    return true
  }

  #optionWasSelected() {
    this.#replaceTriggerWithSelectedItem()
    this.#hidePopover()
    this.#editorElement.focus()
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
    this.#editor.update(() => {
      const nodes = $generateNodesFromDOM(this.#editor, parseHtml(`${template.innerHTML}`))
      this.#editorContents.replaceTextBackUntil(stringToReplace, nodes)
    })
  }

  #insertTemplateAsAttachment(promptItem, template, stringToReplace) {
    this.#editor.update(() => {
      const attachmentNode = new CustomActionTextAttachmentNode({ sgid: promptItem.getAttribute("sgid"), contentType: `application/vnd.actiontext.${this.name}`, innerHtml: template.innerHTML })
      this.#editorContents.replaceTextBackUntil(stringToReplace, attachmentNode)
    })
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
    popoverContainer.addEventListener("click", this.#handlePopoverClick)
    this.#editorElement.appendChild(popoverContainer)
    return popoverContainer
  }

  #handlePopoverClick = (event) => {
    const listItem = event.target.closest(".lexical-prompt-menu__item")
    if (listItem) {
      this.#selectOption(listItem)
      this.#optionWasSelected()
    }
  }
}

customElements.define("lexical-prompt", LexicalPromptElement)
