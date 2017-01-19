class CostCodesController < ApplicationController
  def index
    # 2764649

    render json: get(url: "/cost_codes", query: { project_id: 274649 })
  end
end
