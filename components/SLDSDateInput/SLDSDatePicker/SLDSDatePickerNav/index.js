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
import SLDSSelectYear from '../../SLDSYearSelector/index';
import ButtonIcon from './../../../SLDSIcon/ButtonIcon';
import {DateUtil, EventUtil, KEYS} from './../../../utils';

module.exports = React.createClass( {

  getDefaultProps (){
    return {
      displayedDate:new Date(),
      monthLabels:['January','February','March','April','May','June','July','August','September','October','November','December'],
      onChangeMonth (){
        console.log('onChangeMonth should be defined');
      }
    };
  },

  handleClick (event){
    event.preventDefault();
    event.stopPropagation();
  },

  handleChange (displayedDate){
    if(this.props.onChange){
      this.props.onChange(displayedDate);
    }
  },

  handleCancel(){
    if(this.props.onCancel){
        this.props.onCancel();
    }
  },

  previousMonth (){
    if(this.props.displayedDate && this.handleChange){
      this.handleChange(DateUtil.addMonths(this.props.displayedDate,-1));
    }

  },

  componentDidMount () {
  },

  nextMonth (){
    if(this.props.displayedDate && this.handleChange){
      this.handleChange(DateUtil.addMonths(this.props.displayedDate,1));
    }
  },

  handleYearSelect (displayedDate) {
    if(this.props.onChange){
      this.props.onChange(displayedDate);
    }
  },

  handleKeyDown (event) {
    if(event.keyCode === KEYS.TAB){
      if(event.shiftKey){
        EventUtil.trapEvent(event);
        this.handleCancel();
      }
    }
  },

  getMonthLabel(){
    return this.props.monthLabels[new Date(this.props.displayedDate).getMonth()];
  },

  render() {
    return (

      <div className='slds-datepicker__filter slds-grid'>
        <div className='slds-datepicker__filter--month slds-grid slds-grid--align-spread slds-size--3-of-4'>
          <div className='slds-align-middle' role='button' aria-labelledby='bn_prev-label' tabIndex={-1}>
            <button 
              ref='prevMonth'
              className='slds-button slds-button--icon-container'
              autoFocus={this.props.autoFocus}
              role='button'
              tabIndex={0}
              onKeyDown={this.handleKeyDown}
              onClick={this.previousMonth}>
              <ButtonIcon name='left' />
              <span className='slds-assistive-text'>Previous Month</span>
            </button>
          </div>

          <div id='month' className='slds-align-middle' role='heading' aria-live='assertive' aria-atomic={true}>{this.getMonthLabel()}</div>
          <div className='slds-align-middle' role='button' aria-labelledby='bn_next-label' tabIndex={-1}>
            <button 
              ref='nextMonth'
              className='slds-button slds-button--icon-container' 
              onClick={this.nextMonth}>
              <ButtonIcon name='right'/>
              <span className='slds-assistive-text'>Next Month</span>
            </button>
          </div>
        </div>
        <div className='slds-picklist datepicker__filter--year slds-shrink-none'>
          <SLDSSelectYear 
            displayedDate={this.props.displayedDate} 
            onChange={this.handleYearSelect} />
        </div>
      </div>

    );
  }
});

