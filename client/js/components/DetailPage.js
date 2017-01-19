import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import TruckSpinner from './truckLoader'

export default class Detail extends Component {
  render() {
    return (
      <div className="flex-container">
        <TruckSpinner />
        <div>Hello React</div>
      </div>
    )
  }
}
