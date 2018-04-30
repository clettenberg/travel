class AddNoteToPlace < ActiveRecord::Migration[5.2]
  def change
    add_column :places, :note, :text
  end
end
