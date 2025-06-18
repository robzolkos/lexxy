import { createElement } from "../../helpers/html_helper";

export default class PromptInlineSource {
  constructor(promptItemElements) {
    this.promptItemElements = Array.from(promptItemElements)
  }

  buildListItemElements(filter = "") {
    const listItems = []

    this.promptItemElements.forEach((promptItemElement) => {
      const searchableText = promptItemElement.getAttribute("search")

      if (!filter || searchableText.toLowerCase().includes(filter.toLowerCase())) {
        listItems.push(this.#buildListItemElementFor(promptItemElement))
      }
    })

    return listItems
  }

  #buildListItemElementFor(promptItemElement) {
    const template = promptItemElement.querySelector("template[type='menu']")
    const fragment = template.content.cloneNode(true)
    const listItemElement = createElement("li")
    listItemElement.appendChild(fragment)
    return listItemElement
  }
}
