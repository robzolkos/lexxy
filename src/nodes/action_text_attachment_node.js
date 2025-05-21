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
      "action-text-attachment": (attachment) => {
        return {
          conversion: () => ({ node: new ActionTextAttachmentNode({
              sgid: attachment.getAttribute("sgid"),
              src: attachment.getAttribute("url"),
              altText: attachment.getAttribute("filename"),
              contentType: attachment.getAttribute("content-type"),
              fileName: attachment.getAttribute("filename"),
              fileSize: attachment.getAttribute("filesize"),
              width: attachment.getAttribute("width"),
              height: attachment.getAttribute("height")
            })
          }),
          priority: 1
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
    if (this.#isImage) {
      return this.#createDOMForImage()
    } else {
      return this.#createDOMForNotImage()
    }
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

  get #isImage() {
    return this.contentType.startsWith("image/")
  }

  #createDOMForImage() {
    const { figure } = createFigureWithImage({ image: { src: this.src, alt: this.altText }, "data-content-type": this.contentType })
    return figure
  }

  #createDOMForNotImage() {
    const figure = createElement("figure", { className: "attachment", "data-content-type": this.contentType })
    const figcaption = createElement("figcaption", { className: "attachment__caption" })

    const nameSpan = createElement("span", { className: "attachment__name", textContent: this.fileName })
    const sizeSpan = createElement("span", { className: "attachment__size", textContent: this.fileSize })

    figcaption.appendChild(nameSpan)
    figcaption.appendChild(sizeSpan)
    figure.appendChild(figcaption)

    return figure
  }
}
