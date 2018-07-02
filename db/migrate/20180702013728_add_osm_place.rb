class AddOsmPlace < ActiveRecord::Migration[5.2]
  def change
    create_table :osm_place do |t|
      t.string :place_id
      t.string :osm_type
      t.string :osm_id
      t.geometry :boundingbox
      t.st_point :lonlat, geographic: true
      t.text :display_name
      t.string :class
      t.string :type
      t.decimal :importance
      t.jsonb :address, null: false, default: '{}'

      t.timestamps
    end
  end
end
