require 'system_helper'

RSpec.describe 'trips', type: :system do
  describe 'index' do
    describe 'see existing trips' do
      let!(:user) { FactoryBot.create(:user_with_trips, trips_count: 2) }

      it 'displays past trips' do
        login_as(user, scope: :user, run_callbacks: false)

        visit "/trips"
        expect(page).to have_content("Trips")
        find("a[href='#list']").click
        user.trips.each do |trip|
          expect(page).to have_content(trip.title)
        end
      end
    end

    describe "success" do
      let!(:user) { FactoryBot.create(:confirmed_user) }

      let(:trip_title) { "Scotland" }

      it 'should allow the user to create a new trip', js: true do
        login_as(user, scope: :user, run_callbacks: false)

        visit "/trips"

        click_link "Add Trip"
        within('form') do
          fill_in "trip[title]", with: trip_title
        end

        click_button "Create Trip"
        expect(page).to have_content("Trip was successfully created")
        expect(page).to have_content(trip_title)
      end
    end
  end
end
