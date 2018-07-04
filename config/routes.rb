Rails.application.routes.draw do
  devise_for :users
  root "home#index"

  resources :trips do
    resources :places, only: [:new, :create]
  end
  resources :places, only: [:show, :edit, :update, :destroy]
end
