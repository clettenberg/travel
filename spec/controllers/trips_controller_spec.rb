require "rails_helper"

RSpec.describe TripsController, type: :controller do
  render_views

  describe "#create" do
    let(:user) { FactoryBot.create(:confirmed_user) }
    it "should create a Trip" do
      sign_in user
      expect {
        post :create, params: {trip: {
          title: "Los Angeles",
          start_date: Date.today,
          end_date: Date.today + 1,
        }}
      }.to change { Trip.count }.by(1)

      expect(response).to redirect_to action: :show, id: Trip.last.id
    end
  end

  describe "#destroy" do
    let(:places_count) { 2 }
    let(:user_with_trip) { FactoryBot.create(:user_with_trips, trips_count: 1, places_count: places_count) }
    let(:trip_to_destroy) { user_with_trip.trips.first.id }
    before do
      sign_in user_with_trip
    end

    it "should destroy a Trip" do
      expect {
        delete :destroy, params: {id: trip_to_destroy}
      }.to change { Trip.count }.by(-1)
      expect(response).to redirect_to action: :index
    end

    it "should destory the Trip's Places" do
      expect {
        delete :destroy, params: {id: trip_to_destroy}
      }.to change { Place.count }.by(-places_count)
      expect(response).to redirect_to action: :index
    end
  end
end
