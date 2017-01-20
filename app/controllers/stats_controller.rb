class StatsController < ApplicationController
  def index
    company_id = (params[:company_id] || 7714).to_i
    project_id = (params[:project_id] || 274649).to_i
    cost_code_id = (params[:cost_code_id_id] || 101336026).to_int
    project_average = ProjectAverageCalculator.new(project_id, cost_code_id).execute

    render json: {
      regional_average: regional_stats(company_id, project_id, cost_code_id),
      project: project_average
    }
  end

  private

  def regional_stats(company_id, project_id, cost_code_id)
    region = ApiClient.instance.project(company_id: company_id, project_id: project_id)['state_code']
    sortable_code = ApiClient.instance.cost_code(project_id: project_id, cost_code_id: cost_code_id)['full_code']

    if region.present? && sortable_code.present?
      run_sql(regional_sql(region: region, sortable_cost_code: sortable_code)).
        map do |row|
        {date:row[1].to_date.iso8601, price: row[0]}
      end
    else
      []
    end
  end

  def run_sql(sql)
    ActiveRecord::Base.connection.exec_query(sql).cast_values
  end

  def regional_sql(region:, sortable_cost_code:)
    "SELECT
      round(avg(line_items.unit_cost), 2),
      date_trunc('month', line_items.updated_at)
    FROM projects
      INNER JOIN line_items ON line_items.project_id = projects.id
          AND line_items.unit_cost IS NOT NULL AND line_items.unit_cost <> 0
      INNER JOIN cost_codes ON cost_codes.id = line_items.cost_code_id
    WHERE
      1=1
      AND projects.active
      AND projects.state_code = '#{region}'
      AND cost_codes.sortable_code = '#{sortable_cost_code}'
      AND line_items.updated_at >= '2016-01-01 00:00:00'
      AND line_items.updated_at < '2017-01-01 00:00:00'
    GROUP BY date_trunc('month', line_items.updated_at)"
  end
end
