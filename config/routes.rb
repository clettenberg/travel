Rails.application.routes.draw do
  get 'mapquest_search/create'
  devise_for :users, skip: :registrations
  root "home#index"

  resources :trips do
    resources :places, only: [:new, :create]
  end
  resources :places, only: [:show, :edit, :update, :destroy]

  get 'search', to: 'mapquest_search#index', as: 'mapquest_search'
end
