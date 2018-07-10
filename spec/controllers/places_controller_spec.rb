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


    context "When user selects an Open Street Maps place" do
      context "and the OSM place has never been added to Trips" do
        it "creates an OsmPlace" do
          expect {
          post :create, params: { place: { note: "yay", osm_id: "123456", osm_type: "node", osm_display_name: "Cool Place" }, trip_id: trip.id }
          }.to change { OsmPlace.count }.by(1)
          place = trip.places.last
          expect(response).to redirect_to action: :show, id: place.id
          expect(place.osm_place.osm_id).to eq("123456")
          expect(place.osm_place.osm_type).to eq("node")
          expect(place.osm_place.display_name).to eq("Cool Place")
        end
      end

      context "and the OSM place has already been added to Trips" do
        it 'does not create an OsmPlace' do
          OsmPlace.create(osm_id: "1234", osm_type: "way", display_name: "First try")
          expect {
            post :create, params: { place: { note: "yay", osm_id: "1234", osm_type: "way" }, trip_id: trip.id }
          }.to change { OsmPlace.count }.by(0)
        end

        context 'if the description has changed' do
          OsmPlace.delete_all
          OsmPlace.create(osm_id: "two-times", osm_type: "way", display_name: "First try")
          it 'updates the description' do
            post :create, params: { place: { note: "yay", osm_id: "two-times", osm_type: "way", osm_display_name: "Second Try" }, trip_id: trip.id }

            expect(OsmPlace.find_by_osm_id("two-times").display_name).to eq("Second Try")
          end
        end
      end
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
