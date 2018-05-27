class AddQueryToPlaces < ActiveRecord::Migration[5.2]
  def change
    add_column :places, :query, :text
  end
end
