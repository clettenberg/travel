require 'rails_helper'

describe TripsController, type: :controller do
  render_views

  describe "#create" do
    let(:user) { FactoryBot.create(:confirmed_user) }
    it "should create a Trip" do
      sign_in user
      post :create, params: { trip: {
                                title: "Los Angeles",
                                start_date: Date.today,
                                end_date: Date.today + 1
                              }
                            }
      expect(response).to redirect_to action: :show, id: Trip.first.id
      expect(Trip.count).to eq(1)
    end
  end

  describe "#destroy" do
    let(:places_count) { 2 }
    let(:user_with_trip) { FactoryBot.create(:user_with_trips, trips_count: 1, places_count: places_count)}
    let(:trip_to_destroy) { user_with_trip.trips.first.id}
    before do
      sign_in user_with_trip
    end

    it "should destroy a Trip" do
      expect do
        delete :destroy, params: { id: trip_to_destroy }
      end.to change { Trip.count }.by(-1)
      expect(response).to redirect_to action: :index
    end

    it "should destory the Trip's Places" do
      expect do
        delete :destroy, params: { id: trip_to_destroy }
      end.to change { Place.count }.by(-(places_count))
      expect(response).to redirect_to action: :index
    end

  end
end
