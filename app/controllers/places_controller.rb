class PlacesController < ApplicationController
  def show
    place = Place.find(place_params[:id])
    @details = GooglePlaceService.get_details(place.place_id)

    respond_to do |format|
      format.html
      format.json { render json: @details }
    end

  end

  private

  def place_params
    params.permit(:id)
  end

end
