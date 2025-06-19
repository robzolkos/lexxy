import LocalFilterSource from "./local_filter_source"

export default class DeferredPromptSource extends LocalFilterSource {
  constructor(url) {
    super()
    this.url = url

    this.fetchPromptItems()
  }

  async fetchPromptItems() {
    this.promptItems ??= await this.loadPromptItemsFromUrl(this.url)

    return Promise.resolve(this.promptItems)
  }
}
