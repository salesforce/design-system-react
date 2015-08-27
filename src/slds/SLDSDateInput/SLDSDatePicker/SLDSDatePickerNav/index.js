/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React, { Component } from 'react';
import moment from 'moment';
import SLDSSelectYear from '../../SLDSYearSelector/index';
import {ButtonIcon} from "./../../../SLDSIcons";

module.exports = React.createClass( {

  getDefaultProps: function(){
    return {
      selectedMoment:moment(),
      moment:moment(),
      onChangeMonth:function(){
        console.log('onChangeMonth should be defined');
      }
    }
  },

  handleClick: function(event){
    event.preventDefault();
    event.stopPropagation();
  },

  handleChangeMonth: function(moment){
    if(this.props.onChangeMonth){
      this.props.onChangeMonth(moment);
    }
  },

  previousMonth: function(event){
    if(this.props.selectedMoment && this.handleChangeMonth){
      this.props.selectedMoment.subtract(1, 'months');
      this.handleChangeMonth(this.props.selectedMoment)
    }
  },

  nextMonth: function(event){
    if(this.props.selectedMoment && this.handleChangeMonth){
      this.props.selectedMoment.add(1, 'months');
      this.handleChangeMonth(this.props.selectedMoment)
    }
  },

  handleYearSelect(moment) {
    if(this.props.onChangeMonth){
      this.props.onChangeMonth(moment);
    }
  },

  render() {
    return (

      <div className="slds-datepicker__filter slds-grid">
        <div className="slds-datepicker__filter--month slds-grid slds-grid--align-spread slds-size--3-of-4">
          <div className="slds-align-middle" role="button" aria-labelledby="bn_prev-label" tabIndex="0">
            <button className="slds-button slds-button--icon-container" onClick={this.previousMonth}>
              <ButtonIcon name="left" />
              <span className="slds-assistive-text">Previous Month</span>
            </button>
          </div>

          <div id="month" className="slds-align-middle" role="heading" aria-live="assertive" aria-atomic="true">{this.props.moment.format("MMMM YYYY")}</div>
          <div className="slds-align-middle" role="button" aria-labelledby="bn_next-label" tabIndex="0">
            <button className="slds-button slds-button--icon-container" onClick={this.nextMonth}>
              <ButtonIcon name="right"/>
              <span className="slds-assistive-text">Next Month</span>
            </button>
          </div>
        </div>
        <div className="slds-picklist datepicker__filter--year slds-shrink-none">
          <SLDSSelectYear 
            moment={this.props.moment} 
            selected={this.props.selected} 
            onSelect={this.handleYearSelect} />
        </div>
      </div>

    );
  }
});

