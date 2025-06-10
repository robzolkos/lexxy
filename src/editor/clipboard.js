export default class Clipboard {
  constructor(editorElement) {
    this.editor = editorElement.editor
    this.contents = editorElement.contents
    console.debug("this.contents=", this.contents);
  }

  paste(event) {
    const clipboardData = event.clipboardData

    // console.log("Pasted MIME types:", Array.from(clipboardData?.items || []).map(item => item.type))
    //
    // for (const item of clipboardData?.items || []) {
    //   if (item.type === "text/plain") {
    //     item.getAsString((text) => console.log("Pasted text:", text))
    //   }
    //   if (item.type === "text/html") {
    //     item.getAsString((html) => console.log("Pasted HTML:", html))
    //   }
    // }

    if (!clipboardData) return false

    for (const item of clipboardData.items) {
      const file = item.getAsFile()
      if (!file) continue

      this.contents.uploadFile(file)
    }
  }
}
