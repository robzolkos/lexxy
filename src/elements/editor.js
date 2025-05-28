import { createEditor, $getRoot, $createTextNode, $getNodeByKey, $createNodeSelection, $setSelection } from "lexical"
import { ListNode, ListItemNode, registerList } from "@lexical/list"
import { LinkNode, AutoLinkNode } from "@lexical/link"
import { registerRichText, QuoteNode, HeadingNode } from "@lexical/rich-text"
import { $generateNodesFromDOM, $generateHtmlFromNodes } from "@lexical/html"
import { $createCodeNode, $isCodeNode, CodeHighlightNode, CodeNode, registerCodeHighlighting, } from "@lexical/code"
import { TRANSFORMERS, registerMarkdownShortcuts } from "@lexical/markdown"
import { registerHistory, createEmptyHistoryState } from '@lexical/history'

import theme from "../config/theme"
import { ActionTextAttachmentNode } from "../nodes/action_text_attachment_node"
import { ActionTextAttachmentUploadNode } from "../nodes/action_text_attachment_upload_node"
import { CommandDispatcher } from "../editor/command_dispatcher"
import Selection from "../editor/selection"
import { createElement, sanitize } from "../helpers/html_helper"
import LexicalToolbar from "./toolbar"

export default class LexicalEditorElement extends HTMLElement {
  static formAssociated = true
  static debug = true
  static commands = [ "bold", "italic", "" ]

  constructor() {
    super()
    this.internals = this.attachInternals()
  }

  connectedCallback() {
    this.editor = this.#createEditor()
    this.selection = new Selection(this.editor)

    CommandDispatcher.configureFor(this)

    this.#loadInitialValue()
    this.#updateInternalValueOnChange()
    this.#registerComponents()
    this.#listenForInvalidatedNodes()
    this.#attachDebugHooks()
    this.#attachToolbar()
  }

  get toolbarElement() {
    this.toolbar = this.toolbar || this.#findOrCreateDefaultToolbar()
    return this.toolbar
  }

  get directUploadUrl() {
    return this.dataset.directUploadUrl
  }

  get value() {
    let html = ""
    this.editor?.getEditorState().read(() => {
      html = $generateHtmlFromNodes(this.editor, null)
    })
    return sanitize(html)
  }

  set value(html) {
    this.internals.setFormValue(html)

    const parser = new DOMParser()
    const dom = parser.parseFromString(html, "text/html")

    this.editor.update(() => {
      const root = $getRoot()
      root.clear()
      const nodes = $generateNodesFromDOM(this.editor, dom)
      root.append(...nodes)
      this.#refreshHighlightedCodeNodes()
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
    editor.update(() => {})

    return editor
  }

  #createEditorContentElement() {
    const editorContentElement = document.createElement("div")
    editorContentElement.classList.add("lexical-editor__content")
    editorContentElement.setAttribute("contenteditable", "true")
    this.appendChild(editorContentElement)

    return editorContentElement
  }

  #loadInitialValue() {
    const initialHtml = this.getAttribute("value") || "<p></p>"
    console.debug("INITIAL VALUE", initialHtml)
    this.value = initialHtml
  }

  #updateInternalValueOnChange() {
    this.editor.registerUpdateListener(({ editorState }) => {
      this.internals.setFormValue(this.value)
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

  #attachDebugHooks() {
    if (!LexicalEditorElement.debug) return

    this.editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        console.debug("HTML: ", this.value)
      })
    })
  }

  #attachToolbar() {
    this.toolbarElement.setEditor(this.editor)
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

  #refreshHighlightedCodeNodes() {
    // Workaround to get Prims highlighing working on the initial load.
    requestAnimationFrame(() => {
      this.editor.update(() => {
        const root = $getRoot()
        root.getChildren().forEach((node) => {
          if ($isCodeNode(node)) {
            const oldText = node.getTextContent()
            node.getChildren().forEach((child) => child.remove())
            node.append($createTextNode(oldText))
          }
        })
      })
    })
  }
}

customElements.define("lexical-editor", LexicalEditorElement)
