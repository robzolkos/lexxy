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

      // Create a span marker if the rect is unreliable
      let marker
      if ((rect.width === 0 && rect.height === 0) || (rect.top === 0 && rect.left === 0)) {
        marker = document.createElement("span")
        marker.textContent = "\u200b"
        marker.style.display = "inline-block"
        marker.style.width = "1px"
        marker.style.height = "1em"
        marker.style.lineHeight = "normal"

        range.insertNode(marker)
        rect = marker.getBoundingClientRect()

        // Reset selection after inserting the marker
        nativeSelection.removeAllRanges()
        const newRange = document.createRange()
        newRange.setStartAfter(marker)
        newRange.collapse(true)
        nativeSelection.addRange(newRange)
      }

      if (!rect) return

      const rootRect = this.editor.getRootElement().getBoundingClientRect()
      let x = rect.left - rootRect.left
      let y = rect.top - rootRect.top

      // Try to get the font size from the marker or its parent
      let fontSize = 0
      if (marker) {
        const computed = window.getComputedStyle(marker)
        fontSize = parseFloat(computed.fontSize)
        marker.remove()
      } else {
        const anchorNode = nativeSelection.anchorNode
        const parentElement = anchorNode?.nodeType === Node.TEXT_NODE
          ? anchorNode.parentElement
          : anchorNode
        if (parentElement instanceof HTMLElement) {
          const computed = window.getComputedStyle(parentElement)
          fontSize = parseFloat(computed.fontSize)
        }
      }

      if (!isNaN(fontSize)) {
        y += fontSize
      }

      position = { x, y }
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
