/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React, { Component } from 'react';
import SLDSPopover from '../SLDSPopover';
import SLDSDatePicker from './SLDSDatePicker/index';
import Moment from 'moment';
import {InputIcon} from "./../SLDSIcons";

import {KEYS,EventUtil} from '../utils';


module.exports = React.createClass( {

  getDefaultProps(){
    return {
      string:'',
      selected: null,
      placeholder: 'Pick a Date',
      format: 'MM/DD/YYYY',
      onDateChange: function(moment){
        console.log('onDateChage should be defined');
      }
    }
  },

  getInitialState(){
    return {
      isOpen:false,
      selected:this.props.selected,
      string:this.props.selected?this.props.selected.format(this.props.format):null
    };
  },

  handleChange(moment) {
    this.setState({
      selected:moment,
      isOpen:false,
      string:moment.format(this.props.format)
    })
    if(this.props.onDateChange){
      this.props.onDateChange(moment)
    }
  },

  handleClose() {
    this.setState({isOpen:false});
    this.setFocus();
  },

  handleClick() {
    this.setState({isOpen:true})
  },

  handleFocus() {
//    this.setState({isOpen:true})
  },

  handleBlur() {
//    this.setState({isOpen:false})
  },

  setFocus () {
    if(this.isMounted()){
      console.log(this.refs);
      React.findDOMNode(this.refs.date).focus();
    }
  },

  popover() {
    if(this.state && this.state.isOpen){
      return <SLDSPopover className="slds-dropdown" targetElement={this.refs.date} onClose={this.handleClose}>
        <SLDSDatePicker 
          onChange={this.handleChange}
          selected={this.state.selected}
          onClose={this.handleClose} 
          month={this.state.selected?this.state.selected:Moment()} />
      </SLDSPopover>;
    }
    return <span />;
  },

  handleInputChange() {
    let string = this.refs.date.getDOMNode().value;
    if(Moment().isValid(string)){
      let selected = Moment(string,this.props.format);
      this.setState({
        selected:selected,
        string:string
      });
      if(this.props.onDateChage){
        this.props.onDateChange(selected)
      }
    }
    else{
      this.setState({
        selected:null,
        string:string
      });
    }
  },

  handleKeyDown(event) {
    if (event.keyCode){
      console.log(' KEYYY !!!!!');
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

  render() {
    return (
      <div className="slds-form-element">
        <label className="slds-form-element__label" htmlFor="date">{this.props.label}</label>
        <div className="slds-form-element__control">
          <div className="slds-input-has-icon slds-input-has-icon--right">
            <InputIcon name="event"/>
            <input 
              name="date"
              ref="date" 
              className="slds-input" 
              type="text" 
              placeholder={this.props.placeholder} 
              value={this.state.selected?this.state.string:''}
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