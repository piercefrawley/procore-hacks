class CostCodesController < ApplicationController
  def index
    project_id = (params[:project_id] || 274649).to_int
    render json: ApiClient.instance.cost_codes(project_id: project_id)
  end
end
