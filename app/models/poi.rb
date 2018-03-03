class Poi < ApplicationRecord
  has_and_belongs_to_many :trips
  validates_uniqueness_of :place_id, on: :create, message: "You cannot add a place you've already added"
end
