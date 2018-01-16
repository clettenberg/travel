class PoisController < ApplicationController
  before_action :authenticate_user!
  before_action :set_poi, only: [:show, :edit, :update, :destroy]

  def index
    @pois = Poi.all
  end

  def show
  end

  def new
    @poi = Poi.new
  end


  def edit
  end

  def create
    @poi = Poi.new(poi_params)

    respond_to do |format|
      if @poi.save
        format.html { redirect_to @poi, notice: 'Place was successfully created.' }
        format.json { render :show, status: :created, location: @poi }
      else
        format.html { render :new }
        format.json { render json: @poi.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @poi.update(poi_params)
        format.html { redirect_to @poi, notice: 'Poi was successfully updated.' }
        format.json { render :show, status: :ok, location: @poi }
      else
        format.html { render :edit }
        format.json { render json: @poi.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @poi.destroy
    respond_to do |format|
      format.html { redirect_to pois_url, notice: 'Poi was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def set_poi
      @poi = Poi.find(params[:id])
    end

    def poi_params
      params.require(:poi).permit(:title)
    end
end
