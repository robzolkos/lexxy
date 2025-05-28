import { DecoratorNode, $getNodeByKey } from "lexical"
import { DirectUpload } from "@rails/activestorage"
import { ActionTextAttachmentNode } from "./action_text_attachment_node"
import { createAttachmentFigure, createElement } from "../helpers/html_helper"
import { loadFileIntoImage } from "../helpers/upload_helper"
import { HISTORY_MERGE_TAG } from 'lexical'
import { bytesToHumanSize } from "../helpers/storage_helper";

export class ActionTextAttachmentUploadNode extends DecoratorNode {
  static getType() {
    return "action_text_attachment_upload"
  }

  static clone(node) {
    return new ActionTextAttachmentUploadNode(node.file, node.uploadUrl, node.editor, node.__key)
  }

  constructor(file, uploadUrl, editor, key) {
    super(key)
    this.file = file
    this.uploadUrl = uploadUrl
    this.src = null
    this.editor = editor
  }

  createDOM() {
    const figure = createAttachmentFigure(this.file.type, (this.#isImage || this.previewable), this.file.name)

    if (this.#isImage || this.previewable) {
      figure.appendChild(this.#createDOMForImage())
    } else {
      figure.appendChild(this.#createDOMForFile())
    }

    figure.appendChild(this.#createCaption())

    const progressBar = createElement("progress", { value: 0, max: 100 })
    figure.appendChild(progressBar)

    this.#startUpload(progressBar, figure)

    return figure
  }

  updateDOM() {
    return true
  }

  exportDOM() {
    const img = document.createElement("img")
    if (this.src) {
      img.src = this.src
    }
    return { element: img }
  }

  decorate() {
    return null
  }

  get #isImage() {
    return this.file.type.startsWith("image/")
  }

  #createDOMForImage() {
    const image = createElement("img")
    loadFileIntoImage(this.file, image)
    return image
  }

  #createDOMForFile() {
    const extension = this.#getFileExtension()
    const span = createElement("span", { className: "attachment__icon", textContent: extension })
    return span
  }

  #getFileExtension() {
    return this.file.name.split('.').pop().toLowerCase()
  }

  #createCaption() {
    const figcaption = createElement("figcaption", { className: "attachment__caption" })

    const nameSpan = createElement("span", { className: "attachment__name", textContent: this.file.name || "" })
    const sizeSpan = createElement("span", { className: "attachment__size", textContent: bytesToHumanSize(this.file.size) })
    figcaption.appendChild(nameSpan)
    figcaption.appendChild(sizeSpan)

    return figcaption
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
        this.#showUploadedAttachment(figure, blob)
      }
    })
  }

  #handleUploadError(figure) {
    figure.innerHTML = ""
    figure.classList.add("attachment--error")
    figure.appendChild(createElement("div", { innerText: `Error uploading ${this.file?.name ?? "image"}` }))
  }

  #showUploadedAttachment(figure, blob) {
    const image = figure.querySelector("img")
    this.editor.update(() => {
      const latest = $getNodeByKey(this.getKey())
      if (latest) {
        latest.replace(new ActionTextAttachmentNode({
          sgid: blob.attachable_sgid,
          src: blob.previewable ? blob.url : this.src,
          altText: blob.filename,
          contentType: blob.content_type,
          fileName: blob.filename,
          fileSize: blob.byte_size,
          width: image?.width,
          previewable: blob.previewable,
          height: image?.height
        }))
      }
    }, { tag: HISTORY_MERGE_TAG })
  }
}
