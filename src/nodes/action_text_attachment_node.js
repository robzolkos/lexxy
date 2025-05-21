import { DecoratorNode } from "lexical"
import { createElement, createFigureWithImage } from "../helpers/html_helper";

const PROPERTIES = [
  "src",
  "altText",
  "contentType"
]

export class ActionTextAttachmentNode extends DecoratorNode {
  static getType() {
    return "action_text_attachment"
  }

  static clone(node) {
    return new ActionTextAttachmentNode({ node }, node.__key)
  }

  static importDOM() {
    return {
      figure: (figure) => {
        const image = figure.querySelector("img")
        if (image instanceof HTMLImageElement) {
          return { conversion: () => ({ node: new ActionTextAttachmentNode({ src: image.src, altText: image.altText }) }), priority: 1 }
        }
      }
    }
  }

  constructor({ src, altText, contentType }, key) {
    super(key)
    this.src = src
    this.altText = altText
    this.contentType = contentType || ""
  }

  createDOM() {
    const { figure } = createFigureWithImage({ image: { src: this.src, alt: this.altText }, "data-content-type": this.contentType })
    return figure
  }

  updateDOM() {
    return false
  }

  exportJSON() {
    return {
      type: "action_text_attachment",
      version: 1,
      src: this.src,
      altText: this.altText,
      contentType: this.contentType
    }
  }

  exportDOM() {
    const attachment = createElement("action-text-attachment", {
      sgid: "",
      url: "",
      "content-type": "",
      filname: "",
      filesize: "",
      width: "",
      presentation: "gallery"
    })
    return { element: attachment }
  }

  decorate() {
    return null
  }
}
