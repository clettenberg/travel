require "rails_helper"

RSpec.describe Place do
  describe "#points" do
    subject(:place) { described_class.first }

    before do
      FactoryBot.create(:place)
    end

    it "returns the points" do
      expect(place.point).to eq(place.osm_place.point)
    end
  end
end
