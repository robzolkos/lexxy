import { DecoratorNode, $getNodeByKey } from "lexical"
import { DirectUpload } from "@rails/activestorage"
import { ImageNode } from "./image_node"
import { createElement, createFigureWithImage } from "../helpers/html_helper";
import { loadFileIntoImage } from "../helpers/upload_helper";

export class UploadedImageNode extends DecoratorNode {
  static getType() {
    return "uploaded_image"
  }

  static clone(node) {
    return new UploadedImageNode(node.file, node.uploadUrl, node.editor, node.__key)
  }

  static importJSON(serializedNode) {
    const node = new UploadedImageNode()
    node.src = serializedNode.src
    return node
  }

  constructor(file, uploadUrl, editor, key) {
    super(key)
    this.file = file
    this.uploadUrl = uploadUrl
    this.src = null
    this.editor = editor
  }

  createDOM() {
    const { figure, image } = createFigureWithImage()

    const progressBar = createElement("progress", { value: 0, max: 100 });
    figure.appendChild(progressBar)
    loadFileIntoImage(this.file, image)

    this.#startUpload(progressBar, figure)

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
    }
  }

  exportDOM() {
    const img = document.createElement("img")
    if (this.src) {
      img.src = this.src
    }
    img.alt = this.altText
    img.className = "wtf-image"
    return { element: img }
  }

  decorate() {
    return null
  }

  #startUpload(progressBar, figure) {
    const upload = new DirectUpload(this.file, this.uploadUrl, this)

    upload.delegate = {
      directUploadWillStoreFileWithXHR: (request) => {
        request.upload.addEventListener("progress", (event) => {
          this.editor.update(() => {
            progressBar.value = Math.round((event.loaded / event.total) * 100)
          })
        })
      }
    }

    upload.create((error, blob) => {
      if (error) {
        this.#handleUploadError(figure)
      } else {
        this.src = `/rails/active_storage/blobs/redirect/${blob.signed_id}/${blob.filename}`
        this.#showUploadedImage(blob)
      }
    })
  }

  #handleUploadError(figure) {
    figure.innerHTML = ""
    figure.classList.add("attachment--error")
    figure.appendChild(createElement("div", { innerText: `Error uploading ${this.file?.name ?? "image"}` }))
  }

  #showUploadedImage(blob) {
    this.editor.update(() => {
      const latest = $getNodeByKey(this.getKey())
      if (latest) {
        latest.replace(new ImageNode(this.src, blob.filename, blob.content_type))
      }
    })
  }
}
