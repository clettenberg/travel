Rails.application.routes.draw do
  devise_for :users
  root to: redirect("/trips")
  resources :pois, path: "places"
  resources :trips
end
