class StatesController < ApplicationController
  def index
    states = State.all
    render json: states, root: false #gets rid of the outside "states" label
  end
end
