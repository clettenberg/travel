class MovePlaceIdsIntoPlaceModel < ActiveRecord::Migration[5.2]
  def up
    Trip.all.each do |trip|
      trip[:place_ids].each do |place_id|
        trip.places.create(place_id: place_id)
      end
    end
  end

  def down
    Place.delete_all
  end
end
