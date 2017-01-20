class ProjectAverageCalculator
  def initialize(project_id, cost_code_id)
    @project_id = project_id
    @cost_code_id = cost_code_id
  end

  def execute
    averages = []
    average_per_month.keys.each do |key|
      averages << { date: Date.new(2016, key.to_f, 1).iso8601, price: average_per_month[key] }
    end

    averages
  end


  def average_per_month
    averages = {}
    line_items_by_month.keys.each do |key|
      unit_costs = []

      line_items_by_month[key].flatten.each do |li|
        unit_costs << li["unit_cost"].to_f
      end

      average = unit_costs.reduce(:+) / unit_costs.size.to_f

      averages[key] = average
    end

    averages
  end

  def line_items_by_month
    purchase_order_line_items.group_by{ |i| i.first["updated_at"].split('-').second }
  end

  def purchase_order_line_items
    line_items = []
    purchase_order_ids.uniq.each do |id|
      line_items << get(url: "/purchase_order_contracts/#{id}/line_items", query: { project_id: @project_id })
    end
    line_items
  end

  def purchase_order_ids
    ids = []
    purchase_orders_request.uniq.each do |por|
      ids << por["id"]
    end

    ids
  end

  def purchase_orders_request
    get(url: "/purchase_order_contracts", query: { project_id: @project_id })
  end

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.

  ApiError = Class.new(StandardError)

  # def initialize(existing_token:, refresh_token:, expires_at:)
  #   @access_token = build_access_token(
  #     existing_token: existing_token,
  #     refresh_token: refresh_token,
  #     expires_at: expires_at,
  #   )
  # end

  def companies
    get(url: "/companies")
  end

  def projects(company_id:)
    get(url: "/projects", query: { company_id: company_id })
  end

  def users(project_id:)
    get(url: "/projects/#{project_id}/users")
  end

  private

  attr_accessor :access_token

  def with_response_handling(&block)
    result = block.call
    if result.success?
      JSON.parse(result.body)
    else
      raise ApiError.new(result.body)
    end
  end

  def get(url:, query: {})
    with_response_handling do
      HTTParty.get(base_api_url + url, query: query, headers: headers)
    end
  end

  def post(url:, query: {}, body: {})
    with_response_handling do
      HTTParty.post(base_api_url + url, query: query, body: body, headers: headers)
    end
  end

  def headers
    {
     "Authorization" => "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzUxMiJ9.eyJ1c2VyIjp7ImlkIjo5NTg5MTl9LCJleHAiOjE0ODQ4ODE4NDR9.AUHHsjvaTWN9lIYlHRH0iD3KX9tweORqIuqHLeUUBWvZ3v5zsIytDDWGvSgNe09PVWJ6MwtTL1Gn6JsHdMhiDIuwANRDcwOa3-X2bEhQpjw7sPPdIldF7QGXblMp4PMF7l2noxBMnPD3GX51Ha1Zgt2vVCa5xyMnFnxc3GHyJye7CFEv",
      "Content-Type" => "application/json",
      "Accepts" => "application/json",
    }
  end

  def token
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzUxMiJ9.eyJ1c2VyIjp7ImlkIjo5NTg5MTl9LCJleHAiOjE0ODQ4ODE4NDR9.AUHHsjvaTWN9lIYlHRH0iD3KX9tweORqIuqHLeUUBWvZ3v5zsIytDDWGvSgNe09PVWJ6MwtTL1Gn6JsHdMhiDIuwANRDcwOa3-X2bEhQpjw7sPPdIldF7QGXblMp4PMF7l2noxBMnPD3GX51Ha1Zgt2vVCa5xyMnFnxc3GHyJye7CFEv"
    # if access_token.expired?
    #   self.access_token = access_token.refresh!
    # else
    #   access_token.token
    # end
  end

  # def build_access_token(existing_token:, refresh_token:, expires_at:)
  #   OAuth2::AccessToken.new(
  #     oauth_client,
  #     existing_token,
  #     refresh_token: refresh_token,
  #     expires: expires_at,
  #   )
  # end

  # def oauth_client
  #   OAuth2::Client.new(
  #     ENV.fetch("PROCORE_CLIENT_ID"),
  #     ENV.fetch("PROCORE_CLIENT_SECRET"),
  #     site: base_url,
  #   )
  # end

  def base_api_url
    base_url + "/vapid"
  end

  def base_url
    "https://app.procore.com"
  end




end
