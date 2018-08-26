class AddV2AttributesToOsmPlaces < ActiveRecord::Migration[5.2]
  def change
    add_column :osm_places, :place_rank, :string
    add_column :osm_places, :category, :string
    add_column :osm_places, :addresstype, :string
    add_column :osm_places, :name, :string
  end
end
