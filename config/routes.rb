Rails.application.routes.draw do
  root to: redirect("/trips")
  resources :pois
  resources :trips
end
