class RenameOsmPlaceClassColumn < ActiveRecord::Migration[5.2]
  def change
    rename_column :osm_places, :class, :osm_class
  end
end
