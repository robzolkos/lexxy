import { createElement } from "../../helpers/html_helper"

export default class BaseSource {
  // Template method to override
  async buildListItems(filter = "") {
    return Promise.resolve([])
  }

  // Template method to override
  promptItemFor(listItem) {
    return null
  }

  // Protected

  buildListItemElementFor(promptItemElement) {
    const template = promptItemElement.querySelector("template[type='menu']")
    const fragment = template.content.cloneNode(true)
    const listItemElement = createElement("li", { role: "option" })
    listItemElement.classList.add("lexical-prompt-menu__item")
    listItemElement.appendChild(fragment)
    return listItemElement
  }

  async loadPromptItemsFromUrl(url) {
    try {
      const response = await fetch(url)
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
