Rails.application.routes.draw do
  devise_for :users
  root to: redirect("/trips")
  resources :trips

  post '/trips/:id/places', to: "trip_places#add_place"

  get '/places/:id', to: 'places#show', as: 'place'
  patch '/places/:id', to: 'places#update'
  get '/places/:id/edit', to: 'places#edit', as: 'edit_place'

  get '/google-places/:place_id', to: 'google_places#show', as: 'google_place'
end
