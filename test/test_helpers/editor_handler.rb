class EditorHandler
  attr_reader :page, :editor_element

  delegate_missing_to :editor_element

  def initialize(page, editor_element)
    @page = page
    @editor_element = editor_element
  end

  def value=(value)
    editor_element.set value
    page.execute_script("arguments[0].value = '#{value}'", editor_element)
  end
end
