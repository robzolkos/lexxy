import LocalFilterSource from "./local_filter_source"

export default class InlinePromptSource extends LocalFilterSource {
  constructor(inlinePromptItems) {
    super()
    this.inlinePromptItemElements = Array.from(inlinePromptItems)
  }

  async fetchPromptItems() {
    return Promise.resolve(this.inlinePromptItemElements)
  }
}
