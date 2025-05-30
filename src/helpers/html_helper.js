import DOMPurify from 'dompurify'
import { mimeTypeToExtension } from "./storage_helper";

export function createElement(name, properties) {
  const element = document.createElement(name)
  for (const [ key, value ] of Object.entries(properties || {})) {
    if (key in element) {
      element[key] = value
    } else if (value !== null && value !== undefined ) {
      element.setAttribute(key, value)
    }
  }
  return element
}

export function createAttachmentFigure(contentType, isPreviewable, fileName) {
  const extension = fileName ? fileName.split('.').pop().toLowerCase() : "unknown"
  return createElement("figure", {
    className: `attachment attachment--${isPreviewable ? 'preview' : 'file'} attachment--${extension}`,
    "data-content-type": contentType
  })
}

export function isPreviewableImage(contentType) {
  return contentType.startsWith("image/") && !contentType.includes("svg")
}

export function dispatchCustomEvent(element, name, detail) {
  const event = new CustomEvent(name, {
    detail: detail,
    bubbles: true,
  })
  element.dispatchEvent(event)
}

const VISUALLY_RELEVANT_ELEMENTS_SELECTOR = [
  "img", "video", "audio", "iframe", "embed", "object", "picture", "source", "canvas", "svg", "math",
  "form", "input", "textarea", "select", "button"
].join(",")

export function containsVisuallyRelevantChildren(element) {
  return element.querySelector(VISUALLY_RELEVANT_ELEMENTS_SELECTOR)
}

const ALLOWED_HTML_TAGS = [ "a", "action-text-attachment", "b", "blockquote", "br", "code", "em",
  "figcaption", "figure", "h1", "h2", "h3", "h4", "h5", "h6", "i", "img", "li", "ol", "p", "pre", "q", "strong", "ul" ]

const ALLOWED_HTML_ATTRIBUTES = [ "alt", "caption", "class", "content-type", "contenteditable",
  "data-direct-upload-id", "data-sgid", "filename", "filesize", "height", "href", "presentation",
  "previewable", "sgid", "src", "title", "url", "width" ]

export function sanitize(html) {
  const sanitizedHtml = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ALLOWED_HTML_TAGS,
    ALLOWED_ATTR: ALLOWED_HTML_ATTRIBUTES
  })
  return sanitizedHtml
}

export function dispatch(element, eventName, detail = null, cancelable = false) {
  return element.dispatchEvent(new CustomEvent(eventName, { bubbles: true, detail, cancelable }))
}


