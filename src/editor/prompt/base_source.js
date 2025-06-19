import { createElement } from "../../helpers/html_helper";

export default class BaseSource {
  async buildListItemElements(filter = "") {
    const listItems = []
    this.promptItemByListItem = new WeakMap()

    const promptItems = await this.fetchPromptItems()
    promptItems.forEach((promptItem) => {
      const searchableText = promptItem.getAttribute("search")

      if (!filter || searchableText.toLowerCase().includes(filter.toLowerCase())) {
        let listItem = this.#buildListItemElementFor(promptItem)
        this.promptItemByListItem.set(listItem, promptItem)
        listItems.push(listItem)
      }
    })

    return listItems
  }

  // Template method to override
  async fetchPromptItems() {
    return Promise.resolve([])
  }

  promptItemFor(listItem) {
    return this.promptItemByListItem.get(listItem)
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
