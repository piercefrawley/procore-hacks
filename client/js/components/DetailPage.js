import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import TruckSpinner from './TruckLoader'
import HiddenButton from './HiddenButton'
import cx from 'classnames';

export default class Detail extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    this.props.actions.fetchStatsData();
    this.loaded = setTimeout(this.load.bind(this), 4000);
  }

  load() {
    this.setState({
      isLoading: false
    })
  }

  render() {
    const DetailClass = cx({
      'flex-container': true,
      'loaded': !this.state.isLoading
    });
    const material = "Structure Metals";
    const project = "P7 Parking Garage";
    const area = "California";
    const click = () => console.log('Clicked');
    return (
      <div className={DetailClass}>
        <TruckSpinner />
        <div className="flyer">
          Average price of
          <HiddenButton onClick={click} text={material} type="item"/>
          for&nbsp;<span className="area-span">{ area }</span>&nbsp;vs.
          <HiddenButton onClick={click} text={project} type="project"/>
        </div>
      </div>
    )
  }
}
