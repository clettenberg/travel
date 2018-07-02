class Place < ApplicationRecord
  belongs_to :trip
  belongs_to :osm_place
end
