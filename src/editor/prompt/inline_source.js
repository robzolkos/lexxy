import { createElement } from "../../helpers/html_helper";
import BaseSource from "./base_source"

export default class InlineSource extends BaseSource {
  constructor(inlinePromptItemElements) {
    super()
    this.inlinePromptItemElements = Array.from(inlinePromptItemElements)
  }

  async get promptItemElements() {
    return Promise.resolve([ this.inlinePromptItemElements ])
  }
}
