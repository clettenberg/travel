class Trip < ApplicationRecord
  has_and_belongs_to_many :users
  has_many :places, dependent: :destroy

  validates_presence_of :title

  def start_date
    places.where.not(start_date: nil).order(start_date: :desc).pluck(:start_date).first
  end

  def end_date
    places.where.not(end_date: nil).order(end_date: :desc).pluck(:end_date).first
  end
end
