Rails.application.routes.draw do
  root to: "static#root"
  get '/*path' => 'static#root'
end
