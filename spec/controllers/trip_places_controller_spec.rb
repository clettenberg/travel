require 'rails_helper'

describe TripPlacesController, type: :controller do
  let(:user_with_trip) { FactoryBot.create(:user_with_trips, trips_count: 1, places_count: 2)}
  let(:trip) { user_with_trip.trips.first }

  before do
    sign_in user_with_trip
  end

  describe "#add_place" do
    it "should add a place to a trip" do
      expect {
        post :add_place, params: { id: trip.id , place_id: "foo-bar" }
      }.to change { trip.places.count }.by(1)
      expect(response).to be_created
      expect(trip.places.pluck(:place_id)).to include("foo-bar")
      expect(JSON.parse(response.body)["data"]["attributes"]["placeId"]).to eq("foo-bar")
    end
  end

  describe "#delete_place" do
    it "should delete the place" do
      expect {
        delete :delete_place, params: { id: trip.id, place_id: trip.places.pluck(:id).sample }
      }.to change { trip.places.count }.by(-1)
      expect(response.status).to eq 204
    end
  end

end
