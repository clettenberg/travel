class GooglePlacesController < ApplicationController
  respond_to :json

  def show
    @details = GooglePlaceService.get_details(google_places_params[:place_id])
    respond_with(@details)
  end

  private

  def google_places_params
    params.permit(:place_id)
  end
end
