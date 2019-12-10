require "system_helper"

RSpec.describe "places", type: :system do
  let!(:user) { FactoryBot.create(:user_with_trips, trips_count: 1) }
  let(:trip) { user.trips.first }
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

      fill_in "Place Name", with: "Busch Stadium St Louis\n"

      find("label", text: "Busch Stadium, South 8th Street").click

      fill_in "Name", with: "Cardinals Game"
      find("trix-editor").click.set("Cards won!")

      click_on "Submit"

      expect(page).to have_content("Busch Stadium")
    end

    it "allows a user to add a new place by lat lon", :vcr do
      visit "/trips/#{trip.id}/places/new"
      click_on "Lat/Lon"
      fill_in "Latitude", with: "40.6892474"
      fill_in "Longitude", with: "-74.0445405280149\n"
      find("label", text: "Statue of Liberty, Flagpole Plaza").click
      fill_in "Name", with: "Day at the Statue of Liberty"
      find("trix-editor").click.set("Great weather!")

      click_on "Submit"

      expect(page).to have_content("Statue of Liberty")
    end
  end
end
