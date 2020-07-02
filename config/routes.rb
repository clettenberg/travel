Rails.application.routes.draw do
  get "mapquest_search/create"
  devise_for :users, skip: :registrations

  root to: "home#index"

  get "/", to: "home#index"

  scope "/classic" do
    resources :trips do
      resources :places, only: [:new, :create]
    end
    resources :places, only: [:show, :edit, :update, :destroy]
  end

  get "search", to: "mapquest#search", as: "mapquest_search"
  get "reverse", to: "mapquest#reverse", as: "mapquest_reverse"
end
