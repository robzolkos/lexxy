import { marked } from "marked"

export default class Clipboard {
  constructor(editorElement) {
    this.editor = editorElement.editor
    this.contents = editorElement.contents
  }

  paste(event) {
    const clipboardData = event.clipboardData

    if (!clipboardData) return false

    if (this.#isOnlyPlainTextPasted(clipboardData)) {
      this.#pasteMarkdown(clipboardData)
      return true
    }

    for (const item of clipboardData.items) {
      const file = item.getAsFile()
      if (!file) continue

      this.contents.uploadFile(file)
    }
  }

  #isOnlyPlainTextPasted(clipboardData) {
    const types = Array.from(clipboardData.types)
    return types.length === 1 && types[0] === "text/plain"
  }

  #pasteMarkdown(clipboardData) {
    const item = clipboardData.items[0]
    item.getAsString((text)=>{
      const html = marked(text)
      this.contents.insertHtml(html)
    })
  }
}
