module Lexxy
  module FormHelper
    def rich_textarea(object_name, method, options = {}, &block)
      ActionView::Helpers::Tags::ActionText.new(object_name, method, self, options, &block).render
    end

    alias_method :rich_text_area, :rich_textarea
  end
end
