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
      app: { costCode, costCodes, project, projects, tab },
      actions: { onChangeProject, onChangeCostCode },
    } = this.props;

    return (
      <div className="flex-container">
        {
          tab === 'project' && (
            <Select
              name="projectSelect"
              searchable={true}
              value={project}
              labelKey="name"
              valueKey="id"
              options={projects}
              onChange={onChangeProject}
            />
          )
        }
        {
          tab === 'costCode' && (
            <Select
              name="costCodeSelect"
              searchable={true}
              value={costCode}
              labelKey="name"
              valueKey="id"
              options={costCodes}
              onChange={onChangeCostCode}
            />
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
