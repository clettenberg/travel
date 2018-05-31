class Trip < ApplicationRecord
  has_and_belongs_to_many :users
  has_many :places, dependent: :destroy
  accepts_nested_attributes_for :places, allow_destroy: true

  validates_presence_of :title
  validates_presence_of :start_date
  validates_presence_of :end_date
  validate :start_date_cannot_be_after_end_date

  def start_date
    places.where.not(start_date: nil).order(start_date: :desc).pluck(:start_date).first
  end

  def end_date
    places.where.not(end_date: nil).order(end_date: :desc).pluck(:end_date).first
  end

private

  def start_date_cannot_be_after_end_date
    errors.add(:start_date, "cannot be after End Date") if start_date > end_date
  end
end
