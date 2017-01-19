import React, { Component } from 'react';
import { connectModule } from 'redux-modules';
import module from '../redux/modules/app';

class Base extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="flex-container">
        <div>Hello React</div>
      </div>
    );
  }
}

export default connectModule(module)(Base);
