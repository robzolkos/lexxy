import { $getSelection, $isParagraphNode, $isRangeSelection } from "lexical";
import { $createQuoteNode } from "@lexical/rich-text";

export default class Contents {
  constructor(editor) {
    this.editor = editor
  }

  insertNodeWrappingSelection(newNodeFn) {
    this.editor.update(() => {
      const selection = $getSelection()
      if (!$isRangeSelection(selection)) return

      const topLevelElement = selection.anchor.getNode().getTopLevelElementOrThrow()

      const wrappingNode = newNodeFn()
      wrappingNode.append(...topLevelElement.getChildren())
      topLevelElement.replace(wrappingNode)
    })
  }
}
