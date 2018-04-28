class RemovePlaceIdsFromTrips < ActiveRecord::Migration[5.2]
  def change
    remove_column :trips, :place_ids, :array
  end
end
