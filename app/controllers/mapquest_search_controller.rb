class MapquestSearchController < ApplicationController
  before_action :authenticate_user!
  respond_to :json

  def index
    mapquest = MapquestService.new
    results = mapquest.search(params[:q])
    render json: { results: results }
  end
end
