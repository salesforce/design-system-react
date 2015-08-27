/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

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

  handleBGClick: function(event){
//    event.preventDefault();
//    event.stopPropagation();
  },

  handleMonthChange: function(moment){
    this.setState({month:moment});
  },

  handleSelectDate: function(moment){
    if(this.props.onChange){
      this.props.onChange(moment);
    }
  },

  handleBGClick(event) {
    if(event.nativeEvent){
//      event.nativeEvent.stopImmediatePropagation();
      event.nativeEvent.preventDefault();
    }
  },

  render() {
    return (
      <div className="ignore-react-onclickoutside">
        <div className="slds-datepicker" 
          aria-hidden="false" 
          data-selection="single" 
          onMouseDown={this.handleBGClick}
          onClick={this.handleBGClick}>
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

