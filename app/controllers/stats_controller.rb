class StatsController < ApplicationController
  def index
    project_average = ProjectAverageCalculator.new(project_id: project_id, cost_code_id: cost_code_id, api_client: api_client).execute

    render json: {
      regional_average: regional_stats,
      project_average: project_average,
      _description: {
        cost_code: cost_code['name'],
        project: last_stats(project_average, project['name']),
        region: last_stats(regional_stats, project['state_code']),
      }
    }
  end

  private

  def last_stats(bucket, name)
    last_item = if bucket.blank? then {} else bucket.last end
    {name: name, last_date: last_item[:date], last_price: last_item[:price]}
  end

  def regional_stats
    if @regional_stats.blank?
      @regional_stats =
        if project['state_code'].present? && cost_code['full_code'].present?
          run_sql(regional_sql(region: project['state_code'], sortable_cost_code: cost_code['full_code'])).
            map { |row| {date:row[1].to_date.iso8601, price: row[0].to_f/1000} }
        else
          []
        end
    end

    @regional_stats
  end

  def project
    @project ||= ApiClient.instance.project(company_id: company_id, project_id: project_id)
  end

  def cost_code
    @cost_code ||= api_client.cost_code(project_id: project_id, cost_code_id: cost_code_id)
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
      AND replace(cost_codes.sortable_code, ' ', '') = '#{sortable_cost_code}'
      AND line_items.updated_at >= '2016-01-01 00:00:00'
      AND line_items.updated_at < '2017-01-01 00:00:00'
    GROUP BY date_trunc('month', line_items.updated_at)
    ORDER BY date_trunc('month', line_items.updated_at) ASC"
  end
end
