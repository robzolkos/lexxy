import { createElement } from "../../helpers/html_helper";

export default class PromptInlineSource {
  constructor(promptItemElements) {
    this.promptItemElements = Array.from(promptItemElements)
  }

  buildListItemElements() {
    return this.promptItemElements.map(promptItemElement => this.#buildListItemElementFor(promptItemElement))
  }

  #buildListItemElementFor(promptItemElement) {
    const template = promptItemElement.querySelector("template[type='menu']")
    const fragment = template.content.cloneNode(true)
    const listItemElement = createElement("li")
    listItemElement.appendChild(fragment)
    return listItemElement
  }
}
