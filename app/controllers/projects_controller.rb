class ProjectsController < ApplicationController
  def index
    render json: projects(company_id: 7714)
  end
end
