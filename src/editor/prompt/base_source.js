import { createElement, generateDomId, parseHtml } from "../../helpers/html_helper"

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
    const listItemElement = createElement("li", { role: "option", id: generateDomId("prompt-item") })
    listItemElement.classList.add("lexical-prompt-menu__item")
    listItemElement.appendChild(fragment)
    return listItemElement
  }

  async loadPromptItemsFromUrl(url) {
    try {
      const response = await fetch(url)
      const html = await response.text()
      const promptItems = parseHtml(html).querySelectorAll("lexical-prompt-item")
      return Promise.resolve(Array.from(promptItems))
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
