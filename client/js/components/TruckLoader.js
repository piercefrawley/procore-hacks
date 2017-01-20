import React, { Component } from 'react'

export default class TruckSpinner extends Component {
  render() {
    const { costCode } = this.props;
    console.log(costCode);
    return (
      <div id="loader-wrapper">
        <img id="loader" src="/assets/truckloader.gif" alt="Loading" />
        <div className="loader-section section-left"></div>
        <div className="loader-section section-right"></div>
        {costCode.id && (
          <div id="loader">
            <span>One sec, pulling the average price of </span>
            <span style={{ color: '#939393' }}>steel </span>
            <span>for the state of </span>
            <span style={{ color: '#ffd56e' }}>California...</span>
          </div>
        )}
      </div>
    )
  }
}
