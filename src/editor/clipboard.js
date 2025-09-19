import { $convertFromMarkdownString, TRANSFORMERS } from "@lexical/markdown"
import { $getSelection, $isRangeSelection } from "lexical"
import { isUrl } from "../helpers/string_helper";
import { nextFrame } from "../helpers/timing_helpers";

export default class Clipboard {
  constructor(editorElement) {
    this.editorElement = editorElement
    this.editor = editorElement.editor
    this.contents = editorElement.contents
  }

  paste(event) {
    const clipboardData = event.clipboardData

    if (!clipboardData) return false

    if (this.#isOnlyPlainTextPasted(clipboardData)) {
      this.#pastePlainText(clipboardData)
      event.preventDefault()
      return true
    }

    this.#handlePastedFiles(clipboardData)
  }

  #isOnlyPlainTextPasted(clipboardData) {
    const types = Array.from(clipboardData.types)
    return types.length === 1 && types[0] === "text/plain"
  }

  #pastePlainText(clipboardData) {
    const item = clipboardData.items[0]
    item.getAsString((text) => {
      if (isUrl(text) && this.contents.hasSelectedText()) {
        this.contents.createLinkWithSelectedText(text)
      } else {
        this.#pasteMarkdown(text)
      }
    })
  }

  #pasteMarkdown(text) {
    this.editor.update(() => {
      const selection = $getSelection()
      if (!$isRangeSelection(selection)) return

      // Use Lexical's native markdown parser
      const nodes = $convertFromMarkdownString(text, TRANSFORMERS)

      if (nodes.length > 0) {
        selection.insertNodes(nodes)
      } else {
        // Fallback: insert as plain text if markdown conversion fails
        selection.insertText(text)
      }
    })
  }

  #handlePastedFiles(clipboardData) {
    if (!this.editorElement.supportsAttachments) return

    this.#preservingScrollPosition(() => {
      for (const item of clipboardData.items) {
        const file = item.getAsFile()
        if (!file) continue

        this.contents.uploadFile(file)
      }
    })
  }

  // Deals with an issue in Safari where it scrolls to the tops after pasting attachments
  async #preservingScrollPosition(callback) {
    const scrollY = window.scrollY
    const scrollX = window.scrollX

    callback()

    await nextFrame()

    window.scrollTo(scrollX, scrollY)
    this.editor.focus()
  }
}
