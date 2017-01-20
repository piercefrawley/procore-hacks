import React, { Component } from 'react';
import { connectModule } from 'redux-modules';
import Select from 'react-select';
import DetailPage from './DetailPage';
import module from '../redux/modules/app';
import cx from 'classnames';

class Base extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    this.props.actions.fetchProjects();
    this.loaded = setTimeout(this.load.bind(this), 2000);
  }

  load() {
    this.setState({
      isLoading: false
    })
  }

  render() {
    const {
      app: { costCode, costCodes, loading, project, projects, tab },
      actions: { fetchCostCodes, onChangeProject, onChangeCostCode },
    } = this.props;
    const BaseClass = cx({ 'flex-container': true, 'titleloaded': !this.state.isLoading });

    return (
      <div className={BaseClass}>
        <div id="titleloader-wrapper">
          <img id="titleloader" src="/assets/Title.png" alt="Loading" />
          <div className="titleloader-section titlesection-left"></div>
          <div className="titleloader-section titlesection-right"></div>
        </div>
        <img id="titleloader" src="/assets/truckloader.gif" alt="Loading" style={{visibility: "hidden"}}/>
        {
          tab === 'project' && (
            <div className="project-view">
              <p>Yo, What's your project?</p>
              <Select
                name="projectSelect"
                searchable={true}
                isLoading={loading}
                value={project}
                labelKey="name"
                valueKey="id"
                options={projects}
                onChange={val => {
                  onChangeProject(val);
                  fetchCostCodes(val.id);
                }}
              />
              {project.id && (
                <p className="notification">
                  <span>Dope, your project's in </span>
                  <span style={{ color: '#ffd56e' }}>California</span>
                </p>
              )}
            </div>
          )
        }
        {
          tab === 'costCode' && (
            <div className="costcode-view">
              <p>Which cost code do you want?</p>
              <Select
                name="costCodeSelect"
                searchable={true}
                isLoading={loading}
                value={costCode}
                labelKey="name"
                valueKey="id"
                options={costCodes}
                onChange={onChangeCostCode}
              />
            </div>
          )
        }
        {
          tab === 'detail' && (
            <DetailPage { ...this.props } />
          )
        }
      </div>
    );
  }
}

export default connectModule(module)(Base);
