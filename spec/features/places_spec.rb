require 'rails_helper'

describe 'places' do
  let!(:user) { FactoryBot.create(:user_with_trips, trips_count: 1) }
  let(:trip) { user.trips.first}
  before do
    login_as(user, scope: :user, run_callbacks: false)
  end

  describe "index", js: true do
    it "displays a trips index" do
      visit "/trips/#{trip.id}"
      expect(page).to have_content(trip.title)

      click_link "Place #{trip.places.first.id}"
      expect(page).to have_content("Place")
    end

    it "allows a user to add a new place to a trip", :vcr do
      visit "/trips/#{trip.id}/places/new"

      find("#q").set("Busch Stadium St Louis\n")
      expect(page).to have_css('.mapquest-search-results')

      find(".mapquest-search-results", text: "Busch Stadium, South 8th Street").click
      click_on "Create Place"
      expect(page).to have_content("Place was successfully created")
      expect(page).to have_content("Busch Stadium, South 8th Street")
    end
  end
end
