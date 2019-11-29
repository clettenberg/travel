require "rails_helper"

RSpec.describe MapquestController, type: :controller do
  let(:user_with_trip) { FactoryBot.create(:user_with_trips) }

  before do
    sign_in user_with_trip
  end

  describe "GET #search" do
    it "returns http success", :vcr do
      get :search, params: {q: "Tower Grove Park"}, xhr: true

      expect(response).to be_successful
      expect(response.content_type).to eq "application/json; charset=utf-8"
    end
  end

  describe "GET reverse" do
    it "returns http success", :vcr do
      get :reverse, params: {lat: "38.6212456", lon: "-90.2526174"}

      expect(response).to be_successful
      expect(response.content_type).to eq "application/json; charset=utf-8"
    end
  end
end
