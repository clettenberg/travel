class AddPlaceIdToPoi < ActiveRecord::Migration[5.2]
  def change
    add_column :pois, :place_id, :string
    add_index  :pois, :place_id, unique: true
  end
end
