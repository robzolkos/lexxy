require "lexxy/version"
require "lexxy/engine"

module Lexxy
  def self.override_action_text_defaults
    ActionText::TagHelper.module_eval do
      alias_method :rich_textarea_tag, :lexxy_rich_textarea_tag
      alias_method :rich_text_area_tag, :lexxy_rich_textarea_tag
    end

    ActionView::Helpers::FormHelper.module_eval do
      alias_method :rich_textarea, :lexxy_rich_textarea
      alias_method :rich_text_area, :lexxy_rich_textarea
    end

    ActionView::Helpers::FormBuilder.module_eval do
      alias_method :rich_textarea, :lexxy_rich_textarea
      alias_method :rich_text_area, :lexxy_rich_textarea
    end

    ActionView::Helpers::Tags::ActionText.module_eval do
      alias_method :render, :lexxy_render
    end
  end
end
