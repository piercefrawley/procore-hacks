import React, { Component } from 'react';
<<<<<<< HEAD
import ReactDOM from 'react-dom';
=======
import { connectModule } from 'redux-modules';
import module from '../redux/modules/app';
>>>>>>> 1d825d1261f620dbde3acfa0409829a07ecc4f4a

class Base extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="flex-container">
        Hello React
      </div>
    );
  }
}

export default connectModule(module)(Base);
