import DOMPurify from 'dompurify'

export function createElement(name, properties) {
  const element = document.createElement(name)
  for (const [ key, value ] of Object.entries(properties || {})) {
    if (key in element) {
      element[key] = value
    } else {
      element.setAttribute(key, value)
    }
  }
  return element
}

export function createFigureWithImage(properties) {
  const { image: imageProperties = {}, ...figureProperties } = properties || {}

  const figure = createElement("figure", { className: "attachment", contentEditable: false, ...figureProperties })
  const image = createElement("img", imageProperties)
  figure.appendChild(image)

  return { figure, image }
}

export function dispatchCustomEvent(element, name, detail) {
  const event = new CustomEvent(name, {
    detail: detail,
    bubbles: true,
  })
  element.dispatchEvent(event)
}

const ALLOWED_HTML_TAGS = [
  "a",
  "action-text-attachment",
  "b",
  "blockquote",
  "br",
  "code",
  "em",
  "figcaption",
  "figure",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "i",
  "img",
  "li",
  "ol",
  "p",
  "pre",
  "q",
  "strong",
  "ul"
]

const ALLOWED_HTML_ATTRIBUTES = [
  "alt",
  "caption",
  "class",
  "content-type",
  "contenteditable",
  "data-direct-upload-id",
  "data-sgid",
  "filename",
  "filesize",
  "height",
  "href",
  "presentation",
  "sgid",
  "src",
  "title",
  "url",
  "width"
]

export function sanitize(html) {
  const sanitizedHtml = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ALLOWED_HTML_TAGS,
    ALLOWED_ATTR: ALLOWED_HTML_ATTRIBUTES
  })
  return sanitizedHtml
}

