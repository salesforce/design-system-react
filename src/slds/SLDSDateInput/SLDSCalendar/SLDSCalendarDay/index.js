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
import {KEYS,EventUtil,DateUtil} from '../../../utils';

module.exports = React.createClass({


  getDefaultProps () {
    return {

      onSelectDate (date) {
        console.log('onSelectDate should be defined ',date);
      },

      onClick (index) {
        console.log('onClick should be defined ',index);
      },

      onMoveFocus (delta){
        console.log('onMoveFocus should be defined ',delta);
      },

      onBlur (relatedTarget){
        console.log('onBlur should be defined ',relatedTarget);
      },

      onFocus (index, height) {
        console.log('onFocus should be defined ',index,height);
      },

      onCancel () {
        console.log('onCancel should be defined');
      }

    };
  },

  handleClick (event) {
    if(this.props.onSelectDate){
      this.props.onSelectDate(this.props.date);
    }
    if(event.nativeEvent){
      event.nativeEvent.stopImmediatePropagation();
      event.nativeEvent.preventDefault();
    }
  },


  handleKeyDown(event) {
    if(event.keyCode){
      if(event.keyCode === KEYS.ENTER || 
        event.keyCode === KEYS.SPACE ){
        EventUtil.trapEvent(event);
        if(this.props.onSelectDate){
          this.props.onSelectDate(this.props.date);
        }
      }
      else if(event.keyCode === KEYS.ESCAPE){
        EventUtil.trapEvent(event);
        if(this.props.onCancel){
          this.props.onCancel();
        }
      }
      else if(event.keyCode === KEYS.TAB){
        if(DateUtil.isLastDayOfMonth(this.props.date)){
          EventUtil.trapEvent(event);
          if(this.props.onCancel){
            this.props.onCancel();
          }
        }
      }
      else{
        EventUtil.trapEvent(event);
      }
    }
  },

  render () {

    const isCurrentMonth = DateUtil.isCurrentMonth(this.props.date);
    const isToday = DateUtil.isToday(this.props.date);

    return (
      <td role='gridcell'
        aria-disabled={!isCurrentMonth}
        aria-selected={isToday}
        tabIndex={isCurrentMonth?0:-1} 
        className={(isToday ? ' slds-is-today' : '') + (isCurrentMonth ? '' : ' slds-disabled-text') + (DateUtil.isSameDay(this.props.selected) ? ' slds-is-selected' : '')} 
        onClick={this.handleClick}
        onMouseDown={this.handleClick}
        onKeyDown={this.handleKeyDown} >
        <span className='slds-day'>
          {this.props.date.getDate()}
        </span>
      </td>
    );
  }
});
