require 'rails_helper'

RSpec.describe MapquestSearchController, type: :controller do
  let(:user_with_trip) { FactoryBot.create(:user_with_trips)}

  before do
    sign_in user_with_trip
  end

  describe "GET #create" do
    it "returns http success", :vcr do
      get :index, params: { q: 'Tower Grove Park' }, format: :json

      expect(response).to be_successful
      expect(response.content_type).to eq "application/json"
      parsed_response = JSON.parse(response.body, symbolize_names: true)
      expect(parsed_response[:results].length).to be(3)
    end
  end
end
