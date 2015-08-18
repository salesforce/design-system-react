import React, { Component } from 'react';
import Calendar from '../SLDSCalendar/index';
import moment from 'moment';
import SLDSDatePickerNav from './SLDSDatePickerNav/index';

module.exports = React.createClass( {

  mixins: [ require( "react-onclickoutside" ) ],

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

  render() {
    return (

      <div className="sds-datepicker" aria-hidden="false" data-selection="single" onClick={this.handleClick}>
          <SLDSDatePickerNav />

          <Calendar selected={moment().startOf("day")} />

          <span id="bn_prev-label" className="sds-assistive-text">Go to previous month</span>
          <span id="bn_next-label" className="sds-assistive-text">Go to next month</span>
        </div>
    );
  }
});

