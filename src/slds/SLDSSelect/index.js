import React, { Component } from 'react';
import SLDSPopover from '../SLDSPopover/index';
//import SLDSDatePicker from './SLDSDatePicker/index';
import moment from 'moment';

export default class SLDSSelect extends Component {

  handleSelectDate(day) {
    this.setState({selectedDate:day})
  }

  handleClose() {
    this.setState({isOpen:false})
  }

  handleClick() {
    this.setState({isOpen:true})
  }

  handleFocus() {
    this.setState({isOpen:true})
  }

  handleBlur() {
//    this.setState({isOpen:false})
  }

  handleSelect() {
    alert('YES!');
  }

  popover() {
    if(this.state && this.state.isOpen){
      return (
        <SLDSPopover targetElement={this.refs.date}>
          <div className="ignore-react-onclickoutside">
          <ul className="sds-datepicker--time__list" tabindex="0" onClick={this.handleSelect}>
            <li aria-selected="false">2015</li>
            <li aria-selected="false">2016</li>
            <li aria-selected="false">2017</li>
            <li aria-selected="false">2018</li>
            <li aria-selected="false">2019</li>
            <li aria-selected="false">2020</li>
            <li aria-selected="false">2021</li>
            <li aria-selected="false">2022</li>
            <li aria-selected="false">2023</li>
            <li aria-selected="false">2024</li>
            <li aria-selected="false">2025</li>
          </ul>
          </div>
        </SLDSPopover>
      );
    }
    return <span />;
  }
  render() {
    return (
      <div className="sds-form-element">
        <div className="sds-form-element__control">
          <div className="sds-input-has-icon sds-input-has-icon--right">
            <button id="year" 
              className="sds-button sds-button--neutral sds-picklist__label" 
              onClick={this.handleClick.bind(this)}
              onFocus={this.handleFocus.bind(this)}
              aria-haspopup="true" 
              aria-expanded="false">2015
              <span style={{color:'black'}}>&nbsp;&nbsp;&darr;</span>
            </button>
          </div>
        </div>
        {this.popover()}
      </div>
    );
  }
}