require "rails_helper"

RSpec.describe PlacesController, type: :controller do
  let(:user_with_trip) { FactoryBot.create(:user_with_trips, trips_count: 1, places_count: 2)}
  let(:trip) { user_with_trip.trips.first }
  let(:place) { trip.places.first }

  before do
    sign_in user_with_trip
  end

  describe "GET #show" do
    it "returns http success" do
      get :show, params: {id: place.id}
      expect(response).to be_successful
    end
  end

  describe "GET #edit" do
    it "returns http success" do
      get :edit, params: {id: place.id}
      expect(response).to be_successful
    end
  end

  describe "POST #update" do
    it "updates the place" do
      new_note = "update it"
      new_name = "updated place"
      put :update, params: {id: place.id, place: {note: new_note, name: new_name}}
      expect(response).to redirect_to action: :show, id: place.id
      place.reload
      expect(place.note).to eq new_note
      expect(place.name).to eq new_name
    end
  end

  describe "GET #new" do
    it "returns http success" do
      get :new, params: {trip_id: trip.id}
      expect(response).to be_successful
    end
  end

  describe "POST #create" do
    it "creates" do
      expect {
        post :create, params: {place: {note: "yay", name: "awesome place"}, trip_id: trip.id, format: :json}
      }.to change { trip.places.count }.by(1)
      expect(response).to be_created
      expect(trip.places.pluck(:note)).to include("yay")
      expect(trip.places.pluck(:name)).to include("awesome place")
    end

    context "When user selects an Open Street Maps place" do
      before do
        allow_any_instance_of(OsmPlace).to receive(:sync).and_return(true)
      end

      context "and the OSM place has never been added to Trips" do
        it "creates an OsmPlace" do
          expect {
            post :create, params: {place: {note: "yay", name: "awesome place", osm_id: "123456", osm_type: "node", osm_display_name: "Cool Place"}, trip_id: trip.id, format: :json}
          }.to change { OsmPlace.count }.by(1)
          place = trip.places.last
          expect(response).to be_created
          expect(place.osm_place.osm_id).to eq("123456")
          expect(place.osm_place.osm_type).to eq("node")
        end
      end

      context "and the OSM place has already been added to Trips" do
        it "does not create an OsmPlace" do
          OsmPlace.create(osm_id: "1234", osm_type: "way", display_name: "First try")
          expect {
            post :create, params: {place: {note: "yay", name: "awesome place", osm_id: "1234", osm_type: "way"}, trip_id: trip.id, format: :json}
          }.to change { OsmPlace.count }.by(0)
        end
      end

      it "get's fresh data on OSM place" do
        expect_any_instance_of(OsmPlace).to receive(:sync)
        post :create, params: {place: {note: "yay", name: "awesome place", osm_id: "1234", osm_type: "way"}, trip_id: trip.id, format: :json}
      end
    end
  end

  describe "DELETE #destroy" do
    it "returns http success" do
      expect {
        delete :destroy, params: {id: place.id}
      }.to change { trip.places.count }.by(-1)
      expect(response).to redirect_to trip_path(trip)
    end
  end
end
