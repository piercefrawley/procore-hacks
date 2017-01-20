import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ReactHighstocks from 'react-highcharts/ReactHighstock';



export default class Chart extends Component {
  render() {
    const {
      app: {
        stats: { project_average, regional_average },
      },
    } = this.props;

    const series =  [
      {
        name: 'California Average',
        color: "#ffd56e",
        data: regional_average.map(({date, price}) => [Date.parse(date), price]),
      },
      {
        name: 'Your Project',
        color: "#ff6868",
        data: project_average.map(({date, price}) => [Date.parse(date), price]),
      },
    ];

    const xAxis = {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      tickLength: 0,
      labels: {
        style: {
          color: '#ffffff',
          fontFamily: 'Lato-Regular',
          fontSize: '16px',
        },
      },
      dateTimeLabelFormats: {
        month: '%b',
      },
    };

    const yAxis = {
      title: {
        text: 'USD per ton',
        style: {
          color: '#ffffff',
          fontFamily: 'Lato-Regular',
          fontSize: '18px',
        },
      },
      opposite: false,
      gridLineWidth: 0,
      labels: {
        format: '${value}',
        style: {
          color: '#ffffff',
          fontFamily: 'Lato-Regular',
          fontSize: '16px',
        },
      },
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
        backgroundColor: '#0D357B',
        width: '1250',
        height: '400',
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
