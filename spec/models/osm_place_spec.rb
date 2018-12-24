require 'rails_helper'

RSpec.describe OsmPlace do
  describe 'sync', :vcr do
    it 'gets updates record with most recent information' do
      osm_place = OsmPlace.create(osm_id: '4812032522',
                                  osm_type: 'node',
                                  display_name: "This is fake and will be replaced")

      osm_place.sync
      expect(osm_place.display_name).to eq('two hands, 251, Church Street, SoHo, Manhattan Community Board 2, New York County, New York City, New York, 10013, United States of America')
      expect(osm_place.lonlat).to be_kind_of(RGeo::Geographic::SphericalPointImpl)
      expect(osm_place.boundingbox).to be_kind_of(RGeo::Cartesian::PolygonImpl)
    end
  end
end
