class RemoveInitialsFromPeople < ActiveRecord::Migration[8.0]
  def change
    remove_column :people, :initials, :string
  end
end
