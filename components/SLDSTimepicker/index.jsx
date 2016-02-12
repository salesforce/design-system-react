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
import SLDSPopover from '../SLDSPopover';
import InputIcon from '../SLDSIcon/InputIcon';
import SLDSMenuList from '../SLDSMenuList';
import ListItemLabel from '../SLDSMenuList/ListItemLabel';

import {KEYS,EventUtil} from '../utils';

const displayName = 'SLDSTimepicker';
const propTypes = {

  /**
   * Time formatting function
   */
  formatter: React.PropTypes.func,

  /**
   * Parsing date string into Date
   */
  parser: React.PropTypes.func,

  relativeYearFrom: React.PropTypes.number,

  relativeYearTo: React.PropTypes.number,

  todayLabel: React.PropTypes.string,

  /**
   * Date
   */
  value: React.PropTypes.instanceOf(Date),

  strValue: React.PropTypes.string,

  weekDayLabels: React.PropTypes.array,


};
const defaultProps = {
  formatter (date) {
    if(date){
      return date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
    }
  },
  onDateChange (date) {
    console.log('onDateChange should be defined');
  },
  parser (timeStr) {
    const date = new Date();
    const dateStr = date.toLocaleString(navigator.language, {year: 'numeric', month: 'numeric', day: 'numeric'});
    return new Date(dateStr+' '+timeStr);
  },
  placeholder: 'Pick Time',
  relativeYearFrom: -5,
  relativeYearTo: 5,
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
      strValue:this.props.strValue,
      options:this.getOptions()
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

  getOptions() {
    const d = new Date();
    let options = [];
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
    const curDate = new Date(d);
    while(d.getDate() === curDate.getDate()){
      const formatted = this.props.formatter(curDate);
      options.push({
        label:formatted,
        value:formatted
      });
      curDate.setMinutes(curDate.getMinutes()+30);
    }
    return options;
  },

  getListItemRenderer() {
    return this.props.listItemRenderer?this.props.listItemRenderer:ListItemLabel;
  },

  getValueByIndex(index){
    const option = this.state.options[index];
    if(option){
      return this.state.options[index];
    }
  },

  handleSelect(index) {

    const value = this.getValueByIndex(index);

    this.setState({
      value:value.value,
      strValue:value.label,
      isOpen:false
    });
    if(this.props.onChange){
      this.props.onChange(date);
    }
    this.handleClose();
  },

  handleCancel(){
    this.handleClose();
  },

  getPopoverContent() {
    return <SLDSMenuList
            checkmark={false}
            itemRenderer={this.getListItemRenderer()}
            onCancel={this.handleCancel}
            onSelect={this.handleSelect}
            options={this.state.options}
            ref="list"
            triggerId={this.state.triggerId}
          />;
  },

  getSimplePopover() {
    return (
      !this.props.disabled && this.state.isOpen?
        <div
          className="slds-dropdown slds-dropdown--left slds-dropdown--menu"
          style={{
            maxHeight: "20em",
            overflowX: "hidden",
            minWidth: "100%"
          }}>
          {this.getPopoverContent()}
        </div>:null
    );
  },

  getModalPopover() {
    return (
      !this.props.disabled && this.state.isOpen?
        <SLDSPopover
          className="slds-dropdown slds-dropdown--left "
          closeOnTabKey={true}
          constrainToScrollParent={true}
          dropClass="slds-picklist"
          flippable={true}
          onClose={this.handleCancel.bind(this)}
          targetElement={this.refs.triggerbutton}>
          {this.getPopoverContent()}
        </SLDSPopover>:null
    );
  },

  handleInputChange() {
    const string = ReactDOM.findDOMNode(this.refs.date).value;
    if(string){
      this.setState({
        strValue:string
      });
      if(this.props.onDateChange){
        const d = this.props.parser(string);
        this.props.onDateChange(d);
      }
    }
    else{
      this.setState({
        isOpen:false
      });
    }
  },

  handleKeyDown(event) {
    if (event.keyCode){
      if (event.keyCode === KEYS.ENTER ||
          event.keyCode === KEYS.SPACE ||
          event.keyCode === KEYS.DOWN ||
          event.keyCode === KEYS.UP){
        EventUtil.trapEvent(event);

        this.setState({
          isOpen:true
        });
      }
    }
  },

  getInputIcon(){
    return <InputIcon name='clock' style={{pointerEvents: 'none'}} />;
  },

  render() {
    return (
      <div className='slds-form-element'>
        <label className='slds-form-element__label' htmlFor='date'>{this.props.label}</label>
        <div className='slds-form-element__control'>
          <div className='slds-input-has-icon slds-input-has-icon--right'>

            { this.getInputIcon() }
            <input
              name='date'
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
        {this.props.modal?this.getModalPopover():this.getSimplePopover()}
      </div>
    );
  }
});
