class EditorHandler
  attr_reader :page, :editor_element

  delegate_missing_to :editor_element

  def initialize(page, editor_element)
    @page = page
    @editor_element = editor_element
  end

  def value=(value)
    editor_element.set value
    page.execute_script("arguments[0].value = '#{value}'", editor_element)
  end

  def send(*keys)
    content_element.send_keys *keys
  end

  def send_key(key)
    page.execute_script <<~JS, content_element
      const event = new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        key: "#{key}",
        keyCode: 46
      });
      arguments[0].dispatchEvent(event);
    JS
  end

  def select(text)
    page.execute_script <<~JS, editor_element
      const editable = arguments[0]
      const walker = document.createTreeWalker(editable, NodeFilter.SHOW_TEXT)
      let node

      while ((node = walker.nextNode())) {
        const idx = node.nodeValue.indexOf("#{text}")
        if (idx !== -1) {
          const range = document.createRange()
          range.setStart(node, idx)
          range.setEnd(node, idx + "#{text}".length)
          const sel = window.getSelection()
          sel.removeAllRanges()
          sel.addRange(range)
          break
        }
      }
    JS
    sleep 0.1
  end

  def focus
    page.execute_script <<~JS, editor_element
      arguments[0].focus()
    JS
  end

  def paste(text)
    page.execute_script <<~JS, content_element
      arguments[0].focus()

      // Create a proper mock clipboardData object
      const mockClipboardData = {
        types: ["text/plain"],
        items: [{
          type: "text/plain",
          getAsString: function(callback) {
            callback("#{text}")
          }
        }],
        getData: function(type) {
          return type === "text/plain" ? "#{text}" : ""
        }
      }

      const pasteEvent = new ClipboardEvent("paste", {
        bubbles: true,
        cancelable: true
      })

      // Override the clipboardData property
      Object.defineProperty(pasteEvent, 'clipboardData', {
        value: mockClipboardData,
        writable: false
      })

      arguments[0].dispatchEvent(pasteEvent)
    JS
  end

  def within_contents(&block)
    page.within content_element, &block
  end

  def toggle_command(command, toolbar_selector = "lexxy-toolbar")
    find("#{toolbar_selector} [data-command=\"#{command}\"]").click
  end

  private
    def content_element
      @content_element ||= editor_element.find(".lexxy-editor__content")
    end
end
