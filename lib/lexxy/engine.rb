require_relative "rich_text_area_tag"
require_relative "form_helper"
require_relative "form_builder"
require_relative "action_text_tag"

require "active_storage/blob_with_preview_url"

module Lexxy
  class Engine < ::Rails::Engine
    isolate_namespace Lexxy

    config.lexxy = ActiveSupport::OrderedOptions.new
    config.lexxy.override_action_text_defaults = true

    initializer "lexxy.initialize" do |app|
      app.config.to_prepare do
        # Always include lexxy helpers so explicit lexxy_* methods are available
        ActionText::TagHelper.prepend(Lexxy::TagHelper)
        ActionView::Helpers::FormHelper.prepend(Lexxy::FormHelper)
        ActionView::Helpers::FormBuilder.prepend(Lexxy::FormBuilder)

        if app.config.lexxy.override_action_text_defaults
          # Only override ActionText tags and create aliases when config is true
          ActionView::Helpers::Tags::ActionText.prepend(Lexxy::ActionTextTag)
          Lexxy.override_action_text_defaults
        end
      end
    end

    initializer "lexxy.assets" do |app|
      app.config.assets.paths << root.join("app/assets/stylesheets")
      app.config.assets.paths << root.join("app/javascript")
    end

    initializer "lexxy.sanitization" do |app|
      ActiveSupport.on_load(:action_text_content) do
        default_allowed_tags = Class.new.include(ActionText::ContentHelper).new.sanitizer_allowed_tags
        ActionText::ContentHelper.allowed_tags = default_allowed_tags + %w[ video audio source embed ]

        default_allowed_attributes = Class.new.include(ActionText::ContentHelper).new.sanitizer_allowed_attributes
        ActionText::ContentHelper.allowed_attributes = default_allowed_attributes + %w[ controls poster data-language style ]
      end
    end

    initializer "lexxy.blob_with_preview" do |app|
      ActiveSupport.on_load(:active_storage_blob) do
        prepend ActiveStorage::BlobWithPreviewUrl
      end
    end
  end
end
