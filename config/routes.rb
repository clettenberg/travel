Rails.application.routes.draw do
  devise_for :users
  root to: redirect("/trips")
  resources :trips
end
