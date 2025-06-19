Rails.application.routes.draw do
  resources :posts, :people
  mount Actiontext::Lexical::Engine => "/actiontext-lexical"
end
