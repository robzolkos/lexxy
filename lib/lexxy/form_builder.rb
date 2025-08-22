module Lexxy
  module FormBuilder
    def rich_textarea(method, options = {}, &block)
      @template.rich_textarea(@object_name, method, objectify_options(options), &block)
    end

    alias_method :rich_text_area, :rich_textarea
  end
end