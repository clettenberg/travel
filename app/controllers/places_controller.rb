class PlacesController < ApplicationController
  before_action :set_place

  def show
    @details = details
    respond_to do |format|
      format.html
      format.json { render json: @details }
    end
  end

  def edit
    @details = details
  end

  def update
    respond_to do |format|
      if @place.update(place_params)
        format.html { redirect_to @place, notice: 'Place was successfully updated.' }
        format.json { render :show, status: :ok, location: @place }
      else
        format.html { render :edit }
        format.json { render json: @place.errors, status: :unprocessable_entity }
      end
    end
  end


  private

  def set_place
    return @place if defined?(@place)
    @place = Place.find(params[:id])
  end


  def details
    return @details if defined?(@details)
    @details = GooglePlaceService.get_details(@place.place_id)
  end

  def place_params
    params.require(:place).permit(:id, :note, :start_date, :end_date)
  end

end
