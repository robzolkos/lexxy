import { createElement } from "../../helpers/html_helper"
import BaseSource from "./base_source"

export default class RemoteFilterSource extends BaseSource {
  constructor(url) {
    super()
    this.baseURL = url
  }

  async buildListItems(filter = "") {
    const promptItems = await this.loadPromptItemsFromUrl(this.#urlFor(filter))
    const listItems = this.#buildListItemsFromPromptItems(promptItems)

    return Promise.resolve(listItems)
  }

  promptItemFor(listItem) {
    return this.promptItemByListItem.get(listItem)
  }

  #urlFor(filter) {
    const url = new URL(this.baseURL, window.location.origin)
    url.searchParams.append("filter", filter)
    console.debug("URL=", url.toString());
    return url.toString()
  }

  #buildListItemsFromPromptItems(promptItems) {
    const listItems = []
    this.promptItemByListItem = new WeakMap()
    promptItems.forEach((promptItem) => {
      const listItem = this.buildListItemElementFor(promptItem)
      this.promptItemByListItem.set(listItem, promptItem)
      listItems.push(listItem)
    })
    return listItems
  }
}
