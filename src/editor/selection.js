import {
  $createNodeSelection, $createRangeSelection, $getNodeByKey, $getSelection, $isNodeSelection,
  $setSelection, $isElementNode, COMMAND_PRIORITY_LOW, SELECTION_CHANGE_COMMAND, CLICK_COMMAND,
  KEY_ARROW_LEFT_COMMAND, KEY_ARROW_RIGHT_COMMAND
} from "lexical"

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
      this.editor.update(() => {
        this.#syncSelectedClasses()
        this._current = null
      })
    }
  }

  get current() {
    return this._current
  }

  #processSelectionChangeCommands() {
    this.editor.registerCommand(KEY_ARROW_LEFT_COMMAND, this.#selectPreviousNode.bind(this), COMMAND_PRIORITY_LOW)
    this.editor.registerCommand(KEY_ARROW_RIGHT_COMMAND, this.#selectNextNode.bind(this), COMMAND_PRIORITY_LOW)

    this.editor.registerCommand(SELECTION_CHANGE_COMMAND, () => {
      this.current = $getSelection()
    }, COMMAND_PRIORITY_LOW)
  }

  #syncSelectedClasses() {
    this.#clearPreviouslyHighlightedItems()
    this.#highlightNewItems()

    this.previouslySelectedKeys = this.#currentlySelectedKeys
    this._currentlySelectedKeys = null
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

  #selectPreviousNode() {
    if (this.current) {
      const currentNode = this.current.getNodes()[0]
      currentNode.selectPrevious()
    }
    return false
  }

  #selectNextNode() {
    if (this.current) {
      const currentNode = this.current.getNodes()[0]
      currentNode.selectNext()
    }
    return false
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
        this.editor.focus()
      })
    })
  }
}
