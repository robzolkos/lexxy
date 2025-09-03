Rails.application.routes.draw do
  root "sandbox#show"
  resources :posts, :people
  get "sandbox", to: "sandbox#show"
  mount Lexxy::Engine => "/lexxy"
end
