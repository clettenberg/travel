class MapquestSearchController < ApplicationController
  before_action :authenticate_user!
  respond_to :json

  def index
    mapquest = MapquestService.new
    @places = mapquest.search(q: params[:q], addressdetails: 1)
  end
end
