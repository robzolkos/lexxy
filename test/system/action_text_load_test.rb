require "application_system_test_case"

class ActionTestLoadTest < ApplicationSystemTestCase
  test "works when no rich text record" do
    visit edit_post_path(posts(:empty))

    assert_equal_html " <p><br></p> ", find_editor.value
  end
end
