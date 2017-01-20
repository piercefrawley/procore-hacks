class ProjectsController < ApplicationController
  def index
    company_id = (params[:company_id] || 7714).to_int
    render json: ApiClient.instance.projects(company_id: company_id)
  end
end
