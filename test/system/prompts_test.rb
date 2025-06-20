require "application_system_test_case"

class ActionTextLoadTest < ApplicationSystemTestCase
  setup do
    visit edit_post_path(posts(:empty))
  end

  test "inline prompt" do
    find_editor.send "1"
    click_on_prompt "Peter Johnson"
    assert_mention_attachment people(:peter)
  end

  test "deferred prompt" do
    find_editor.send "2"
    click_on_prompt "Peter Johnson"
    assert_mention_attachment people(:peter)
  end

  test "remote filtering prompt with editable-text insertion" do
    find_editor.send "3"
    click_on_prompt "Peter Johnson"

    find_editor.within_contents do
      assert_text people(:peter).name
    end
  end

  private
    def click_on_prompt(name)
      find(".lexical-prompt-menu__item", text: name).click
    end
end
