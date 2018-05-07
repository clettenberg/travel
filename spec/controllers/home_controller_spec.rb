require 'rails_helper'

RSpec.describe HomeController, type: :controller do

  describe "GET #index" do
    context "when there is not a signed in user" do
      it "shows the visitor the landing page" do
        get :index
        expect(response).to be_successful
      end
    end

    context "when a user is signed it" do
      it "redirects to Trips page" do
        user = FactoryBot.create(:confirmed_user)
        sign_in user
        expect(
          get :index
        ).to redirect_to(trips_url)
      end
    end

  end

end
