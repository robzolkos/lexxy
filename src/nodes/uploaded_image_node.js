import { DecoratorNode, $getNodeByKey } from "lexical"
import { DirectUpload } from "@rails/activestorage"
import { ImageNode } from "./image_node"

export class UploadedImageNode extends DecoratorNode {
  static getType() {
    return "uploaded_image"
  }

  static clone(node) {
    return new UploadedImageNode(
      node.file,
      node.uploadUrl,
      node.editor,
      node.__key
    )
  }

  constructor(file, uploadUrl, editor, key) {
    super(key)
    this.file = file
    this.uploadUrl = uploadUrl
    this.status = "uploading" // uploading | success | error
    this.src = null
    this.editor = editor
    this._progress = 0

    this.#startUpload()
  }

  #startUpload() {
    const key = this.getKey()

    const upload = new DirectUpload(this.file, this.uploadUrl, this)

    // Listen to progress via XHR
    upload.delegate = {
      directUploadWillStoreFileWithXHR: (request) => {
        request.upload.addEventListener("progress", (event) => {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 100)
            this._progress = percent

            this.editor.update(() => {
              const latest = $getNodeByKey(key)
              if (latest && latest._progressBar) {
                latest._progressBar.value = percent
              }
            })
          }
        })
      }
    }

    upload.create((error, blob) => {
      if (error) {
        this.status = "error"
        this.editor.update(() => {}) // trigger rerender
        return
      }

      this.status = "success"
      this.src = `/rails/active_storage/blobs/redirect/${blob.signed_id}/${blob.filename}`

      this.editor.update(() => {
        const latest = $getNodeByKey(key)
        if (latest) {
          latest.replace(new ImageNode(this.src, this.file.name))
        }
      })
    })
  }

  createDOM() {
    const figure = document.createElement("figure")
    figure.className = "uploaded-image"
    return figure
  }

  decorate() {
    const figure = document.createElement("div")
    figure.className = "uploaded-image"

    if (this.status === "uploading") {
      // 1. <img> preview
      const img = document.createElement("img")
      img.alt = this.file.name
      img.style.maxWidth = "100%"
      img.style.display = "block"

      const reader = new FileReader()
      reader.onload = (e) => {
        img.src = e.target.result
      }
      reader.readAsDataURL(this.file)

      figure.appendChild(img)

      // 2. <progress> bar
      const progress = document.createElement("progress")
      progress.max = 100
      progress.value = this._progress || 0
      progress.style.width = "100%"
      progress.style.marginTop = "0.5em"

      figure.appendChild(progress)

      this._progressBar = progress

      return figure
    }

    if (this.status === "error") {
      const error = document.createElement("div")
      error.className = "upload-error"
      error.innerText = `Error uploading ${this.file.name}`
      return error
    }

    // Default/fallback display
    const img = document.createElement("img")
    img.src = this.src
    img.alt = this.file.name
    img.style.maxWidth = "100%"
    img.style.display = "block"

    figure.appendChild(img)
    return figure
  }

  updateDOM() {
    return false
  }

  exportJSON() {
    return {
      type: "uploaded_image",
      version: 1,
      src: this.src,
      status: this.status,
    }
  }

  static importJSON(serializedNode) {
    const node = new UploadedImageNode(null, null, null)
    node.src = serializedNode.src
    node.status = serializedNode.status
    return node
  }
}
