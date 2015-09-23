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
import Calendar from '../SLDSCalendar/index';
import SLDSDatePickerNav from './SLDSDatePickerNav/index';
import {EventUtil} from './../../utils';

import {KEYS} from '../../utils';


module.exports = React.createClass( {

  getDefaultProps () {
    return {
      selectedDate:new Date(),
      value:new Date(),

      onChange (date) {
        console.log('onChange should be defined ',date);
      },

      onDisplayedDateChange (date) {
        console.log('onDisplayedDateChange should be defined ',date);
      },

      onClose () {
        console.log('onClose should be defined');
      },

    };
  },

  getInitialState () {
    return {
      displayedDate: this.props.selectedDate,
      isFocused: false,
      isClosing: false
    };
  },

  handleKeyDown(event) {
    if(event.keyCode){
      if(event.keyCode === KEYS.ESCAPE){
        if(this.props.onClose){
          this.props.onClose();
        }
      }
      else if(event.keyCode === KEYS.SPACE){

      }
      else if(event.keyCode === KEYS.ENTER){

      }
      else if(event.keyCode === KEYS.TAB){
      }
      else{
        EventUtil.trapEvent(event);
      }    
    }
  },

  handleClickOutside (e) {
    e.preventDefault();
    e.stopPropagation();
    if(this.props.onClose){
      this.props.onClose();
    }
  },

  handleDisplayedDateChange (displayedDate){
    if(this.props.onDisplayedDateChange){
      this.props.onDisplayedDateChange(displayedDate);
    }
    this.setState({displayedDate:displayedDate});
  },

  handleSelectDate (selectedDate){
    if(this.props.onChange){
      this.props.onChange(selectedDate);
    }
  },

  handleCancel () {
    if(this.props.onClose){
      this.props.onClose();
    }
  },

  handleBGClick(event) {
    if(event.nativeEvent){
      event.nativeEvent.preventDefault();
    }
  },

  handleFocus () {
    this.setState({isFocused:true});
  },

  handleBlur () {
    this.setState({isFocused:false});
  },

  render() {

    return (
      <div className='ignore-react-onclickoutside'>
        <div className='slds-datepicker'
          aria-hidden={false}
          data-selection='single'
          onMouseDown={this.handleBGClick}
          onKeyDown={this.handleKeyDown}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onClick={this.handleBGClick}>
          <SLDSDatePickerNav 
            onChange={this.handleDisplayedDateChange} 
            selectedDate={this.props.selectedDate}
            autoFocus={true}
            displayedDate={this.state.displayedDate}
            onCancel={this.handleCancel} />
          <Calendar 
            selectedDate={this.props.selectedDate}
            onChange={this.handleDisplayedDateChange}
            displayedDate={this.state.displayedDate} 
            onSelectDate={this.handleSelectDate}
            onCancel={this.handleCancel} />
          <span id='bn_prev-label' className='slds-assistive-text'>Go to previous month</span>
          <span id='bn_next-label' className='slds-assistive-text'>Go to next month</span>
        </div>

      </div>
    );
  },

  componentDidUpdate (prevProps, prevState) {
    if(!this.state.isFocused && prevState.isFocused){
      this.setState({isClosing:true});

      setTimeout ( () => {

        if(this.isMounted()){
          if(this.state.isClosing){
            if(this.state.isFocused){
              this.setState({isClosing:false});
            }
            else{
              if(this.props.onClose){
                this.props.onClose();
              }
            }
          }
        }


      });

    }

  }
});

