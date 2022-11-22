Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  resources :users, only: [:create]
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/current-user', to: 'users#get_current_user'
  get '*path',
    to: 'fallback#index',
    constraints: ->(req) { !req.xhr? && req.format.html? }
end
