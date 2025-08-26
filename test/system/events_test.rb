require "application_system_test_case"

class EventsTest < ApplicationSystemTestCase
  test "no lexxy:change event on initial load" do
    visit edit_post_path(posts(:empty))

    assert_no_dispatched_event "lexxy:change"
  end

  test "dispatch lexxy:change event on edits" do
    visit edit_post_path(posts(:empty))

    find_editor.send "Y"

    assert_dispatched_event "lexxy:change"
  end

  private
    def assert_dispatched_event(type)
      assert_selector "[data-event='#{type}']"
    end

    def assert_no_dispatched_event(type)
      assert_no_selector "[data-event='#{type}']"
    end
end
