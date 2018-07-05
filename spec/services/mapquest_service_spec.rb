require 'rails_helper'

describe MapquestService do
  describe 'search', :vcr do
    let (:subject) { described_class.new }
    context 'returns results' do
      let(:results) { subject.search('Tower Grove Park') }

      it "should return the search results" do
        expect(results.length).to be(3)
        expect(results.first.keys).to contain_exactly(:place_id,
                                                      :licence,
                                                      :osm_type,
                                                      :osm_id,
                                                      :boundingbox,
                                                      :lat,
                                                      :lon,
                                                      :display_name,
                                                      :class,
                                                      :type,
                                                      :importance,
                                                      :address)

      end
    end
  end
end
