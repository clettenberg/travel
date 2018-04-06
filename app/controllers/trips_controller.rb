class TripsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_trip, only: [:show, :edit, :update, :destroy, :add_poi]

  def index
    @trips = current_user.trips
  end

  def show
    token = ENV['GOOGLE_PLACES_API_KEY']

    @names = @trip.place_ids.map do |id|
      url = URI("https://maps.googleapis.com/maps/api/place/details/json?placeid=#{id}&key=#{token}")

      http = Net::HTTP.new(url.host, url.port)
      http.use_ssl = true

      request = Net::HTTP::Get.new(url)

      response = http.request(request)
      JSON.parse(response.body)["result"]["name"]
    end
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
end
