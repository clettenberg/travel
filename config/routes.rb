Rails.application.routes.draw do
  devise_for :users
  root to: redirect("/trips")
  resources :trips

  get '/places/:id', to: 'places#show', as: 'place'
end
