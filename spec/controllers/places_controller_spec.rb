require 'rails_helper'

vcr_options = { cassette_name: "GooglePlaceService/get_details/given_a_valid_place_id/should_return_the_place_details" }
describe PlacesController, type: :controller do
  render_views
  let(:trip) { FactoryBot.create(:trip_with_places, places_count: 1)}
  let(:place) { trip.places.first }
  before do
    place.place_id = 'ChIJj9dEC-9YdhwRTDw4wzsEnt4'
    place.save
  end

  describe "#show", vcr: vcr_options do
    context "when requesting JSON" do
      it 'should return json details' do
        get :show, params: { id: place.id }, format: :json
        expect(response.content_type).to eq "application/json"
        expected_name = JSON.parse(response.body)["result"]["name"]
        expect(expected_name).to eq "Swakopmund"
      end
    end

    it 'should render place' do
      get :show, params: { id: place.id }
      expect(response.content_type).to eq "text/html"
      expect(response).to be_successful
      expect(response.body).to match /Swakopmund/
    end
  end

  describe "#edit", vcr: vcr_options do
    it 'should render place edit page' do
      get :edit, params: { id: place.id }
      expect(response.content_type).to eq "text/html"
      expect(response).to be_successful
      expect(response.body).to match /Swakopmund/
    end
  end

  describe "#update" do
    it 'should allow a user to edit an existing place' do
      trip = FactoryBot.create(:trip_with_places, places_count: 1)
      existing_place = trip.places.first
      patch :update, params: { id: existing_place.id, place: { note: "What a great trip!", start_date: Date.today, end_date: Date.today + 1.day } }
      expect(response.content_type).to eq "text/html"
      expect(Place.find(existing_place.id).note).to eq("What a great trip!")
      expect(Place.find(existing_place.id).start_date).to eq(Date.today)
      expect(Place.find(existing_place.id).end_date).to eq(Date.today + 1.day)
    end
  end
end
