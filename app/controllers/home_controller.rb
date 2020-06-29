class HomeController < ApplicationController
  def index
    render react_component: "App"
  end
end
