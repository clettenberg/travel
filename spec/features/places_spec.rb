require 'rails_helper'

feature 'places', js: true do
  let(:user) { FactoryBot.create(:user_with_trips, trips_count: 2) }
  before do
    login_as(user, scope: :user, run_callbacks: false)
  end

  describe 'User wants to see Place details' do
    it 'displays place name' do
      allow(GooglePlaceService).to receive(:get_details).and_return({"result" => {"name" => 'Two Hands'} })

      visit trip_path(user.trips.first)
      expect(page).to have_content("Two Hands")
      click_on "Two Hands", match: :first
      expect(page).to have_content("Two Hands")
    end
  end

  xdescribe 'User wants to mange Notes' do
    it 'allows creating a note' do
      allow(GooglePlaceService).to receive(:get_details).and_return({"result" => {"name" => 'Two Hands'} })

      visit place_path(user.trips.first.places.first)
      expect(page).to have_content("Two Hands")

      click_on "Edit"
      find(:css, "trix-editor").click.set("What a great trip!")

      click_on "Update Place"

      expect(page).to have_content("Two Hands")
      expect(page).to have_content("What a great trip!")
    end
  end
end
