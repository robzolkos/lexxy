import { $createParagraphNode, $getSelection, $insertNodes, $isElementNode, $isParagraphNode, $isRangeSelection, HISTORY_MERGE_TAG } from "lexical";
import { $createQuoteNode } from "@lexical/rich-text";
import { ActionTextAttachmentUploadNode } from "../nodes/action_text_attachment_upload_node";

export default class Contents {
  constructor(editorElement) {
    this.editorElement = editorElement
    this.editor = editorElement.editor
  }

  insertNodeWrappingEachSelectedLine(newNodeFn) {
    this.editor.update(() => {
      const selection = $getSelection()
      if (!$isRangeSelection(selection)) return

      const selectedNodes = selection.extract()

      selectedNodes.forEach((node) => {
        const topLevelElement = node.getParent() ? node.getParent() ? node.getTopLevelElementOrThrow()
        const wrappingNode = newNodeFn()
        wrappingNode.append(...topLevelElement.getChildren())
        topLevelElement.replace(wrappingNode)
      })
    })
  }

  uploadFile(file) {
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
