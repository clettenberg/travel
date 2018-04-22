class PlacesController < ApplicationController
  def show
    details = GooglePlaceService.get_details(place_params[:id])
    render json: details
  end

  private

  def place_params
    params.permit(:id)
  end

end
