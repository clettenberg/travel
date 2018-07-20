class PlacesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_trip, only: [:create, :new]
  before_action :set_place, only: [:show, :edit, :destroy, :update]

  def new
    @place = @trip.places.new
  end

  def show
  end

  def edit
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


  def create
    @place = @trip.places.new(place_params)

    if params[:place][:osm_id].present?
      osm_place = OsmPlace.find_or_create_by(osm_id: params[:place][:osm_id],
                                                 osm_type: params[:place][:osm_type])

      osm_place.sync
      @place.osm_place = osm_place
    end

    respond_to do |format|
      if @place.save
        format.html { redirect_to @place, notice: 'Place was successfully created.' }
        format.json { render :show, status: :created, location: @place }
      else
        format.html { render :new }
        format.json { render json: @place.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    trip = @place.trip
    respond_to do |format|
      if @place.destroy
        format.html { redirect_to trip, notice: 'Place was successfully deleted.' }
        format.json { render :show, status: :ok, location: trip }
      else
        format.html { render :show }
        format.json { render json: @place.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  def set_trip
    @trip = Trip.find(params[:trip_id])
  end

  def set_place
    @place = Place.find(params[:id])
  end

  def place_params
    params.require(:place).permit(:start_date, :end_date, :note, :name)
  end
end
