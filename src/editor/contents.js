import {
  $createParagraphNode, $getSelection, $setSelection, $insertNodes, $isElementNode, $isParagraphNode, $isTextNode,
  $isRangeSelection, $createLineBreakNode, $createTextNode, HISTORY_MERGE_TAG, $isNodeSelection
} from "lexical"

import { $generateNodesFromDOM } from "@lexical/html"
import { ActionTextAttachmentUploadNode } from "../nodes/action_text_attachment_upload_node"
import { $createLinkNode } from "@lexical/link"

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
      const selectedParagraphs = selectedNodes.map((node) => $isParagraphNode(node) ? node : $isTextNode(node) && node.getParent() && $isParagraphNode(node.getParent()) ? node.getParent() : null).filter(Boolean)

      $setSelection(null)
      if (selectedParagraphs.length === 0) return

      const lineSet = new Set()
      const nodesToDelete = new Set()

      // Extract and deduplicate lines from paragraph content
      selectedParagraphs.forEach((paragraphNode) => {
        const textContent = paragraphNode.getTextContent()
        if (textContent) {
          const lineTexts = textContent.split("\n")
          lineTexts.forEach((line) => {
            if (line.trim()) {
              lineSet.add(line)
            }
          })
        }
        nodesToDelete.add(paragraphNode)
      })

      if (lineSet.size === 0) return

      const wrappingNode = newNodeFn()

      // Append each unique line to the new wrapping node
      Array.from(lineSet).forEach((lineText, index, arr) => {
        wrappingNode.append($createTextNode(lineText))
        if (index < arr.length - 1) {
          wrappingNode.append($createLineBreakNode())
        }
      })

      // Replace the current location with the new wrapping node
      const anchorNode = selection.anchor.getNode()
      const parent = anchorNode.getParent()
      if (parent) {
        parent.replace(wrappingNode)
      }

      // Remove original nodes
      nodesToDelete.forEach((node) => node.remove())
    })
  }


  hasSelectedText() {
    let result = false

    this.editor.read(() => {
      const selection = $getSelection()
      result = $isRangeSelection(selection) && !selection.isCollapsed()
    })

    return result
  }

  createLinkWithSelectedText(url) {
    if (!this.hasSelectedText()) return

    this.editor.update(() => {
      const selection = $getSelection()
      const selectedText = selection.getTextContent()

      const linkNode = $createLinkNode(url)
      linkNode.append($createTextNode(selectedText))

      selection.insertNodes([ linkNode ])
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
