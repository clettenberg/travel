class Trip < ApplicationRecord
  has_and_belongs_to_many :users
  has_many :places, dependent: :destroy
  has_many :osm_places, through: :places

  validates_presence_of :title, messsage: "can't be blank"

  def start_date
    places.where.not(start_date: nil).order(start_date: :asc).pluck(:start_date).first
  end

  def end_date
    places.where.not(end_date: nil).order(end_date: :desc).pluck(:end_date).first
  end

  def points
    places.where.not(osm_place_id: nil).map do |place|
      lonlat = place.osm_place.lonlat
      [lonlat.lon, lonlat.lat]
    end
  end

  def center
    bounding_box = RGeo::Cartesian::BoundingBox.new(RGeo::Cartesian.simple_factory)
    points = places.where.not(osm_place_id: nil).map { |p| p.osm_place.lonlat }
    points.each {|p| bounding_box.add(p) }
    [ bounding_box.center_x, bounding_box.center_y ]
  end
end
