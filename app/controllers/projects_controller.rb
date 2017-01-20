class ProjectsController < ApplicationController
  def index
    render json: api_client.projects(company_id: company_id)
  end
end
