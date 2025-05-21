import {
  $getRoot,
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  $isNodeSelection,
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

import { ActionTextAttachmentUploadNode } from "../nodes/action_text_attachment_upload_node"
import { createElement } from "../helpers/html_helper"

const COMMANDS = [
  "bold",
  "formatElement",
  "italic",
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
        this.selection.current.getNodes().forEach((node) => {
          node.remove()
        })
        this.selection.clear()
        this.editor.focus()
      }
    })
  }

  dispatchBold() {
    this.editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
  }

  dispatchItalic() {
    this.editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
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

          if (insertionPoint.getTextContent().trim() === '') {
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
        } else if (type === "h1") {
          wrapper = $createHeadingNode("h1")
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
    const uploadUrl = this.editorElement.directUploadUrl

    this.editor.update(() => {
      const uploadedImageNode = new ActionTextAttachmentUploadNode(file, uploadUrl, this.editor)
      $getRoot().append(uploadedImageNode)
    }, { tag: HISTORY_MERGE_TAG })
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
