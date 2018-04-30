require 'rails_helper'

describe GooglePlacesController, type: :controller do
  let(:valid_place_id) { 'ChIJj9dEC-9YdhwRTDw4wzsEnt4' }
  describe "#show", :vcr do
    context "when given a valid Google Place Id" do
      it 'should return details' do
        get :show, params: { place_id: valid_place_id }, format: :json
        expect(response.content_type).to eq "application/json"
        expected_name = JSON.parse(response.body)["result"]["name"]
        expect(expected_name).to eq "Swakopmund"
      end
    end
  end
end
