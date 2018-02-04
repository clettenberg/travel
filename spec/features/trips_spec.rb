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

    describe 'create new trip' do
      describe "success" do
        let!(:user) { FactoryBot.create(:confirmed_user) }
        let!(:poi1) { FactoryBot.create(:poi) }
        let!(:poi2) { FactoryBot.create(:poi) }

        let(:trip_title) { "Scotland" }

        it 'should allow the user to create a new trip' do
          login_as(user, scope: :user, run_callbacks: false)
          
          visit "/trips"
          
          click_link "Trips"
          within('form') do
            find("input[placeholder='Title']").set trip_title
            find("input[id='trip_start_date']").set "12/2/2016"
            find("input[id='trip_end_date']").set "28/2/2016"
            check(poi1.title)
          end

          click_button "Create Trip"
          expect(page).to have_content("Trip was successfully created")
          expect(page).to have_content(trip_title)
          expect(page).to have_content(poi1.title)
        end
      end
    end
  end
end