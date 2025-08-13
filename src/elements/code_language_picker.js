import { $isCodeNode, CODE_LANGUAGE_FRIENDLY_NAME_MAP, normalizeCodeLang } from "@lexical/code"
import { $getSelection, $isRangeSelection } from "lexical"
import { createElement } from "../helpers/html_helper";

export default class CodeLanguagePicker extends HTMLElement {
  connectedCallback() {
    this.editorElement = this.closest("lexical-editor")
    this.editor = this.editorElement.editor

    this.#attachLanguagePicker()
    this.#monitorForCodeBlockSelection()
  }

  #attachLanguagePicker() {
    this.languagePickerElement = this.#createLanguagePicker()

    this.languagePickerElement.addEventListener("change", () => {
      this.#updateCodeBlockLanguage(this.languagePickerElement.value)
    })

    this.languagePickerElement.style.position = "fixed"
    this.editorElement.appendChild(this.languagePickerElement)
  }

  #createLanguagePicker() {
    const selectElement = createElement("select", { hidden: true, className: "lexical-code-language-picker" })

    for (const [ value, label ] of Object.entries(this.#languages)) {
      const option = document.createElement("option")
      option.value = value
      option.textContent = label
      selectElement.appendChild(option)
    }

    return selectElement
  }

  get #languages() {
    const languages = { ...CODE_LANGUAGE_FRIENDLY_NAME_MAP }

    if (!languages.ruby) languages.ruby = "Ruby"

    const sortedEntries = Object.entries(languages)
      .sort(([ , a ], [ , b ]) => a.localeCompare(b))

    // Place the "plain" entry first, then the rest of language sorted alphabetically
    const plainIndex = sortedEntries.findIndex(([ key ]) => key === "plain")
    const plainEntry = sortedEntries.splice(plainIndex, 1)[0]
    return Object.fromEntries([ plainEntry, ...sortedEntries ])
  }

  #updateCodeBlockLanguage(language) {
    this.editor.update(() => {
      const codeNode = this.#getCurrentCodeNode()

      if (codeNode) {
        codeNode.setLanguage(language)
      }
    })
  }

  #monitorForCodeBlockSelection() {
    this.editor.registerUpdateListener(() => {
      this.editor.getEditorState().read(() => {
        const codeNode = this.#getCurrentCodeNode()

        if (codeNode) {
          this.#codeNodeWasSelected(codeNode)
        } else {
          this.#hideLanguagePicker()
        }
      })
    })
  }

  #getCurrentCodeNode() {
    const selection = $getSelection()

    if (!$isRangeSelection(selection)) {
      return null
    }

    const anchorNode = selection.anchor.getNode()
    const parentNode = anchorNode.getParent()

    if ($isCodeNode(anchorNode)) {
      return anchorNode
    } else if ($isCodeNode(parentNode)) {
      return parentNode
    }

    return null
  }

  #codeNodeWasSelected(codeNode) {
    const language = codeNode.getLanguage()

    this.#updateLanguagePickerWith(language)
    this.#positionLanguagePicker(codeNode)
  }

  #updateLanguagePickerWith(language) {
    if (this.languagePickerElement && language) {
      const normalizedLanguage = normalizeCodeLang(language)
      this.languagePickerElement.value = normalizedLanguage
    }
  }

  #positionLanguagePicker(codeNode) {
    const codeElement = this.editor.getElementByKey(codeNode.getKey())
    if (!codeElement) {
      this.#hideLanguagePicker()
      return
    }

    const rect = codeElement.getBoundingClientRect()

    this.#showLanguagePicker()
    this.languagePickerElement.style.top = `${rect.top}px`
    this.languagePickerElement.style.left = `${rect.right - this.languagePickerElement.offsetWidth}px`
  }

  #showLanguagePicker() {
    this.languagePickerElement.hidden = false
  }

  #hideLanguagePicker() {
    this.languagePickerElement.hidden = true
  }
}

customElements.define("lexical-code-language-picker", CodeLanguagePicker)
