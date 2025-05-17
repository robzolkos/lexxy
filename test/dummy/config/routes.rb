Rails.application.routes.draw do
  mount Actiontext::Lexical::Engine => "/actiontext-lexical"
end
