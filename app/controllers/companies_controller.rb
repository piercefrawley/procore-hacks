class CompaniesController < ApplicationController
  def index
    render json: api_client.companies
  end
end
