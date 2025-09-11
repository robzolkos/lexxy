module Lexxy
  module FormHelper
    def lexxy_rich_textarea(object_name, method, options = {}, &block)
      ActionView::Helpers::Tags::ActionText.new(object_name, method, self, options, &block).lexxy_render
    end

    alias_method :lexxy_rich_text_area, :lexxy_rich_textarea
  end
end
