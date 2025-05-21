export function loadFileIntoImage(file, image) {
  const reader = new FileReader()
  reader.onload = (event) => {
    image.src = event.target.result
  }
  reader.readAsDataURL(file)
}
