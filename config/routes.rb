Rails.application.routes.draw do
  get 'mapquest_search/create'
  devise_for :users, skip: :registrations

  devise_scope :user do
    authenticated :user do
      root to: redirect('/trips')
    end

    unauthenticated do
      root 'devise/sessions#new'
    end
  end

  resources :trips do
    resources :places, only: [:new, :create]
  end
  resources :places, only: [:show, :edit, :update, :destroy]

  get 'search', to: 'mapquest#search', as: 'mapquest_search'
  get 'reverse', to: 'mapquest#reverse', as: 'mapquest_reverse'
end
