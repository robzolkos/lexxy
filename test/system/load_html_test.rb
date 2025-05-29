require "application_system_test_case"

class LoadHtmlTest < ApplicationSystemTestCase
  setup do
    visit edit_post_path(posts(:empty))
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
