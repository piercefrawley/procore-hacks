class CostCodesController < ApplicationController
  def index
    render json: [
      {id: 1, name: 'Steel'}
    ]
  end
end
