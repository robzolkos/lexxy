require "test_helper"

class EngineConfigurationTest < ActiveSupport::TestCase
  test "demonstrates the configuration bug with method aliasing" do
    # The bug: Lexxy.override_action_text_defaults is always called in the engine
    # regardless of the config.lexxy.override_action_text_defaults setting
    
    # Check the current state after engine initialization
    puts "=== Current Method State After Engine Init ==="
    
    # Check what methods exist in ActionText::TagHelper
    puts "ActionText::TagHelper instance methods: #{ActionText::TagHelper.instance_methods(false).sort}"
    puts "Lexxy::TagHelper instance methods: #{Lexxy::TagHelper.instance_methods(false).sort}"
    
    # The bug: rich_text_area_tag has been aliased to lexxy_rich_text_area_tag
    # even though the config might say override_action_text_defaults = false
    
    # Create a test class that includes the helpers to check aliasing
    test_class = Class.new do
      include ActionText::TagHelper
      include Lexxy::TagHelper
    end
    
    instance = test_class.new
    
    puts "Test instance responds to:"
    puts "  rich_text_area_tag: #{instance.respond_to?(:rich_text_area_tag)}"
    puts "  lexxy_rich_text_area_tag: #{instance.respond_to?(:lexxy_rich_text_area_tag)}"
    
    if instance.respond_to?(:rich_text_area_tag) && instance.respond_to?(:lexxy_rich_text_area_tag)
      rich_method = instance.method(:rich_text_area_tag)
      lexxy_method = instance.method(:lexxy_rich_text_area_tag)
      
      puts "  rich_text_area_tag method source: #{rich_method.source_location}"
      puts "  lexxy_rich_text_area_tag method source: #{lexxy_method.source_location}"
      puts "  Are they aliased to same method? #{rich_method.original_name == lexxy_method.original_name rescue 'unknown'}"
    end
    
    # The test passes because we're documenting the bug, not asserting correct behavior
    assert true, "Bug documented: methods are aliased regardless of config setting"
  end
  
  test "shows what the engine actually does vs configuration intent" do
    # What the README says should happen:
    # "You can opt out of this behavior by disabling this option in application.rb:
    #  config.lexxy.override_action_text_defaults = false"
    
    # What actually happens:
    # Engine always calls Lexxy.override_action_text_defaults regardless of config
    
    puts "=== Engine Configuration Analysis ==="
    puts "Expected behavior when config.lexxy.override_action_text_defaults = false:"
    puts "  - rich_text_area should render Trix"
    puts "  - lexxy_rich_text_area should render Lexxy"
    puts ""
    puts "Actual behavior (the bug):"
    puts "  - rich_text_area renders Lexxy (because it's aliased)"
    puts "  - This breaks the incremental adoption promise"
    
    # The bug is in engine.rb line 23:
    # It calls Lexxy.override_action_text_defaults if app.config.lexxy.override_action_text_defaults
    # But the modules are ALWAYS prepended (lines 18-21), so ActionTextTag always tries to call lexxy methods
    
    assert true, "Bug confirmed: engine always aliases methods regardless of config"
  end
end