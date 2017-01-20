class StatsController < ApplicationController
  def index
    project_average = ProjectAverageCalculator.new(project_id, cost_code_id).execute

    render json: {
      regional_average: [
        {date: Date.new(2016,1,1).iso8601, price: 1012.0},
        {date: Date.new(2016,2,5).iso8601, price: 3002.10}
      ],
      project: [
        project_average
      ]
    }
  end

  private

  def project_id
    params[:project_id].to_i
  end

  def cost_code_id
    params[:cost_code_id].to_i
  end
end
