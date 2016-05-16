/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Popover from '../popover-tooltip';
import DatePicker from './date-picker-base/index';
import InputIcon from '../icon/input-icon';

import {KEYS,EventUtil} from '../../utilities';

const displayName = 'Datepicker';
const propTypes = {
  abbrWeekDayLabels: React.PropTypes.array,
  /**
   * Date formatting function
   */
  formatter: React.PropTypes.func,
  monthLabels: React.PropTypes.array,
  /**
   * Parsing date string into Date
   */
  parser: React.PropTypes.func,
  relativeYearFrom: React.PropTypes.number,
  relativeYearTo: React.PropTypes.number,
  /**
   * If true, adds asterisk next to input label to indicate it is a required field.
   */
  required: React.PropTypes.bool,
  strValue: React.PropTypes.string,
  todayLabel: React.PropTypes.string,
  /**
   * Date
   */
  value: React.PropTypes.instanceOf(Date),
  weekDayLabels: React.PropTypes.array,
};
const defaultProps = {
  abbrWeekDayLabels: ['S','M','T','W','T','F','S'],
  formatter (date) {
    if(date){
      return (date.getMonth()+1) +
        '/'+date.getDate() +
        '/'+date.getFullYear();
    }
  },
  monthLabels: [
    'January','February','March',
    'April','May','June','July',
    'August','September','October',
    'November','December'
  ],
  onDateChange (date, strValue) {
    console.log('onDateChange should be defined');
  },
  parser (str) {
    return new Date(str);
  },
  placeholder: 'Pick a Date',
  relativeYearFrom: -5,
  relativeYearTo: 5,
  required: false,
  todayLabel: 'Today',
  value: null,
  weekDayLabels: [
    'Sunday','Monday','Tuesday',
    'Wednesday','Thursday','Friday',
    'Saturday'
  ],
};

module.exports = React.createClass({

  displayName: displayName,

  propTypes: propTypes,

  getDefaultProps(){
    return defaultProps;
  },

  getInitialState(){
    return {
      isOpen:false,
      value:this.props.value,
      strValue:this.props.strValue
    };
  },

  handleChange(date) {
    this.setState({
      value:date,
      strValue:this.props.formatter(date),
      isOpen:false
    });
    if(this.props.onDateChange){
      this.props.onDateChange(date);
    }
  },

  handleClose() {
    this.setState({isOpen:false});
    this.setFocus();
  },

  handleClick() {
    this.setState({isOpen:true});
  },

  handleFocus() {
//    this.setState({isOpen:true})
  },

  handleBlur() {
//    this.setState({isOpen:false})
  },

  setFocus () {
    if(this.isMounted()){
      ReactDOM.findDOMNode(this.refs.date).focus();
    }
  },

  parseDate(strValue) {
    const d = this.props.parser(strValue);
    if ( Object.prototype.toString.call(d) === "[object Date]" ) {
      if ( !isNaN( d.getTime() ) ) {
        return d;
      }
    }
    return new Date();
  },

  popover() {
    if(this.state && this.state.isOpen){
      const date = this.state.strValue?this.parseDate(this.state.strValue):this.state.value;
      return <Popover className='slds-dropdown' targetElement={this.refs.date} onClose={this.handleClose}>
        <DatePicker
          onChange={this.handleChange}
          selected={this.state.selected}
          onClose={this.handleClose}
          abbrWeekDayLabels={this.props.abbrWeekDayLabels}
          weekDayLabels={this.props.weekDayLabels}
          monthLabels={this.props.monthLabels}
          todayLabel={this.props.todayLabel}
          relativeYearFrom={this.props.relativeYearFrom}
          relativeYearTo={this.props.relativeYearTo}
          selectedDate={date?date:new Date()} />
      </Popover>;
    }
    return <span />;
  },

  handleInputChange() {
    const string = ReactDOM.findDOMNode(this.refs.date).value;
    this.setState({
      strValue:string
    });
    if(this.props.onDateChange){
      const d = this.props.parser(string)
      this.props.onDateChange(d, string);
    }
  },

  handleKeyDown(event) {
    if (event.keyCode){
      const isShift = !!event.shiftKey;
      if (!isShift && (event.keyCode === KEYS.ENTER ||
//          event.keyCode === KEYS.SPACE ||
          event.keyCode === KEYS.DOWN ||
          event.keyCode === KEYS.UP)){
        EventUtil.trapEvent(event);

        this.setState({
          isOpen:true
        });
      }
    }
  },

  getInputIcon(){
    return <InputIcon name='event' style={{pointerEvents: 'none'}} />;
  },

  inputRefName() {
    return `${this.props.label}Datepicker`;
  },

  render() {
    const required = this.props.required ? <span style={{color:"red"}}>* </span>:null;
    const inputLabel = this.props.label?<label className="slds-form-element__label" htmlFor={this.inputRefName()} style={{width: "100%"}}>{required}{this.props.label}</label>:null;
    return (
      <div className='slds-form-element'>
        {inputLabel}
        <div className='slds-form-element__control'>
          <div className='slds-input-has-icon slds-input-has-icon--right'>

            { this.getInputIcon() }
            <input
              id={this.inputRefName()}
              ref='date'
              className='slds-input'
              type='text'
              placeholder={this.props.placeholder}
              value={this.state.strValue}
              onKeyDown={this.handleKeyDown}
              onChange={this.handleInputChange}
              onClick={this.handleClick}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}/>
          </div>
        </div>
        {this.popover()}
      </div>
    );
  }
});
