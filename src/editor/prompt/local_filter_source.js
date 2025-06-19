import { createElement } from "../../helpers/html_helper"
import BaseSource from "./base_source"

export default class LocalFilterSource extends BaseSource {
  async buildListItems(filter = "") {
    const promptItems = await this.fetchPromptItems()
    return this.#buildListItemsFromPromptItems(promptItems, filter)
  }

  promptItemFor(listItem) {
    return this.promptItemByListItem.get(listItem)
  }

  #buildListItemsFromPromptItems(promptItems, filter) {
    const listItems = []
    this.promptItemByListItem = new WeakMap()
    promptItems.forEach((promptItem) => {
      const searchableText = promptItem.getAttribute("search")

      if (!filter || searchableText.toLowerCase().includes(filter.toLowerCase())) {
        const listItem = this.buildListItemElementFor(promptItem)
        this.promptItemByListItem.set(listItem, promptItem)
        listItems.push(listItem)
      }
    })

    return listItems
  }
}
