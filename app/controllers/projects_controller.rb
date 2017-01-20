class ProjectsController < ApplicationController
  def index
    render json: [
      {id: 1, name: 'P7 Parking Garage'}
    ]
  end
end
