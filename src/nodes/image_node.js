import { DecoratorNode } from "lexical"
import { createFigureWithImage } from "../helpers/html_helper";

export class ImageNode extends DecoratorNode {
  static getType() {
    return "image"
  }

  static clone(node) {
    return new ImageNode(node.src, node.altText, node.__key)
  }

  static importJSON(serializedNode) {
    return new ImageNode(serializedNode.src, serializedNode.altText)
  }

  static importDOM() {
    return {
      figure: (figure) => {
        const image = figure.querySelector("img")
        if (image instanceof HTMLImageElement) {
          return { conversion: () => { node: new ImageNode(image.src, image.alt) }, priority: 1 }
        }
      }
    }
  }

  constructor(src, altText, contentType, key) {
    super(key)
    this.src = src
    this.altText = altText
    this.contentType = contentType || ""
  }

  createDOM() {
    return this.#createFigureWithImage()
  }

  updateDOM() {
    return false
  }

  exportJSON() {
    return {
      type: "image",
      version: 1,
      src: this.src,
      altText: this.altText,
    }
  }

  exportDOM() {
    const figure = this.#createFigureWithImage()
    return { element: figure }
  }

  decorate() {
    return null
  }

  #createFigureWithImage() {
    const { figure } = createFigureWithImage({ image: { src: this.src, alt: this.altText }, "data-content-type": this.contentType })
    return figure
  }
}
