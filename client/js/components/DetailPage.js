import React, { Component } from 'react';
import Chart from './Chart';
import TruckLoader from './TruckLoader';
import HiddenButton from './HiddenButton';
import cx from 'classnames';

export default class Detail extends Component {
  componentDidMount() {
    const { actions } = this.props;
    actions && actions.setLoading(true);
    actions && actions.fetchStatsData();
  }

  render() {
    const { app: { costCode, loading } } = this.props;
    const DetailClass = cx({ 'flex-container': true, 'loaded': !loading });
    const material = "Structure Metals";
    const project = "P7 Parking Garage";
    const area = "California";
    const areaprice = 160;
    const projectprice = 210;
    const diff = areaprice - projectprice;
    const diffClass = cx({ 'save': diff >= 0, 'nosave': diff < 0 });
    const diffabs = Math.abs(diff);

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
        <div className="costcode-chart">
        <Chart { ...this.props }/>
        </div>
        <div className="detail-bottom-view">
          <div>Current Price</div>
          <div className="labels">
            <div className="area-label">
                <img className="label-icon" src="/assets/California.png" alt="Location" height="105" width="76"/>
                <div className="label-text">
                  <div className="price">{"$"+areaprice}</div>
                  <div className="area">{area}</div>
                </div>
            </div>
            <div className="project-label">
                <img className="label-icon" src="/assets/Projectflag.png" alt="Project" height="99" width="76"/>
                <div className="label-text">
                  <div className="price">{"$"+projectprice}</div>
                  <div className="project">{project}</div>
                </div>
            </div>
            <div className="diff-label">
                { diff >= 0?
                  <img className="label-icon" src="/assets/Arrowdown.png" alt="Project" height="90" width="88"/>:
                  <img className="label-icon" src="/assets/Arrowup.png" alt="Project" height="90" width="88"/>
                }
                <div className="label-text">
                  <div className="price">{"$"+diffabs}</div>
                  <div className={diffClass}>{diff > 0? "Cheaper": "More Expensive"}</div>
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
