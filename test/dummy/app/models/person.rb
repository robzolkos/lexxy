class Person < ApplicationRecord
  include ActionText::Attachable

  def initials
    name.split.map { |word| word[0] }.join.upcase
  end
end
