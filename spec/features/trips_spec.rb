require 'rails_helper'

feature 'create new trip' do
  describe 'trips index' do
    describe 'see existing trips' do
      let!(:user) { FactoryBot.create(:user_with_trips, trips_count: 2) }

      it 'displays past trips' do
        login_as(user, scope: :user, run_callbacks: false)
        
        visit "/trips"
        expect(page).to have_content("Trips")
        within('.list-group') do
          user.trips.each do |trip|
            expect(page).to have_content(trip.title)
          end
        end
      end
    end
  end
end