class RemoveGoogleColumnsFromPlaces < ActiveRecord::Migration[5.2]
  def change
    remove_column :places, :place_id
    remove_column :places, :query
  end
end
