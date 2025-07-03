require "test_helper"

class BlobTest < ActiveSupport::TestCase
  setup do
    @was_url_options, ActiveStorage::Current.url_options = ActiveStorage::Current.url_options, {}
  end

  teardown do
    ActiveStorage::Current.url_options = @was_url_options
  end

  test "as_json does not include preview URL for non-previewable attachments" do
    blob = create_blob "example.jpg", "image/jpeg"
    assert_not blob.as_json.key?("previewable")
    assert_not blob.as_json.key?("url")
  end

  test "as_json includes preview URL" do
    blob = create_blob "example.pdf", "application/pdf"

    assert blob.as_json["previewable"]
    assert_match %r{^/rails/active_storage/representations/redirect/}, blob.as_json["url"]
  end

  test "as_json includes preview URL includes script_name if present" do
    ActiveStorage::Current.url_options[:host] = "example.org" # Should not be present
    ActiveStorage::Current.url_options[:script_name] = "/foo"

    blob = create_blob "example.pdf", "application/pdf"

    assert blob.as_json["previewable"]
    assert_match %r{^/foo/rails/active_storage/representations/redirect/}, blob.as_json["url"]
  end

  private
    def create_blob(filename, content_type)
      ActiveStorage::Blob.create!(
        filename: filename,
        content_type: content_type,
        checksum: "abc123",
        byte_size: 1024
      )
    end
end
