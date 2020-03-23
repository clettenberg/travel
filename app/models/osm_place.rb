class OsmPlace < ActiveRecord::Base
  has_many :places

  def sync
    first_osm_type = osm_type&.first
    formatted_osm_type = first_osm_type&.capitalize
    fresh_data = MapquestService.new.reverse({osm_id: osm_id, osm_type: formatted_osm_type})
    new_attrs = {
      osm_api_place_id: fresh_data[:place_id],
      osm_type: fresh_data[:osm_type],
      osm_id: fresh_data[:osm_id],
      boundingbox: create_geometry_from_bounding_box(bounding_box: fresh_data[:boundingbox]),
      lonlat: "POINT(#{fresh_data[:lon]} #{fresh_data[:lat]})",
      display_name: fresh_data[:display_name],
      name: fresh_data[:name],
      osm_class: fresh_data[:class],
      tipe: fresh_data[:type],
      address: fresh_data[:address],
      place_rank: fresh_data[:place_rank],
      category: fresh_data[:category],
      addresstype: fresh_data[:addresstype],
      importance: fresh_data[:importance],
      geojson: fresh_data[:geojson]
    }

    update(new_attrs)
  end

  def point
    [lonlat.lon, lonlat.lat]
  end

  private

  def create_geometry_from_bounding_box(bounding_box:)
    south_lat, north_lat, west_lon, east_lon = bounding_box
    factory = RGeo::Geographic.spherical_factory
    sw = factory.point(west_lon, south_lat)
    ne = factory.point(east_lon, north_lat)
    RGeo::Cartesian::BoundingBox.create_from_points(sw, ne).to_geometry
  end
end
