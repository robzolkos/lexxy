require "application_system_test_case"

class LoadHtmlTest < ApplicationSystemTestCase
  setup do
    @post = posts(:hello_world)
  end

  test "load html" do
    # @post.update! body: "<p>HELLO THERE</p>"

    visit edit_post_path(posts(:hello_world))

    editor = find("lexical-editor")

    editor_content = editor.find("[contenteditable]")
    editor_content.send_keys(:enter)
    editor_content.send_keys("Line 1")
    editor_content.send_keys(:enter)
    editor_content.send_keys("Line 2")
    editor_content.send_keys(:enter)

    # puts page.html
    puts editor.value


    page.execute_script <<~JS
      const editable = document.querySelector('lexical-editor [contenteditable]');
      const walker = document.createTreeWalker(editable, NodeFilter.SHOW_TEXT);
      let node, startOffset, endOffset;

      while ((node = walker.nextNode())) {
        const idx = node.nodeValue.indexOf("Line 1");
        if (idx !== -1) {
          const range = document.createRange();
          range.setStart(node, idx);
          range.setEnd(node, idx + "Line 1".length);
          const sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
          break;
        }
      }
    JS

    # Optional: Delete selected text
    page.driver.browser.action.send_keys(:backspace).perform

    sleep 3
    puts editor.value

  end
end
