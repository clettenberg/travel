class AddRequiredFields < ActiveRecord::Migration[5.2]
  def change
    change_column_null :places, :name, false
    change_column_null :trips, :title, false
  end
end
