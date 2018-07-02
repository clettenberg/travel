class RenameOsmPlaceToOsmPlaces < ActiveRecord::Migration[5.2]
  def change
    rename_table :osm_place, :osm_places
  end
end
