import React, { Component } from 'react';
import { connectModule } from 'redux-modules';
import CostCodeSelect from './CostCodeSelect';
import DetailPage from './DetailPage';
import ProjectSelect from './ProjectSelect';
import module from '../redux/modules/app';

class Base extends Component {
  componentDidMount() {
    this.props.actions.fetchProjects();
  }

  render() {
    const {
      app: { projects, tab },
      actions: { onSumbitProject, onSumbitCostCode },
    } = this.props;

    return (
      <div className="flex-container">
        {
          tab === 'projectSelect' && (
            <ProjectSelect
              {...{
                tab,
                onChange: onSumbitProject,
              }}
            />
          )
        }
        {
          tab === 'costCodeSelect' && (
            <CostCodeSelect {...{ tab }} />
          )
        }
        {
          tab === 'detail' && (
            <DetailPage {...{ tab }} />
          )
        }
      </div>
    );
  }
}

export default connectModule(module)(Base);
