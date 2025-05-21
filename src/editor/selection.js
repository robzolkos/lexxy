import { $createNodeSelection, $getNodeByKey, $getSelection, $setSelection, COMMAND_PRIORITY_LOW, SELECTION_CHANGE_COMMAND } from "lexical";

export default class NodesSelection {
  constructor(editor) {
    this.editor = editor

    this.#listenForNodeSelections()
    this.#processSelectionChangeCommands()
  }

  #processSelectionChangeCommands() {
    this.editor.registerCommand(SELECTION_CHANGE_COMMAND, () => {
      this.current = $getSelection()
    }, COMMAND_PRIORITY_LOW);

  }

  #listenForNodeSelections() {
    this.editor.getRootElement().addEventListener("lexical:node-selected", (event) => {
      const { key } = event.detail
      this.editor.update(() => {
        const node = $getNodeByKey(key)
        if (node) {
          const selection = $createNodeSelection()
          selection.add(node.getKey())
          $setSelection(selection)
        }
      })
    })
  }
}
