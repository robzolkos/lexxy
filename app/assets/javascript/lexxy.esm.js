import { $getSelection, $isRangeSelection, $isTextNode, DecoratorNode, $getNodeByKey, HISTORY_MERGE_TAG, FORMAT_TEXT_COMMAND, UNDO_COMMAND, REDO_COMMAND, OUTDENT_CONTENT_COMMAND, INDENT_CONTENT_COMMAND, PASTE_COMMAND, COMMAND_PRIORITY_LOW, KEY_TAB_COMMAND, $isNodeSelection, $getRoot, $isLineBreakNode, $isElementNode, KEY_ARROW_LEFT_COMMAND, KEY_ARROW_UP_COMMAND, KEY_ARROW_RIGHT_COMMAND, KEY_ARROW_DOWN_COMMAND, KEY_DELETE_COMMAND, KEY_BACKSPACE_COMMAND, SELECTION_CHANGE_COMMAND, $createNodeSelection, $setSelection, $createParagraphNode, $isParagraphNode, $insertNodes, $createTextNode, $createLineBreakNode, CLEAR_HISTORY_COMMAND, $addUpdateTag, SKIP_DOM_SELECTION_TAG, createEditor, TextNode, ParagraphNode, LineBreakNode, KEY_ENTER_COMMAND, COMMAND_PRIORITY_NORMAL, COMMAND_PRIORITY_HIGH, KEY_SPACE_COMMAND } from 'lexical';
import { $isListNode, $isListItemNode, INSERT_UNORDERED_LIST_COMMAND, INSERT_ORDERED_LIST_COMMAND, ListNode, ListItemNode, registerList } from '@lexical/list';
import { $isQuoteNode, $isHeadingNode, $createQuoteNode, $createHeadingNode, QuoteNode, HeadingNode, registerRichText } from '@lexical/rich-text';
import { $isCodeNode, $isCodeHighlightNode, CodeNode, CodeHighlightNode, registerCodeHighlighting, CODE_LANGUAGE_FRIENDLY_NAME_MAP, normalizeCodeLang } from '@lexical/code';
import { $isLinkNode, $toggleLink, LinkNode, AutoLinkNode } from '@lexical/link';
import { $generateNodesFromDOM, $generateHtmlFromNodes } from '@lexical/html';
import { $convertFromMarkdownString, TRANSFORMERS, registerMarkdownShortcuts } from '@lexical/markdown';
import { registerHistory, createEmptyHistoryState } from '@lexical/history';
import DOMPurify from 'dompurify';
import { DirectUpload } from '@rails/activestorage';
import 'prismjs/components/prism-ruby';

function getNearestListItemNode(node) {
  let current = node;
  while (current !== null) {
    if ($isListItemNode(current)) return current
    current = current.getParent();
  }
  return null
}

function getListType(node) {
  let current = node;
  while (current) {
    if ($isListNode(current)) {
      return current.getListType()
    }
    current = current.getParent();
  }
  return null
}

class LexicalToolbarElement extends HTMLElement {
  constructor() {
    super();
    this.internals = this.attachInternals();
    this.internals.role = "toolbar";
  }

  connectedCallback() {
    this.#refreshToolbarOverflow();
    window.addEventListener("resize", this.#refreshToolbarOverflow);
  }

  disconnectedCallback() {
    window.removeEventListener("resize", this.#refreshToolbarOverflow);
  }

  setEditor(editorElement) {
    this.editorElement = editorElement;
    this.editor = editorElement.editor;
    this.#bindButtons();
    this.#bindHotkeys();
    this.#assignButtonTabindex();
    this.#monitorSelectionChanges();
  }

  #bindButtons() {
    this.addEventListener("click", this.#handleButtonClicked.bind(this));
  }

  #handleButtonClicked({ target }) {
    this.#handleTargetClicked(target, "[data-command]", this.#dispatchButtonCommand.bind(this));
    this.#handleTargetClicked(target, "[data-dialog-target]", this.#toggleDialog.bind(this));
  }

  #handleTargetClicked(target, selector, callback) {
    const button = target.closest(selector);
    if (button) {
      callback(button);
    }
  }

  #dispatchButtonCommand(button) {
    const { command, payload } = button.dataset;
    this.editor.dispatchCommand(command, payload);
  }

  // Not using popover because of CSS anchoring still not widely available.
  #toggleDialog(button) {
    const dialog = document.getElementById(button.dataset.dialogTarget).parentNode;

    if (dialog.open) {
      dialog.close();
    } else {
      dialog.show();
    }
  }

  #bindHotkeys() {
    this.editorElement.addEventListener('keydown', (event) => {
      const buttons = this.querySelectorAll("[data-hotkey]");
      buttons.forEach((button) => {
        const hotkeys = button.dataset.hotkey.toLowerCase().split(/\s+/);
        if (hotkeys.includes(this.#keyCombinationFor(event))) {
          event.preventDefault();
          event.stopPropagation();
          button.click();
        }
      });
    });
  }

  #keyCombinationFor(event) {
    const pressedKey = event.key.toLowerCase();
    const modifiers = [
      event.ctrlKey ? 'ctrl' : null,
      event.metaKey ? 'cmd' : null,
      event.altKey ? 'alt' : null,
      event.shiftKey ? 'shift' : null,
    ].filter(Boolean);

    return [ ...modifiers, pressedKey ].join('+')
  }

  #assignButtonTabindex() {
    const baseTabIndex = parseInt(this.editorElement.editorContentElement.getAttribute("tabindex") ?? "0");
    this.#buttons.forEach((button, index) => {
      button.setAttribute("tabindex", `${baseTabIndex + index + 1}`);
    });
  }

  #monitorSelectionChanges() {
    this.editor.registerUpdateListener(() => {
      this.editor.getEditorState().read(() => {
        this.#updateButtonStates();
      });
    });
  }

  #updateButtonStates() {
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) return

    const anchorNode = selection.anchor.getNode();
    if (!anchorNode.getParent()) { return }

    const topLevelElement = anchorNode.getTopLevelElementOrThrow();

    const isBold = selection.hasFormat("bold");
    const isItalic = selection.hasFormat("italic");
    const isInCode = $isCodeNode(topLevelElement) || selection.hasFormat("code");
    const isInList = this.#isInList(anchorNode);
    const listType = getListType(anchorNode);
    const isInQuote = $isQuoteNode(topLevelElement);
    const isInHeading = $isHeadingNode(topLevelElement);
    const isInLink = this.#isInLink(anchorNode);

    this.#setButtonPressed("bold", isBold);
    this.#setButtonPressed("italic", isItalic);
    this.#setButtonPressed("code", isInCode);
    this.#setButtonPressed("unordered-list", isInList && listType === "bullet");
    this.#setButtonPressed("ordered-list", isInList && listType === "number");
    this.#setButtonPressed("quote", isInQuote);
    this.#setButtonPressed("heading", isInHeading);
    this.#setButtonPressed("link", isInLink);
  }

  #isSelectionInInlineCode(selection) {
    const nodes = selection.getNodes();
    return nodes.some(node => {
      if ($isCodeHighlightNode(node)) return true
      // Check parent for text nodes inside code highlight
      if ($isTextNode(node)) {
        const parent = node.getParent();
        if (parent && $isCodeHighlightNode(parent)) return true
      }
      return false
    })
  }

  #isInList(node) {
    let current = node;
    while (current) {
      if ($isListNode(current) || $isListItemNode(current)) return true
      current = current.getParent();
    }
    return false
  }

  #isInLink(node) {
    let current = node;
    while (current) {
      if ($isLinkNode(current)) return true
      current = current.getParent();
    }
    return false
  }

  #setButtonPressed(name, isPressed) {
    const button = this.querySelector(`[name="${name}"]`);
    if (button) {
      button.setAttribute("aria-pressed", isPressed.toString());
    }
  }

  #toolbarIsOverflowing() {
    return this.scrollWidth > this.clientWidth
  }

  #refreshToolbarOverflow = () => {
    this.#resetToolbar();
    this.#compactMenu();

    this.#overflow.style.display = this.#overflowMenu.children.length ? "block" : "none";
  }

  get #overflow() {
    return this.querySelector(".lexxy-editor__toolbar-overflow")
  }

  get #overflowMenu() {
    return this.querySelector(".lexxy-editor__toolbar-overflow-menu")
  }

  #resetToolbar() {
    while (this.#overflowMenu.children.length > 0) {
      this.insertBefore(this.#overflowMenu.children[0], this.#overflow);
    }
  }

  #compactMenu() {
    const buttons = this.#buttons.reverse();
    let movedToOverflow = false;

    for (const button of buttons) {
      if (this.#toolbarIsOverflowing()) {
        this.#overflowMenu.appendChild(button);
        movedToOverflow = true;
      } else {
        if (movedToOverflow) this.#overflowMenu.appendChild(button);
        break
      }
    }
  }

  get #buttons() {
    return Array.from(this.querySelectorAll(":scope > button"))
  }

  static get defaultTemplate() {
    return `
      <button class="lexxy-editor__toolbar-button" type="button" name="undo" data-command="undo" data-hotkey="cmd+z ctrl+z" title="Undo">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/></svg>
      </button>

      <button class="lexxy-editor__toolbar-button" type="button" name="redo" data-command="redo" data-hotkey="cmd+y ctrl+y cmd+shift+z ctrl+shift+z" title="Redo">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z"/></svg>
      </button>

      <button class="lexxy-editor__toolbar-button" type="button" name="bold" data-command="bold" title="Bold">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5 22V2h8.183c1.764 0 3.174.435 4.228 1.304 1.055.87 1.582 2.076 1.582 3.62 0 .8-.148 1.503-.445 2.109a3.94 3.94 0 01-1.194 1.465 4.866 4.866 0 01-1.726.806v.176c.786.078 1.51.312 2.172.703a4.293 4.293 0 011.596 1.627c.403.693.604 1.543.604 2.549 0 1.192-.292 2.207-.877 3.048-.585.84-1.39 1.484-2.416 1.934-1.026.44-2.206.659-3.538.659H5zM8.854 4.974v5.348h2.56c.873 0 1.582-.107 2.129-.322.556-.215.963-.523 1.222-.923.269-.41.403-.904.403-1.48 0-.82-.254-1.46-.762-1.92-.499-.468-1.204-.703-2.115-.703H8.854zm0 8.103v5.949h2.877c1.534 0 2.636-.245 3.307-.733.671-.498 1.007-1.221 1.007-2.168 0-.635-.134-1.178-.403-1.627-.268-.459-.666-.81-1.193-1.055-.518-.244-1.156-.366-1.913-.366H8.854z"/></svg>
      </button>

      <button class="lexxy-editor__toolbar-button" type="button" name="italic" data-command="italic" title="Italic">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.1 4h-1.5l-3.2 16h1.5l-.4 2h-7l.4-2h1.5l3.2-16h-1.5l.4-2h7l-.4 2z"/></svg>
      </button>

      <button class="lexxy-editor__toolbar-button" type="button" name="link" title="Link" data-dialog-target="link-dialog" data-hotkey="cmd+k ctrl+k">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.111 9.546a1.5 1.5 0 012.121 0 5.5 5.5 0 010 7.778l-2.828 2.828a5.5 5.5 0 01-7.778 0 5.498 5.498 0 010-7.777l2.828-2.83a1.5 1.5 0 01.355-.262 6.52 6.52 0 00.351 3.799l-1.413 1.414a2.499 2.499 0 000 3.535 2.499 2.499 0 003.535 0l2.83-2.828a2.5 2.5 0 000-3.536 1.5 1.5 0 010-2.121z"/><path d="M12.111 3.89a5.5 5.5 0 117.778 7.777l-2.828 2.829a1.496 1.496 0 01-.355.262 6.522 6.522 0 00-.351-3.8l1.413-1.412a2.5 2.5 0 10-3.536-3.535l-2.828 2.828a2.5 2.5 0 000 3.536 1.5 1.5 0 01-2.122 2.12 5.5 5.5 0 010-7.777l2.83-2.829z"/></svg>
      </button>

      <lexxy-link-dialog class="lexxy-link-dialog">
        <dialog id="link-dialog" closedby="any">
          <form method="dialog">
            <input type="url" placeholder="Enter a URL…" class="input" required>
            <div class="lexxy-dialog-actions">
              <button type="submit" class="btn" value="link">Link</button>
              <button type="button" class="btn" value="unlink">Unlink</button>
            </div>
          </form>
        </dialog>
      </lexxy-link-dialog>

      <button class="lexxy-editor__toolbar-button" type="button" name="quote" data-command="insertQuoteBlock" title="Quote">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6.5 5C8.985 5 11 7.09 11 9.667c0 2.694-.962 5.005-2.187 6.644-.613.82-1.3 1.481-1.978 1.943-.668.454-1.375.746-2.022.746a.563.563 0 01-.52-.36.602.602 0 01.067-.57l.055-.066.009-.009.041-.048a4.25 4.25 0 00.168-.21c.143-.188.336-.47.53-.84a6.743 6.743 0 00.75-2.605C3.705 13.994 2 12.038 2 9.667 2 7.089 4.015 5 6.5 5zM17.5 5C19.985 5 22 7.09 22 9.667c0 2.694-.962 5.005-2.187 6.644-.613.82-1.3 1.481-1.978 1.943-.668.454-1.375.746-2.023.746a.563.563 0 01-.52-.36.602.602 0 01.068-.57l.055-.066.009-.009.041-.048c.039-.045.097-.115.168-.21a6.16 6.16 0 00.53-.84 6.745 6.745 0 00.75-2.605C14.705 13.994 13 12.038 13 9.667 13 7.089 15.015 5 17.5 5z"/></svg>
      </button>

      <button class="lexxy-editor__toolbar-button" type="button" name="heading" data-command="rotateHeadingFormat" title="Heading">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15.322 5.315H9.64V22H5.684V5.315H0v-3.31h15.322v3.31z"/><path d="M23.957 11.79H19.92V22h-3.402V11.79H12.48V9.137h11.477v2.653z"/></svg>
      </button>

      <button class="lexxy-editor__toolbar-button" type="button" name="code" data-command="insertCodeBlock" title="Code">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10.121 6l-6 6 6 6-2.12 2.121-7.061-7.06a1.5 1.5 0 010-2.121L8 3.879 10.121 6zM23.06 10.94a1.5 1.5 0 010 2.12L16 20.121 13.88 18l6-6-6-6L16 3.879l7.06 7.06z"/></svg>
      </button>

      <button class="lexxy-editor__toolbar-button" type="button" name="unordered-list" data-command="insertUnorderedList" title="Bullet list">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5 5a2 2 0 11-4 0 2 2 0 014 0zM5 12a2 2 0 11-4 0 2 2 0 014 0zM5 19a2 2 0 11-4 0 2 2 0 014 0zM7 5.25C7 4.56 7.56 4 8.25 4h13.5a1.25 1.25 0 110 2.5H8.25C7.56 6.5 7 5.94 7 5.25zM7 12.25c0-.69.56-1.25 1.25-1.25h13.5a1.25 1.25 0 110 2.5H8.25c-.69 0-1.25-.56-1.25-1.25zM7 19.25c0-.69.56-1.25 1.25-1.25h13.5a1.25 1.25 0 110 2.5H8.25c-.69 0-1.25-.56-1.25-1.25z"/></svg>
      </button>

      <button class="lexxy-editor__toolbar-button" type="button" name="ordered-list" data-command="insertOrderedList" title="Numbered list">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7 5.25C7 4.56 7.56 4 8.25 4h13.5a1.25 1.25 0 110 2.5H8.25C7.56 6.5 7 5.94 7 5.25zM7 12.25c0-.69.56-1.25 1.25-1.25h13.5a1.25 1.25 0 110 2.5H8.25c-.69 0-1.25-.56-1.25-1.25zM7 19.25c0-.69.56-1.25 1.25-1.25h13.5a1.25 1.25 0 110 2.5H8.25c-.69 0-1.25-.56-1.25-1.25zM4.438 8H3.39V3.684H3.34c-.133.093-.267.188-.402.285l-.407.289a129.5 129.5 0 00-.402.285v-.969l.633-.453c.21-.15.42-.302.629-.453h1.046V8zM2.672 11.258h-1v-.051c0-.206.036-.405.11-.598.075-.195.188-.37.34-.527.15-.156.339-.281.566-.375.229-.094.498-.14.808-.14.367 0 .688.065.961.195s.484.308.633.535c.15.224.226.478.226.762 0 .244-.046.463-.14.656-.091.19-.209.368-.352.535-.14.164-.289.332-.445.504L3.168 14.09v.05h2.238V15H1.723v-.656l1.949-2.102c.096-.101.19-.207.281-.316.091-.112.167-.232.227-.36a.953.953 0 00.09-.41.712.712 0 00-.387-.648.845.845 0 00-.41-.098.81.81 0 00-.43.11.75.75 0 00-.277.293.824.824 0 00-.094.386V11.258zM2.852 19.66v-.812h.562a.917.917 0 00.43-.098.742.742 0 00.293-.266.673.673 0 00.101-.379.654.654 0 00-.234-.523.87.87 0 00-.59-.2.987.987 0 00-.336.055.837.837 0 00-.258.149.712.712 0 00-.172.215.66.66 0 00-.066.25h-.98c.007-.209.053-.403.136-.582.084-.18.203-.336.36-.469.156-.135.346-.24.57-.316.227-.076.486-.115.777-.118a2.33 2.33 0 01.965.176c.271.12.48.285.63.496.15.209.227.448.23.719a1.11 1.11 0 01-.16.637 1.28 1.28 0 01-.825.586v.054c.162.016.33.07.504.164.177.094.328.232.453.415.125.18.189.411.192.695a1.37 1.37 0 01-.157.676c-.104.197-.25.365-.437.503-.188.136-.404.24-.649.313-.242.07-.5.105-.777.105-.401 0-.743-.067-1.027-.203a1.608 1.608 0 01-.649-.547 1.46 1.46 0 01-.238-.75h.969c.01.128.057.243.14.344a.885.885 0 00.332.238c.141.058.3.088.477.09.195 0 .366-.034.512-.101a.798.798 0 00.336-.29.744.744 0 00.117-.425.74.74 0 00-.446-.695 1.082 1.082 0 00-.496-.106h-.59z"/></svg>
      </button>

      <button class="lexxy-editor__toolbar-button" type="button" name="upload" data-command="uploadAttachments" title="Upload file">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16 8a2 2 0 110 4 2 2 0 010-4z""/><path d="M22 2a1 1 0 011 1v18a1 1 0 01-1 1H2a1 1 0 01-1-1V3a1 1 0 011-1h20zM3 18.714L9 11l5.25 6.75L17 15l4 4V4H3v14.714z"/></svg>
      </button>

      <details class="lexxy-editor__toolbar-overflow">
        <summary class="lexxy-editor__toolbar-button" aria-label="Show more toolbar buttons">•••</summary>
        <div class="lexxy-editor__toolbar-overflow-menu" aria-label="More toolbar buttons"></div>
      </details>
    `
  }
}

customElements.define("lexxy-toolbar", LexicalToolbarElement);

var theme = {
  // List theming
  list: {
    ul: 'lexxy-list__ul',
    ol: 'lexxy-list__ol',
    listitem: 'lexxy-list__item',
    listitemChecked: 'lexxy-list__item--checked',
    listitemUnchecked: 'lexxy-list__item--unchecked',
    nested: {
      listitem: 'lexxy-list__item--nested'
    },
    olDepth: [
      'lexxy-list__ol--level-1',
      'lexxy-list__ol--level-2',
      'lexxy-list__ol--level-3',
      'lexxy-list__ol--level-4',
      'lexxy-list__ol--level-5'
    ],
    checklist: 'lexxy-list__checklist'
  },

  // Code highlighting
  codeHighlight: {
    atrule: 'code-token__attr',
    attr: 'code-token__attr',
    'attr-name': 'code-token__attr',
    'attr-value': 'code-token__selector',
    boolean: 'code-token__property',
    bold: 'code-token__variable',
    builtin: 'code-token__selector',
    cdata: 'code-token__comment',
    char: 'code-token__selector',
    class: 'code-token__function',
    'class-name': 'code-token__function',
    color: 'code-token__property',
    comment: 'code-token__comment',
    constant: 'code-token__property',
    coord: 'code-token__property',
    decorator: 'code-token__function',
    deleted: 'code-token__property',
    doctype: 'code-token__comment',
    entity: 'code-token__operator',
    function: 'code-token__function',
    hexcode: 'code-token__property',
    important: 'code-token__variable',
    inserted: 'code-token__selector',
    italic: 'code-token__comment',
    keyword: 'code-token__attr',
    namespace: 'code-token__variable',
    number: 'code-token__property',
    operator: 'code-token__operator',
    parameter: 'code-token__variable',
    prolog: 'code-token__comment',
    property: 'code-token__property',
    punctuation: 'code-token__punctuation',
    regex: 'code-token__variable',
    script: 'code-token__function',
    selector: 'code-token__selector',
    string: 'code-token__selector',
    style: 'code-token__function',
    symbol: 'code-token__property',
    tag: 'code-token__property',
    title: 'code-token__function',
    url: 'code-token__operator',
    variable: 'code-token__variable',
  }
};

function bytesToHumanSize(bytes) {
  if (bytes === 0) return "0 B"
  const sizes = [ "B", "KB", "MB", "GB", "TB", "PB" ];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = bytes / Math.pow(1024, i);
  return `${ value.toFixed(2) } ${ sizes[i] }`
}

const VISUALLY_RELEVANT_ELEMENTS_SELECTOR = [
  "img", "video", "audio", "iframe", "embed", "object", "picture", "source", "canvas", "svg", "math",
  "form", "input", "textarea", "select", "button", "code", "blockquote"
].join(",");

const ALLOWED_HTML_TAGS = [ "a", "action-text-attachment", "b", "blockquote", "br", "code", "em",
  "figcaption", "figure", "h1", "h2", "h3", "h4", "h5", "h6", "i", "img", "li", "ol", "p", "pre", "q", "strong", "ul" ];

const ALLOWED_HTML_ATTRIBUTES = [ "alt", "caption", "class", "content", "content-type", "contenteditable",
  "data-direct-upload-id", "data-sgid", "filename", "filesize", "height", "href", "presentation",
  "previewable", "sgid", "src", "title", "url", "width" ];

function createElement(name, properties) {
  const element = document.createElement(name);
  for (const [ key, value ] of Object.entries(properties || {})) {
    if (key in element) {
      element[key] = value;
    } else if (value !== null && value !== undefined ) {
      element.setAttribute(key, value);
    }
  }
  return element
}

function parseHtml(html) {
  const parser = new DOMParser();
  return parser.parseFromString(html, "text/html")
}

function createAttachmentFigure(contentType, isPreviewable, fileName) {
  const extension = fileName ? fileName.split('.').pop().toLowerCase() : "unknown";
  return createElement("figure", {
    className: `attachment attachment--${isPreviewable ? 'preview' : 'file'} attachment--${extension}`,
    "data-content-type": contentType
  })
}

function isPreviewableImage(contentType) {
  return contentType.startsWith("image/") && !contentType.includes("svg")
}

function dispatchCustomEvent(element, name, detail) {
  const event = new CustomEvent(name, {
    detail: detail,
    bubbles: true,
  });
  element.dispatchEvent(event);
}

function containsVisuallyRelevantChildren(element) {
  return element.querySelector(VISUALLY_RELEVANT_ELEMENTS_SELECTOR)
}

function sanitize(html) {
  const sanitizedHtml = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ALLOWED_HTML_TAGS,
    ALLOWED_ATTR: ALLOWED_HTML_ATTRIBUTES,
    SAFE_FOR_XML: false // So that it does not stripe attributes that contains serialized HTML (like content)
  });

  return sanitizedHtml
}

function dispatch(element, eventName, detail = null, cancelable = false) {
  return element.dispatchEvent(new CustomEvent(eventName, { bubbles: true, detail, cancelable }))
}

function generateDomId(prefix) {
  const randomPart = Math.random().toString(36).slice(2, 10);
  return `${prefix}-${randomPart}`
}

class ActionTextAttachmentNode extends DecoratorNode {
  static getType() {
    return "action_text_attachment"
  }

  static clone(node) {
    return new ActionTextAttachmentNode({ ...node }, node.__key);
  }

  static importJSON(serializedNode) {
    return new ActionTextAttachmentNode({ ...serializedNode })
  }

  static importDOM() {
    return {
      "action-text-attachment": (attachment) => {
        return {
          conversion: () => ({
            node: new ActionTextAttachmentNode({
              sgid: attachment.getAttribute("sgid"),
              src: attachment.getAttribute("url"),
              previewable: attachment.getAttribute("previewable"),
              altText: attachment.getAttribute("alt"),
              caption: attachment.getAttribute("caption"),
              contentType: attachment.getAttribute("content-type"),
              fileName: attachment.getAttribute("filename"),
              fileSize: attachment.getAttribute("filesize"),
              width: attachment.getAttribute("width"),
              height: attachment.getAttribute("height")
            })
          }),
          priority: 1
        }
      },
      "img": (img) => {
        return {
          conversion: () => ({
            node: new ActionTextAttachmentNode({
              src: img.getAttribute("src"),
              contentType: "image/*",
              width: img.getAttribute("width"),
              height: img.getAttribute("height")
            })
          }),
          priority: 1
        }
      }
    }
  }

  constructor({ sgid, src, previewable, altText, caption, contentType, fileName, fileSize, width, height }, key) {
    super(key);

    this.sgid = sgid;
    this.src = src;
    this.previewable = previewable;
    this.altText = altText || "";
    this.caption = caption || "";
    this.contentType = contentType || "";
    this.fileName = fileName;
    this.fileSize = fileSize;
    this.width = width;
    this.height = height;
  }

  createDOM() {
    const figure = this.createAttachmentFigure();

    figure.addEventListener("click", (event) => {
      this.#select(figure);
    });

    if (this.isPreviewableAttachment) {
      figure.appendChild(this.#createDOMForImage());
      figure.appendChild(this.#createEditableCaption());
    } else {
      figure.appendChild(this.#createDOMForFile());
      figure.appendChild(this.#createDOMForNotImage());
    }

    return figure
  }

  updateDOM() {
    return true
  }

  isInline() {
    return false
  }

  exportDOM() {
    const attachment = createElement("action-text-attachment", {
      sgid: this.sgid,
      previewable: this.previewable || null,
      url: this.src,
      alt: this.altText,
      caption: this.caption,
      "content-type": this.contentType,
      filename: this.fileName,
      filesize: this.fileSize,
      width: this.width,
      height: this.height,
      presentation: "gallery"
    });

    return { element: attachment }
  }

  exportJSON() {
    return {
      type: "action_text_attachment",
      version: 1,
      sgid: this.sgid,
      src: this.src,
      previewable: this.previewable,
      altText: this.altText,
      caption: this.caption,
      contentType: this.contentType,
      fileName: this.fileName,
      fileSize: this.fileSize,
      width: this.width,
      height: this.height
    }
  }

  decorate() {
    return null
  }

  createAttachmentFigure() {
    return createAttachmentFigure(this.contentType, this.isPreviewableAttachment, this.fileName)
  }

  get #isPreviewableImage() {
    return isPreviewableImage(this.contentType)
  }

  get isPreviewableAttachment() {
    return this.#isPreviewableImage || this.previewable
  }

  #createDOMForImage() {
    return createElement("img", { src: this.src, alt: this.altText, ...this.#imageDimensions})
  }

  get #imageDimensions() {
    if (this.width && this.height) {
      return { width: this.width, height: this.height }
    } else {
      return {}
    }
  }

  #createDOMForFile() {
    const extension = this.fileName ? this.fileName.split('.').pop().toLowerCase() : 'unknown';
    return createElement("span", { className: "attachment__icon", textContent: `${extension}`})
  }

  #createDOMForNotImage() {
    const figcaption = createElement("figcaption", { className: "attachment__caption" });

    const nameTag = createElement("strong", { className: "attachment__name", textContent: this.caption || this.fileName });
    const sizeSpan = createElement("span", { className: "attachment__size", textContent: bytesToHumanSize(this.fileSize) });

    figcaption.appendChild(nameTag);
    figcaption.appendChild(sizeSpan);

    return figcaption
  }

  #select(figure) {
    dispatchCustomEvent(figure, "lexxy:internal:select-node", { key: this.getKey() });
  }

  #createEditableCaption() {
    const caption = createElement("figcaption", { className: "attachment__caption" });
    const input = createElement("input", {
      type: "text",
      class: "input",
      value: this.caption,
      placeholder: this.fileName
    });

    input.addEventListener("focusin", () => input.placeholder = "Add caption...");
    input.addEventListener("blur", this.#handleCaptionInputBlurred.bind(this));
    input.addEventListener("keydown", this.#handleCaptionInputKeydown.bind(this));

    caption.appendChild(input);

    return caption
  }

  #updateCaption(input) {
  }

  #handleCaptionInputBlurred(event) {
    const input = event.target;

    input.placeholder = this.fileName;
    this.#updateCaptionValueFromInput(input);
  }

  #updateCaptionValueFromInput(input) {
    dispatchCustomEvent(input, "lexxy:internal:invalidate-node", { key: this.getKey(), values: { caption: input.value } });
  }

  #handleCaptionInputKeydown(event) {
    if (event.key === "Enter") {
      this.#updateCaptionValueFromInput(event.target);
      dispatchCustomEvent(event.target, "lexxy:internal:move-to-next-line");
      event.preventDefault();
    }
    event.stopPropagation();
  }
}

async function loadFileIntoImage(file, image) {
  return new Promise((resolve) => {
    const reader = new FileReader();

    image.addEventListener("load", () => {
      resolve(image);
    });

    reader.onload = (event) => {
      image.src = event.target.result || null;
    };

    reader.readAsDataURL(file);
  })
}

class ActionTextAttachmentUploadNode extends ActionTextAttachmentNode {
  static getType() {
    return "action_text_attachment_upload"
  }

  static clone(node) {
    return new ActionTextAttachmentUploadNode({ ...node }, node.__key);
  }

  constructor({ file, uploadUrl, blobUrlTemplate, editor, progress }, key) {
    super({ contentType: file.type }, key);
    this.file = file;
    this.uploadUrl = uploadUrl;
    this.blobUrlTemplate = blobUrlTemplate;
    this.src = null;
    this.editor = editor;
    this.progress = progress || 0;
  }

  createDOM() {
    const figure = this.createAttachmentFigure();

    if (this.isPreviewableAttachment) {
      figure.appendChild(this.#createDOMForImage());
    } else {
      figure.appendChild(this.#createDOMForFile());
    }

    figure.appendChild(this.#createCaption());

    const progressBar = createElement("progress", { value: this.progress, max: 100 });
    figure.appendChild(progressBar);

    // We wait for images to download so that we can pass the dimensions down to the attachment. We do this
    // so that we can render images in edit mode with the dimensions set, which prevent vertical layout shifts.
    this.#loadFigure(figure).then(() => this.#startUpload(progressBar, figure));

    return figure
  }

  exportDOM() {
    const img = document.createElement("img");
    if (this.src) {
      img.src = this.src;
    }
    return { element: img }
  }

  #createDOMForImage() {
    return createElement("img")
  }

  #createDOMForFile() {
    const extension = this.#getFileExtension();
    const span = createElement("span", { className: "attachment__icon", textContent: extension });
    return span
  }

  #getFileExtension() {
    return this.file.name.split('.').pop().toLowerCase()
  }

  #createCaption() {
    const figcaption = createElement("figcaption", { className: "attachment__caption" });

    const nameSpan = createElement("span", { className: "attachment__name", textContent: this.file.name || "" });
    const sizeSpan = createElement("span", { className: "attachment__size", textContent: bytesToHumanSize(this.file.size) });
    figcaption.appendChild(nameSpan);
    figcaption.appendChild(sizeSpan);

    return figcaption
  }

  #loadFigure(figure) {
    const image = figure.querySelector("img");
    if (!image) {
      return Promise.resolve()
    } else {
      return loadFileIntoImage(this.file, image)
    }
  }

  #startUpload(progressBar, figure) {
    const upload = new DirectUpload(this.file, this.uploadUrl, this);

    upload.delegate = {
      directUploadWillStoreFileWithXHR: (request) => {
        request.upload.addEventListener("progress", (event) => {
          this.editor.update(() => {
            progressBar.value = Math.round((event.loaded / event.total) * 100);
          });
        });
      }
    };

    upload.create((error, blob) => {
      if (error) {
        this.#handleUploadError(figure);
      } else {
        this.#loadFigurePreviewFromBlob(blob, figure).then(() => {
          this.#showUploadedAttachment(figure, blob);
        });
      }
    });
  }

  #handleUploadError(figure) {
    figure.innerHTML = "";
    figure.classList.add("attachment--error");
    figure.appendChild(createElement("div", { innerText: `Error uploading ${this.file?.name ?? "image"}` }));
  }

  async #showUploadedAttachment(figure, blob) {
    this.editor.update(() => {
      const image = figure.querySelector("img");

      const src = this.blobUrlTemplate
                    .replace(":signed_id", blob.signed_id)
                    .replace(":filename", encodeURIComponent(blob.filename));
      const latest = $getNodeByKey(this.getKey());
      if (latest) {
        latest.replace(new ActionTextAttachmentNode({
          sgid: blob.attachable_sgid,
          src: blob.previewable ? blob.url : src,
          altText: blob.filename,
          contentType: blob.content_type,
          fileName: blob.filename,
          fileSize: blob.byte_size,
          width: image?.naturalWidth,
          previewable: blob.previewable,
          height: image?.naturalHeight
        }));
      }
    }, { tag: HISTORY_MERGE_TAG });
  }

  async #loadFigurePreviewFromBlob(blob, figure) {
    if (blob.previewable) {
      return new Promise((resolve) => {
        this.editor.update(() => {
          const image = this.#createDOMForImage();
          image.addEventListener("load", () => {
            resolve();
          });
          image.src = blob.url;
          figure.insertBefore(image, figure.firstChild);
        });
      })
    } else {
      return Promise.resolve()
    }
  }
}

const COMMANDS = [
  "bold",
  "rotateHeadingFormat",
  "italic",
  "link",
  "unlink",
  "insertUnorderedList",
  "insertOrderedList",
  "insertQuoteBlock",
  "insertCodeBlock",
  "uploadAttachments",
  "undo",
  "redo"
];

class CommandDispatcher {
  static configureFor(editorElement) {
    new CommandDispatcher(editorElement);
  }

  constructor(editorElement) {
    this.editorElement = editorElement;
    this.editor = editorElement.editor;
    this.selection = editorElement.selection;
    this.contents = editorElement.contents;
    this.clipboard = editorElement.clipboard;

    this.#registerCommands();
    this.#registerDragAndDropHandlers();
  }

  dispatchPaste(event) {
    return this.clipboard.paste(event)
  }

  dispatchBold() {
    this.editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
  }

  dispatchItalic() {
    this.editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
  }

  dispatchLink(url) {
    this.#toggleLink(url);
  }

  dispatchUnlink() {
    this.#toggleLink(null);
  }

  dispatchInsertUnorderedList() {
    const selection = $getSelection();
    const anchorNode = selection.anchor.getNode();

    if (this.selection.isInsideList && anchorNode && getListType(anchorNode) === "bullet") {
      this.contents.unwrapSelectedListItems();
    } else {
      this.editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    }
  }

  dispatchInsertOrderedList() {
    const selection = $getSelection();
    const anchorNode = selection.anchor.getNode();

    if (this.selection.isInsideList && anchorNode && getListType(anchorNode) === "number") {
      this.contents.unwrapSelectedListItems();
    } else {
      this.editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    }
  }

  dispatchInsertQuoteBlock() {
    this.contents.toggleNodeWrappingAllSelectedLines((node) => $isQuoteNode(node), () => $createQuoteNode());
  }

  dispatchInsertCodeBlock() {
    this.editor.update(() => {
      if (this.selection.hasSelectedWordsInSingleLine) {
        this.editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
      } else {
        this.contents.toggleNodeWrappingAllSelectedLines((node) => $isCodeNode(node), () => new CodeNode("plain"));
      }
    });
  }

  dispatchRotateHeadingFormat() {
    this.editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return

      const topLevelElement = selection.anchor.getNode().getTopLevelElementOrThrow();
      let nextTag = "h2";
      if ($isHeadingNode(topLevelElement)) {
        const currentTag = topLevelElement.getTag();
        if (currentTag === "h2") {
          nextTag = "h3";
        } else if (currentTag === "h3") {
          nextTag = "h4";
        } else if (currentTag === "h4") {
          nextTag = null;
        } else {
          nextTag = "h2";
        }
      }

      if (nextTag) {
        this.contents.insertNodeWrappingEachSelectedLine(() => $createHeadingNode(nextTag));
      } else {
        this.contents.removeFormattingFromSelectedLines();
      }
    });
  }

  dispatchUploadAttachments() {
    const input = createElement("input", {
      type: "file",
      multiple: true,
      onchange: ({ target }) => {
        const files = Array.from(target.files);
        if (!files.length) return

        for (const file of files) {
          this.contents.uploadFile(file);
        }
      }
    });

    document.body.appendChild(input); // Append and remove just for the sake of making it testeable
    input.click();
    setTimeout(() => input.remove(), 1000);
  }

  dispatchUndo() {
    this.editor.dispatchCommand(UNDO_COMMAND, undefined);
  }

  dispatchRedo() {
    this.editor.dispatchCommand(REDO_COMMAND, undefined);
  }

  handleTabKey(event) {
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) return false

    // Only handle tab in lists
    if (!this.selection.isInsideList) return false

    event.preventDefault();

    if (event.shiftKey) {
      // Shift+Tab: Outdent
      this.editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
    } else {
      // Tab: Indent
      this.editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
    }

    return true
  }

  #registerCommands() {
    for (const command of COMMANDS) {
      const methodName = `dispatch${capitalize(command)}`;
      this.#registerCommandHandler(command, 0, this[methodName].bind(this));
    }

    this.#registerCommandHandler(PASTE_COMMAND, COMMAND_PRIORITY_LOW, this.dispatchPaste.bind(this));
    this.#registerCommandHandler(KEY_TAB_COMMAND, COMMAND_PRIORITY_LOW, this.handleTabKey.bind(this));
  }

  #registerCommandHandler(command, priority, handler) {
    this.editor.registerCommand(command, handler, priority);
  }

  // Not using TOGGLE_LINK_COMMAND because it's not handled unless you use React/LinkPlugin
  #toggleLink(url) {
    this.editor.update(() => {
      if (url === null) {
        $toggleLink(null);
      } else {
        $toggleLink(url);
      }
    });
  }

  #registerDragAndDropHandlers() {
    if (this.editorElement.supportsAttachments) {
      this.dragCounter = 0;
      this.editor.getRootElement().addEventListener("dragover", this.#handleDragOver.bind(this));
      this.editor.getRootElement().addEventListener("drop", this.#handleDrop.bind(this));
      this.editor.getRootElement().addEventListener("dragenter", this.#handleDragEnter.bind(this));
      this.editor.getRootElement().addEventListener("dragleave", this.#handleDragLeave.bind(this));
    }
  }

  #handleDragEnter(event) {
    this.dragCounter++;
    if (this.dragCounter === 1) {
      this.editor.getRootElement().classList.add("lexxy-editor--drag-over");
    }
  }

  #handleDragLeave(event) {
    this.dragCounter--;
    if (this.dragCounter === 0) {
      this.editor.getRootElement().classList.remove("lexxy-editor--drag-over");
    }
  }

  #handleDragOver(event) {
    event.preventDefault();
  }

  #handleDrop(event) {
    event.preventDefault();

    this.dragCounter = 0;
    this.editor.getRootElement().classList.remove("lexxy-editor--drag-over");

    const dataTransfer = event.dataTransfer;
    if (!dataTransfer) return

    const files = Array.from(dataTransfer.files);
    if (!files.length) return

    for (const file of files) {
      this.contents.uploadFile(file);
    }

    this.editor.focus();
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function debounceAsync(fn, wait) {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);

    return new Promise((resolve, reject) => {
      timeout = setTimeout(async () => {
        try {
          const result = await fn(...args);
          resolve(result);
        } catch (err) {
          reject(err);
        }
      }, wait);
    })
  }
}

function nextFrame() {
  return new Promise(requestAnimationFrame)
}

class Selection {
  constructor(editorElement) {
    this.editorElement = editorElement;
    this.editor = this.editorElement.editor;
    this.previouslySelectedKeys = new Set();

    this.#listenForNodeSelections();
    this.#processSelectionChangeCommands();
  }

  clear() {
    this.current = null;
  }

  set current(selection) {
    if ($isNodeSelection(selection)) {
      this._current = $getSelection();
      this.#syncSelectedClasses();
    } else {
      this.editor.update(() => {
        this.#syncSelectedClasses();
        this._current = null;
      });
    }
  }

  get current() {
    return this._current
  }

  get cursorPosition() {
    let position = { x: 0, y: 0 };

    this.editor.getEditorState().read(() => {
      const range = this.#getValidSelectionRange();
      if (!range) return

      const rect = this.#getReliableRectFromRange(range);
      if (!rect) return

      position = this.#calculateCursorPosition(rect, range);
    });

    return position
  }

  placeCursorAtTheEnd() {
    this.editor.update(() => {
      $getRoot().selectEnd();
    });
  }

  get hasSelectedWordsInSingleLine() {
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) return false

    if (selection.isCollapsed()) return false

    const anchorNode = selection.anchor.getNode();
    const focusNode = selection.focus.getNode();

    if (anchorNode.getTopLevelElement() !== focusNode.getTopLevelElement()) {
      return false
    }

    const anchorElement = anchorNode.getTopLevelElement();
    if (!anchorElement) return false

    const nodes = selection.getNodes();
    for (const node of nodes) {
      if ($isLineBreakNode(node)) {
        return false
      }
    }

    return true
  }

  get isInsideList() {
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) return false

    const anchorNode = selection.anchor.getNode();
    return getNearestListItemNode(anchorNode) !== null
  }

  get nodeAfterCursor() {
    const { anchorNode, offset } = this.#getCollapsedSelectionData();
    if (!anchorNode) return null

    if ($isTextNode(anchorNode)) {
      return this.#getNodeAfterTextNode(anchorNode, offset)
    }

    if ($isElementNode(anchorNode)) {
      return this.#getNodeAfterElementNode(anchorNode, offset)
    }

    return this.#findNextSiblingUp(anchorNode)
  }

  get nodeBeforeCursor() {
    const { anchorNode, offset } = this.#getCollapsedSelectionData();
    if (!anchorNode) return null

    if ($isTextNode(anchorNode)) {
      return this.#getNodeBeforeTextNode(anchorNode, offset)
    }

    if ($isElementNode(anchorNode)) {
      return this.#getNodeBeforeElementNode(anchorNode, offset)
    }

    return this.#findPreviousSiblingUp(anchorNode)
  }

  get #contents() {
    return this.editorElement.contents
  }

  get #currentlySelectedKeys() {
    if (this._currentlySelectedKeys) { return this._currentlySelectedKeys }

    this._currentlySelectedKeys = new Set();

    if (this.current) {
      for (const node of this.current.getNodes()) {
        this._currentlySelectedKeys.add(node.getKey());
      }
    }

    return this._currentlySelectedKeys
  }

  #processSelectionChangeCommands() {
    this.editor.registerCommand(KEY_ARROW_LEFT_COMMAND, this.#selectPreviousNode.bind(this), COMMAND_PRIORITY_LOW);
    this.editor.registerCommand(KEY_ARROW_UP_COMMAND, this.#selectPreviousNode.bind(this), COMMAND_PRIORITY_LOW);
    this.editor.registerCommand(KEY_ARROW_RIGHT_COMMAND, this.#selectNextNode.bind(this), COMMAND_PRIORITY_LOW);
    this.editor.registerCommand(KEY_ARROW_DOWN_COMMAND, this.#selectNextNode.bind(this), COMMAND_PRIORITY_LOW);

    this.editor.registerCommand(KEY_DELETE_COMMAND, this.#deleteSelectedOrNext.bind(this), COMMAND_PRIORITY_LOW);
    this.editor.registerCommand(KEY_BACKSPACE_COMMAND, this.#deletePreviousOrNext.bind(this), COMMAND_PRIORITY_LOW);

    this.editor.registerCommand(SELECTION_CHANGE_COMMAND, () => {
      this.current = $getSelection();
    }, COMMAND_PRIORITY_LOW);
  }

  #listenForNodeSelections() {
    this.editor.getRootElement().addEventListener("lexxy:internal:select-node", async (event) => {
      await nextFrame();

      const { key } = event.detail;
      this.editor.update(() => {
        const node = $getNodeByKey(key);
        if (node) {
          const selection = $createNodeSelection();
          selection.add(node.getKey());
          $setSelection(selection);
        }
        this.editor.focus();
      });
    });

    this.editor.getRootElement().addEventListener("lexxy:internal:move-to-next-line", (event) => {
      this.#selectOrAppendNextLine();
    });
  }

  #syncSelectedClasses() {
    this.#clearPreviouslyHighlightedItems();
    this.#highlightNewItems();

    this.previouslySelectedKeys = this.#currentlySelectedKeys;
    this._currentlySelectedKeys = null;
  }

  #clearPreviouslyHighlightedItems() {
    for (const key of this.previouslySelectedKeys) {
      if (!this.#currentlySelectedKeys.has(key)) {
        const dom = this.editor.getElementByKey(key);
        if (dom) dom.classList.remove("node--selected");
      }
    }
  }

  #highlightNewItems() {
    for (const key of this.#currentlySelectedKeys) {
      if (!this.previouslySelectedKeys.has(key)) {
        const nodeElement = this.editor.getElementByKey(key);
        if (nodeElement) nodeElement.classList.add("node--selected");
      }
    }
  }

  async #selectPreviousNode() {
    if (this.current) {
      await this.#withCurrentNode((currentNode) => currentNode.selectPrevious());
    } else {
      this.#selectInLexical(this.nodeBeforeCursor);
    }
  }

  async #selectNextNode() {
    if (this.current) {
      await this.#withCurrentNode((currentNode) => currentNode.selectNext(0, 0));
    } else {
      this.#selectInLexical(this.nodeAfterCursor);
    }
  }

  async #withCurrentNode(fn) {
    await nextFrame();
    if (this.current) {
      this.editor.update(() => {
        this.clear();
        fn(this.current.getNodes()[0]);
        this.editor.focus();
      });
    }
  }

  async #selectOrAppendNextLine() {
    this.editor.update(() => {
      const topLevelElement = this.#getTopLevelElementFromSelection();
      if (!topLevelElement) return

      this.#moveToOrCreateNextLine(topLevelElement);
    });
  }

  #getTopLevelElementFromSelection() {
    const selection = $getSelection();
    if (!selection) return null

    if ($isNodeSelection(selection)) {
      return this.#getTopLevelFromNodeSelection(selection)
    }

    if ($isRangeSelection(selection)) {
      return this.#getTopLevelFromRangeSelection(selection)
    }

    return null
  }

  #getTopLevelFromNodeSelection(selection) {
    const nodes = selection.getNodes();
    return nodes.length > 0 ? nodes[0].getTopLevelElement() : null
  }

  #getTopLevelFromRangeSelection(selection) {
    const anchorNode = selection.anchor.getNode();
    return anchorNode.getTopLevelElement()
  }

  #moveToOrCreateNextLine(topLevelElement) {
    const nextSibling = topLevelElement.getNextSibling();

    if (nextSibling) {
      nextSibling.selectStart();
    } else {
      this.#createAndSelectNewParagraph();
    }
  }

  #createAndSelectNewParagraph() {
    const root = $getRoot();
    const newParagraph = $createParagraphNode();
    root.append(newParagraph);
    newParagraph.selectStart();
  }

  #selectInLexical(node) {
    if (!node || !(node instanceof DecoratorNode)) return

    this.editor.update(() => {
      const selection = $createNodeSelection();
      selection.add(node.getKey());
      $setSelection(selection);
    });
  }

  #deleteSelectedOrNext() {
    const node = this.nodeAfterCursor;
    if (node instanceof DecoratorNode) {
      this.#selectInLexical(node);
    } else {
      this.#contents.deleteSelectedNodes();
    }

    return true
  }

  #deletePreviousOrNext() {
    const node = this.nodeBeforeCursor;
    if (node instanceof DecoratorNode) {
      this.#selectInLexical(node);
    } else {
      this.#contents.deleteSelectedNodes();
    }

    return true
  }

  #getValidSelectionRange() {
    const lexicalSelection = $getSelection();
    if (!lexicalSelection || !lexicalSelection.isCollapsed()) return null

    const nativeSelection = window.getSelection();
    if (!nativeSelection || nativeSelection.rangeCount === 0) return null

    return nativeSelection.getRangeAt(0)
  }

  #getReliableRectFromRange(range) {
    let rect = range.getBoundingClientRect();

    if (this.#isRectUnreliable(rect)) {
      const marker = this.#createAndInsertMarker(range);
      rect = marker.getBoundingClientRect();
      this.#restoreSelectionAfterMarker(marker);
      marker.remove();
    }

    return rect
  }

  #isRectUnreliable(rect) {
    return (rect.width === 0 && rect.height === 0) || (rect.top === 0 && rect.left === 0)
  }

  #createAndInsertMarker(range) {
    const marker = this.#createMarker();
    range.insertNode(marker);
    return marker
  }

  #createMarker() {
    const marker = document.createElement("span");
    marker.textContent = "\u200b";
    marker.style.display = "inline-block";
    marker.style.width = "1px";
    marker.style.height = "1em";
    marker.style.lineHeight = "normal";
    return marker
  }

  #restoreSelectionAfterMarker(marker) {
    const nativeSelection = window.getSelection();
    nativeSelection.removeAllRanges();
    const newRange = document.createRange();
    newRange.setStartAfter(marker);
    newRange.collapse(true);
    nativeSelection.addRange(newRange);
  }

  #calculateCursorPosition(rect, range) {
    const rootRect = this.editor.getRootElement().getBoundingClientRect();
    let x = rect.left - rootRect.left;
    let y = rect.top - rootRect.top;

    const fontSize = this.#getFontSizeForCursor(range);
    if (!isNaN(fontSize)) {
      y += fontSize;
    }

    return { x, y, fontSize }
  }

  #getFontSizeForCursor(range) {
    const nativeSelection = window.getSelection();
    const anchorNode = nativeSelection.anchorNode;
    const parentElement = this.#getElementFromNode(anchorNode);

    if (parentElement instanceof HTMLElement) {
      const computed = window.getComputedStyle(parentElement);
      return parseFloat(computed.fontSize)
    }

    return 0
  }

  #getElementFromNode(node) {
    return node?.nodeType === Node.TEXT_NODE ? node.parentElement : node
  }

  #getCollapsedSelectionData() {
    const selection = $getSelection();
    if (!$isRangeSelection(selection) || !selection.isCollapsed()) {
      return { anchorNode: null, offset: 0 }
    }

    const { anchor } = selection;
    return { anchorNode: anchor.getNode(), offset: anchor.offset }
  }

  #getNodeAfterTextNode(anchorNode, offset) {
    if (offset === anchorNode.getTextContentSize()) {
      return this.#getNextNodeFromTextEnd(anchorNode)
    }
    return null
  }

  #getNextNodeFromTextEnd(anchorNode) {
    if (anchorNode.getNextSibling() instanceof DecoratorNode) {
      return anchorNode.getNextSibling()
    }
    const parent = anchorNode.getParent();
    return parent ? parent.getNextSibling() : null
  }

  #getNodeAfterElementNode(anchorNode, offset) {
    if (offset < anchorNode.getChildrenSize()) {
      return anchorNode.getChildAtIndex(offset)
    }
    return this.#findNextSiblingUp(anchorNode)
  }

  #getNodeBeforeTextNode(anchorNode, offset) {
    if (offset === 0) {
      return this.#getPreviousNodeFromTextStart(anchorNode)
    }
    return null
  }

  #getPreviousNodeFromTextStart(anchorNode) {
    if (anchorNode.getPreviousSibling() instanceof DecoratorNode) {
      return anchorNode.getPreviousSibling()
    }
    const parent = anchorNode.getParent();
    return parent.getPreviousSibling()
  }

  #getNodeBeforeElementNode(anchorNode, offset) {
    if (offset > 0) {
      return anchorNode.getChildAtIndex(offset - 1)
    }
    return this.#findPreviousSiblingUp(anchorNode)
  }

  #findNextSiblingUp(node) {
    let current = node;
    while (current && current.getNextSibling() == null) {
      current = current.getParent();
    }
    return current ? current.getNextSibling() : null
  }

  #findPreviousSiblingUp(node) {
    let current = node;
    while (current && current.getPreviousSibling() == null) {
      current = current.getParent();
    }
    return current ? current.getPreviousSibling() : null
  }
}

class Contents {
  constructor(editorElement) {
    this.editorElement = editorElement;
    this.editor = editorElement.editor;
  }

  insertHtml(html) {
    this.editor.update(() => {
      const selection = $getSelection();

      if (!$isRangeSelection(selection)) return

      const nodes = $generateNodesFromDOM(this.editor, parseHtml(html));
      selection.insertNodes(nodes);
    });
  }

  insertNodeWrappingEachSelectedLine(newNodeFn) {
    this.editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return

      const selectedNodes = selection.extract();

      selectedNodes.forEach((node) => {
        const parent = node.getParent();
        if (!parent) { return }

        const topLevelElement = node.getTopLevelElementOrThrow();
        const wrappingNode = newNodeFn();
        wrappingNode.append(...topLevelElement.getChildren());
        topLevelElement.replace(wrappingNode);
      });
    });
  }

  toggleNodeWrappingAllSelectedLines(isFormatAppliedFn, newNodeFn) {
    this.editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return

      const topLevelElement = selection.anchor.getNode().getTopLevelElementOrThrow();

      // Check if format is already applied
      if (isFormatAppliedFn(topLevelElement)) {
        this.removeFormattingFromSelectedLines();
      } else {
        this.insertNodeWrappingAllSelectedLines(newNodeFn);
      }
    });
  }

  insertNodeWrappingAllSelectedLines(newNodeFn) {
    this.editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return

      if (selection.isCollapsed()) {
        this.#wrapCurrentLine(selection, newNodeFn);
      } else {
        this.#wrapMultipleSelectedLines(selection, newNodeFn);
      }
    });
  }

  removeFormattingFromSelectedLines() {
    this.editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return

      const topLevelElement = selection.anchor.getNode().getTopLevelElementOrThrow();
      const paragraph = $createParagraphNode();
      paragraph.append(...topLevelElement.getChildren());
      topLevelElement.replace(paragraph);
    });
  }

  hasSelectedText() {
    let result = false;

    this.editor.read(() => {
      const selection = $getSelection();
      result = $isRangeSelection(selection) && !selection.isCollapsed();
    });

    return result
  }

  hasSelectedWords() {
    let result = false;

    this.editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return

      // Check if we have selected text within a line (not entire lines)
      result = !selection.isCollapsed() &&
        selection.anchor.getNode().getTopLevelElement() ===
        selection.focus.getNode().getTopLevelElement();
    });

    return result
  }

  unwrapSelectedListItems() {
    this.editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return

      const { listItems, parentLists } = this.#collectSelectedListItems(selection);
      if (listItems.size > 0) {
        const newParagraphs = this.#convertListItemsToParagraphs(listItems);
        this.#removeEmptyParentLists(parentLists);
        this.#selectNewParagraphs(newParagraphs);
      }
    });
  }

  createLinkWithSelectedText(url) {
    if (!this.hasSelectedText()) return

    this.editor.update(() => {
      $toggleLink(url);
    });
  }

  textBackUntil(string) {
    let result = "";

    this.editor.getEditorState().read(() => {
      const selection = $getSelection();
      if (!selection || !selection.isCollapsed()) return

      const anchor = selection.anchor;
      const anchorNode = anchor.getNode();

      if (!$isTextNode(anchorNode)) return

      const fullText = anchorNode.getTextContent();
      const offset = anchor.offset;

      const textBeforeCursor = fullText.slice(0, offset);

      const lastIndex = textBeforeCursor.lastIndexOf(string);
      if (lastIndex !== -1) {
        result = textBeforeCursor.slice(lastIndex + string.length);
      }
    });

    return result
  }

  containsTextBackUntil(string) {
    let result = false;

    this.editor.getEditorState().read(() => {
      const selection = $getSelection();
      if (!selection || !selection.isCollapsed()) return

      const anchor = selection.anchor;
      const anchorNode = anchor.getNode();

      if (!$isTextNode(anchorNode)) return

      const fullText = anchorNode.getTextContent();
      const offset = anchor.offset;

      const textBeforeCursor = fullText.slice(0, offset);

      result = textBeforeCursor.includes(string);
    });

    return result
  }

  replaceTextBackUntil(stringToReplace, replacementNodes) {
    replacementNodes = Array.isArray(replacementNodes) ? replacementNodes : [replacementNodes];

    this.editor.update(() => {
      const { anchorNode, offset } = this.#getTextAnchorData();
      if (!anchorNode) return

      const lastIndex = this.#findLastIndexBeforeCursor(anchorNode, offset, stringToReplace);
      if (lastIndex === -1) return

      this.#performTextReplacement(anchorNode, offset, lastIndex, replacementNodes);
    });
  }

  uploadFile(file) {
    if (!this.editorElement.supportsAttachments) {
      console.warn("This editor does not supports attachments (it's configured with [attachments=false])");
      return
    }

    if (!this.#shouldUploadFile(file)) {
      return
    }

    const uploadUrl = this.editorElement.directUploadUrl;
    const blobUrlTemplate = this.editorElement.blobUrlTemplate;

    this.editor.update(() => {
      const selection = $getSelection();
      const anchorNode = selection?.anchor.getNode();
      const currentParagraph = anchorNode?.getTopLevelElement();

      const uploadedImageNode = new ActionTextAttachmentUploadNode({ file: file, uploadUrl: uploadUrl, blobUrlTemplate: blobUrlTemplate, editor: this.editor });

      if (currentParagraph && $isParagraphNode(currentParagraph) && currentParagraph.getChildrenSize() === 0) {
        // If we're inside an empty paragraph, replace it
        currentParagraph.replace(uploadedImageNode);
      } else if (currentParagraph && $isElementNode(currentParagraph)) {
        currentParagraph.insertAfter(uploadedImageNode);
      } else {
        $insertNodes([uploadedImageNode]);
      }
    }, { tag: HISTORY_MERGE_TAG });
  }

  deleteSelectedNodes() {
    this.editor.update(() => {
      if ($isNodeSelection(this.#selection.current)) {
        let nodesWereRemoved = false;
        this.#selection.current.getNodes().forEach((node) => {
          const parent = node.getParent();

          node.remove();

          if (parent.getType() === "root" && parent.getChildrenSize() === 0) {
            parent.append($createParagraphNode());
          }

          nodesWereRemoved = true;
        });

        if (nodesWereRemoved) {
          this.#selection.clear();
          this.editor.focus();

          return true
        }
      }
    });
  }

  get #selection() {
    return this.editorElement.selection
  }

  #wrapCurrentLine(selection, newNodeFn) {
    const anchorNode = selection.anchor.getNode();
    const topLevelElement = anchorNode.getTopLevelElementOrThrow();

    if (topLevelElement.getTextContent()) {
      const wrappingNode = newNodeFn();
      wrappingNode.append(...topLevelElement.getChildren());
      topLevelElement.replace(wrappingNode);
    } else {
      $insertNodes([newNodeFn()]);
    }
  }

  #wrapMultipleSelectedLines(selection, newNodeFn) {
    const selectedParagraphs = this.#extractSelectedParagraphs(selection);
    if (selectedParagraphs.length === 0) return

    const { lineSet, nodesToDelete } = this.#extractUniqueLines(selectedParagraphs);
    if (lineSet.size === 0) return

    const wrappingNode = this.#createWrappingNodeWithLines(newNodeFn, lineSet);
    this.#replaceWithWrappingNode(selection, wrappingNode);
    this.#removeNodes(nodesToDelete);
  }

  #extractSelectedParagraphs(selection) {
    const selectedNodes = selection.extract();
    const selectedParagraphs = selectedNodes
      .map((node) => this.#getParagraphFromNode(node))
      .filter(Boolean);

    $setSelection(null);
    return selectedParagraphs
  }

  #getParagraphFromNode(node) {
    if ($isParagraphNode(node)) return node
    if ($isTextNode(node) && node.getParent() && $isParagraphNode(node.getParent())) {
      return node.getParent()
    }
    return null
  }

  #extractUniqueLines(selectedParagraphs) {
    const lineSet = new Set();
    const nodesToDelete = new Set();

    selectedParagraphs.forEach((paragraphNode) => {
      const textContent = paragraphNode.getTextContent();
      if (textContent) {
        textContent.split("\n").forEach((line) => {
          if (line.trim()) lineSet.add(line);
        });
      }
      nodesToDelete.add(paragraphNode);
    });

    return { lineSet, nodesToDelete }
  }

  #createWrappingNodeWithLines(newNodeFn, lineSet) {
    const wrappingNode = newNodeFn();
    const lines = Array.from(lineSet);

    lines.forEach((lineText, index) => {
      wrappingNode.append($createTextNode(lineText));
      if (index < lines.length - 1) {
        wrappingNode.append($createLineBreakNode());
      }
    });

    return wrappingNode
  }

  #replaceWithWrappingNode(selection, wrappingNode) {
    const anchorNode = selection.anchor.getNode();
    const parent = anchorNode.getParent();
    if (parent) {
      parent.replace(wrappingNode);
    }
  }

  #removeNodes(nodesToDelete) {
    nodesToDelete.forEach((node) => node.remove());
  }

  #collectSelectedListItems(selection) {
    const nodes = selection.getNodes();
    const listItems = new Set();
    const parentLists = new Set();

    for (const node of nodes) {
      const listItem = getNearestListItemNode(node);
      if (listItem) {
        listItems.add(listItem);
        const parentList = listItem.getParent();
        if (parentList && $isListNode(parentList)) {
          parentLists.add(parentList);
        }
      }
    }

    return { listItems, parentLists }
  }

  #convertListItemsToParagraphs(listItems) {
    const newParagraphs = [];

    for (const listItem of listItems) {
      const paragraph = this.#convertListItemToParagraph(listItem);
      if (paragraph) {
        newParagraphs.push(paragraph);
      }
    }

    return newParagraphs
  }

  #convertListItemToParagraph(listItem) {
    const parentList = listItem.getParent();
    if (!parentList || !$isListNode(parentList)) return null

    const paragraph = $createParagraphNode();
    const sublists = this.#extractSublistsAndContent(listItem, paragraph);

    listItem.insertAfter(paragraph);
    this.#insertSublists(paragraph, sublists);
    listItem.remove();

    return paragraph
  }

  #extractSublistsAndContent(listItem, paragraph) {
    const sublists = [];

    listItem.getChildren().forEach((child) => {
      if ($isListNode(child)) {
        sublists.push(child);
      } else {
        paragraph.append(child);
      }
    });

    return sublists
  }

  #insertSublists(paragraph, sublists) {
    sublists.forEach((sublist) => {
      paragraph.insertAfter(sublist);
    });
  }

  #removeEmptyParentLists(parentLists) {
    for (const parentList of parentLists) {
      if ($isListNode(parentList) && parentList.getChildrenSize() === 0) {
        parentList.remove();
      }
    }
  }

  #selectNewParagraphs(newParagraphs) {
    if (newParagraphs.length === 0) return

    const firstParagraph = newParagraphs[0];
    const lastParagraph = newParagraphs[newParagraphs.length - 1];

    if (newParagraphs.length === 1) {
      firstParagraph.selectEnd();
    } else {
      this.#selectParagraphRange(firstParagraph, lastParagraph);
    }
  }

  #selectParagraphRange(firstParagraph, lastParagraph) {
    firstParagraph.selectStart();
    const currentSelection = $getSelection();
    if (currentSelection && $isRangeSelection(currentSelection)) {
      currentSelection.anchor.set(firstParagraph.getKey(), 0, 'element');
      currentSelection.focus.set(lastParagraph.getKey(), lastParagraph.getChildrenSize(), 'element');
    }
  }

  #getTextAnchorData() {
    const selection = $getSelection();
    if (!selection || !selection.isCollapsed()) return { anchorNode: null, offset: 0 }

    const anchor = selection.anchor;
    const anchorNode = anchor.getNode();

    if (!$isTextNode(anchorNode)) return { anchorNode: null, offset: 0 }

    return { anchorNode, offset: anchor.offset }
  }

  #findLastIndexBeforeCursor(anchorNode, offset, stringToReplace) {
    const fullText = anchorNode.getTextContent();
    const textBeforeCursor = fullText.slice(0, offset);
    return textBeforeCursor.lastIndexOf(stringToReplace)
  }

  #performTextReplacement(anchorNode, offset, lastIndex, replacementNodes) {
    const fullText = anchorNode.getTextContent();
    const textBeforeString = fullText.slice(0, lastIndex);
    const textAfterCursor = fullText.slice(offset);

    const textNodeBefore = $createTextNode(textBeforeString);
    const textNodeAfter = $createTextNode(textAfterCursor || " ");

    anchorNode.replace(textNodeBefore);

    const lastInsertedNode = this.#insertReplacementNodes(textNodeBefore, replacementNodes);
    lastInsertedNode.insertAfter(textNodeAfter);

    this.#appendLineBreakIfNeeded(textNodeAfter.getParentOrThrow());
    textNodeAfter.select(0, 0);
  }

  #insertReplacementNodes(startNode, replacementNodes) {
    let previousNode = startNode;
    for (const node of replacementNodes) {
      previousNode.insertAfter(node);
      previousNode = node;
    }
    return previousNode
  }

  #appendLineBreakIfNeeded(paragraph) {
    if ($isParagraphNode(paragraph) && !this.editorElement.isSingleLineMode) {
      const children = paragraph.getChildren();
      const last = children[children.length - 1];
      const beforeLast = children[children.length - 2];

      if (($isTextNode(last) && last.getTextContent() === "") && (beforeLast && !$isTextNode(beforeLast))) {
        paragraph.append($createLineBreakNode());
      }
    }
  }

  #shouldUploadFile(file) {
    return dispatch(this.editorElement, 'lexxy:file-accept', { file }, true)
  }
}

function isUrl(string) {
  try {
    new URL(string);
    return true
  } catch (_) {
    return false
  }
}

function normalizeFilteredText(string) {
  return string
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove diacritics
}

function filterMatches(text, potentialMatch) {
  return normalizeFilteredText(text).includes(normalizeFilteredText(potentialMatch))
}

class Clipboard {
  constructor(editorElement) {
    this.editorElement = editorElement;
    this.editor = editorElement.editor;
    this.contents = editorElement.contents;
  }

  paste(event) {
    const clipboardData = event.clipboardData;

    if (!clipboardData) return false

    if (this.#isOnlyPlainTextPasted(clipboardData)) {
      this.#pastePlainText(clipboardData);
      event.preventDefault();
      return true
    }

    this.#handlePastedFiles(clipboardData);
  }

  #isOnlyPlainTextPasted(clipboardData) {
    const types = Array.from(clipboardData.types);
    return types.length === 1 && types[0] === "text/plain"
  }

  #pastePlainText(clipboardData) {
    const item = clipboardData.items[0];
    item.getAsString((text) => {
      if (isUrl(text) && this.contents.hasSelectedText()) {
        this.contents.createLinkWithSelectedText(text);
      } else {
        this.#pasteMarkdown(text);
      }
    });
  }

  #pasteMarkdown(text) {
    this.editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return

      // Use Lexical's native markdown parser
      const nodes = $convertFromMarkdownString(text, TRANSFORMERS);

      if (nodes.length > 0) {
        selection.insertNodes(nodes);
      } else {
        // Fallback: insert as plain text if markdown conversion fails
        selection.insertText(text);
      }
    });
  }

  #handlePastedFiles(clipboardData) {
    if (!this.editorElement.supportsAttachments) return

    this.#preservingScrollPosition(() => {
      for (const item of clipboardData.items) {
        const file = item.getAsFile();
        if (!file) continue

        this.contents.uploadFile(file);
      }
    });
  }

  // Deals with an issue in Safari where it scrolls to the tops after pasting attachments
  async #preservingScrollPosition(callback) {
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    callback();

    await nextFrame();

    window.scrollTo(scrollX, scrollY);
    this.editor.focus();
  }
}

class CustomActionTextAttachmentNode extends DecoratorNode {
  static getType() {
    return "custom_action_text_attachment"
  }

  static clone(node) {
    return new CustomActionTextAttachmentNode({ ...node }, node.__key)
  }

  static importJSON(serializedNode) {
    return new CustomActionTextAttachmentNode({ ...serializedNode })
  }

  static importDOM() {
    return {
      "action-text-attachment": (attachment) => {
        const content = attachment.getAttribute("content");
        if (!attachment.getAttribute("content")) {
          return null
        }

        return {
          conversion: () => {
            // Preserve initial space if present since Lexical removes it
            const nodes = [];
            const previousSibling = attachment.previousSibling;
            if (previousSibling && previousSibling.nodeType === Node.TEXT_NODE && /\s$/.test(previousSibling.textContent)) {
              nodes.push($createTextNode(" "));
            }

            nodes.push(new CustomActionTextAttachmentNode({
              sgid: attachment.getAttribute("sgid"),
              innerHtml: JSON.parse(content),
              contentType: attachment.getAttribute("content-type")
            }));

            nodes.push($createTextNode(" "));

            return { node: nodes }
          },
          priority: 2
        }
      }
    }
  }

  constructor({ sgid, contentType, innerHtml }, key) {
    super(key);

    this.sgid = sgid;
    this.contentType = contentType || "application/vnd.actiontext.unknown";
    this.innerHtml = innerHtml;
  }

  createDOM() {
    const figure = createElement("action-text-attachment", { "content-type": this.contentType, "data-lexxy-decorator": true });

    figure.addEventListener("click", (event) => {
      dispatchCustomEvent(figure, "lexxy:internal:select-node", { key: this.getKey() });
    });

    figure.insertAdjacentHTML("beforeend", this.innerHtml);

    return figure
  }

  updateDOM() {
    return true
  }

  isInline() {
    return true
  }

  exportDOM() {
    const attachment = createElement("action-text-attachment", {
      sgid: this.sgid,
      content: JSON.stringify(this.innerHtml),
      "content-type": this.contentType
    });

    return { element: attachment }
  }

  exportJSON() {
    return {
      type: "custom_action_text_attachment",
      version: 1,
      sgid: this.sgid,
      contentType: this.contentType,
      innerHtml: this.innerHtml
    }
  }

  decorate() {
    return null
  }
}

class LexicalEditorElement extends HTMLElement {
  static formAssociated = true
  static debug = true
  static commands = [ "bold", "italic", "" ]

  static observedAttributes = [ "connected" ]

  #initialValue = ""

  constructor() {
    super();
    this.internals = this.attachInternals();
    this.internals.role = "presentation";
  }

  connectedCallback() {
    this.id ??= generateDomId("lexxy-editor");
    this.editor = this.#createEditor();
    this.contents = new Contents(this);
    this.selection = new Selection(this);
    this.clipboard = new Clipboard(this);

    CommandDispatcher.configureFor(this);
    this.#initialize();

    requestAnimationFrame(() => dispatch(this, "lexxy:initialize"));
    this.toggleAttribute("connected", true);

    this.valueBeforeDisconnect = null;
  }

  disconnectedCallback() {
    this.valueBeforeDisconnect = this.value;
    this.#reset(); // Prevent hangs with Safari when morphing
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "connected" && this.isConnected && oldValue != null && oldValue !== newValue) {
      requestAnimationFrame(() => this.#reconnect());
    }
  }

  formResetCallback() {
    this.value = this.#initialValue;
    this.editor.dispatchCommand(CLEAR_HISTORY_COMMAND, undefined);
  }

  get form() {
    return this.internals.form
  }

  get toolbarElement() {
    if (!this.#hasToolbar) return null

    this.toolbar = this.toolbar || this.#findOrCreateDefaultToolbar();
    return this.toolbar
  }

  get directUploadUrl() {
    return this.dataset.directUploadUrl
  }

  get blobUrlTemplate() {
    return this.dataset.blobUrlTemplate
  }

  get isSingleLineMode() {
    return this.hasAttribute("single-line")
  }

  get supportsAttachments() {
    return this.getAttribute("attachments") !== "false"
  }

  focus() {
    this.editor.focus();
  }

  get value() {
    if (!this.cachedValue) {
      this.editor?.getEditorState().read(() => {
        // Don't try to modify selection in read operation - just export all content
        this.cachedValue = sanitize($generateHtmlFromNodes(this.editor, null));
      });
    }

    return this.cachedValue
  }

  /**
   * Get the HTML value with theme CSS classes applied
   * @returns {string} HTML with theme classes included
   */
  getStyledValue() {
    let styledValue = "";
    this.editor?.getEditorState().read(() => {
      // Don't try to modify selection in read operation - just export all content
      const html = $generateHtmlFromNodes(this.editor, null);
      styledValue = sanitize(this.#applyThemeClassesToHtml(html));
    });
    return styledValue
  }

  /**
   * Apply theme CSS classes to exported HTML
   * @param {string} html - The HTML string to process
   * @returns {string} HTML with theme classes applied
   */
  #applyThemeClassesToHtml(html) {
    if (!html || !theme) return html

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Apply list theme classes
    if (theme.list) {
      // Apply ul classes
      if (theme.list.ul) {
        const uls = doc.querySelectorAll('ul');
        uls.forEach(ul => ul.classList.add(theme.list.ul));
      }

      // Apply ol classes
      if (theme.list.ol) {
        const ols = doc.querySelectorAll('ol');
        ols.forEach(ol => ol.classList.add(theme.list.ol));
      }

      // Apply li classes
      if (theme.list.listitem) {
        const lis = doc.querySelectorAll('li');
        lis.forEach(li => {
          li.classList.add(theme.list.listitem);

          // Check if this is a nested list item
          if (theme.list.nested?.listitem && this.#isNestedListItem(li)) {
            li.classList.add(theme.list.nested.listitem);
          }
        });
      }
    }

    return doc.body.innerHTML
  }

  /**
   * Check if a list item is nested (has a parent list item)
   * @param {Element} li - The list item element
   * @returns {boolean} True if the list item is nested
   */
  #isNestedListItem(li) {
    let parent = li.parentElement;
    while (parent && parent !== document.body) {
      if (parent.tagName === 'LI') {
        return true
      }
      parent = parent.parentElement;
    }
    return false
  }

  set value(html) {
    this.editor.update(() => {
      $addUpdateTag(SKIP_DOM_SELECTION_TAG);
      const root = $getRoot();
      root.clear();
      root.append(...this.#parseHtmlIntoLexicalNodes(html));
      root.select();

      this.#toggleEmptyStatus();

      // The first time you set the value, when the editor is empty, it seems to leave Lexical
      // in an inconsistent state until, at least, you focus. You can type but adding attachments
      // fails because no root node detected. This is a workaround to deal with the issue.
      requestAnimationFrame(() => this.editor?.update(() => { }));
    });
  }

  #parseHtmlIntoLexicalNodes(html) {
    if (!html) html = "<p></p>";
    const nodes = $generateNodesFromDOM(this.editor, parseHtml(`<div>${html}</div>`));
    // Custom decorator block elements such action-text-attachments get wrapped into <p> automatically by Lexical.
    // We flatten those.
    return nodes.map(node => {
      if (node.getType() === "paragraph" && node.getChildrenSize() === 1) {
        const child = node.getFirstChild();
        if (child instanceof DecoratorNode && !child.isInline()) {
          return child
        }
      }
      return node
    })
  }

  #initialize() {
    this.#synchronizeWithChanges();
    this.#registerComponents();
    this.#listenForInvalidatedNodes();
    this.#handleEnter();
    this.#attachDebugHooks();
    this.#attachToolbar();
    this.#loadInitialValue();
    this.#resetBeforeTurboCaches();
  }

  #createEditor() {
    this.editorContentElement = this.editorContentElement || this.#createEditorContentElement();

    const editor = createEditor({
      namespace: "LexicalEditor",
      onError(error) {
        throw error
      },
      theme: theme,
      nodes: this.#lexicalNodes
    });

    editor.setRootElement(this.editorContentElement);

    return editor
  }

  get #lexicalNodes() {
    const nodes = [
      // Core nodes required for basic text editing and markdown conversion
      TextNode,
      ParagraphNode,
      LineBreakNode,

      // Rich text nodes
      QuoteNode,
      HeadingNode,
      ListNode,
      ListItemNode,
      CodeNode,
      CodeHighlightNode,
      LinkNode,
      AutoLinkNode,

      CustomActionTextAttachmentNode,
    ];

    if (this.supportsAttachments) {
      nodes.push(ActionTextAttachmentNode, ActionTextAttachmentUploadNode);
    }

    return nodes
  }

  #createEditorContentElement() {
    const editorContentElement = createElement("div", {
      classList: "lexxy-editor__content",
      contenteditable: true,
      role: "textbox",
      "aria-multiline": true,
      "aria-label": this.#labelText,
      placeholder: this.getAttribute("placeholder")
    });
    editorContentElement.id = `${this.id}-content`;
    this.#ariaAttributes.forEach(attribute => editorContentElement.setAttribute(attribute.name, attribute.value));
    this.appendChild(editorContentElement);

    if (this.getAttribute("tabindex")) {
      editorContentElement.setAttribute("tabindex", this.getAttribute("tabindex"));
      this.removeAttribute("tabindex");
    } else {
      editorContentElement.setAttribute("tabindex", 0);
    }

    return editorContentElement
  }

  get #labelText() {
    return Array.from(this.internals.labels).map(label => label.textContent).join(" ")
  }

  get #ariaAttributes() {
    return Array.from(this.attributes).filter(attribute => attribute.name.startsWith("aria-"))
  }

  set #internalFormValue(html) {
    const changed = this.#internalFormValue !== undefined && this.#internalFormValue !== this.value;

    this.internals.setFormValue(html);
    this._internalFormValue = html;

    if (changed) {
      dispatch(this, "lexxy:change");
    }
  }

  get #internalFormValue() {
    return this._internalFormValue
  }

  #loadInitialValue() {
    const initialHtml = this.valueBeforeDisconnect || this.getAttribute("value") || "<p></p>";
    this.value = this.#initialValue = initialHtml;
  }

  #resetBeforeTurboCaches() {
    document.addEventListener("turbo:before-cache", this.#handleTurboBeforeCache);
  }

  #handleTurboBeforeCache = (event) => {
    this.#reset();
  }

  #synchronizeWithChanges() {
    this.#addUnregisterHandler(this.editor.registerUpdateListener(({ editorState }) => {
      this.cachedValue = null;
      this.#internalFormValue = this.value;
      this.#toggleEmptyStatus();
    }));
  }

  #addUnregisterHandler(handler) {
    this.unregisterHandlers = this.unregisterHandlers || [];
    this.unregisterHandlers.push(handler);
  }

  #unregisterHandlers() {
    this.unregisterHandlers?.forEach((handler) => {
      handler();
    });
    this.unregisterHandlers = null;
  }

  #registerComponents() {
    registerRichText(this.editor);
    registerHistory(this.editor, createEmptyHistoryState(), 20);
    registerList(this.editor);
    this.#registerCodeHiglightingComponents();
    registerMarkdownShortcuts(this.editor, TRANSFORMERS);
  }

  #registerCodeHiglightingComponents() {
    registerCodeHighlighting(this.editor);
    this.append(createElement("lexxy-code-language-picker"));
  }

  #listenForInvalidatedNodes() {
    this.editor.getRootElement().addEventListener("lexxy:internal:invalidate-node", (event) => {
      const { key, values } = event.detail;

      this.editor.update(() => {
        const node = $getNodeByKey(key);

        if (node instanceof ActionTextAttachmentNode) {
          const updatedNode = node.getWritable();
          Object.assign(updatedNode, values);
        }
      });
    });
  }

  #handleEnter() {
    // We can't prevent these externally using regular keydown because Lexical handles it first.
    this.editor.registerCommand(
      KEY_ENTER_COMMAND,
      (event) => {
        // Prevent CTRL+ENTER
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault();
          return true
        }

        // In single line mode, prevent ENTER
        if (this.isSingleLineMode) {
          event.preventDefault();
          return true
        }

        return false
      },
      COMMAND_PRIORITY_NORMAL
    );
  }

  #attachDebugHooks() {
    if (!LexicalEditorElement.debug) return

    this.#addUnregisterHandler(this.editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        console.debug("HTML: ", this.value);
      });
    }));
  }

  #attachToolbar() {
    if (this.#hasToolbar) {
      this.toolbarElement.setEditor(this);
    }
  }

  #findOrCreateDefaultToolbar() {
    const toolbarId = this.getAttribute("toolbar");
    return toolbarId ? document.getElementById(toolbarId) : this.#createDefaultToolbar()
  }

  get #hasToolbar() {
    return this.getAttribute("toolbar") !== "false"
  }

  #createDefaultToolbar() {
    const toolbar = createElement("lexxy-toolbar");
    toolbar.innerHTML = LexicalToolbarElement.defaultTemplate;
    this.prepend(toolbar);
    return toolbar
  }

  #toggleEmptyStatus() {
    this.classList.toggle("lexxy-editor--empty", this.#isEmpty);
  }

  get #isEmpty() {
    return !this.editorContentElement.textContent.trim() && !containsVisuallyRelevantChildren(this.editorContentElement)
  }

  #reset() {
    this.#unregisterHandlers();

    if (this.editorContentElement) {
      this.editorContentElement.remove();
      this.editorContentElement = null;
    }

    this.contents = null;
    this.editor = null;

    if (this.toolbar) {
      if (!this.getAttribute("toolbar")) { this.toolbar.remove(); }
      this.toolbar = null;
    }

    this.selection = null;

    document.removeEventListener("turbo:before-cache", this.#handleTurboBeforeCache);
  }

  #reconnect() {
    this.disconnectedCallback();
    this.connectedCallback();
  }
}

customElements.define("lexxy-editor", LexicalEditorElement);

class LinkDialog extends HTMLElement {
  connectedCallback() {
    this.dialog = this.querySelector("dialog");
    this.input = this.querySelector("input");

    this.addEventListener("submit", this.#handleSubmit.bind(this));
    this.querySelector("[value='unlink']").addEventListener("click", this.#handleUnlink.bind(this));
    this.addEventListener("keydown", this.#handleKeyDown.bind(this));
  }

  show(editor) {
    this.input.value = this.#selectedLinkUrl;
    this.dialog.show();
  }

  close() {
    this.dialog.close();
  }

  #handleSubmit(event) {
    const command = event.submitter?.value;
    this.#editor.dispatchCommand(command, this.input.value);
  }

  #handleUnlink(event) {
    this.#editor.dispatchCommand("unlink");
    this.close();
  }

  #handleKeyDown(event) {
    if (event.key === "Escape") {
      event.stopPropagation();
      this.close();
    }
  }

  get #selectedLinkUrl() {
    let url = "";

    this.#editor.getEditorState().read(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return

      let node = selection.getNodes()[0];
      while (node && node.getParent()) {
        if ($isLinkNode(node)) {
          url = node.getURL();
          break
        }
        node = node.getParent();
      }
    });

    return url
  }

  get #editor() {
    return this.closest("lexxy-toolbar").editor
  }
}

// We should extend the native dialog and avoid the intermediary <dialog> but not
// supported by Safari yet: customElements.define("lexxy-link-dialog", LinkDialog, { extends: "dialog" })
customElements.define("lexxy-link-dialog", LinkDialog);

class BaseSource {
  // Template method to override
  async buildListItems(filter = "") {
    return Promise.resolve([])
  }

  // Template method to override
  promptItemFor(listItem) {
    return null
  }

  // Protected

  buildListItemElementFor(promptItemElement) {
    const template = promptItemElement.querySelector("template[type='menu']");
    const fragment = template.content.cloneNode(true);
    const listItemElement = createElement("li", { role: "option", id: generateDomId("prompt-item"), tabindex: "0" });
    listItemElement.classList.add("lexxy-prompt-menu__item");
    listItemElement.appendChild(fragment);
    return listItemElement
  }

  async loadPromptItemsFromUrl(url) {
    try {
      const response = await fetch(url);
      const html = await response.text();
      const promptItems = parseHtml(html).querySelectorAll("lexxy-prompt-item");
      return Promise.resolve(Array.from(promptItems))
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

class LocalFilterSource extends BaseSource {
  async buildListItems(filter = "") {
    const promptItems = await this.fetchPromptItems();
    return this.#buildListItemsFromPromptItems(promptItems, filter)
  }

  // Template method to override
  async fetchPromptItems(filter) {
    return Promise.resolve([])
  }

  promptItemFor(listItem) {
    return this.promptItemByListItem.get(listItem)
  }

  #buildListItemsFromPromptItems(promptItems, filter) {
    const listItems = [];
    this.promptItemByListItem = new WeakMap();
    promptItems.forEach((promptItem) => {
      const searchableText = promptItem.getAttribute("search");

      if (!filter || filterMatches(searchableText, filter)) {
        const listItem = this.buildListItemElementFor(promptItem);
        this.promptItemByListItem.set(listItem, promptItem);
        listItems.push(listItem);
      }
    });

    return listItems
  }
}

class InlinePromptSource extends LocalFilterSource {
  constructor(inlinePromptItems) {
    super();
    this.inlinePromptItemElements = Array.from(inlinePromptItems);
  }

  async fetchPromptItems() {
    return Promise.resolve(this.inlinePromptItemElements)
  }
}

class DeferredPromptSource extends LocalFilterSource {
  constructor(url) {
    super();
    this.url = url;

    this.fetchPromptItems();
  }

  async fetchPromptItems() {
    this.promptItems ??= await this.loadPromptItemsFromUrl(this.url);

    return Promise.resolve(this.promptItems)
  }
}

const DEBOUNCE_INTERVAL = 200;

class RemoteFilterSource extends BaseSource {
  constructor(url) {
    super();

    this.baseURL = url;
    this.loadAndFilterListItems = debounceAsync(this.fetchFilteredListItems.bind(this), DEBOUNCE_INTERVAL);
  }

  async buildListItems(filter = "") {
    return await this.loadAndFilterListItems(filter)
  }

  promptItemFor(listItem) {
    return this.promptItemByListItem.get(listItem)
  }

  async fetchFilteredListItems(filter) {
    const promptItems = await this.loadPromptItemsFromUrl(this.#urlFor(filter));
    return this.#buildListItemsFromPromptItems(promptItems)
  }

  #urlFor(filter) {
    const url = new URL(this.baseURL, window.location.origin);
    url.searchParams.append("filter", filter);
    return url.toString()
  }

  #buildListItemsFromPromptItems(promptItems) {
    const listItems = [];
    this.promptItemByListItem = new WeakMap();

    for (const promptItem of promptItems) {
      const listItem = this.buildListItemElementFor(promptItem);
      this.promptItemByListItem.set(listItem, promptItem);
      listItems.push(listItem);
    }

    return listItems
  }
}

const NOTHING_FOUND_DEFAULT_MESSAGE = "Nothing found";

class LexicalPromptElement extends HTMLElement {
  constructor() {
    super();
    this.keyListeners = [];
  }

  connectedCallback() {
    this.source = this.#createSource();

    this.#addTriggerListener();
  }

  disconnectedCallback() {
    this.source = null;
    this.popoverElement = null;
  }

  get name() {
    return this.getAttribute("name")
  }

  get trigger() {
    return this.getAttribute("trigger")
  }

  get supportsSpaceInSearches() {
    return this.hasAttribute("supports-space-in-searches")
  }

  get #doesSpaceSelect() {
    return !this.supportsSpaceInSearches
  }

  #createSource() {
    const src = this.getAttribute("src");
    if (src) {
      if (this.hasAttribute("remote-filtering")) {
        return new RemoteFilterSource(src)
      } else {
        return new DeferredPromptSource(src)
      }
    } else {
      return new InlinePromptSource(this.querySelectorAll("lexxy-prompt-item"))
    }
  }

  #addTriggerListener() {
    const unregister = this.#editor.registerUpdateListener(() => {
      this.#editor.read(() => {
        const selection = $getSelection();
        if (!selection) return
        let node;
        if ($isRangeSelection(selection)) {
          node = selection.anchor.getNode();
        } else if ($isNodeSelection(selection)) {
          [ node ] = selection.getNodes();
        }

        if (node && $isTextNode(node)) {
          const text = node.getTextContent().trim();
          const lastChar = [ ...text ].pop();

          if (lastChar === this.trigger) {
            unregister();
            this.#showPopover();
          }
        }
      });
    });
  }

  get #editor() {
    return this.#editorElement.editor
  }

  get #editorElement() {
    return this.closest("lexxy-editor")
  }

  get #selection() {
    return this.#editorElement.selection
  }

  async #showPopover() {
    this.popoverElement ??= await this.#buildPopover();
    await this.#filterOptions();
    this.#positionPopover();
    this.popoverElement.classList.toggle("lexxy-prompt-menu--visible", true);
    this.#selectFirstOption();

    this.#editorElement.addEventListener("keydown", this.#handleKeydownOnPopover);
    this.#editorElement.addEventListener("lexxy:change", this.#filterOptions);

    this.#registerKeyListeners();
  }

  #registerKeyListeners() {
    // We can't use a regular keydown for Enter as Lexical handles it first
    this.keyListeners.push(this.#editor.registerCommand(KEY_ENTER_COMMAND, this.#handleSelectedOption.bind(this), COMMAND_PRIORITY_HIGH));
    this.keyListeners.push(this.#editor.registerCommand(KEY_TAB_COMMAND, this.#handleSelectedOption.bind(this), COMMAND_PRIORITY_HIGH));

    if (this.#doesSpaceSelect) {
      this.keyListeners.push(this.#editor.registerCommand(KEY_SPACE_COMMAND, this.#handleSelectedOption.bind(this), COMMAND_PRIORITY_HIGH));
    }
  }

  #selectFirstOption() {
    const firstOption = this.#listItemElements[0];

    if (firstOption) {
      this.#selectOption(firstOption);
    }
  }

  get #listItemElements() {
    return Array.from(this.popoverElement.querySelectorAll(".lexxy-prompt-menu__item"))
  }

  #selectOption(listItem) {
    this.#clearSelection();
    listItem.toggleAttribute("aria-selected", true);
    listItem.focus();
    this.#editorElement.focus();
    this.#editorContentElement.setAttribute("aria-controls", this.popoverElement.id);
    this.#editorContentElement.setAttribute("aria-activedescendant", listItem.id);
    this.#editorContentElement.setAttribute("aria-haspopup", "listbox");
  }

  #clearSelection() {
    this.#listItemElements.forEach((item) => { item.toggleAttribute("aria-selected", false); });
    this.#editorContentElement.removeAttribute("aria-controls");
    this.#editorContentElement.removeAttribute("aria-activedescendant");
    this.#editorContentElement.removeAttribute("aria-haspopup");
  }

  #positionPopover() {
    const { x, y, fontSize } = this.#selection.cursorPosition;
    const editorRect = this.#editorElement.getBoundingClientRect();
    const contentRect = this.#editorContentElement.getBoundingClientRect();
    const verticalOffset = contentRect.top - editorRect.top;

    this.popoverElement.style.left = `${x}px`;
    this.popoverElement.style.top = `${y + verticalOffset}px`;
    this.popoverElement.style.bottom = "auto";

    const popoverRect = this.popoverElement.getBoundingClientRect();
    const isClippedAtBottom = popoverRect.bottom > window.innerHeight;

    if (isClippedAtBottom) {
      this.popoverElement.style.bottom = `${y - verticalOffset + fontSize}px`;
      this.popoverElement.style.top = "auto";
    }
  }

  async #hidePopover() {
    this.#clearSelection();
    this.popoverElement.classList.toggle("lexxy-prompt-menu--visible", false);
    this.#editorElement.removeEventListener("lexxy:change", this.#filterOptions);
    this.#editorElement.removeEventListener("keydown", this.#handleKeydownOnPopover);

    this.#unregisterKeyListeners();

    await nextFrame();
    this.#addTriggerListener();
  }

  #unregisterKeyListeners() {
    this.keyListeners.forEach((unregister) => unregister());
    this.keyListeners = [];
  }

  #filterOptions = async () => {
    if (this.initialPrompt) {
      this.initialPrompt = false;
      return
    }

    if (this.#editorContents.containsTextBackUntil(this.trigger)) {
      await this.#showFilteredOptions();
    } else {
      this.#hidePopover();
    }
  }

  async #showFilteredOptions() {
    const filter = this.#editorContents.textBackUntil(this.trigger);
    const filteredListItems = await this.source.buildListItems(filter);
    this.popoverElement.innerHTML = "";

    if (filteredListItems.length > 0) {
      this.#showResults(filteredListItems);
    } else {
      this.#showEmptyResults();
    }
    this.#selectFirstOption();
  }

  #showResults(filteredListItems) {
    this.popoverElement.classList.remove("lexxy-prompt-menu--empty");
    this.popoverElement.append(...filteredListItems);
  }

  #showEmptyResults() {
    this.popoverElement.classList.add("lexxy-prompt-menu--empty");
    const el = createElement("li", { innerHTML: this.#emptyResultsMessage });
    el.classList.add("lexxy-prompt-menu__item--empty");
    this.popoverElement.append(el);
  }

  get #emptyResultsMessage() {
    return this.getAttribute("empty-results") || NOTHING_FOUND_DEFAULT_MESSAGE
  }

  #handleKeydownOnPopover = (event) => {
    if (event.key === "Escape") {
      this.#hidePopover();
      this.#editorElement.focus();
      event.stopPropagation();
    } else if (event.key === "ArrowDown") {
      this.#moveSelectionDown();
      event.preventDefault();
      event.stopPropagation();
    } else if (event.key === "ArrowUp") {
      this.#moveSelectionUp();
      event.preventDefault();
      event.stopPropagation();
    }
  }

  #moveSelectionDown() {
    const nextIndex = this.#selectedIndex + 1;
    if (nextIndex < this.#listItemElements.length) this.#selectOption(this.#listItemElements[nextIndex]);
  }

  #moveSelectionUp() {
    const previousIndex = this.#selectedIndex - 1;
    if (previousIndex >= 0) this.#selectOption(this.#listItemElements[previousIndex]);
  }

  get #selectedIndex() {
    return this.#listItemElements.findIndex((item) => item.hasAttribute("aria-selected"))
  }

  get #selectedListItem() {
    return this.#listItemElements[this.#selectedIndex]
  }

  #handleSelectedOption(event) {
    if (event.key !== " ") event.preventDefault();
    event.stopPropagation();
    this.#optionWasSelected();
    return true
  }

  #optionWasSelected() {
    this.#replaceTriggerWithSelectedItem();
    this.#hidePopover();
    this.#editorElement.focus();
  }

  #replaceTriggerWithSelectedItem() {
    const promptItem = this.source.promptItemFor(this.#selectedListItem);

    if (!promptItem) { return }

    const template = promptItem.querySelector("template[type='editor']");
    const stringToReplace = `${this.trigger}${this.#editorContents.textBackUntil(this.trigger)}`;

    if (this.hasAttribute("insert-editable-text")) {
      this.#insertTemplateAsEditableText(template, stringToReplace);
    } else {
      this.#insertTemplateAsAttachment(promptItem, template, stringToReplace);
    }
  }

  #insertTemplateAsEditableText(template, stringToReplace) {
    this.#editor.update(() => {
      const nodes = $generateNodesFromDOM(this.#editor, parseHtml(`${template.innerHTML}`));
      this.#editorContents.replaceTextBackUntil(stringToReplace, nodes);
    });
  }

  #insertTemplateAsAttachment(promptItem, template, stringToReplace) {
    this.#editor.update(() => {
      const attachmentNode = new CustomActionTextAttachmentNode({ sgid: promptItem.getAttribute("sgid"), contentType: `application/vnd.actiontext.${this.name}`, innerHtml: template.innerHTML });
      this.#editorContents.replaceTextBackUntil(stringToReplace, attachmentNode);
    });
  }

  get #editorContents() {
    return this.#editorElement.contents
  }

  get #editorContentElement() {
    return this.#editorElement.editorContentElement
  }

  async #buildPopover() {
    const popoverContainer = createElement("ul", { role: "listbox", id: generateDomId("prompt-popover") }); // Avoiding [popover] due to not being able to position at an arbitrary X, Y position.
    popoverContainer.classList.add("lexxy-prompt-menu");
    popoverContainer.style.position = "absolute";
    popoverContainer.append(...(await this.source.buildListItems()));
    popoverContainer.addEventListener("click", this.#handlePopoverClick);
    this.#editorElement.appendChild(popoverContainer);
    return popoverContainer
  }

  #handlePopoverClick = (event) => {
    const listItem = event.target.closest(".lexxy-prompt-menu__item");
    if (listItem) {
      this.#selectOption(listItem);
      this.#optionWasSelected();
    }
  }
}

customElements.define("lexxy-prompt", LexicalPromptElement);

class CodeLanguagePicker extends HTMLElement {
  connectedCallback() {
    this.editorElement = this.closest("lexxy-editor");
    this.editor = this.editorElement.editor;

    this.#attachLanguagePicker();
    this.#monitorForCodeBlockSelection();
  }

  #attachLanguagePicker() {
    this.languagePickerElement = this.#createLanguagePicker();

    this.languagePickerElement.addEventListener("change", () => {
      this.#updateCodeBlockLanguage(this.languagePickerElement.value);
    });

    this.languagePickerElement.style.position = "absolute";
    this.editorElement.appendChild(this.languagePickerElement);
  }

  #createLanguagePicker() {
    const selectElement = createElement("select", { hidden: true, className: "lexxy-code-language-picker", "aria-label": "Pick a language…", name: "lexxy-code-language" });

    for (const [ value, label ] of Object.entries(this.#languages)) {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = label;
      selectElement.appendChild(option);
    }

    return selectElement
  }

  get #languages() {
    const languages = { ...CODE_LANGUAGE_FRIENDLY_NAME_MAP };

    if (!languages.ruby) languages.ruby = "Ruby";

    const sortedEntries = Object.entries(languages)
      .sort(([ , a ], [ , b ]) => a.localeCompare(b));

    // Place the "plain" entry first, then the rest of language sorted alphabetically
    const plainIndex = sortedEntries.findIndex(([ key ]) => key === "plain");
    const plainEntry = sortedEntries.splice(plainIndex, 1)[0];
    return Object.fromEntries([ plainEntry, ...sortedEntries ])
  }

  #updateCodeBlockLanguage(language) {
    this.editor.update(() => {
      const codeNode = this.#getCurrentCodeNode();

      if (codeNode) {
        codeNode.setLanguage(language);
      }
    });
  }

  #monitorForCodeBlockSelection() {
    this.editor.registerUpdateListener(() => {
      this.editor.getEditorState().read(() => {
        const codeNode = this.#getCurrentCodeNode();

        if (codeNode) {
          this.#codeNodeWasSelected(codeNode);
        } else {
          this.#hideLanguagePicker();
        }
      });
    });
  }

  #getCurrentCodeNode() {
    const selection = $getSelection();

    if (!$isRangeSelection(selection)) {
      return null
    }

    const anchorNode = selection.anchor.getNode();
    const parentNode = anchorNode.getParent();

    if ($isCodeNode(anchorNode)) {
      return anchorNode
    } else if ($isCodeNode(parentNode)) {
      return parentNode
    }

    return null
  }

  #codeNodeWasSelected(codeNode) {
    const language = codeNode.getLanguage();

    this.#updateLanguagePickerWith(language);
    this.#showLanguagePicker();
    this.#positionLanguagePicker(codeNode);
  }

  #updateLanguagePickerWith(language) {
    if (this.languagePickerElement && language) {
      const normalizedLanguage = normalizeCodeLang(language);
      this.languagePickerElement.value = normalizedLanguage;
    }
  }

  #positionLanguagePicker(codeNode) {
    const codeElement = this.editor.getElementByKey(codeNode.getKey());
    if (!codeElement) return

    const codeRect = codeElement.getBoundingClientRect();
    const editorRect = this.editorElement.getBoundingClientRect();
    const relativeTop = codeRect.top - editorRect.top;

    this.languagePickerElement.style.top = `${relativeTop}px`;
  }

  #showLanguagePicker() {
    this.languagePickerElement.hidden = false;
  }

  #hideLanguagePicker() {
    this.languagePickerElement.hidden = true;
  }
}

customElements.define("lexxy-code-language-picker", CodeLanguagePicker);

function highlightAll() {
  const elements = document.querySelectorAll("pre[data-language]");

  elements.forEach(preElement => {
    highlightElement(preElement);
  });
}

function highlightElement(preElement) {
  const language = preElement.getAttribute("data-language");

  let code = preElement.innerHTML.replace(/<br\s*\/?>/gi, "\n");

  const grammar = Prism.languages[language];
  if (!grammar) return

  // unescape HTML entities in the code block
  code = new DOMParser().parseFromString(code, "text/html").body.textContent || "";

  const highlightedHtml = Prism.highlight(code, grammar, language);

  const codeElement = createElement("code", { "data-language": language, innerHTML: highlightedHtml });
  preElement.replaceWith(codeElement);
}

// Manual highlighting mode to prevent invocation on every page. See https://prismjs.com/docs/prism
// This must happen before importing any Prism components
window.Prism = window.Prism || {};
Prism.manual = true;

export { highlightAll };
