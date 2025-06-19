import { createElement } from "../../helpers/html_helper"
import BaseSource from "./base_source"

export default class LocalFilterSource extends BaseSource {
  async buildListItems(filter = "") {
    const listItems = []
    this.promptItemByListItem = new WeakMap()

    const promptItems = await this.fetchPromptItems()
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

  promptItemFor(listItem) {
    return this.promptItemByListItem.get(listItem)
  }
}
