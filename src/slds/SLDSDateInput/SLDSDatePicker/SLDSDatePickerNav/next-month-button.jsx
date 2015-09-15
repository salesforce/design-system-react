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
import {ButtonIcon} from './../../../SLDSIcons';
import {DateUtil, EventUtil, KEYS} from './../../../utils';

module.exports = React.createClass( {

  getDefaultProps (){
    return {
      focused: false,
      label: 'Next Month',
      onClick (){
        console.log('onClick should be defined');
      },
      onCancel (){
        console.log('onCancel should be defined');
      },
      onMoveFocusNext (){
        console.log('onMoveFocusNext should be defined');
      },
      onMoveFocusPrev (){
        console.log('onMoveFocusPrev should be defined');
      }
    };
  },

  getInitialState () {
    return {
      focused: this.props.focused
    }
  },

  handleClick (e) {
    EventUtil.trap(e);
    if(this.onClick){
      this.onClick();
    }
  },

  handleBlur (e) {
    this.setState({focused:false});
  },

  handleFocus (e) {
    this.setState({focused:true});
  },

  handleKeyDown(event) {
    if(event.keyCode){
      if(event.keyCode === KEYS.UP || event.keyCode === KEYS.LEFT){
        EventUtil.trapEvent(event);
        if(this.props.onMoveFocusPrev){
          this.props.onMoveFocusPrev();
        }
      }
      else if(event.keyCode === KEYS.DOWN || event.keyCode === KEYS.RIGHT){
        EventUtil.trapEvent(event);
        if(this.props.onMoveFocusNext){
          this.props.onMoveFocusNext();
        }
      }
      else if(event.keyCode === KEYS.ENTER || event.keyCode === KEYS.SPACE){
        EventUtil.trapEvent(event);
        if(this.props.onClick){
          this.props.onClick();
        }
      }
    }
  },

  setFocus() {
    React.findDOMNode(this).focus();
  },

  render() {
    return (
        <button 
          ref='nextMonth'
          className='slds-button slds-button--icon-container' 
          autoFocus={this.props.focused}
          onKeyDown={this.handleKeyDown}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onClick={this.handleClick}>
          <ButtonIcon name='right'/>
          <span className='slds-assistive-text'>{this.props.label}</span>
        </button>
    );
  },

  componentDidUpdate (prevProps, prevState) {
    if(this.props.focused && !prevState.focused){
      this.setFocus();
    }
  }

});

