class AddPlacesArrayToTrips < ActiveRecord::Migration[5.2]
  def change
    add_column :trips, :place_ids, :text, array: true, default: []
  end
end
