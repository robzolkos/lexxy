import {
  $createNodeSelection, $createRangeSelection, $getNodeByKey, $getSelection, $isNodeSelection,
  $setSelection, $isElementNode, COMMAND_PRIORITY_LOW, SELECTION_CHANGE_COMMAND, CLICK_COMMAND,
  KEY_ARROW_LEFT_COMMAND, KEY_ARROW_RIGHT_COMMAND
} from "lexical"

export default class Selection {
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

  get cursorPosition() {
    let position = null

    this.editor.getEditorState().read(() => {
      const lexicalSelection = $getSelection()
      if (!lexicalSelection || !lexicalSelection.isCollapsed()) return

      const nativeSelection = window.getSelection()
      if (!nativeSelection || nativeSelection.rangeCount === 0) return

      const range = nativeSelection.getRangeAt(0)
      let rect = range.getBoundingClientRect()

      // Some browsers give an empty rect for a caret-only range. Fallback:
      if (
        (rect.width === 0 && rect.height === 0) ||
        (rect.top === 0 && rect.left === 0)
      ) {
        const marker = document.createElement("span")
        marker.textContent = "\u200b"
        range.insertNode(marker)
        rect = marker.getBoundingClientRect()
        marker.remove()

        nativeSelection.removeAllRanges()
        nativeSelection.addRange(range)
      }

      if (!rect) return

      const rootRect = this.editor.getRootElement().getBoundingClientRect()
      let y = rect.top - rootRect.top

      // Try to get the font size at the caret's container
      let fontSize = 0
      const anchorNode = nativeSelection.anchorNode
      if (anchorNode && anchorNode.nodeType === Node.TEXT_NODE) {
        const parentElement = anchorNode.parentElement
        if (parentElement) {
          const computedStyle = window.getComputedStyle(parentElement)
          const fontSizePx = parseFloat(computedStyle.fontSize)
          if (!isNaN(fontSizePx)) {
            fontSize = fontSizePx
          }
        }
      }

      // Adjust y by subtracting font size
      position = {
        x: rect.left - rootRect.left,
        y: y + fontSize
      }
    })

    return position
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
      this.clear()
      const currentNode = this.current.getNodes()[0]
      currentNode.selectPrevious()
    }
    return false
  }

  #selectNextNode() {
    if (this.current) {
      this.clear()
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
