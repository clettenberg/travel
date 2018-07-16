class AddUniqueContraintToOsmPlace < ActiveRecord::Migration[5.2]
  def change
    add_index :osm_places, [:osm_id, :osm_type], unique: true
  end
end
