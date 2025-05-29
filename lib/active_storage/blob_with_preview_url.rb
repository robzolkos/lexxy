module ActiveStorage
  module BlobWithPreviewUrl
    PREVIEW_SIZE = [ 1024, 768 ]

    def as_json(options = nil)
      json = super(options)

      if previewable?
        json["previewable"] = true
        json["url"] = Rails.application.routes.url_helpers.rails_representation_path(
          preview(resize_to_limit: PREVIEW_SIZE), only_path: true
        )
      end

      json
    end
  end
end
