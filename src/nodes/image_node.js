import { DecoratorNode } from "lexical"

export class ImageNode extends DecoratorNode {
  src
  altText

  static getType() {
    return "image"
  }

  static clone(node) {
    return new ImageNode(node.src, node.altText, node.__key)
  }

  constructor(src, altText = "", key) {
    super(key)
    this.src = src
    this.altText = altText
  }

  decorate() {
    return null
  }

  createDOM() {
    const figure = document.createElement("figure")
    const img = document.createElement("img")
    img.src = this.src
    img.alt = this.altText
    img.className = "editor-image"
    img.style.maxWidth = "100%"
    img.style.display = "block"
    img.style.margin = "1em 0"
    figure.appendChild(img)
    return figure
  }

  updateDOM() {
    return false // No need to re-render
  }

  static importJSON(serializedNode) {
    return new ImageNode(serializedNode.src, serializedNode.altText)
  }

  exportJSON() {
    return {
      type: "image",
      version: 1,
      src: this.src,
      altText: this.altText,
    }
  }

  static importDOM() {
    return {
      img: (domNode) => {
        if (domNode instanceof HTMLImageElement) {
          return {
            conversion: () =>
              new ImageNode(domNode.src, domNode.alt),
            priority: 1,
          }
        }
        return null
      },
      figure: (domNode) => {
        const img = domNode.querySelector('img')
        if (img instanceof HTMLImageElement) {
          return {
            conversion: () =>
              new ImageNode(img.src, img.alt),
            priority: 1,
          }
        }
        return null
      }
    }
  }

  exportDOM() {
    const figure = document.createElement("figure")
    const img = document.createElement("img")
    img.src = this.src
    img.alt = this.altText
    figure.appendChild(img)
    return { element: figure }
  }
}
