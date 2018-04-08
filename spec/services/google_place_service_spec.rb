require 'rails_helper'

describe GooglePlaceService do
  describe 'get_details', :vcr do
    context 'given a valid place_id' do
      let(:details) { described_class.get_details('ChIJj9dEC-9YdhwRTDw4wzsEnt4') }

      it "should return the place details" do
        expect(details["status"]).to eq("OK")
        expect(details["result"]["name"]).to eq('Swakopmund')
      end
    end

    context 'given an invalid place_id' do
      let(:name) { described_class.get_details('af26eb828747ae0a7cbad1738f408e2e') }
      it 'should raise an NoPlaceFound exception' do
        expect do
          described_class.get_details('af26eb828747ae0a7cbad1738f408e2e')
        end.to raise_error(GooglePlaceService::NoPlaceFoundError)
      end
    end
  end
end
