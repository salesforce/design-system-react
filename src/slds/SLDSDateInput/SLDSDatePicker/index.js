import React, { Component } from 'react';
import Calendar from '../SLDSCalendar/index';
import Moment from 'moment';
import SLDSDatePickerNav from './SLDSDatePickerNav/index';

module.exports = React.createClass( {

  getDefaultProps: function(){
    return {
      month:Moment()
    }
  },

  getInitialState: function(){
    return {
      month:this.props.month
    }
  },

  handleClickOutside: function(e) {
    e.preventDefault();
    e.stopPropagation();
    if(this.props.onClose){
      this.props.onClose();
    }
  },

  handleClick: function(event){
    event.preventDefault();
    event.stopPropagation();
  },

  handleMonthChange: function(moment){
    this.setState({month:moment});
  },

  handleSelectDate: function(moment){
    if(this.props.onChange){
      this.props.onChange(moment);
    }
  },

  render() {
    return (
      <div className="ignore-react-onclickoutside">

        <div className="slds-datepicker" aria-hidden="false" data-selection="single" onClick={this.handleClick}>
          <SLDSDatePickerNav 
            onChangeMonth={this.handleMonthChange} 
            selected={this.props.selected}
            moment={this.state.month}/>
          <Calendar 
            selected={this.props.selected} 
            month={this.state.month} 
            onSelectDate={this.handleSelectDate}/>
          <span id="bn_prev-label" className="slds-assistive-text">Go to previous month</span>
          <span id="bn_next-label" className="slds-assistive-text">Go to next month</span>
        </div>

      </div>
    );
  }
});

