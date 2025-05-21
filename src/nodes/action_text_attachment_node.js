import { DecoratorNode } from "lexical"
import { createElement, createFigureWithImage } from "../helpers/html_helper";

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

  constructor({ sgid, src, altText, contentType, fileName, fileSize, width, height }, key) {
    super(key)

    this.sgid = sgid
    this.src = src
    this.altText = altText
    this.contentType = contentType || ""
    this.fileName = fileName
    this.fileSize = fileSize
    this.width = width
    this.height = height
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
      sgid: this.sgid,
      url: this.src,
      "content-type": this.contentType,
      filename: this.fileName,
      filesize: this.fileSize,
      width: this.width,
      height: this.height,
      presentation: "gallery"
    })

    return { element: attachment }
  }

  decorate() {
    return null
  }
}
