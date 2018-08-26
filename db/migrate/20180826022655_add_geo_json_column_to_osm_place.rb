class AddGeoJsonColumnToOsmPlace < ActiveRecord::Migration[5.2]
  def change
    add_column :osm_places, :geojson, :jsonb
  end
end
