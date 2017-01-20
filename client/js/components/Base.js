import React, { Component } from 'react';
import { connectModule } from 'redux-modules';
import Select from 'react-select';
import DetailPage from './DetailPage';
import module from '../redux/modules/app';

class Base extends Component {
  componentDidMount() {
    this.props.actions.fetchProjects();
    this.props.actions.fetchCostCodes();
  }

  render() {
    const {
      app: { costCode, costCodes, loading, project, projects, tab },
      actions: { onChangeProject, onChangeCostCode },
    } = this.props;

    return (
      <div className="flex-container">
        {
          tab === 'project' && (
            <div className="project-view">
              <p>Yo, What's your project?</p>
              <Select
                name="projectSelect"
                searchable={true}
                value={project}
                labelKey="name"
                valueKey="id"
                options={projects}
                onChange={onChangeProject}
              />
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
