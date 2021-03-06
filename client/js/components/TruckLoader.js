import React, { Component } from 'react'

export default class TruckSpinner extends Component {
  render() {
    const { costCode } = this.props;

    return (
      <div id="loader-wrapper">
        {costCode.id && (
          <div id="loader">
            <img src="/assets/truckloader.gif" alt="Loading" />
            <div className="loading-text">
              <span>One sec, pulling the average price of </span>
              <span style={{ color: '#939393' }}>{`${costCode.name} ` || "structural metal" }</span>
              <span>for the state of </span>
              <span style={{ color: '#ffd56e' }}>California...</span>
            </div>
          </div>
        )}
        <div className="loader-section section-left"></div>
        <div className="loader-section section-right"></div>
      </div>
    )
  }
}
