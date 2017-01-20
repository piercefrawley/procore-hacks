class CostCodesController < ApplicationController
  def index
    render json: api_client.cost_codes(project_id: project_id)
  end
end
