Rails.application.routes.draw do
  resources :posts, :people
  mount Lexxy::Engine => "/lexxy"
end
