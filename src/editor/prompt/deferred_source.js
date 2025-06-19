import { createElement } from "../../helpers/html_helper";
import BaseSource from "./base_source"

export default class DeferredPromptSource extends BaseSource {
  constructor(url) {
    super()
    this.url = url
  }

  async fetchPromptItems() {
    try {
      const response = await fetch(this.url)
      const html = await response.text()
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, "text/html")
      const promptItems = doc.querySelectorAll("lexical-prompt-item")
      return Promise.resolve(Array.from(promptItems))
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
