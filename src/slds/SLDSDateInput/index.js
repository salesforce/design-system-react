import React, { Component } from 'react';
import SLDSPopover from '../SLDSPopover/index';
import SLDSDatePicker from './SLDSDatePicker/index';
import Moment from 'moment';

module.exports = React.createClass( {

  getDefaultProps(){
    return {
      selected: Moment()
    }
  },

  getInitialState(){
    return {
      selectedDate:this.props.selected
    };
  },

  handleChange(moment) {
    this.setState({
      selectedDate:moment,
      isOpen:false
    })
  },

  handleClose() {
    this.setState({isOpen:false})
  },

  handleClick() {
    this.setState({isOpen:true})
  },

  handleFocus() {
    this.setState({isOpen:true})
  },

  handleBlur() {
//    this.setState({isOpen:false})
  },

  popover() {
    if(this.state && this.state.isOpen){
      return <SLDSPopover targetElement={this.refs.date} onClose={this.handleClose.bind(this)}>
        <SLDSDatePicker 
          onChange={this.handleChange.bind(this)}
          selected={this.state.selectedDate} 
          month={this.state.selectedDate?this.state.selectedDate:Moment()} />
      </SLDSPopover>;
    }
    return <span />;
  },

  render() {
    console.log('!!! SELECTED DATE: ',this.state.selectedDate);
    return (
      <div className="sds-form-element">
        <label className="sds-form-element__label" for="date">{this.props.label}</label>
        <div className="sds-form-element__control">
          <div className="sds-input-has-icon sds-input-has-icon--right">
            <input 
              ref="date" 
              className="sds-input" 
              type="text" 
              placeholder="Pick a Date" 
              value={this.state.selectedDate?this.state.selectedDate.format('MM/DD/YYYY'):''}
              onClick={this.handleClick.bind(this)}
              onFocus={this.handleFocus.bind(this)} 
              onBlur={this.handleBlur.bind(this)} />
          </div>
        </div>
        {this.popover()}
      </div>
    );
  }
});