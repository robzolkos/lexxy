import {
  $getRoot,
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  PASTE_COMMAND,
  COMMAND_PRIORITY_LOW,
  FORMAT_TEXT_COMMAND
} from "lexical"

import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from "@lexical/list"
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text"
import { $createTableNodeWithDimensions } from '@lexical/table'
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
  "insertTable",
  "uploadAttachments"
]

export class CommandDispatcher {
  static configureFor(editor) {
    new CommandDispatcher(editor)
  }

  constructor(editor) {
    this.editor = editor
    this.editorElement = this.editor.getRootElement().closest("lexical-editor")
    this.#registerCommands()
  }

  dispatchPaste(event) {
    const clipboardData = event.clipboardData
    if (!clipboardData) return false

    for (const item of clipboardData.items) {
      if (!item.type.startsWith("image/")) continue
      const file = item.getAsFile()
      if (!file) continue

      this.#uploadFile(file)
    }
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

  dispatchInsertTable() {
    this.editor.update(() => {
      const selection = $getSelection()
      if (!$isRangeSelection(selection)) return

      // Create a new table with 3x3 dimensions
      const tableNode = $createTableNodeWithDimensions(3, 3)

      if (!selection.isCollapsed()) {
        // If text is selected, extract the nodes
        const nodes = selection.extract()

        const focusNode = selection.focus.getNode()
        const anchorNode = selection.anchor.getNode()
        const insertionPoint = (focusNode && focusNode.getParent()) ||
          (anchorNode && anchorNode.getParent())

        if (insertionPoint && insertionPoint.getParent()) {
          // Insert the table before the insertion point
          insertionPoint.insertBefore(tableNode)

          // Remove the insertion point if it's empty
          if (insertionPoint.getTextContent().trim() === '') {
            insertionPoint.remove()
          }
        } else {
          // If no valid insertion point, append to root
          $getRoot().append(tableNode)
        }
      } else {
        // If selection is collapsed (no text selected)
        const focusNode = selection.focus.getNode()

        if (focusNode) {
          const parent = focusNode.getParent()

          // Check if we're in an empty paragraph
          if (parent && parent.getTextContent().trim() === '' && parent.getParent()) {
            // Replace the empty paragraph with the table
            parent.insertBefore(tableNode)
            parent.remove()
          } else if (parent && parent.getParent()) {
            // Insert after the parent if it's not a root node
            parent.insertAfter(tableNode)
          } else if (focusNode.getParent()) {
            // Insert after the focus node if it's not a root node
            focusNode.insertAfter(tableNode)
          } else {
            // Append to root as last resort
            $getRoot().append(tableNode)
          }
        } else {
          // If no focus node, append to root
          $getRoot().append(tableNode)
        }
      }
    })
  }

  dispatchFormatElement(type) {
    this.editor.update(() => {
      const selection = $getSelection()
      if (!$isRangeSelection(selection)) return

      // Extract the selected nodes
      const nodes = selection.extract()

      // Process each node
      for (const node of nodes) {
        // Skip nodes without a parent
        if (!node.getParent()) continue

        // Create the appropriate wrapper element based on the type
        let wrapper
        if (type === "quote") {
          wrapper = $createQuoteNode()
        } else if (type === "h1") {
          wrapper = $createHeadingNode("h1")
        } else {
          wrapper = $createParagraphNode()
        }

        // Insert the wrapper before the node and move the node inside it
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
  }

  #registerCommandHandler(command, priority, handler) {
    this.editor.registerCommand(command, handler, priority)
  }

  #uploadFile(file) {
    const uploadUrl = this.editorElement.directUploadUrl

    this.editor.update(() => {
      const uploadedImageNode = new ActionTextAttachmentUploadNode(file, uploadUrl, this.editor)
      $getRoot().append(uploadedImageNode)
    })
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
