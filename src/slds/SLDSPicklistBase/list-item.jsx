/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React, { Component } from 'react';
import {Icon} from "../SLDSIcons";

const ENTER = 13;
const ESCAPE = 27;
const SPACE = 32;
const LEFT = 37;
const UP = 38;
const RIGHT = 39;
const DOWN = 40;
const TAB = 9;

module.exports = React.createClass({

  displayName: "SLDSPicklistBase-list-item",

  getDefaultProps () {
    return {
      index: 0,
      label: "",
      value: null,
      inverted: false,
      isSelected: false,
      isHighlighted: false,

      onSelect (index) {
        console.log('onSelect should be defined');
      },
      onClick (index) {
        console.log('onClick should be defined');
      },
      onMoveFocus (delta){
        console.log('onMoveFocus should be defined');
      },
      onBlur (relatedTarget){
        console.log('onBlur should be defined');
      },
      onFocus (index, height) {
        console.log('onFocus should be defined');
      }
    };
  },

  handleClick (e) {
    e.preventDefault();
    e.stopPropagation();
    if(this.props.onSelect){
      this.props.onSelect(this.props.index);
    }
  },

  handleMouseDown (e) {
    if(e.nativeEvent){
      e.nativeEvent.preventDefault();
      e.nativeEvent.stopImmediatePropagation();
    }
    e.preventDefault();
  },

  trapEvent(event){
    event.preventDefault();
    event.stopPropagation();
  },

  componentDidMount(){
    if(this.props.isHighlighted){
      setTimeout(()=>{
          this.getDOMNode().focus();
        }.bind(this),0);
    }
  },

  componentDidUpdate( prevProps, prevState) {
    if(!prevProps.isHighlighted && this.props.isHighlighted){
      this.getDOMNode().focus();
    }
  },

  handleKeyDown(event) {

    if(event.keyCode){
      if(event.keyCode === DOWN){
        this.trapEvent(event);
        if(this.props.onMoveFocus){
          this.props.onMoveFocus(1);
        }
      }
      else if(event.keyCode === UP){
        this.trapEvent(event);
        if(this.props.onMoveFocus){
          this.props.onMoveFocus(-1);
        }
      }
      else if(event.keyCode === ENTER || 
          event.keyCode === SPACE || 
          event.keyCode === RIGHT || 
          event.keyCode === LEFT ){
        this.trapEvent(event);
        if(this.props.onSelect){
          this.props.onSelect(this.props.index);
        }
      }
      else if(event.keyCode == ESCAPE){
        this.trapEvent(event);
        if(this.props.onCancel){
          this.props.onCancel();
        }
      }
      else if(event.keyCode == TAB){
      }
      else{
        this.trapEvent(event);
        const ch = String.fromCharCode(event.keyCode);
        if(this.props.onSearch){
          this.props.onSearch(this.props.index,ch);
        }
      }
    }
  },

  handleBlur(e) {
    if(this.props.onBlur){
      this.props.onBlur(e.nativeEvent.relatedTarget);
    }
  },

  handleFocus (event) {
    const height = this.getDOMNode().offsetHeight;
    if(height && this.props.onFocus){
      this.props.onFocus(this.props.index,height);
    }
  },

  render () {
    return (
      <li 
        id={"menu-0-"+this.props.index}
        className={"slds-dropdown__item slds-has-icon slds-has-icon--left slds-theme--"+this.props.theme}
        onMouseDown={this.handleMouseDown}
        aria-checked={this.props.isSelected}
        onKeyDown={this.handleKeyDown}
        tabIndex={-1}
        onBlur={this.handleBlur}
        onClick={this.handleClick}
        onFocus={this.handleFocus} >
          <a 
            href="#"
            ref="link"
            className="slds-truncate" 
            role="menuitemradio"
            onClick={this.handleClick}
            onMouseDown={this.handleMouseDown}
            onKeyDown={this.handleKeyDown}
            onBlur={this.handleBlur}
            tabIndex={-1}>
              {this.props.isSelected?<Icon name="task2" size="small" position="left" category="standard" />:null}
              {this.props.label}
          </a>
      </li>
    );
  },



});
