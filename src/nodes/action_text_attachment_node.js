import { DecoratorNode } from "lexical"
import { createElement } from "../helpers/html_helper";
import { bytesToHumanSize } from "../helpers/storage_helper";

export class ActionTextAttachmentNode extends DecoratorNode {
  static getType() {
    return "action_text_attachment"
  }

  static clone(node) {
    return new ActionTextAttachmentNode({ node }, node.__key)
  }

  static importJSON(serializedNode) {
    return new ActionTextAttachmentNode({ serializedNode })
  }

  static importDOM() {
    return {
      "action-text-attachment": (attachment) => {
        return {
          conversion: () => ({
            node: new ActionTextAttachmentNode({
              sgid: attachment.getAttribute("sgid"),
              src: attachment.getAttribute("url"),
              altText: attachment.getAttribute("fiçlename"),
              caption: attachment.getAttribute("caption"),
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

  constructor({ sgid, src, altText, caption, contentType, fileName, fileSize, width, height }, key) {
    super(key)

    this.sgid = sgid
    this.src = src
    this.altText = altText
    this.caption = caption
    this.contentType = contentType || ""
    this.fileName = fileName
    this.fileSize = fileSize
    this.width = width
    this.height = height
  }

  createDOM() {
    const figure = createElement("figure", { className: "attachment", "data-content-type": this.contentType })

    figure.addEventListener("click", (event) => {
      this.#select(figure)
    })

    if (this.#isImage) {
      figure.appendChild(this.#createDOMForImage())
    } else {
      figure.appendChild(this.#createDOMForNotImage())
    }

    return figure
  }

  updateDOM() {
    return false
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

  exportJSON() {
    return {
      type: "action_text_attachment",
      version: 1,
      sgid: this.sgid,
      src: this.src,
      altText: this.altText,
      caption: this.caption,
      contentType: this.contentType,
      fileName: this.fileName,
      fileSize: this.fileSize,
      width: this.width,
      height: this.height
    }
  }

  decorate() {
    return null
  }



  get #isImage() {
    return this.contentType.startsWith("image/")
  }

  #createDOMForImage() {
    return createElement("img", { src: this.src, alt: this.altText })
  }

  #createDOMForNotImage() {
    const figcaption = createElement("figcaption", { className: "attachment__caption" })

    const nameSpan = createElement("span", { className: "attachment__name", textContent: this.fileName })
    const sizeSpan = createElement("span", { className: "attachment__size", textContent: bytesToHumanSize(this.fileSize) })

    figcaption.appendChild(nameSpan)
    figcaption.appendChild(sizeSpan)

    return figcaption
  }

  #select(figure) {
    const event = new CustomEvent("lexical:node-selected", {
      detail: { key: this.getKey() },
      bubbles: true,
    })
    figure.dispatchEvent(event)
  }
}
