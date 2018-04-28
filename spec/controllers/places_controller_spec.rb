require 'rails_helper'

describe PlacesController, type: :controller do

  describe "#show" do
    let(:place) { FactoryBot.create(:place, place_id: 'ChIJj9dEC-9YdhwRTDw4wzsEnt4', trip_id: 1) }

    it 'should return json details' do
      VCR.use_cassette("GooglePlaceService/get_details/given_a_valid_place_id/should_return_the_place_details") do
        get :show, params: { id: place.id }, format: :json
        expect(response.content_type).to eq "application/json"
        expected_name = JSON.parse(response.body)["result"]["name"]
        expect(expected_name).to eq "Swakopmund"
      end
    end
  end
end
