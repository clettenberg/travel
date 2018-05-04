class TripPlacesController < ApplicationController
  respond_to :json

  def add_place
    trip = Trip.find(params[:id])
    new_place = trip.places.create(place_id: params[:place_id])

    render status: 201, json: PlaceSerializer.new(new_place).serialized_json
  end

end
