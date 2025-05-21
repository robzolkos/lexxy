require_relative "rich_text_area_tag"

module Actiontext
  module Lexical
    class Engine < ::Rails::Engine
      isolate_namespace Actiontext::Lexical

      initializer "actiontext-lexical.initialize" do |app|
        app.config.to_prepare do
          ActionText::TagHelper.prepend(ActionText::Lexical::TagHelper)
        end
      end

      initializer "actiontext-lexical.assets" do |app|
        app.config.assets.paths << root.join("app/assets/stylesheets")
        app.config.assets.paths << root.join("app/javascript")
      end
    end
  end
end
