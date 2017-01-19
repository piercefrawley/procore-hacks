import React, { Component } from 'react'
import ReactDOM from 'react-dom'



export default class Chart extends Component {
   
  render() {
	const series =  [{
		name: 'California Average',
		data: [
			[Date.UTC(2016, 1, 1), 0],
			[Date.UTC(2016, 2, 1), 0.28],
			[Date.UTC(2016, 3, 1), 0.25],
			[Date.UTC(2016, 4, 1), 0.2],
			[Date.UTC(2016, 5, 1), 0.28],
			[Date.UTC(2016, 6, 1), 0.28],
			[Date.UTC(2016, 7, 1), 0.47],
			[Date.UTC(2016, 8, 1), 0.79],
			[Date.UTC(2016, 9, 1), 0.72],
			[Date.UTC(2016, 10, 1), 1.02],
			[Date.UTC(2016, 11, 1), 1.12],
			[Date.UTC(2016, 12, 1), 1.2],
			]
		}, {
		name: 'Your Project',
		data: [
			[Date.UTC(2016, 1, 1), 1],
			[Date.UTC(2016, 2, 1), 1.28],
			[Date.UTC(2016, 3, 1), 1.25],
			[Date.UTC(2016, 4, 1), 1.2],
			[Date.UTC(2016, 5, 1), 1.28],
			[Date.UTC(2016, 6, 1), 1.28],
			[Date.UTC(2016, 7, 1), 1.47],
			[Date.UTC(2016, 8, 1), 1.79],
			[Date.UTC(2016, 9, 1), 1.72],
			[Date.UTC(2016, 10, 1), 2.02],
			[Date.UTC(2016, 11, 1), 2.12],
			[Date.UTC(2016, 12, 1), 3.2],
		]
        },
   ]

    return (
      <div className="flex-container">
        <div>This is where the Chart Goes</div>
      </div>
    )
  }
}
