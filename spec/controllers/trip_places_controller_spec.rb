require 'rails_helper'

describe TripPlacesController, type: :controller do
  describe "#add_place" do
    let(:user) { FactoryBot.create(:confirmed_user) }
    let(:trip) { FactoryBot.create(:trip) }
    it "should add a place to a trip" do
      sign_in user
      post :add_place, params: { id: trip.id , place_id: "foo-bar" }

      expect(response).to be_created
      expect(trip.places.count).to eq(1)
      expect(trip.places.first.place_id).to eq("foo-bar")
      expect(JSON.parse(response.body)["data"]["attributes"]["placeId"]).to eq("foo-bar")
    end
  end
end
