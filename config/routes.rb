Rails.application.routes.draw do
  resources :pois
  root to: redirect("/trips")
  resources :trips
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
