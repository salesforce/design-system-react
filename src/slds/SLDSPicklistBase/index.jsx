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
import List from './list';

import {InputIcon, ButtonIcon} from "./../SLDSIcons";
import {Icon} from "../SLDSIcons";

const ENTER = 13;
const ESCAPE = 27;
const SPACE = 32;
const LEFT = 37;
const UP = 38;
const RIGHT = 39;
const DOWN = 40;
const TAB = 9;

module.exports = React.createClass( {

  getDefaultProps(){
    return {
      placeholder: 'Select an Option',
      disabled: false,
      theme: 'default',
      options: [],
      onItemSelect: function(item){
        console.log('onItemSelect should be defined');
      },
      onUpdateHighlighted (nextIndex) {
        console.log('onUpdateHighlighted should be defined');
      }
    }
  },

  getInitialState(){
    return {
      isOpen:false,
      highlightedIndex:0,
      selectedIndex:-1
    };
  },

  handleSelect(index) {
    setTimeout(()=>{
      this.setFocus();
    }.bind(this));
    this.setState({selectedIndex:index})
  },

  handleClose() {
    this.setState({isOpen:false});
  },

  handleClick() {
    this.setState({isOpen:true})
  },

  handleBlur(e) {
    if(this.refs.list){
      setTimeout(()=>{
        if(this.isMounted() && this.refs.list){
          if(this.refs.list.getDOMNode().contains(document.activeElement)){
            return;
          }
          this.setState({isOpen:false})
        }
      }.bind(this));
    }
  },

  handleFocus() {
    this.setState({isOpen:false});
  },

  setFocus () {
    if(this.isMounted()){
      this.refs.button.getDOMNode().focus();
    }
  },

  moveHighlight(delta) {
  },

  handleKeyDown(event) {
    if (event.keyCode){
      if (event.keyCode === ENTER || 
          event.keyCode === SPACE || 
          event.keyCode === DOWN || 
          event.keyCode === RIGHT || 
          event.keyCode === LEFT || 
          event.keyCode === UP){
        this.trapEvent(event);
        this.setState({
          isOpen:true,
          highlightedIndex:0
        });
      }
    }
  },

  componentDidUpdate( prevProps, prevState) {
    if(this.state.selectedIndex !== prevState.selectedIndex){
      this.handleClose();
    }
  },

  handleUpdateHighlighted(nextIndex){
    this.setState({highlightedIndex:nextIndex});
  },

  handleListBlur(){
//    this.setState({isOpen:false});
  },

  handleCancel () {
    this.setFocus();
  },

  trapEvent(event){
    event.preventDefault();
    event.stopPropagation();
  },

  getPopover() {
/*
        <SLDSPopover 
          ref="popover"
          className="slds-dropdown slds-dropdown--left slds-dropdown--small slds-dropdown--menu" 
          targetElement={this.refs.button} 
          style={{maxHeight:'20em'}}
          onClose={this.handleClose}>
*/
    return (
      !this.props.disabled && this.state.isOpen?
        <div 
          ref="popover"
          className="slds-dropdown slds-dropdown--left slds-dropdown--small slds-dropdown--menu" 
          targetElement={this.refs.button} 
          style={{maxHeight:'20em'}}>
          <List
            ref='list'
            options={this.props.options}
            label={this.props.label}
            highlightedIndex={this.state.highlightedIndex}
            selectedIndex={this.state.selectedIndex}
            onSelect={this.handleSelect} 
            onUpdateHighlighted={this.handleUpdateHighlighted} 
            onListBlur={this.handleListBlur}
            onCancel={this.handleCancel.bind(this)}
            theme={this.props.theme} />
        </div>:null
    );
  },

  getPlaceholder() {
    const option = this.props.options[this.state.selectedIndex];
    return (option && option.label)?option.label:this.props.placeholder;
  },


  render() {
    let className = this.state.currentSelectedItem? 'slds-input--bare slds-hide':'slds-input--bare';
    return (

      <div className={"slds-form-element  ignore-react-onclickoutside slds-theme--"+this.props.theme}>
        <div className={"slds-picklist slds-theme--"+this.props.theme}>
          <button 
            id={this.props.id}
            ref="button"
            className="slds-button slds-button--neutral slds-picklist__label" 
            aria-haspopup="true"
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            onClick={this.handleClick}
            tabIndex={this.state.isOpen?-1:0}
            onKeyDown={this.handleKeyDown} >
            <span className="slds-truncate">{this.getPlaceholder()}</span>
            <Icon name="down" category="utility" />
          </button>
          {this.getPopover()}
        </div>

      </div>
    );
  }
});
