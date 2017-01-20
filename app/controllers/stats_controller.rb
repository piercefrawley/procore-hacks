class StatsController < ApplicationController
  def index
    render json: {
      regional_average: [
        {date: Date.new(2016,1,1).iso8601, price: 1012.0},
        {date: Date.new(2016,2,5).iso8601, price: 3002.10}
      ],
      project: [
        {date: Date.new(2016,1,1).iso8601, price: 600.50},
      ]
    }
  end
end
