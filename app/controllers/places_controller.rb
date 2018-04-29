class PlacesController < ApplicationController
  def show
    @place = Place.find(place_params[:id])
    @details = details
    respond_to do |format|
      format.html
      format.json { render json: @details }
    end
  end

  def details
    return @details if defined?(@details)
    @details = GooglePlaceService.get_details(@place.place_id)
  end

  private

  def place_params
    params.permit(:id)
  end

end
