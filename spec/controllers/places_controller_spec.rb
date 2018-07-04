require 'rails_helper'

RSpec.describe PlacesController, type: :controller do
  let(:user_with_trip) { FactoryBot.create(:user_with_trips, trips_count: 1, places_count: 2)}
  let(:trip) { user_with_trip.trips.first }
  let(:place) { trip.places.first }

  before do
    sign_in user_with_trip
  end

  describe "GET #show" do
    it "returns http success" do
      get :show, params: { id: place.id }
      expect(response).to be_successful
    end
  end

  describe "GET #edit" do
    it "returns http success" do
      get :edit, params: { id: place.id }
      expect(response).to be_successful
    end
  end

  describe "POST #update" do
    it "updates the place" do
      new_note = "update it"
      put :update, params: { id: place.id, place: { note: new_note } }
      expect(response).to redirect_to action: :show, id: place.id
      place.reload
      expect(place.note).to eq new_note
    end
  end

  describe "GET #new" do
    it "returns http success" do
      get :new, params: { trip_id: trip.id }
      expect(response).to be_successful
    end
  end

  describe "POST #create" do
    it "creates and redirects" do
      expect {
        post :create, params: { place: { note: "yay" }, trip_id: trip.id }
      }.to change { trip.places.count }.by(1)
      expect(response).to redirect_to action: :show, id: trip.places.last.id
      expect(trip.places.pluck(:note)).to include("yay")
    end
  end

  describe "DELETE #destroy" do
    it "returns http success" do
      expect {
        delete :destroy, params: { id: place.id }
      }.to change { trip.places.count }.by(-1)
      expect(response).to redirect_to trip_path(trip)
    end
  end
end
