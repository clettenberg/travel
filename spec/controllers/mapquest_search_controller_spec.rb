require 'rails_helper'

RSpec.describe MapquestSearchController, type: :controller do
  let(:user_with_trip) { FactoryBot.create(:user_with_trips)}

  before do
    sign_in user_with_trip
  end

  describe "GET #index" do
    it "returns http success", :vcr do
      get :index, params: { q: 'Tower Grove Park' }, xhr: true

      expect(response).to be_successful
      expect(response.content_type).to eq "text/javascript"
    end
  end
end
