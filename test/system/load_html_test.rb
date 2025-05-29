require "application_system_test_case"

class LoadHtmlTest < ApplicationSystemTestCase
  setup do
    visit edit_post_path(posts(:empty))
  end

  test "load html when empty content" do
    find_editor.value = ""
    assert_equal_html "<p><br></p>", find_editor.value
  end

  test "load simple string" do
    find_editor.value = "Hello"
    assert_equal_html "<p>Hello</p>", find_editor.value
  end

  test "normalize loaded HTML" do
    find_editor.value = "<div>hello</div> <div>there</div>"
    assert_equal_html "<p>hello</p><p>there</p>", find_editor.value
  end
end
