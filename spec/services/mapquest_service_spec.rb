require 'rails_helper'

RSpec.describe MapquestService do
  describe 'search', :vcr do
    let(:subject) { described_class.new }
    context 'returns results' do
      it "should return the search results" do
        results = subject.search(q: 'Tower Grove Park', addressdetails: 1)
        expect(results.length).to be(3)
        first_result = results.first

        expect(first_result[:osm_id]).to eq('439815368')
        expect(first_result[:osm_type]).to eq('way')
        expect(first_result[:display_name]).to eq('Tower Grove Park, Tower Grove South, St. Louis, City of St. Louis, Missouri, 63111, United States of America')
        expect(first_result[:importance]).to eq(0.3375)
        expect(first_result[:type]).to eq('park')
      end
    end

    it 'should return the search results in English' do
      results = subject.search(q: 'Angkor Wat', addressdetails: 1)
      desired_result = results.detect { |res| res[:osm_id] == "91217761" }

      expect(desired_result[:display_name]).to eq("Angkor Wat, Grand Circuit / Petit Circuit, Siem Reap, 17295, Cambodia")
    end

    context "when there are not search results" do
      it 'returns an empty array' do
        results = subject.search(q: 'sdklfjsdklfjskdlfjsdlkfj', addressdetails: 1)
        expect(results).to match([])
      end
    end

    context 'when the request encounters an error' do
      let!(:og_api_key) { ENV["MAPQUEST_API_KEY"] }
      after do
        ENV["MAPQUEST_API_KEY"] = og_api_key
      end

      it "should return an error message" do
        ENV['MAPQUEST_API_KEY'] = 'this-is-bad'

        results = subject.search(q: 'Tower Grove Park', addressdetails: 1)
        expect(results).to eq({ "errors" => "The AppKey submitted with this request is invalid." })
      end
    end
  end

  describe 'reverse', :vcr do
    let(:subject) { described_class.new }
    context 'with a valid osm place ID and osm type' do
      it 'should return info' do
        result = subject.reverse(osm_id: 26996903, osm_type: 'W')

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
            geojson: {
              coordinates:[
                [
                  [-0.1635263, 51.52202],
                  [-0.1630194, 51.5213853],
                  [-0.1621871, 51.521541],
                  [-0.1625362, 51.5222046],
                  [-0.1629548, 51.5221274],
                  [-0.1630475, 51.5221101],
                  [-0.1635263, 51.52202]
                ]
              ],
              type:"Polygon"
            },
            importance: "0.294144509293859",
            name: "The Landmark",
            namedetails: { name: "The Landmark" },
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
        result = subject.reverse(osm_id: 1234, osm_type: 'W')
        expect(result).to eq({
          "error" => "Unable to geocode"
        })
      end
    end
  end
end
