require 'rails_helper'

feature 'places', js: true do
  describe 'show' do
    let(:user) { FactoryBot.create(:user_with_trips, trips_count: 2) }
    it 'displays place name' do
      login_as(user, scope: :user, run_callbacks: false)

      allow(GooglePlaceService).to receive(:get_details).and_return({"result" => {"name" => 'Two Hands'} })

      visit trip_path(user.trips.first)
      expect(page).to have_content("Two Hands")
      click_on "Two Hands", match: :first
      expect(page).to have_content("Two Hands")
    end
  end
end
