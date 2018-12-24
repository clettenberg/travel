require 'system_helper'

RSpec.describe 'places', type: :system do
  let!(:user) { FactoryBot.create(:user_with_trips, trips_count: 1) }
  let(:trip) { user.trips.first}
  before do
    login_as(user, scope: :user, run_callbacks: false)
  end

  describe "index" do
    it "displays a trips index" do
      visit "/trips/#{trip.id}"
      expect(page).to have_content(trip.title)
    end

    it "allows a user to add a new place to a trip", :vcr do
      visit "/trips/#{trip.id}/places/new"

      fill_in 'Place Name', with: "Busch Stadium St Louis\n"
      # expect(page).to have_css('.mapquest-search-results')

      find("label", text: "Busch Stadium, South 8th Street").click
      click_on "Submit"

      expect(page).to have_content("Busch Stadium")
    end
  end
end
