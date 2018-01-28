require 'rails_helper'

describe Trip, type: :model do  
  subject(:trip) { Trip }

  describe 'start date validation' do
    context 'when a trip has a start date that is after the end date' do
      let(:bad_date_trip) { subject.create(title: "Bad Date",
                               start_date: Date.today,
                               end_date: Date.today - 2.days) }

      it 'should raise an error' do
        expect(bad_date_trip.errors.one?).to be true
        expect(bad_date_trip.errors.full_messages).to eq(["Start date cannot be after End Date"])
      end
    end
  end
end
