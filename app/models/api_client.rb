class ApiClient
  ApiError = Class.new(StandardError)
  attr_writer :logger

  def self.instance
    @instance ||= ApiClient.new
  end
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

  def project(company_id:, project_id:)
    get(url: "/projects/#{project_id}", query: { company_id: company_id })
  end

  def projects(company_id:)
    get(url: "/projects", query: { company_id: company_id })
  end

  def users(project_id:)
    get(url: "/projects/#{project_id}/users")
  end

  def cost_code(project_id:, cost_code_id:)
    get(url: "/cost_codes/#{cost_code_id}", query: { project_id: project_id })
  end

  def cost_codes(project_id:)
    get(url: "/cost_codes", query: { project_id: project_id })
  end

  def purchase_order_contracts(project_id:)
    get(url: "/purchase_order_contracts", query: { project_id: project_id })
  end

  def purchase_line_items(project_id:, poc_id:)
    get(url: "/purchase_order_contracts/#{poc_id}/line_items", query: { project_id: project_id })
  end

  def get(url:, query: {})
    with_response_handling do
      time_start = Time.new
      result = HTTParty.get(base_api_url + url, query: query, headers: headers)
      time_end = Time.new
      @logger.debug "GET '#{url}' in #{(time_end - time_start) * 1000}ms" if @logger.present?
      result
    end
  end

  private

  attr_accessor :access_token

  def post(url:, query: {}, body: {})
    with_response_handling do
      HTTParty.post(base_api_url + url, query: query, body: body, headers: headers)
    end
  end

  def with_response_handling(&block)
    result = block.call
    if result.success?
      JSON.parse(result.body)
    else
      raise ApiError.new(result.body)
    end
  end

  def headers
    {
      "Authorization" => "Bearer #{token}",
      "Content-Type" => "application/json",
      "Accepts" => "application/json",
    }
  end

  def token
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzUxMiJ9.eyJ1c2VyIjp7ImlkIjo5NTg5MTl9LCJleHAiOjE0ODQ5Njk5NjZ9.AAflRejkX6ujk_qnCFw37PxhoCsRB-gpZHfQ28XJjmZVWw_mCilh7Y2qAlXiM7U-8Jf_hQdA751r-F-bZ0mYm5FdASVDmO7MZOwtH6DzzH1YUJ3PuPoozlo1FiplKb_PKIH-Ah8-xwcHfgmHTkAYaE38UVNCKVBwVjMRoFPWjcfCpBdz"
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
