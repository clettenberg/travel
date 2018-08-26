class RenameOsmTypeColumn < ActiveRecord::Migration[5.2]
  def change
    # type is a keyword in ruby, ActiveRecord blows up if a column is 'type'
    rename_column :osm_places, :type, :tipe
  end
end
