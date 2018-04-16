class TripsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_trip, only: [:show, :edit, :update, :destroy, :add_poi]

  def index
    @trips = current_user.trips
  end

  def show
    bad_place_ids = []

    @names = @trip.place_ids.map do |id|
      GooglePlaceService.get_details(id)
    rescue StandardError => error
      log_error(error)
      bad_place_ids << id
      nil
    end.compact.map { |detail| detail.dig("result", "name") }

    flash[:alert] = "Error finding details for #{bad_place_ids.inspect}" if bad_place_ids.any?
  end

  def new
    @trip = Trip.new
  end

  def edit
  end

  def create
    @trip = Trip.new(trip_params)
    @trip.users << current_user

    respond_to do |format|
      if @trip.save
        format.html { redirect_to @trip, notice: 'Trip was successfully created.' }
        format.json { render :show, status: :created, location: @trip }
      else
        format.html { render :new }
        format.json { render json: @trip.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @trip.update(trip_params)
        format.html { redirect_to @trip, notice: 'Trip was successfully updated.' }
        format.json { render :show, status: :ok, location: @trip }
      else
        format.html { render :edit }
        format.json { render json: @trip.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @trip.destroy
    respond_to do |format|
      format.html { redirect_to trips_url, notice: 'Trip was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def set_trip
      @trip = current_user.trips.find(params[:id])
    end

    def trip_params
      params.require(:trip).permit(:title, :start_date, :end_date, place_ids: [])
    end

    def log_error(error)
      logger.error error.message
      logger.error error.backtrace.join("\n")
    end
end
