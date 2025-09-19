require "application_system_test_case"

class ToolbarTest < ApplicationSystemTestCase
  setup do
    visit edit_post_path(posts(:hello_world))
  end

  test "bold" do
    find_editor.select("everyone")
    click_on "Bold"
    assert_equal_html "<p>Hello <b><strong>everyone</strong></b>", find_editor.value
  end

  test "italic" do
    find_editor.select("everyone")
    click_on "Italic"
    assert_equal_html "<p>Hello <i><em>everyone</em></i></p>", find_editor.value
  end

  test "rotate headers" do
    find_editor.select("everyone")

    click_on "Heading"
    assert_equal_html "<h2>Hello everyone</h2>", find_editor.value

    click_on "Heading"
    assert_equal_html "<h3>Hello everyone</h3>", find_editor.value

    click_on "Heading"
    assert_equal_html "<h4>Hello everyone</h4>", find_editor.value

    click_on "Heading"
    assert_equal_html "<p>Hello everyone</p>", find_editor.value
  end

  test "bullet list" do
    find_editor.select("everyone")

    click_on "Bullet list"
    assert_equal_html "<ul class=\"lexxy-list__ul\"><li class=\"lexxy-list__item\">Hello everyone</li></ul>", find_editor.value
  end

  test "numbered list" do
    find_editor.select("everyone")

    click_on "Numbered list"
    assert_equal_html "<ol class=\"lexxy-list__ol lexxy-list__ol--level-1\"><li class=\"lexxy-list__item\">Hello everyone</li></ol>", find_editor.value
  end

  test "toggle code for selected words" do
    find_editor.select("everyone")

    click_on "Code"
    assert_equal_html %( <p>Hello <code>everyone</code></p> ), find_editor.value

    find_editor.select("everyone")
    click_on "Code"
    assert_equal_html "<p>Hello everyone</p>", find_editor.value
  end

  test "toggle code for block" do
    find_editor.click

    click_on "Code"
    assert_equal_html %( <pre data-language=\"plain\" data-highlight-language=\"plain\">Hello everyone</pre> ), find_editor.value

    click_on "Code"
    assert_equal_html "<p>Hello everyone</p>", find_editor.value
  end

  test "quote" do
    find_editor.select("everyone")

    click_on "Quote"
    assert_equal_html "<blockquote>Hello everyone</blockquote>", find_editor.value

    find_editor.select("everyone")
    click_on "Quote"
    assert_equal_html "<p>Hello everyone</p>", find_editor.value
  end

  test "links" do
    find_editor.select("everyone")

    click_on "Link"
    fill_in "Enter a URL…", with: "https://37signals.com"

    within ".lexxy-link-dialog" do
      click_on "Link"
    end

    assert_equal_html "<p>Hello <a href=\"https://37signals.com\">everyone</a></p>", find_editor.value
  end

  test "disable toolbar" do
    assert_selector "lexxy-toolbar"

    visit edit_post_path(posts(:hello_world), toolbar_disabled: true)

    assert_no_selector "lexxy-toolbar"
  end

  test "undo and redo" do
    original_content = find_editor.value

    # Make a change - add bold formatting
    find_editor.select("everyone")
    click_on "Bold"
    assert_equal_html "<p>Hello <b><strong>everyone</strong></b>", find_editor.value

    # Undo the change
    click_on "Undo"
    assert_equal_html original_content, find_editor.value

    # Redo the change
    click_on "Redo"
    assert_equal_html "<p>Hello <b><strong>everyone</strong></b>", find_editor.value
  end

end
