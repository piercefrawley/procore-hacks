import React, { Component } from 'react';
import { connectModule } from 'redux-modules';
import Select from 'react-select';
import DetailPage from './DetailPage';
import module from '../redux/modules/app';

class Base extends Component {
  componentDidMount() {
    this.props.actions.fetchProjects();
  }

  render() {
    const {
      app: { costCode, costCodes, loading, project, projects, tab },
      actions: { fetchCostCodes, onChangeProject, onChangeCostCode },
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
                <p>
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
