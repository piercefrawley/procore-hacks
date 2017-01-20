import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ReactHighstocks from 'react-highcharts/ReactHighstock';



export default class Chart extends Component {
   
  render() {
    
    const series =  [{
      name: 'California Average',
      data: [
       [Date.UTC(2016, 0, 1), 200],
       [Date.UTC(2016, 1, 1), 280],
       [Date.UTC(2016, 2, 1), 250],
       [Date.UTC(2016, 3, 1), 100],
       [Date.UTC(2016, 4, 1), 115],
       [Date.UTC(2016, 5, 1), 100],
       [Date.UTC(2016, 6, 1), 470],
       [Date.UTC(2016, 7, 1), 200],
       [Date.UTC(2016, 8, 1), 200],
       [Date.UTC(2016, 9, 1), 300],
       [Date.UTC(2016, 10, 1), 400],
       [Date.UTC(2016, 11, 1), 400]
        ]
      }, {
      name: 'Your Project',
      data: [
        [Date.UTC(2016, 0, 1), 100],
        [Date.UTC(2016, 1, 1), 128],
        [Date.UTC(2016, 2, 1), 125],
        [Date.UTC(2016, 3, 1), 120],
        [Date.UTC(2016, 4, 1), 128],
        [Date.UTC(2016, 5, 1), 128],
        [Date.UTC(2016, 6, 1), 147],
        [Date.UTC(2016, 7, 1), 179],
        [Date.UTC(2016, 8, 1), 172],
        [Date.UTC(2016, 9, 1), 202],
        [Date.UTC(2016, 10, 1), 212],
        [Date.UTC(2016, 11, 1), 320]
      ]
          },
     ];

    const xAxis = {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      tickLength: 0,
      dateTimeLabelFormats: { 
        month: '%b',
      },
    };

    const yAxis = {
      title: 'USD per ton',
      opposite: false,
      gridLineWidth: 0,
    };

     const config = {
        series,
        xAxis,
        yAxis,
        navigator: {
          enabled: false
        },
        scrollbar: {
          enabled: false
        },
        chart: {
          width: '1250',
          height: '500',
        },
        credits: {
          enabled: false,
        },
        rangeSelector: {
          enabled: false,
        },
     };

    return (
      <ReactHighstocks config={config}/>
    );
  }
}
