require 'rails_helper'

describe MapquestService do
  describe 'search', :vcr do
    let(:subject) { described_class.new }
    context 'returns results' do
      it "should return the search results" do
        results = subject.search('Tower Grove Park')
        expect(results.length).to be(3)
        expect(results.first.keys).to contain_exactly(:address,
                                                      :boundingbox,
                                                      :category,
                                                      :display_name,
                                                      :importance,
                                                      :lat,
                                                      :licence,
                                                      :lon,
                                                      :osm_id,
                                                      :osm_type,
                                                      :place_id,
                                                      :place_rank,
                                                      :type,
                                                      :geojson,
                                                      :namedetails)

      end
    end

    it 'should return the search results in English' do
      results = subject.search('Angkor Wat')
      desired_result = results.detect { |res| res[:osm_id] == "91217761" }

      expect(desired_result[:display_name]).to eq("Angkor Wat, Grand Circuit / Petit Circuit, Siem Reap, 17295, Cambodia")
    end

    context "when there are not search results" do
      it 'returns an empty array' do
        results = subject.search('sdklfjsdklfjskdlfjsdlkfj')
        expect(results).to match([])
      end
    end
  end

  describe 'reverse', :vcr do
    let(:subject) { described_class.new }
    context 'with a valid osm place ID and osm type' do
      it 'should return info' do
        result = subject.reverse({osm_id: 26996903, osm_type: 'way'})
        expect(result).to include(
          {
            place_id: "78354868",
            licence: "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
            osm_type: "way",
            osm_id: "26996903",
            lat: "51.5217805",
            lon: "-0.162824059130876",
            category: "tourism",
            display_name: "The Landmark, Melcombe Place, Marylebone, Westminster, London, Greater London, England, NW1 6JR, United Kingdom",
            importance: "0.294144509293859",
            name: "The Landmark",
            place_rank: "30",
            addresstype: "tourism",
            type: "hotel",
            address: {
              hotel: "The Landmark",
              road: "Melcombe Place",
              suburb: "Marylebone",
              city: "London",
              state_district: "Greater London",
              state: "England",
              postcode: "NW1 6JR",
              country: "United Kingdom",
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

    context "with an invalid osm_id" do
      it 'returns an error' do
        result = subject.reverse({osm_id: 1234, osm_type: 'way'})
        expect(result).to eq({
          error: "Unable to geocode"
        })
      end
    end
  end
end
