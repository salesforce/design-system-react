import React, { Component } from 'react';
import Calendar from '../SLDSCalendar/index';
import moment from 'moment';
import SLDSDatePickerNav from './SLDSDatePickerNav/index';

module.exports = React.createClass( {

  getInitialState: function(){
    return {
      month:moment().startOf("day")
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
    console.log(moment);
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

      <div className="sds-datepicker" aria-hidden="false" data-selection="single" onClick={this.handleClick}>
        <SLDSDatePickerNav 
          onChangeMonth={this.handleMonthChange} 
          selected={this.props.selected}
          moment={this.state.month}/>
        <Calendar 
          selected={this.props.selected} 
          month={this.state.month} 
          onSelectDate={this.handleSelectDate.bind(this) }/>
        <span id="bn_prev-label" className="sds-assistive-text">Go to previous month</span>
        <span id="bn_next-label" className="sds-assistive-text">Go to next month</span>
      </div>

      </div>
    );
  }
});

