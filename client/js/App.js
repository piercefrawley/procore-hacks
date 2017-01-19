import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
  render() {
    return (
      <div className="app">
        {this.props.children}
      </div>
    )
  }
}

export default App
