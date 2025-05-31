import { createEditor, $getRoot, $createTextNode, $getNodeByKey, $addUpdateTag, SKIP_DOM_SELECTION_TAG, KEY_ENTER_COMMAND, COMMAND_PRIORITY_HIGH } from "lexical"
import { ListNode, ListItemNode, registerList } from "@lexical/list"
import { LinkNode, AutoLinkNode } from "@lexical/link"
import { registerRichText, QuoteNode, HeadingNode } from "@lexical/rich-text"
import { $generateNodesFromDOM, $generateHtmlFromNodes } from "@lexical/html"
import { CodeHighlightNode, CodeNode, registerCodeHighlighting, } from "@lexical/code"
import { TRANSFORMERS, registerMarkdownShortcuts } from "@lexical/markdown"
import { registerHistory, createEmptyHistoryState } from '@lexical/history'

import theme from "../config/theme"
import { ActionTextAttachmentNode } from "../nodes/action_text_attachment_node"
import { ActionTextAttachmentUploadNode } from "../nodes/action_text_attachment_upload_node"
import { CommandDispatcher } from "../editor/command_dispatcher"
import Selection from "../editor/selection"
import { containsVisuallyRelevantChildren, createElement, dispatch, sanitize } from "../helpers/html_helper"
import LexicalToolbar from "./toolbar"

export default class LexicalEditorElement extends HTMLElement {
  static formAssociated = true
  static debug = true
  static commands = [ "bold", "italic", "" ]

  constructor() {
    super()
    this.internals = this.attachInternals()
    this.internals.ariaRole = "textbox"
  }

  connectedCallback() {
    this.editor = this.#createEditor()
    this.selection = new Selection(this.editor)

    CommandDispatcher.configureFor(this)

    this.#synchronizeWithChanges()
    this.#registerComponents()
    this.#listenForInvalidatedNodes()
    this.#preventCtrlEnter()
    this.#attachDebugHooks()
    this.#attachToolbar()
    this.#loadInitialValue()
  }

  disconnectedCallback() {
    this.#reset() // Prevent hangs with Safari when morphing
  }

  get form() {
    return this.internals.form
  }

  get toolbarElement() {
    this.toolbar = this.toolbar || this.#findOrCreateDefaultToolbar()
    return this.toolbar
  }

  get directUploadUrl() {
    return this.dataset.directUploadUrl
  }

  focus() {
    this.editor.focus()
  }

  get value() {
    if (!this.cachedValue) {
      this.editor?.getEditorState().read(() => {
        this.cachedValue = sanitize($generateHtmlFromNodes(this.editor, null))
      })
    }

    return this.cachedValue
  }

  set value(html) {
    const parser = new DOMParser()
    const dom = parser.parseFromString(`<div>${html}</div>`, "text/html")

    this.editor.update(() => {
      $addUpdateTag(SKIP_DOM_SELECTION_TAG)
      const root = $getRoot()
      root.clear()
      const nodes = $generateNodesFromDOM(this.editor, dom)
      root.append(...nodes)
      root.select()

      this.#toggleEmptyStatus()

      // The first time you set the value, when the editor is empty, it seems to leave Lexical
      // in an inconsistent state until, at least, you focus. You can type but adding attachments
      // fails because no root node detected. This is a workaround to deal with the issue.
      requestAnimationFrame(() => this.editor?.update(() => { }))
    })
  }

  #createEditor() {
    this.editorContentElement = this.editorContentElement || this.#createEditorContentElement()

    const editor = createEditor({
      namespace: "LexicalEditor",
      onError(error) {
        throw error
      },
      theme: theme,
      nodes: [
        QuoteNode,
        HeadingNode,
        ListNode,
        ListItemNode,
        CodeNode,
        CodeHighlightNode,
        LinkNode,
        AutoLinkNode,

        ActionTextAttachmentNode,
        ActionTextAttachmentUploadNode
      ]
    })

    editor.setRootElement(this.editorContentElement)

    return editor
  }

  #createEditorContentElement() {
    const editorContentElement = createElement("div", { classList: "lexical-editor__content", contenteditable: true, placeholder: this.getAttribute("placeholder") })
    this.appendChild(editorContentElement)

    if (this.getAttribute("tabindex")) {
      this.editorContentElement.setAttribute("tabindex", this.getAttribute("tabindex"))
      this.removeAttribute("tabindex")
    } else {
      editorContentElement.setAttribute("tabindex", 0)
    }

    return editorContentElement
  }

  set #internalFormValue(html) {
    console.debug("Previous value", this.#internalFormValue)
    console.debug("Current value", this.value)

    const changed = this.#internalFormValue !== undefined && this.#internalFormValue !== this.value

    this.internals.setFormValue(html)
    this._internalFormValue = html

    if (changed) {
      console.debug("Dispatched!");
      dispatch(this, "actiontext:change")
    }
  }

  get #internalFormValue()  {
    return this._internalFormValue
  }

  #loadInitialValue() {
    const initialHtml = this.getAttribute("value") || "<p></p>"
    this.value = initialHtml
  }

  #synchronizeWithChanges() {
    this.editor.registerUpdateListener(({ editorState }) => {
      this.cachedValue = null
      this.#internalFormValue = this.value
      this.#toggleEmptyStatus()
    })
  }

  #registerComponents() {
    registerRichText(this.editor)
    registerHistory(this.editor, createEmptyHistoryState(), 20)
    registerList(this.editor)
    registerCodeHighlighting(this.editor)
    registerMarkdownShortcuts(this.editor, TRANSFORMERS)
  }

  #listenForInvalidatedNodes() {
    this.editor.getRootElement().addEventListener("lexical:node-invalidated", (event) => {
      const { key, values } = event.detail

      this.editor.update(() => {
        const node = $getNodeByKey(key)

        if (node instanceof ActionTextAttachmentNode) {
          const updatedNode = node.getWritable()
          Object.assign(updatedNode, values)
        }
      })
    })
  }

  #preventCtrlEnter() {
    // We can't prevent these externally using regular keydown because Lexical handles it first.
    this.editor.registerCommand(
      KEY_ENTER_COMMAND,
      (event) => {
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault()
          return true
        }

        return false
      },
      COMMAND_PRIORITY_HIGH
    )
  }

  #attachDebugHooks() {
    if (!LexicalEditorElement.debug) return

    this.editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        console.debug("HTML: ", this.value)
      })
    })
  }

  #attachToolbar() {
    this.toolbarElement.setEditor(this)
  }

  #findOrCreateDefaultToolbar() {
    const toolbarId = this.getAttribute("toolbar")
    return toolbarId ? document.getElementById(toolbarId) : this.#createDefaultToolbar()
  }

  #createDefaultToolbar() {
    const toolbar = createElement("lexical-toolbar")
    toolbar.innerHTML = LexicalToolbar.defaultTemplate
    this.prepend(toolbar)
    return toolbar
  }

  #toggleEmptyStatus() {
    this.classList.toggle("lexical-editor--empty", this.#isEmpty)
  }

  get #isEmpty() {
    return !this.editorContentElement.textContent.trim() && !containsVisuallyRelevantChildren(this.editorContentElement)
  }

  #reset() {
    if (this.editor) {
      this.editor.setRootElement(null)
      this.editor = null
    }

    if (this.editorContentElement) {
      this.removeChild(this.editorContentElement)
      this.editorContentElement = null
    }

    if (this.toolbar) {
      this.removeChild(this.toolbar)
      this.toolbar = null
    }

    this.selection = null

    this.internals.setFormValue("")
  }
}

customElements.define("lexical-editor", LexicalEditorElement)
