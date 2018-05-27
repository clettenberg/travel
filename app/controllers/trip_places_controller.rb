class TripPlacesController < ApplicationController
  respond_to :json
  before_action :authenticate_user!
  before_action :set_trip

  attr_reader :trip

  def add_place
    new_place = trip.places.create(trip_params.slice(:place_id, :query))

    render status: 201, json: PlaceSerializer.new(new_place).serialized_json
  end

  def delete_place
    trip.places.find(trip_params[:place_id]).destroy
    head :no_content
  end

  private

  def trip_params
    params.permit(:query, :place_id, :id)
  end

  def set_trip
    @trip = Trip.find(trip_params[:id])
  end
end
