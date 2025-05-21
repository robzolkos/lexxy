export function createElement(name, properties) {
  console.debug("INVOKED", name, properties);
  const element = document.createElement(name)
  for (const [key, value] of Object.entries(properties)) {
    if (key in element) {
      element[key] = value
    } else {
      element.setAttribute(key, value)
      console.debug("SETTING ", key, value, element)
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
