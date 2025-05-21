export function createElement(name, properties) {
  const element = document.createElement(name)
  for (const [key, value] of Object.entries(properties)) {
    element[key] = value
  }
  return element
}

export function createFigureWithImage() {
  const figure = createElement("figure", { class: "attachment", contentEditable: false })
  const image = createElement("image", { parent: figure })
  figure.appendChild(image)

  return { figure, image }
}
