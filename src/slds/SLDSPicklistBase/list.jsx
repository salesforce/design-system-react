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
import ListItem from "./list-item";

module.exports = React.createClass({

  displayName: "SLDSPicklistBase-list",

  getInitialState () {
    return {};
  },

  getDefaultProps () {
    return {
      options:[],
      selectedIndex:-1,
      highlightedIndex:0,
      onListBlur:()=>{
        console.log("onListBlur should be overwritten");
      },
      onMoveFocus:(delta)=>{
        console.log("onMoveFocus should be overwritten");
      },
      onCancel:(delta)=>{
        console.log("onCancel should be overwritten");
      },
      onSelect:(index)=>{
        console.log("onSelect should be overwritten");
      }
    };
  },

  handleClick (e) {
    if(e.nativeEvent){
      e.nativeEvent.preventDefault();
      e.nativeEvent.stopImmediatePropagation();
    }
    e.preventDefault();
  },

  handleUpdateHighlighted (nextIndex) {
    if(this.props.onUpdateHighlighted){
      this.props.onUpdateHighlighted(nextIndex);
    }
  },

  handleListItemBlur (relatedTarget) {
    setTimeout(()=>{
      if(this.isMounted()){
        if(!this.getDOMNode().contains(document.activeElement)){
          if(this.props.onListBlur){
            this.props.onListBlur();
          }
        }
      }
    }.bind(this),0);
  },

  handleMoveFocus (delta) {
    let newHighlightedIndex = this.props.highlightedIndex + delta;
    if(newHighlightedIndex < 0){
      newHighlightedIndex = this.props.options.length - 1;
    }
    else if(newHighlightedIndex >= this.props.options.length){
      newHighlightedIndex = 0; 
    }
    if(this.props.onUpdateHighlighted){
      this.props.onUpdateHighlighted(newHighlightedIndex);
    }
  },

  handleCancel () {
    if(this.props.onCancel){
      this.props.onCancel();
    }
  },

  handleSelect (index) {
    if(this.props.onSelect){
      this.props.onSelect(index);
    }
  },

  handleItemFocus (itemIndex, itemHeight) {
    setTimeout( ()=>{
      if(this.refs.scroll){
        this.refs.scroll.getDOMNode().scrollTop = itemIndex * itemHeight;
      }
    }.bind(this),0);
  },

  handleSearch (index, ch) {
    const searchChar = ch.toLowerCase();
    for(let i=index+1;i<this.props.options.length;i++){
      const option = this.props.options[i];
      if(option && option.label){
        if(option.label.charAt(0).toLowerCase() === searchChar){
          if(this.props.onUpdateHighlighted){
            this.props.onUpdateHighlighted(i);
          }
          return;
        }
      }
    }
    for(let i=0;i<index;i++){
      const option = this.props.options[i];
      if(option && option.label){
        if(option.label.charAt(0).toLowerCase() === searchChar){
          if(this.props.onUpdateHighlighted){
            this.props.onUpdateHighlighted(i);
          }
          return;
        }
      }
    }
  },

  getItems () {
    return this.props.options.map((option, index) =>{
      return (
        <ListItem 
          index={index} 
          label={option.label}
          value={option.value} 
          isHighlighted={(index===this.props.highlightedIndex)}
          isSelected={(index===this.props.selectedIndex)} 
          onUpdateHighlighted={this.handleUpdateHighlighted} 
          onMoveFocus={this.handleMoveFocus}
          onBlur={this.handleListItemBlur}
          onFocus={this.handleItemFocus} 
          onSelect={this.handleSelect}
          onSearch={this.handleSearch}
          onCancel={this.handleCancel}/>
      );
    });
  },

  render () {
    return (
      <div 
        ref="scroll"
        className="slds-wrap slds-grow slds-scrollable--y"
        style={{
//          position:'inherit',
//          float:'inherit',
          maxHeight:260
        }}
        role="listbox"
        >
        <ul 
          ref="scroll"
          className={"slds-dropdown__list slds-theme--"+this.props.theme}
          role="menu" 
          aria-labelledby="foo">
          { this.getItems() }
        </ul>
      </div>
    );
  },



});
