export async function loadFileIntoImage(file, image) {
  return new Promise((resolve) => {
    const reader = new FileReader()

    image.addEventListener("load", () => {
      resolve(image)
    })

    reader.onload = (event) => {
      image.src = event.target.result || null
    }

    reader.readAsDataURL(file)
  })
}
