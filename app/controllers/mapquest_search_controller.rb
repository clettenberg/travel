class MapquestSearchController < ApplicationController
  before_action :authenticate_user!
  respond_to :json

  def index
    mapquest = MapquestService.new
    @places = mapquest.search(params[:q])
  end
end