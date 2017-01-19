import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Chart from './Chart';

export default class Base extends Component {
  render() {
    return (
      <div className="flex-container">
        <Chart/>
      </div>
    )
  }
}
