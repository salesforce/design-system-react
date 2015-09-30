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
import Body from './Body/index';
import {InputIcon, ButtonIcon} from "./../SLDSIcons";
import {Icon} from "../SLDSIcons";
import _ from "lodash";
import {KEYS,EventUtil} from '../utils';

const defaultFilter = (term, item) => {
  if(!term) return true;
  return item.match(new RegExp(_.escapeRegExp(term), 'ig'));
};

module.exports = React.createClass( {

  getDefaultProps(){
    return {
      placeholder: 'Select an Item',
      filterWith: defaultFilter,
      onItemSelect: function(item){
        //console.log('onItemSelect should be defined');
      }
    }
  },

  getInitialState(){
    return {
      searchTerm: '',
      isOpen:false,
      tabEvent:false,
      highlightedIndex: 0
    };
  },

  handleChange(event) {
    const target = event.target || event.currentTarget;
    this.setState({ searchTerm: target.value });
  },

  handleClose() {
    this.setState({isOpen:false})
  },

  handleClick() {
    this.setState({isOpen:true})
  },

  handleBlur() {
    this.setState({isOpen:false})
  },

  handleFocus() {
    this.setState({isOpen:true})
  },

  selectedItem(item) {
    if(this.props.onItemSelect) this.props.onItemSelect(item);

    this.setState({
      currentSelectedItem: item,
      searchTerm: null
    });
    //console.log("item from onClick ", item);
  },

  selectedItemContents() {
    return <span><Icon name="account" />{this.state.currentSelectedItem.props.children}</span>;
  },

  handleDeleteSelected() {
    this.setState({
      currentSelectedItem: null,
      isOpen: false
    });
  },

  componentDidUpdate( prevProps, prevState) {
    if(prevState.currentSelectedItem && !this.state.currentSelectedItem){
      if(this.refs.date){
        this.refs.date.getDOMNode().focus();
      }
    }
    else if(!prevState.currentSelectedItem && this.state.currentSelectedItem){
      if(this.refs.clearSelectedItemButton &&
        this.refs.clearSelectedItemButton.getDOMNode &&
        this.refs.clearSelectedItemButton.getDOMNode() ){
          this.refs.clearSelectedItemButton.getDOMNode().focus();
      }
    }
  },

  selectedItemPill() {
    return (
        <span className="slds-pill slds-pill--bare" >
          <a href="#" className="slds-pill__label">
            { this.selectedItemContents() }
          </a>
          <button className="slds-button slds-button--icon-bare" onClick={this.handleDeleteSelected} ref="clearSelectedItemButton" onBlur={this.handleClose}>
            <ButtonIcon name="close" />
            <span className="slds-assistive-text">Remove</span>
          </button>
        </span>
    );
  },

  popover() {
      return (
        this.state.isOpen?
          <Body
          ref='list'
          searchTerm={this.state.searchTerm}
          filterWith={this.props.filterWith}
          selectedItem={this.selectedItem}
          items={this.props.items}
          label={this.props.label}
          tabEvent={this.state.tabEvent}
          highlightedIndex={this.state.highlightedIndex}
          onChange={this.handleChange} />:null);
  },

  getPlaceholder() {
    return this.state.currentSelectedItem?'':this.props.placeholder;
  },

  handleKeyDown(event) {
    if(event.keyCode){

      //If user hits esc key, close menu
      event.keyCode === KEYS.ESCAPE ? this.handleClose() : this.handleClick();

      //If user hits tab key, move aria activedescendant to first menu item
      if(event.keyCode === KEYS.TAB){
        EventUtil.trapImmediate(event);
        this.setState({tabEvent:true});
      }
      //If user hits down key, advance aria activedescendant to next item
      else if(event.keyCode === KEYS.DOWN){
        this.setState({highlightedIndex: this.state.highlightedIndex <= this.props.items.length ? this.state.highlightedIndex + 1 : 0})
      }
      //If user hits up key, advance aria activedescendant to previous item
      else if(event.keyCode === KEYS.UP){
        this.setState({highlightedIndex: this.state.highlightedIndex > 0 ? this.state.highlightedIndex - 1 : this.props.items.length})
      }

      else if(event.keyCode === KEYS.ENTER){
        //let list = this.refs.list;
        //let items = list.items();
        //let item = items[this.state.highlightedIndex];
        //console.log("item from Key Enter ", item);
        //this.selectedItem(item);
      }

      /*
      else if(event.keyCode === 13){
        //console.log('enter');
        let list = this.refs.list;
        if(list && list.items){
          let items = list.items();
          if(items && items.length){
            let item = items[0];
            this.selectedItem(item);
            //console.log('FIRST ITEM: ',item);
          }
        }
      }
      */
    }
  },

  render() {
    let className = this.state.currentSelectedItem? 'slds-input--bare slds-hide':'slds-input--bare';
    let activedescendant = this.state.highlightedIndex ?  'item-' +  this.state.highlightedIndex : "";

    return (
      <div className="slds-lookup ignore-react-onclickoutside" data-select="multi" data-scope="single" data-typeahead="true">
        <div className="slds-form-element">
          <label className="slds-form-element__label" forHTML="lookup">{this.props.label}</label>
              <div className="slds-lookup__control slds-input-has-icon slds-input-has-icon--right">

            { this.state.currentSelectedItem ? this.selectedItemPill() : null }
            <InputIcon name="search"/>
            <input
              id="lookup"
              ref="date"
              className={className}
              type="text"
              aria-label="lookup"
              aria-haspopup="true"
              aria-autocomplete="list"
              aria-activedescendant={activedescendant}
              aria-expanded={this.state.isOpen}
              role="combobox"
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onClick={this.handleClick}
              onKeyDown={this.handleKeyDown}
              value={this.state.searchTerm} />
          </div>
          {this.popover()}
        </div>
      </div>
    );
  }
});
