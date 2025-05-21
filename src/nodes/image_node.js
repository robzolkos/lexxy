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
      img: (domNode) => {
        if (domNode instanceof HTMLImageElement) {
          return { conversion: () => new ImageNode(domNode.src, domNode.alt), priority: 1 }
        }
      },
      figure: (domNode) => {
        const img = domNode.querySelector('img')
        if (img instanceof HTMLImageElement) {
          return { conversion: () => new ImageNode(img.src, img.alt), priority: 1, }
        }
      }
    }
  }

  constructor(src, altText, key) {
    super(key)
    this.src = src
    this.altText = altText
  }

  createDOM() {
    const { figure } = createFigureWithImage({ image: { src: this.src, alt: this.alt } })
    return figure
  }

  updateDOM() {
    return false // No need to re-render
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
    const { figure } = createFigureWithImage({ image: { src: this.src, alt: this.alt } })
    return { element: figure }
  }

  decorate() {
    return null
  }
}
