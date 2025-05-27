import { DecoratorNode } from "lexical"
import { createAttachmentFigure, createElement, dispatchCustomEvent } from "../helpers/html_helper";
import { bytesToHumanSize, mimeTypeToExtension } from "../helpers/storage_helper";

export class ActionTextAttachmentNode extends DecoratorNode {
  static getType() {
    return "action_text_attachment"
  }

  static clone(node) {
    return new ActionTextAttachmentNode({ ...node }, node.__key);
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
              previewable: attachment.getAttribute("previewable"),
              altText: attachment.getAttribute("alt"),
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
      },
      "img": (img) => {
        return {
          conversion: () => ({
            node: new ActionTextAttachmentNode({
              src: img.getAttribute("src"),
              contentType: "image/*",
              width: img.getAttribute("width"),
              height: img.getAttribute("height")
            })
          }),
          priority: 1
        }
      }
    }
  }

  constructor({ sgid, src, previewable, altText, caption, contentType, fileName, fileSize, width, height }, key) {
    super(key)

    this.sgid = sgid
    this.src = src
    this.previewable = previewable
    this.altText = altText || ""
    this.caption = caption || ""
    this.contentType = contentType || ""
    this.fileName = fileName
    this.fileSize = fileSize
    this.width = width
    this.height = height
  }

  createDOM() {
    const figure = createAttachmentFigure(this.contentType)

    figure.addEventListener("click", (event) => {
      this.#select(figure)
    })

    if (this.#isImage || this.previewable) {
      figure.appendChild(this.#createDOMForImage())
      figure.appendChild(this.#createEditableCaption())
    } else {
      figure.appendChild(this.#createDOMForNotImage())
    }

    return figure
  }

  updateDOM() {
    return true
  }

  isInline() {
    return false
  }

  exportDOM() {
    const attachment = createElement("action-text-attachment", {
      sgid: this.sgid,
      previewable: this.previewable || null,
      url: this.src,
      alt: this.altText,
      caption: this.caption,
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
      previewable: this.previewable,
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

  isInline() {
    return true
  }

  get #isImage() {
    return this.contentType.startsWith("image/")
  }

  #createDOMForImage() {
    return createElement("img", { src: this.src, alt: this.altText })
  }

  #createDOMForNotImage() {
    const figcaption = createElement("figcaption", { className: "attachment__caption" })

    const nameSpan = createElement("span", { className: "attachment__name", textContent: this.caption || this.fileName })
    const sizeSpan = createElement("span", { className: "attachment__size", textContent: bytesToHumanSize(this.fileSize) })

    figcaption.appendChild(nameSpan)
    figcaption.appendChild(sizeSpan)

    return figcaption
  }

  #select(figure) {
    dispatchCustomEvent(figure, "lexical:node-selected", { key: this.getKey() })
  }

  #createEditableCaption() {
    const caption = createElement("figcaption", { className: "attachment__caption" })
    const input = createElement("input", {
      type: "text",
      class: "input",
      value: this.caption,
      placeholder: this.fileName
    })

    input.addEventListener("focusin", () => input.placeholder = "Add caption...")
    input.addEventListener("blur", this.#handleCaptionInputBlurred.bind(this))
    input.addEventListener("keydown", this.#handleCaptionInputKeydown.bind(this))

    caption.appendChild(input)

    return caption
  }

  #updateCaption(input) {
  }

  #handleCaptionInputBlurred(event) {
    const input = event.target

    input.placeholder = this.fileName
    this.#updateCaptionValueFromInput(input)
  }

  #updateCaptionValueFromInput(input) {
    dispatchCustomEvent(input, "lexical:node-invalidated", { key: this.getKey(), values: { caption: input.value } })
  }

  #handleCaptionInputKeydown(event) {
    if (event.key === "Enter") {
      this.#updateCaptionValueFromInput(event.target)
      event.preventDefault()
    }
    event.stopPropagation()
  }
}
