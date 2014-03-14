RecidVis::Application.routes.draw do
  get "states/index"
  root to: 'states#index'
end
