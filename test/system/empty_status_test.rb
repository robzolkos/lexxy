require "application_system_test_case"

class LoadHtmlTest < ApplicationSystemTestCase
  setup do
  end

  test "add empty class on load when it's empty" do
    visit edit_post_path(posts(:empty))

    assert_emtpy_class
    find_editor.value = "<p><br></p>"
    assert_emtpy_class
  end

  test "don't add empty class on load  if not empty" do
    visit edit_post_path(posts(:hello_world))
    assert_no_empty_class
  end

  test "update empty class dynamically as you type" do
    visit edit_post_path(posts(:empty))

    assert_emtpy_class
    find_editor.send "Hey there"
    assert_no_empty_class

    find_editor.select "Hey there"
    find_editor.send :backspace
    assert_emtpy_class
  end

  private
    def assert_emtpy_class
      assert_selector "lexical-editor.lexical-editor--empty"
    end

    def assert_no_empty_class
      assert_no_selector "lexical-editor.lexical-editor--empty"
    end
end
