require 'rails_helper'

feature 'create new poi' do
  describe 'pois index' do
    describe 'see existing pois' do
      let!(:user) { FactoryBot.create(:confirmed_user) }
      let!(:poi1) { FactoryBot.create(:poi) }
      let!(:poi2) { FactoryBot.create(:poi) }

      it 'display pois' do
        login_as(user, scope: :user, run_callbacks: false)
        
        visit "/places"
        expect(page).to have_content("Places")
        within('.list-group') do
          expect(page).to have_content(poi1.title)
          expect(page).to have_content(poi2.title)
        end
      end
    end
  end
end