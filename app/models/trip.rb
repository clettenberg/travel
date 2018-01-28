class Trip < ApplicationRecord
  has_and_belongs_to_many :pois
  has_and_belongs_to_many :users

  validate :start_date_cannot_be_after_end_date



private

  def start_date_cannot_be_after_end_date
    errors.add(:start_date, "cannot be after End Date") if start_date > end_date
  end

end
