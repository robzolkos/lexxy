class Person < ApplicationRecord
  include ActionText::Attachable

  def initials
    name.split.map { |word| word[0] }.join.upcase
  end

  def content_type
    "application/vnd.actiontext.mention"
  end
end
