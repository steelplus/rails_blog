Rails.application.routes.draw do
  # devise_for :users
  devise_for :users, :controllers => {sessions: 'sessions', registrations: 'registrations'}
  root 'home#index'
  # app.vueでリロード時にログイン情報を取得する
  get '/user/get_user'
  get '*path', to: 'home#redirect_to_root'
end
