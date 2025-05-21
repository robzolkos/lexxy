import { $createNodeSelection, $getNodeByKey, $getSelection, $isNodeSelection, $setSelection, COMMAND_PRIORITY_LOW, SELECTION_CHANGE_COMMAND } from "lexical"

export default class NodesSelection {
  constructor(editor) {
    this.editor = editor
    this.previouslySelectedKeys = new Set()

    this.#listenForNodeSelections()
    this.#processSelectionChangeCommands()
  }

  clear() {
    $setSelection(null)
    this.current = null
  }

  set current(selection) {
    if ($isNodeSelection(selection)) {
      this._current = $getSelection()
      this.#syncSelectedClasses()
    } else {
      this._current = null
    }
  }

  get current() {
    return this._current
  }

  #processSelectionChangeCommands() {
    this.editor.registerCommand(SELECTION_CHANGE_COMMAND, () => {
      this.current = $getSelection()
    }, COMMAND_PRIORITY_LOW)
  }

  #syncSelectedClasses() {
    this.editor.update(() => {
      this.#clearPreviouslyHighlightedItems();
      this.#highlightNewItems();

      this.previouslySelectedKeys = this.#currentlySelectedKeys
      this._currentlySelectedKeys = null
    })
  }

  #clearPreviouslyHighlightedItems() {
    for (const key of this.previouslySelectedKeys) {
      if (!this.#currentlySelectedKeys.has(key)) {
        const dom = this.editor.getElementByKey(key)
        if (dom) dom.classList.remove("node--selected")
      }
    }
  }

  #highlightNewItems() {
    for (const key of this.#currentlySelectedKeys) {
      if (!this.previouslySelectedKeys.has(key)) {
        const nodeElement = this.editor.getElementByKey(key)
        if (nodeElement) nodeElement.classList.add("node--selected")
      }
    }
  }

  get #currentlySelectedKeys() {
    if (this._currentlySelectedKeys) { return this._currentlySelectedKeys }

    this._currentlySelectedKeys = new Set()

    if (this.current) {
      for (const node of this.current.getNodes()) {
        this._currentlySelectedKeys.add(node.getKey())
      }
    }

    return this._currentlySelectedKeys
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
