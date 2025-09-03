import { Controller } from "@hotwired/stimulus"
import Prism from "prismjs"
import prettier from "prettier"
import htmlParser from "prettier/parser-html"

export default class extends Controller {
  static targets = [ "editor", "output" ]

  async refresh(event) {
    const code = this.editorTarget.value.trim()
    const formattedCode = await prettier.format(code, {
      parser: "html",
      plugins: [ htmlParser ],
      printWidth: 80,
      tabWidth: 2,
      useTabs: false
    })
    const highlightedCode = Prism.highlight(formattedCode, Prism.languages.html, 'html')
    this.outputTarget.innerHTML = `<pre><code class="language-html">${highlightedCode}</code></pre>`
  }
}
