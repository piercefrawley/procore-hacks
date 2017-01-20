class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def company_id
    (params[:company_id] || 7714).to_i
  end

  def project_id
    (params[:project_id] || 274649).to_i
  end

  def cost_code_id
    (params[:cost_code_id_id] || 101336026).to_i
  end

  def api_client
    client = ApiClient.instance
    client.logger = logger
    client
  end
end
