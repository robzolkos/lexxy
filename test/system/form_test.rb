require "application_system_test_case"

class ActionTextLoadTest < ApplicationSystemTestCase
  test "can create new records" do
    visit posts_path
    click_on "New post"

    find_editor.send "Hello"
    find_editor.send :enter
    find_editor.send "there"

    click_on "Create Post"
    click_on "Edit this post"

    assert_equal_html "<p>Hello</p><p>there</p>", find_editor.value
  end

  test "edit existing records" do
    visit edit_post_path(posts(:empty))

    find_editor.send "Hello"
    find_editor.send :enter
    find_editor.send "there"

    click_on "Update Post"

    assert_equal_html "<p>Hello</p><p>there</p>", find_editor.value
  end
end
