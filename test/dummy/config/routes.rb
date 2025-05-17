Rails.application.routes.draw do
  resources :posts
  mount Actiontext::Lexical::Engine => "/actiontext-lexical"
end
