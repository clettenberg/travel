class HomeController < ApplicationController
  layout 'landing_page'

  def index
    redirect_to trips_path if user_signed_in?
    @user = User.new
  end
end
