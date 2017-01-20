import React, { Component } from 'react'

export default class HidenButton extends Component {
  render() {
    const { onClick, type, text } = this.props;
    const ButtonClass = type + '-class';
    let HiddenText1, HiddenText2;
    switch (type) {
      case 'item':
        HiddenText1 = "Nah, not this cost code.";
        break;
      case 'project':
        HiddenText1 = "Y'know actually, I want";
        HiddenText2 = "to see a different project.";
        break;
      default:
        HiddenText1 = ""
        
    }
    return (
      <span className={ ButtonClass } onClick={ onClick }>
        <div className="showntext">{ text }</div>
        <div className="hiddentext">{ HiddenText1 }</div>
        <div className="hiddentext">{ HiddenText2 }</div>
      </span>
    )
  }
}
