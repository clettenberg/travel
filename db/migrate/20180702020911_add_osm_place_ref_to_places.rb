class AddOsmPlaceRefToPlaces < ActiveRecord::Migration[5.2]
  def change
    add_reference :places, :osm_place, foreign_key: true, index: true
  end
end
