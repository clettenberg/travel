class Trip < ApplicationRecord
  has_and_belongs_to_many :users

  validates_presence_of :title
  validates_presence_of :start_date
  validates_presence_of :end_date
  validate :start_date_cannot_be_after_end_date



private

  def start_date_cannot_be_after_end_date
    return unless start_date
    errors.add(:start_date, "cannot be after End Date") if start_date > end_date
  end

end
