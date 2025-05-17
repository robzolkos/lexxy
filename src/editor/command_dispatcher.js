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

import { ImageNode } from "../nodes/image_node"

const COMMANDS = [
  "bold",
  "italic",
  "insertUnorderedList",
  "insertOrderedList",
  "insertCodeBlock",
  "insertTable",
  "formatElement"
]

export class CommandDispatcher {
  static configureFor(editor) {
    new CommandDispatcher(editor)
  }

  constructor(editor) {
    this.editor = editor
    this.#registerCommands()

  }

  dispatchPaste(event) {
    const clipboardData = event.clipboardData
    if (!clipboardData) return false

    const items = clipboardData.items
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile()
        if (file) {
          const reader = new FileReader()
          reader.onload = (loadEvent) => {
            const src = loadEvent.target.result

            this.editor.update(() => {
              const imageNode = new ImageNode(src)
              const root = $getRoot()
              root.append(imageNode)
            })
          }
          reader.readAsDataURL(file)
          return true
        }
      }
    }

    return false
  }

  dispatchBold() {
    this.editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
    return true
  }

  dispatchItalic() {
    this.editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
    return true
  }

  dispatchInsertUnorderedList() {
    this.editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
    return true
  }

  dispatchInsertOrderedList() {
    this.editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
    return true
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
    return true
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
    return true
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
    return true
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
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
