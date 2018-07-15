require 'rails_helper'

describe MapquestService do
  describe 'search', :vcr do
    let(:subject) { described_class.new }
    context 'returns results' do
      let(:results) { subject.search('Tower Grove Park') }

      it "should return the search results" do
        expect(results.length).to be(3)
        expect(results.first.keys).to contain_exactly(:place_id,
                                                      :licence,
                                                      :osm_type,
                                                      :osm_id,
                                                      :boundingbox,
                                                      :lat,
                                                      :lon,
                                                      :display_name,
                                                      :class,
                                                      :type,
                                                      :importance,
                                                      :address)

      end
    end
  end

  describe 'reverse', :vcr do
    let(:subject) { described_class.new }
    context 'with a valid osm place ID and osm type' do
      it 'should return info' do
        result = subject.reverse(osm_id: 26996903, osm_type: 'way')
        expect(result).to include(
          {
            place_id: "78354868",
            licence: "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
            osm_type: "way",
            osm_id: "26996903",
            lat: "51.5217805",
            lon: "-0.162824059130876",
            display_name: "The Landmark, Melcombe Place, Marylebone, City of Westminster, London, Greater London, England, NW1 6JR, UK",
            address: {
              hotel: "The Landmark",
              road: "Melcombe Place",
              suburb: "Marylebone",
              city: "London",
              state_district: "Greater London",
              state: "England",
              postcode: "NW1 6JR",
              country: "UK",
              country_code: "gb"
            },
            boundingbox: [
              "51.5213853",
              "51.5222046",
              "-0.1635263",
              "-0.1621871"
            ]
          }
        )
      end
    end
  end
end
