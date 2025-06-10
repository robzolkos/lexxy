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
  HISTORY_MERGE_TAG
} from "lexical"

import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from "@lexical/list"
import { $createHeadingNode, $createQuoteNode, $isHeadingNode, $isQuoteNode } from "@lexical/rich-text"
import { CodeNode } from "@lexical/code"
import { $isLinkNode, $toggleLink } from "@lexical/link"

import { ActionTextAttachmentUploadNode } from "../nodes/action_text_attachment_upload_node"
import { createElement } from "../helpers/html_helper"
// Rollup complained that this wasn't being exported and wouldn't build
// import { createLinkDialog } from "../elements/link_dialog"

const COMMANDS = [
  "bold",
  "rotateHeadingFormat",
  "italic",
  "link",
  "unlink",
  "insertUnorderedList",
  "insertOrderedList",
  "insertQuoteBlock",
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
    this.contents = editorElement.contents

    this.#registerCommands()
    this.#registerDragAndDropHandlers()
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

          if (parent && parent.getChildrenSize() === 0 && (parent.getNextSibling() !== null || parent.getPreviousSibling() !== null)) {
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

  dispatchBold() {
    this.editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
  }

  dispatchItalic() {
    this.editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
  }

  dispatchLink(url) {
    this.#toggleLink(url)
  }

  dispatchUnlink() {
    this.#toggleLink(null)
  }

  dispatchInsertUnorderedList() {
    this.editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
  }

  dispatchInsertOrderedList() {
    this.editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
  }

  dispatchInsertQuoteBlock() {
    this.contents.insertNodeWrappingSelection(() => $createQuoteNode())
  }

  dispatchInsertCodeBlock() {
    this.contents.insertNodeWrappingSelection(() => new CodeNode())
  }

  dispatchRotateHeadingFormat() {
    this.editor.update(() => {
      const selection = $getSelection()
      if (!$isRangeSelection(selection)) return

      const nodes = selection.extract()
      if (nodes.length === 0) return

      for (const node of nodes) {
        const topLevel = node.getTopLevelElementOrThrow()

        if ($isHeadingNode(topLevel)) {
          const currentTag = topLevel.getTag()
          let nextTag
          if (currentTag === "h1") {
            nextTag = "h2"
          } else if (currentTag === "h2") {
            nextTag = "h3"
          } else {
            nextTag = "h1"
          }

          const newHeading = $createHeadingNode(nextTag)
          newHeading.append(...topLevel.getChildren())
          topLevel.replace(newHeading)

        } else if ($isParagraphNode(topLevel) || $isQuoteNode(topLevel)) {
          const newHeading = $createHeadingNode("h1")
          newHeading.append(...topLevel.getChildren())
          topLevel.replace(newHeading)
        }
      }
    })
  }

  dispatchUploadAttachments() {
    const input = createElement("input", {
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
    })

    document.body.appendChild(input) // Append and remove just for the sake of making it testeable
    input.click()
    setTimeout(() => input.remove(), 1000)
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

  #registerDragAndDropHandlers() {
    this.dragCounter = 0
    this.editor.getRootElement().addEventListener("dragover", this.#handleDragOver.bind(this))
    this.editor.getRootElement().addEventListener("drop", this.#handleDrop.bind(this))
    this.editor.getRootElement().addEventListener("dragenter", this.#handleDragEnter.bind(this))
    this.editor.getRootElement().addEventListener("dragleave", this.#handleDragLeave.bind(this))
  }

  #handleDragEnter(event) {
    this.dragCounter++
    if (this.dragCounter === 1) {
      this.editor.getRootElement().classList.add("lexical-editor--drag-over")
    }
  }

  #handleDragLeave(event) {
    this.dragCounter--
    if (this.dragCounter === 0) {
      this.editor.getRootElement().classList.remove("lexical-editor--drag-over")
    }
  }

  #handleDragOver(event) {
    event.preventDefault()
  }

  #handleDrop(event) {
    event.preventDefault()

    this.dragCounter = 0
    this.editor.getRootElement().classList.remove("lexical-editor--drag-over")

    const dataTransfer = event.dataTransfer
    if (!dataTransfer) return

    const files = Array.from(dataTransfer.files)
    if (!files.length) return

    for (const file of files) {
      this.#uploadFile(file)
    }

    this.editor.focus()
  }

  #uploadFile(file) {
    const uploadUrl = this.editorElement.directUploadUrl

    this.editor.update(() => {
      const selection = $getSelection()
      const anchorNode = selection?.anchor.getNode()
      const currentParagraph = anchorNode?.getTopLevelElementOrThrow()

      const uploadedImageNode = new ActionTextAttachmentUploadNode( { file: file, uploadUrl: uploadUrl, editor: this.editor })

      if (currentParagraph && $isParagraphNode(currentParagraph) && currentParagraph.getChildrenSize() === 0) {
        currentParagraph.append(uploadedImageNode)
      } else {
        const newParagraph = $createParagraphNode()
        newParagraph.append(uploadedImageNode)

        if (currentParagraph && $isElementNode(currentParagraph)) {
          currentParagraph.insertAfter(newParagraph)
        } else {
          $insertNodes([ newParagraph ])
        }
      }
    }, { tag: HISTORY_MERGE_TAG })
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
