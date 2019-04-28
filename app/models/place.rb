class Place < ApplicationRecord
  belongs_to :trip, optional: true
  belongs_to :osm_place, optional: true
  delegate :point, to: :osm_place, allow_nil: true
  has_many :users, through: :trips

  validates_presence_of :name, message: "can't be blank"
end
