# ActionText-Lexical Changes Documentation

This document describes the changes made to Rails ActionText in the actiontext-lexical engine to integrate the Lexical editor instead of the default Trix editor.

## Overview

The actiontext-lexical engine overrides several core ActionText components to replace the Trix editor with Lexical. The changes are implemented using Ruby's `prepend` mechanism in the engine initializer.

## Modified Components

### 1. ActionText::TagHelper (`lib/actiontext/lexical/rich_text_area_tag.rb`)

#### Original Rails Implementation
```ruby
def rich_textarea_tag(name, value = nil, options = {})
  options = options.symbolize_keys
  form = options.delete(:form)
  
  options[:input] ||= "trix_input_#{ActionText::TagHelper.id += 1}"
  options[:class] ||= "trix-content"
  
  options[:data] ||= {}
  options[:data][:direct_upload_url] ||= main_app.rails_direct_uploads_url
  options[:data][:blob_url_template] ||= main_app.rails_service_blob_url(":signed_id", ":filename")
  
  editor_tag = content_tag("trix-editor", "", options)
  input_tag = hidden_field_tag(name, value.try(:to_trix_html) || value, id: options[:input], form: form)
  
  input_tag + editor_tag
end
```

#### Lexical Override
```ruby
def rich_textarea_tag(name, value = nil, options = {}, &block)
  options = options.symbolize_keys
  form = options.delete(:form)
  
  # NEW: Process custom attachments before rendering
  value = render_custom_attachments_in(value)
  # NEW: Wrap value in div if present
  value = "<div>#{value}</div>" if value
  
  options[:name] ||= name
  options[:value] ||= value
  options[:data] ||= {}
  options[:data][:direct_upload_url] ||= main_app.rails_direct_uploads_url
  options[:data][:blob_url_template] ||= main_app.rails_service_blob_url(":signed_id", ":filename")
  
  # CHANGED: Creates lexical-editor instead of trix-editor
  # CHANGED: No hidden input field needed
  editor_tag = content_tag("lexical-editor", "", options, &block)
  editor_tag
end
```

**Key Changes:**
- Replaces `trix-editor` element with `lexical-editor`
- Removes the hidden input field (Lexical handles this differently)
- Adds custom attachment rendering logic
- Wraps content in a div for Lexical compatibility
- Sets name and value directly on the editor element
- Supports block parameter for additional content

### 2. ActionView::Helpers::FormHelper (`lib/actiontext/lexical/form_helper.rb`)

#### Original Rails Implementation
The original Rails implementation delegates to `Tags::ActionText.new(object_name, method, self, options).render`

#### Lexical Override
```ruby
def rich_textarea(object_name, method, options = {}, &block)
  ActionView::Helpers::Tags::ActionText.new(object_name, method, self, options, &block).render
end
```

**Key Changes:**
- Adds block parameter support
- Otherwise maintains same delegation pattern

### 3. ActionView::Helpers::FormBuilder (`lib/actiontext/lexical/form_builder.rb`)

#### Original Rails Implementation
The original Rails FormBuilder delegates to the template's rich_textarea method.

#### Lexical Override
```ruby
def rich_textarea(method, options = {}, &block)
  @template.rich_textarea(@object_name, method, objectify_options(options), &block)
end
```

**Key Changes:**
- Adds block parameter support
- Maintains delegation to template's rich_textarea method

### 4. ActionView::Helpers::Tags::ActionText (`lib/actiontext/lexical/action_text_tag.rb`)

#### Original Rails Implementation
```ruby
def render
  options = @options.stringify_keys
  add_default_name_and_id(options)
  options["input"] ||= dom_id(object, [options["id"], :trix_input].compact.join("_")) if object
  html_tag = @template_object.rich_text_area_tag(options.delete("name"), options.fetch("value") { value }, options.except("value"))
  error_wrapping(html_tag)
end
```

#### Lexical Override
```ruby
def initialize(object_name, method_name, template_object, options = {}, &block)
  super
  @block = block  # NEW: Store block for later use
end

def render
  options = @options.stringify_keys
  
  add_default_name_and_id(options)
  options["input"] ||= dom_id(object, [ options["id"], :trix_input ].compact.join("_")) if object
  html_tag = @template_object.rich_textarea_tag(options.delete("name"), options.fetch("value") { value }, options.except("value"), &@block)
  error_wrapping(html_tag)
end
```

**Key Changes:**
- Overrides constructor to capture block parameter
- Passes block to rich_textarea_tag method
- Maintains compatibility with Rails error wrapping

### 5. ContentHelper Sanitization (`engine.rb` initializer)

#### Original Rails Implementation
Rails ActionText uses default sanitizer settings with a limited set of allowed tags and attributes.

#### Lexical Override
```ruby
initializer "actiontext-lexical.sanitization" do |app|
  ActiveSupport.on_load(:action_text_content) do
    default_allowed_tags = Class.new.include(ActionText::ContentHelper).new.sanitizer_allowed_tags
    ActionText::ContentHelper.allowed_tags = default_allowed_tags + %w[ video audio source embed ]
    
    default_allowed_attributes = Class.new.include(ActionText::ContentHelper).new.sanitizer_allowed_attributes
    ActionText::ContentHelper.allowed_attributes = default_allowed_attributes + %w[ controls poster data-language style ]
  end
end
```

**Key Changes:**
- Adds support for multimedia elements: `video`, `audio`, `source`, `embed`
- Adds multimedia attributes: `controls`, `poster`
- Adds code highlighting support: `data-language`
- Adds inline styling support: `style`

### 6. ActiveStorage::Blob Enhancement (`lib/active_storage/blob_with_preview_url.rb`)

#### Original Rails Implementation
The default ActiveStorage::Blob `as_json` method doesn't include preview URLs.

#### Lexical Addition
```ruby
module ActiveStorage
  module BlobWithPreviewUrl
    PREVIEW_SIZE = [ 1024, 768 ]
    
    def as_json(options = nil)
      json = super(options)
      
      if previewable?
        json["previewable"] = true
        json["url"] = Rails.application.routes.url_helpers.rails_representation_path(
          preview(resize_to_limit: PREVIEW_SIZE), ActiveStorage::Current.url_options.merge(only_path: true)
        )
      end
      
      json
    end
  end
end
```

**Key Changes:**
- Adds preview URL to blob JSON representation
- Sets preview size to 1024x768
- Only includes preview for previewable blobs
- Uses Rails representation path for preview URLs

## Summary of Major Differences

1. **Editor Element**: Replaces `<trix-editor>` with `<lexical-editor>`
2. **Input Handling**: Removes hidden input field (Lexical manages this internally)
3. **Content Processing**: Adds custom attachment rendering before editor initialization
4. **Block Support**: Adds support for passing blocks to editor components
5. **Media Support**: Extends sanitizer to allow video, audio, and embed elements
6. **Preview Support**: Adds preview URLs to ActiveStorage blob JSON
7. **Styling Support**: Allows inline styles and data attributes for code highlighting

## Integration Method

All overrides are applied using Ruby's `prepend` mechanism in the engine initializer, ensuring they take precedence over the original Rails implementations while maintaining compatibility with the Rails ActionText API.
