Rails.application.routes.draw do
  root to: "static#root"
  get '*path' => 'static#root', constraints: -> (request) do
    !request.xhr? && request.format.html?
  end
  scope :api, defaults: { format: 'json' } do
    resources :cost_codes
  end
end
