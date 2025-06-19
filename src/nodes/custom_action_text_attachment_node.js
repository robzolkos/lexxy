import { $createTextNode, DecoratorNode } from "lexical"
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
        const content = attachment.getAttribute("content")
        if (!attachment.getAttribute("content")) {
          return null
        }

        return {
          conversion: () => {
            const nodes = [];

            // Check if there's a leading space in the DOM before the attachment
            const previousSibling = attachment.previousSibling;
            if (
              previousSibling &&
              previousSibling.nodeType === Node.TEXT_NODE &&
              /\s$/.test(previousSibling.textContent)
            ) {
              nodes.push($createTextNode(" "));
            }

            nodes.push(new CustomActionTextAttachmentNode({
              sgid: attachment.getAttribute("sgid"),
              innerHtml: JSON.parse(content),
              contentType: attachment.getAttribute("content-type")
            }));

            nodes.push($createTextNode(" "));

            return { node: nodes };
          },
          priority: 2
        }
      }
    }
  }

  constructor({ sgid, contentType, innerHtml }, key) {
    super(key)

    this.sgid = sgid
    this.contentType = contentType || "application/vnd.actiontext.unknown"
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
      alt: this.altText,
      "content-type": this.contentType
    })

    return { element: attachment }
  }

  exportJSON() {
    return {
      type: "custom_action_text_attachment",
      version: 1,
      sgid: this.sgid,
      altText: this.altText,
      contentType: this.contentType
    }
  }

  decorate() {
    return null
  }
}
