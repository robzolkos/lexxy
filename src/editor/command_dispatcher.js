import {
  $getRoot,
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  $isNodeSelection,
  $isParagraphNode,
  $isElementNode,
  $insertNodes,
  PASTE_COMMAND,
  KEY_DELETE_COMMAND,
  KEY_BACKSPACE_COMMAND,
  COMMAND_PRIORITY_LOW,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
  HISTORY_MERGE_TAG,
  $setSelection
} from "lexical"

import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from "@lexical/list"
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text"
import { CodeNode } from "@lexical/code"
import { $isLinkNode, $toggleLink } from "@lexical/link"

import { ActionTextAttachmentUploadNode } from "../nodes/action_text_attachment_upload_node"
import { createElement } from "../helpers/html_helper"
import { createLinkDialog } from "../elements/link_dialog"

const COMMANDS = [
  "bold",
  "formatElement",
  "italic",
  "link",
  "insertUnorderedList",
  "insertOrderedList",
  "insertCodeBlock",
  "uploadAttachments"
]

export class CommandDispatcher {
  static configureFor(editorElement) {
    new CommandDispatcher(editorElement)
  }

  constructor(editorElement) {
    this.editorElement = editorElement
    this.editor = editorElement.editor
    this.selection = editorElement.selection

    this.#registerCommands()
  }

  dispatchPaste(event) {
    const clipboardData = event.clipboardData
    if (!clipboardData) return false

    for (const item of clipboardData.items) {
      const file = item.getAsFile()
      if (!file) continue

      this.#uploadFile(file)
    }
  }

  dispatchDeleteNodes() {
    this.editor.update(() => {
      if ($isNodeSelection(this.selection.current)) {
        let nodesWereRemoved = false
        this.selection.current.getNodes().forEach((node) => {
          const parent = node.getParent()

          node.remove()

          if (parent && parent.getChildrenSize() === 0) {
            parent.remove()
          }

          nodesWereRemoved = true
        })

        if (nodesWereRemoved) {
          this.selection.clear()
          this.editor.focus()

          return true
        }
      }
    })
  }

  // Not using TOGGLE_LINK_COMMAND because it's not handled unless you use React/LinkPlugin
  #toggleLink(url) {
    this.editor.update(() => {
      if (url === null) {
        $toggleLink(null)
      } else {
        $toggleLink(url)
      }
    })
  }

  dispatchBold() {
    this.editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
  }

  dispatchItalic() {
    this.editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
  }

  dispatchLink() {
    const dialog = createLinkDialog()

    this.#withSelectedUrl((url) => dialog.open(url))

    dialog.addEventListener("link-dialog:link",  (event) => {
      const { url } = event.detail;
      this.#toggleLink(url)
    }, { once: true })

    dialog.addEventListener("link-dialog:unlink",  (event) => {
      this.#toggleLink(null)
    }, { once: true })
  }

  dispatchInsertUnorderedList() {
    this.editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
  }

  dispatchInsertOrderedList() {
    this.editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
  }

  dispatchInsertCodeBlock() {
    this.editor.update(() => {
      const selection = $getSelection()
      if (!$isRangeSelection(selection)) return

      const codeNode = new CodeNode()

      if (!selection.isCollapsed()) {
        const nodes = selection.extract()

        const focusNode = selection.focus.getNode()
        const anchorNode = selection.anchor.getNode()
        const insertionPoint = (focusNode && focusNode.getParent()) ||
          (anchorNode && anchorNode.getParent())

        for (const node of nodes) {
          if (node.getParent()) {
            codeNode.append(node)
          }
        }

        if (insertionPoint && insertionPoint.getParent()) {
          insertionPoint.insertBefore(codeNode)

          if (insertionPoint.getTextContent().trim() === "") {
            insertionPoint.remove()
          }
        } else {
          $getRoot().append(codeNode)
        }
      } else {
        $getRoot().append(codeNode)
      }
    })
  }

  dispatchFormatElement(type) {
    this.editor.update(() => {
      const selection = $getSelection()
      if (!$isRangeSelection(selection)) return

      const nodes = selection.extract()

      for (const node of nodes) {
        if (!node.getParent()) continue

        let wrapper
        if (type === "quote") {
          wrapper = $createQuoteNode()
        } else if (type === "h2") {
          wrapper = $createHeadingNode("h2")
        } else if (type === "h3") {
          wrapper = $createHeadingNode("h3")
        } else {
          wrapper = $createParagraphNode()
        }

        node.insertBefore(wrapper)
        wrapper.append(node)
      }
    })
  }

  dispatchUploadAttachments() {
    createElement("input", {
      type: "file",
      accept: "image/*",
      multiple: true,
      onchange: ({ target }) => {
        const files = Array.from(target.files)
        if (!files.length) return

        for (const file of files) {
          this.#uploadFile(file)
        }
      }
    }).click()
  }

  #registerCommands() {
    for (const command of COMMANDS) {
      const methodName = `dispatch${capitalize(command)}`
      this.#registerCommandHandler(command, 0, this[methodName].bind(this))
    }

    this.#registerCommandHandler(PASTE_COMMAND, COMMAND_PRIORITY_LOW, this.dispatchPaste.bind(this))
    this.#registerCommandHandler(KEY_DELETE_COMMAND, COMMAND_PRIORITY_LOW, this.dispatchDeleteNodes.bind(this))
    this.#registerCommandHandler(KEY_BACKSPACE_COMMAND, COMMAND_PRIORITY_LOW, this.dispatchDeleteNodes.bind(this))
  }

  #registerCommandHandler(command, priority, handler) {
    this.editor.registerCommand(command, handler, priority)
  }

  #uploadFile(file) {
    const uploadUrl = this.editorElement.directUploadUrl;

    this.editor.update(() => {
      const selection = $getSelection();
      const anchorNode = selection?.anchor.getNode();
      const currentParagraph = anchorNode?.getTopLevelElementOrThrow();

      const uploadedImageNode = new ActionTextAttachmentUploadNode(file, uploadUrl, this.editor);

      if (currentParagraph && $isParagraphNode(currentParagraph) && currentParagraph.getChildrenSize() === 0) {
        currentParagraph.append(uploadedImageNode);
      } else {
        const newParagraph = $createParagraphNode();
        newParagraph.append(uploadedImageNode);

        if (currentParagraph && $isElementNode(currentParagraph)) {
          currentParagraph.insertAfter(newParagraph);
        } else {
          $insertNodes([ newParagraph ]);
        }
      }
    }, { tag: HISTORY_MERGE_TAG });
  }

  async #withSelectedUrl(callback) {
    let url = ""

    this.editor.update(() => {
      const selection = $getSelection()
      if (!$isRangeSelection(selection)) return

      const anchorNode = selection.anchor.getNode()
      let currentNode = anchorNode

      while (currentNode !== null) {
        if ($isLinkNode(currentNode)) {
          url = currentNode.getURL()
          break
        }
        currentNode = currentNode.getParent()
      }

      callback(url || "")
    })
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
