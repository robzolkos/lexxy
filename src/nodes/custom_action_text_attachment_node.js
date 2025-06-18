import { DecoratorNode } from "lexical"
import { createAttachmentFigure, createElement, dispatchCustomEvent, isPreviewableImage } from "../helpers/html_helper";
import { bytesToHumanSize, mimeTypeToExtension } from "../helpers/storage_helper";

export class CustomActionTextAttachmentNode extends DecoratorNode {
  static getType() {
    return "custom_action_text_attachment"
  }

  static clone(node) {
    return new CustomActionTextAttachmentNode({ ...node }, node.__key);
  }

  static importJSON(serializedNode) {
    return new CustomActionTextAttachmentNode({ serializedNode })
  }

  static importDOM() {
    return {
      "action-text-attachment": (attachment) => {
        if (!attachment.getAttribute("content")) {
          return null
        }

        return {
          conversion: () => {
            return {
              node: new CustomActionTextAttachmentNode({
                sgid: attachment.getAttribute("sgid"),
                innerHtml: JSON.parse(attachment.getAttribute("content")),
                contentType: attachment.getAttribute("content-type")
              })
            }
          },
          priority: 2
        }
      }
    }
  }

  constructor({ sgid, contentType, innerHtml }, key) {
    super(key)

    this.sgid = sgid
    this.contentType = contentType || ""
    this.innerHtml = innerHtml
  }

  createDOM() {
    const figure = createElement("figure", { className: `attachment attachment--custom`, "data-content-type": this.contentType })

    figure.addEventListener("click", (event) => {
      dispatchCustomEvent(figure, "lexical:node-selected", { key: this.getKey() })
    })

    figure.insertAdjacentHTML("beforeend", this.innerHtml)

    return figure
  }

  updateDOM() {
    return true
  }

  isInline() {
    return true
  }

  exportDOM() {
    const attachment = createElement("action-text-attachment", {
      sgid: this.sgid,
      alt: this.altText
    })

    return { element: attachment }
  }

  exportJSON() {
    return {
      type: "custom_action_text_attachment",
      version: 1,
      sgid: this.sgid,
      altText: this.altText
    }
  }

  decorate() {
    return null
  }
}
