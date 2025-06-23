require "application_system_test_case"

class AttachmentsTest < ApplicationSystemTestCase
  setup do
    visit edit_post_path(posts(:empty))
  end

  test "upload image" do
    attach_file file_fixture("example.png") do
      click_on "Upload file"
    end

    assert_image_figure_attachment content_type: "image/png", caption: "example.png"
  end

  test "upload previewable attachment" do
    attach_file file_fixture("dummy.pdf") do
      click_on "Upload file"
    end

    assert_image_figure_attachment content_type: "application/pdf", caption: "dummy.pdf"
  end

  test "upload non previewable attachment" do
    attach_file file_fixture("note.txt") do
      click_on "Upload file"
    end

    assert_no_image_figure_attachment content_type: "text/plain", caption: "note.txt"
  end

  test "delete attachments with the keyboard" do
    attach_file file_fixture("example.png") do
      click_on "Upload file"
    end

    find("figure.attachment").click.click
    find_editor.send :delete
    assert_no_selector "figure.attachment[content-type='image/png']"

    assert_equal_html "", find_editor.value
  end
end
