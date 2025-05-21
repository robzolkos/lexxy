module ActionText
  module Lexical
    module TagHelper
      def rich_textarea_tag(name, value = nil, options = {})
        Rails.logger.info "*** name = #{name}"

        options = options.symbolize_keys
        form = options.delete(:form)

        options[:name] ||= name
        options[:value] ||= value.try(:body_before_type_cast)
        options[:data] ||= {}
        options[:data][:direct_upload_url] ||= main_app.rails_direct_uploads_url
        options[:data][:blob_url_template] ||= main_app.rails_service_blob_url(":signed_id", ":filename")

        editor_tag = content_tag("lexical-editor", "", options)
        editor_tag
      end
    end
  end
end
