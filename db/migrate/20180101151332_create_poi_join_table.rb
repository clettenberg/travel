class CreatePoiJoinTable < ActiveRecord::Migration[5.2]
  def change
    create_join_table :trips, :pois do |t|
      t.index [:trip_id, :poi_id]
      # t.index [:poi_id, :trip_id]
    end
  end
end
