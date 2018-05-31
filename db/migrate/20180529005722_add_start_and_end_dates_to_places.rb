class AddStartAndEndDatesToPlaces < ActiveRecord::Migration[5.2]
  def change
    add_column :places, :start_date, :date
    add_column :places, :end_date, :date
  end
end
