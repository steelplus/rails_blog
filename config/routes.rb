Rails.application.routes.draw do
  # devise_for :users
  devise_for :users, :controllers => {sessions: 'sessions', registrations: 'registrations'}
  root 'home#index'
  get '*path', to: 'home#redirect_to_root'
end
