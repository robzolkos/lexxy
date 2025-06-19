import { createElement } from "../../helpers/html_helper";
import BaseSource from "./base_source"

export default class InlinePromptSource extends BaseSource {
  constructor(inlinePromptItems) {
    super()
    this.inlinePromptItemElements = Array.from(inlinePromptItems)
  }

  async fetchPromptItems() {
    return Promise.resolve(this.inlinePromptItemElements)
  }
}
