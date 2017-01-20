import React, { Component } from 'react';
import Chart from './Chart';
import TruckLoader from './TruckLoader';
import HiddenButton from './HiddenButton';
import cx from 'classnames';

export default class Detail extends Component {
  componentDidMount() {
    const { actions } = this.props;
    actions && actions.fetchStatsData();
  }

  render() {
    const { app: { costCode, loading } } = this.props;
    const DetailClass = cx({ 'flex-container': true, 'loaded': !loading });
    const material = "Structure Metals";
    const project = "P7 Parking Garage";
    const area = "California";
    const click = () => console.log('Clicked');

    return (
      <div className={DetailClass}>
        <TruckLoader costCode={costCode} />
        <div className="flyer">
          Average price of
          <HiddenButton onClick={click} text={material} type="item"/>
          for&nbsp;<span className="area-span">{ area }</span>&nbsp;vs.
          <HiddenButton onClick={click} text={project} type="project"/>
        </div>
        <Chart />
        <div className="detail-bottom-view">
          <div className="costcode-label"></div>
          <div className="project-label"></div>
          <div className="comparison-label"></div>
        </div>
      </div>
    )
  }
}
