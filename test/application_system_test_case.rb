require "test_helper"
require "capybara/cuprite"

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  driven_by :selenium_chrome_headless, options: { js_errors: true }

  setup do
    # Add any setup code needed for all system tests
  end

  teardown do
    # Add any teardown code needed for all system tests
  end
end
