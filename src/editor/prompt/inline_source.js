import { createElement } from "../../helpers/html_helper";

export default class PromptInlineSource {
  constructor(promptItemElements) {
    this.promptItemElements = Array.from(promptItemElements)
  }

  buildListItemElements(filter = "") {
    const listItems = []
    this.promptItemByListItem = new WeakMap()

    this.promptItemElements.forEach((promptItemElement) => {
      const searchableText = promptItemElement.getAttribute("search")

      if (!filter || searchableText.toLowerCase().includes(filter.toLowerCase())) {
        let listItem = this.#buildListItemElementFor(promptItemElement)
        this.promptItemByListItem.set(listItem, promptItemElement)
        listItems.push(listItem)
      }
    })

    return listItems
  }

  editorTemplateFor(listItem) {
    const promptItemElement = this.promptItemByListItem.get(listItem)
    return promptItemElement.querySelector("template[type='editor']")
  }

  #buildListItemElementFor(promptItemElement) {
    const template = promptItemElement.querySelector("template[type='menu']")
    const fragment = template.content.cloneNode(true)
    const listItemElement = createElement("li")
    listItemElement.classList.add("lexical-prompt-menu__item")
    listItemElement.appendChild(fragment)
    return listItemElement
  }
}
