module HtmlHelper
  def assert_equal_html(expected, actual)
    normalized_expected = Nokogiri::HTML.fragment(expected).to_html.strip
    normalized_actual = Nokogiri::HTML.fragment(actual).to_html.strip
    assert_equal normalized_expected, normalized_actual
  end
end
