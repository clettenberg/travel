require "rails_helper"

RSpec.describe TripPresenter do
  subject(:presenter) { described_class.new(trip) }

  describe "#to_h" do
    let(:trip) { FactoryBot.create(:trip_with_places) }

    it "presenters a trip" do
      expect(presenter.to_h).to include(title: trip.title)
      expect(presenter.to_h[:places].count).to eq(trip.places.count)
    end
  end
end
