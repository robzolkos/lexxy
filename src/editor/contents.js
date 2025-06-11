import {
  $createParagraphNode, $getSelection, $setSelection, $insertNodes, $isElementNode, $isParagraphNode, $isTextNode,
  $isRangeSelection, $createLineBreakNode, $createTextNode, HISTORY_MERGE_TAG, $isNodeSelection
} from "lexical"

import { $generateNodesFromDOM } from "@lexical/html"
import { ActionTextAttachmentUploadNode } from "../nodes/action_text_attachment_upload_node"

export default class Contents {
  constructor(editorElement) {
    this.editorElement = editorElement
    this.editor = editorElement.editor
  }

  insertHtml(html) {
    this.editor.update(() => {
      const selection = $getSelection()

      if (!$isRangeSelection(selection)) return

      const parser = new DOMParser()
      const dom = parser.parseFromString(html, 'text/html')
      const nodes = $generateNodesFromDOM(this.editor, dom)

      selection.insertNodes(nodes)
    })
  }

  insertNodeWrappingEachSelectedLine(newNodeFn) {
    this.editor.update(() => {
      const selection = $getSelection()
      if (!$isRangeSelection(selection)) return

      const selectedNodes = selection.extract()

      selectedNodes.forEach((node) => {
        const parent = node.getParent()
        if (!parent) { return }

        const topLevelElement = node.getTopLevelElementOrThrow()
        const wrappingNode = newNodeFn()
        wrappingNode.append(...topLevelElement.getChildren())
        topLevelElement.replace(wrappingNode)
      })
    })
  }

  insertNodeWrappingAllSelectedLines(newNodeFn) {
    this.editor.update(() => {
      const selection = $getSelection()
      if (!$isRangeSelection(selection)) return

      const selectedNodes = selection.extract()
      $setSelection(null)
      if (selectedNodes.length === 0) return

      const lines = []
      const nodesToDelete = new Set()
      selectedNodes.forEach((node) => {
        if (!$isTextNode(node)) return

        const textContent = node.getTextContent()
        if (textContent) {
          const lineTexts = textContent.split('\n')
          lines.push(...lineTexts)
        }

        if (node.getParent) { nodesToDelete.add(node.getParent()) }
      })

      if (lines.length === 0) return

      const wrappingNode = newNodeFn()

      lines.forEach((lineText) => {
        const textNode = $createTextNode(lineText)
        wrappingNode.append(textNode, $createLineBreakNode())
      })

      const anchorNode = selection.anchor.getNode()
      const parent = anchorNode.getParent()
      if (parent) {
        parent.replace(wrappingNode)
      }

      nodesToDelete.forEach((node) => { node.remove() })
    })
  }

  uploadFile(file) {
    const uploadUrl = this.editorElement.directUploadUrl

    this.editor.update(() => {
      const selection = $getSelection()
      const anchorNode = selection?.anchor.getNode()
      const currentParagraph = anchorNode?.getTopLevelElementOrThrow()

      const uploadedImageNode = new ActionTextAttachmentUploadNode({ file: file, uploadUrl: uploadUrl, editor: this.editor })

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

  deleteSelectedNodes() {
    this.editor.update(() => {
      if ($isNodeSelection(this.#selection.current)) {
        let nodesWereRemoved = false
        this.#selection.current.getNodes().forEach((node) => {
          const parent = node.getParent()

          node.remove()

          if (parent && parent.getChildrenSize() === 0 && (parent.getNextSibling() !== null || parent.getPreviousSibling() !== null)) {
            parent.remove()
          }
          nodesWereRemoved = true
        })

        if (nodesWereRemoved) {
          this.#selection.clear()
          this.editor.focus()

          return true
        }
      }
    })
  }

  get #selection() {
    return this.editorElement.selection
  }
}
