import { marked } from "marked"
import { isUrl } from "../helpers/string_helper";

export default class Clipboard {
  constructor(editorElement) {
    this.editor = editorElement.editor
    this.contents = editorElement.contents
  }

  paste(event) {
    const clipboardData = event.clipboardData

    if (!clipboardData) return false

    if (this.#isOnlyPlainTextPasted(clipboardData)) {
      this.#pastePlainText(clipboardData)
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
    const html = marked(text)
    this.contents.insertHtml(html)
  }

  #handlePastedFiles(clipboardData) {
    for (const item of clipboardData.items) {
      const file = item.getAsFile()
      if (!file) continue

      this.contents.uploadFile(file)
    }
  }
}
