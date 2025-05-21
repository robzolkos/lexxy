
import { createEditor, $getRoot, $getNodeByKey, $createNodeSelection, $setSelection, $getSelection, $isNodeSelection, $addUpdateTag, SKIP_DOM_SELECTION_TAG } from "lexical"
import { ListNode, ListItemNode, registerList } from "@lexical/list"
import { LinkNode } from "@lexical/link"
import { registerRichText, QuoteNode, HeadingNode } from "@lexical/rich-text"
import { $generateNodesFromDOM, $generateHtmlFromNodes } from "@lexical/html"
import { CodeHighlightNode, CodeNode, registerCodeHighlighting, } from "@lexical/code"
import { TRANSFORMERS, registerMarkdownShortcuts } from "@lexical/markdown"

import theme from "../config/theme"
import { ActionTextAttachmentNode } from "../nodes/action_text_attachment_node"
import { ActionTextAttachmentUploadNode } from "../nodes/action_text_attachment_upload_node"
import { CommandDispatcher } from "../editor/command_dispatcher"

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
    CommandDispatcher.configureFor(this.editor)

    this.#loadInitialValue()
    this.#updateInternalValueOnChange()
    this.#registerComponents()
    this.#listenForCustomEvents()
    this.#attachDebugHooks()
    this.#attachToolbar()
  }

  get toolbarElement() {
    const toolbarId = this.getAttribute("toolbar")
    return document.getElementById(toolbarId)
  }

  get directUploadUrl() {
    return this.dataset.directUploadUrl
  }

  disconnectedCallback() {
    this.editor?.destroy()
  }

  get value() {
    let html = ""
    this.editor?.getEditorState().read(() => {
      html = $generateHtmlFromNodes(this.editor, null)
    })
    return html
  }

  set value(html) {
    this.internals.setFormValue(html)

    const parser = new DOMParser()
    const dom = parser.parseFromString(html, "text/html")

    this.editor.update(() => {
      const root = $getRoot()
      root.clear()
      root.select()
      const nodes = $generateNodesFromDOM(this.editor, dom)
      root.append(...nodes)
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

        ActionTextAttachmentNode,
        ActionTextAttachmentUploadNode
      ]
    })

    editor.setRootElement(this.editorContentElement)

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
    const initialHtml = this.getAttribute("value") || this.innerHTML.trim()
    if (initialHtml) { this.value = initialHtml }
  }

  #updateInternalValueOnChange() {
    this.editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const html = $generateHtmlFromNodes(this.editor, null)
        this.internals.setFormValue(html)
      })
    })
  }

  #registerComponents() {
    registerRichText(this.editor)
    registerList(this.editor)
    registerCodeHighlighting(this.editor)
    registerMarkdownShortcuts(this.editor, TRANSFORMERS)
  }

  #listenForCustomEvents() {
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

  #attachDebugHooks() {
    if (!LexicalEditorElement.debug) return

    this.editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const html = $generateHtmlFromNodes(this.editor, null)
        console.debug("HTML: ", html)
      })
    })
  }

  #attachToolbar() {
    this.toolbarElement.setEditor(this.editor)
  }
}

customElements.define("lexical-editor", LexicalEditorElement)

