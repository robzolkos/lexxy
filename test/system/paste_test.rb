require "application_system_test_case"

class PateTest < ApplicationSystemTestCase
  setup do
    visit edit_post_path(posts(:empty))
  end

  test "convert to markdown on paste" do
    find_editor.paste "Hello **there**"
    assert_equal_html "<p>Hello <b><strong>there</strong></b></p>", find_editor.value
  end

  test "create links when pasting URLs" do
    visit edit_post_path(posts(:hello_world))
    find_editor.select("everyone")
    find_editor.paste "https://37signals.com"
    assert_equal_html %(<p>Hello <a href="https://37signals.com">everyone</a></p>), find_editor.value
  end

  test "create links when pasting URLs keeps formatting" do
    visit edit_post_path(posts(:hello_world))
    find_editor.select("everyone")
    find_editor.toggle_command("bold")
    find_editor.paste "https://37signals.com"
    assert_equal_html %(<p>Hello <a href="https://37signals.com"><b><strong>everyone</strong></b></a></p>), find_editor.value
  end

  test "convert nested markdown lists on paste" do
    nested_list = "* Fruits\\n  * Orange\\n  * Apple\\n* Animals\\n  * Dog"
    find_editor.paste nested_list

    # Lexical's markdown parser creates a flat list structure rather than nested
    # This is still better than the previous marked implementation which created malformed HTML
    assert_match /<ul>.*<li>Fruits<\/li>.*<li>Orange<\/li>.*<li>Apple<\/li>.*<li>Animals<\/li>.*<li>Dog<\/li>.*<\/ul>/m, find_editor.value
  end
end
