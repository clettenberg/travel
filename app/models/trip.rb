class Trip < ApplicationRecord
  has_and_belongs_to_many :pois
end
