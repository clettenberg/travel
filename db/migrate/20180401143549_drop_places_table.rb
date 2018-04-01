class DropPlacesTable < ActiveRecord::Migration[5.2]
  def change
    drop_table :pois
    drop_join_table :pois, :trips
  end
end
