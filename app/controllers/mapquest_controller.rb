class MapquestController < ApplicationController
  before_action :authenticate_user!
  respond_to :json

  def search
    @places = mapquest.search(q: params[:q], addressdetails: 1)

    render json: @places
  end

  def reverse
    @places = mapquest.reverse(lat: params[:lat], lon: params[:lon])

    render json: @places
  end

private
  def mapquest
    @mapquest ||= MapquestService.new
  end
end
