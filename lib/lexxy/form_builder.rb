module Lexxy
  module FormBuilder
    def lexxy_rich_textarea(method, options = {}, &block)
      @template.lexxy_rich_textarea(@object_name, method, objectify_options(options), &block)
    end

    alias_method :lexxy_rich_text_area, :lexxy_rich_textarea
  end
end
