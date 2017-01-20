import React, { Component } from 'react'

export default class TruckSpinner extends Component {
  render() {
    return (
      <div id="loader-wrapper">
        <img id="loader" src="/assets/truckloader.gif" alt="Loading" />
        <div className="loader-section section-left"></div>
        <div className="loader-section section-right"></div>
      </div>
    )
  }
}
