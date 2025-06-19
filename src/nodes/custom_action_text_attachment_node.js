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

            const name = attachment.getAttribute("content-type").split(".").pop()

            nodes.push(new CustomActionTextAttachmentNode({
              sgid: attachment.getAttribute("sgid"),
              innerHtml: JSON.parse(content),
              name: name
            }));

            nodes.push($createTextNode(" "));

            return { node: nodes };
          },
          priority: 2
        }
      }
    }
  }

  constructor({ sgid, name, innerHtml }, key) {
    super(key)

    this.sgid = sgid
    this.name = name
    this.innerHtml = innerHtml
  }

  createDOM() {
    const figure = createElement("figure", { className: `attachment attachment--custom attachment--${this.name}`, "data-content-type": this.contentType })

    figure.addEventListener("click", (event) => {
      dispatchCustomEvent(figure, "lexical:node-selected", { key: this.getKey() })
    })

    figure.insertAdjacentHTML("beforeend", this.innerHtml)

    return figure
  }

  get contentType() {
    return `application/vnd.actiontext.${this.name}`
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
      name: this.name
    }
  }

  decorate() {
    return null
  }
}
