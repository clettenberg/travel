module Api
  class TripsController < ApiController
    def index
      trips = Trip.all.map { |trip|
        TripPresenter.new(trip).to_h
      }

      render json: {
        trips: trips
      }
    end
  end
end
