class Place < ApplicationRecord
  belongs_to :trip
  belongs_to :osm_place, optional: true
  has_many :users, through: :trips

  validates_presence_of :name, message: "can't be blank"
end
