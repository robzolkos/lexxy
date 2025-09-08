import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = { type: String }

  acceptFile(event) {
    if (!this.hasTypeValue) return
    if (event.detail.file.type === this.typeValue) return

    event.preventDefault()
  }
}
