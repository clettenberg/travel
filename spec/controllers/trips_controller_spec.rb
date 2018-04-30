require 'rails_helper'

describe TripsController, type: :controller do
  render_views
  describe "#create" do
    let(:user) { FactoryBot.create(:confirmed_user) }
    it "should create a Trip and it's Places" do
      sign_in user
      post :create, params: { trip: {
                                title: "Los Angeles",
                                start_date: Date.today,
                                end_date: Date.today + 1,
                                places_attributes: [
                                  { place_id: "adele-concert" },
                                  { place_id: "griffith-observatory" }
                                ]
                              }
                            }
      expect(response).to redirect_to action: :show, id: Trip.first.id
      expect(Trip.count).to eq(1)
      expect(Place.count).to eq(2)
    end
  end
end
