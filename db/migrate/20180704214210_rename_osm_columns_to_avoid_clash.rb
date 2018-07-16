class RenameOsmColumnsToAvoidClash < ActiveRecord::Migration[5.2]
  def change
    rename_column :osm_places, :place_id, :osm_api_place_id
  end
end
