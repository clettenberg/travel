require "rails_helper"

RSpec.describe "Trips" do
  it "returns all trips" do
    FactoryBot.create(:trip_with_places)

    get_json "/api/trips"
    expect(response).to match_response_schema("trips")
  end

  private

  def get_json(url)
    headers = {"ACCEPT" => "application/json"}
    get url, headers: headers
  end
end
