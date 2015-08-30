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
        console.log('onItemSelect should be defined');
      }
    }
  },

  getInitialState(){
    return {
      searchTerm: '',
      isOpen:false
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

    if(this.refs.clearSelectedItemButton && 
        this.refs.clearSelectedItemButton.getDOMNode &&
        this.refs.clearSelectedItemButton.getDOMNode() ){
      console.log(this.refs.clearSelectedItemButton.getDOMNode());

      this.refs.clearSelectedItemButton.getDOMNode().focus();
    }


  },

  selectedItemContents() {
    return this.state.currentSelectedItem.props.children;
  },

  handleDeleteSelected() {
    this.setState({
      currentSelectedItem: null,
      isOpen: false
    });
    this.refs.date.getDOMNode().focus();
  },

  selectedItemPill() {
    return (<div style={{position:'absolute'}} ref="selectedItem">
        <span className="slds-pill slds-pill--bare" >
          <a href="#" className="slds-pill__label">
            { this.selectedItemContents() }
          </a>
          <button className="slds-button slds-button--icon-bare" onClick={this.handleDeleteSelected} ref="clearSelectedItemButton">
            <ButtonIcon name="close" />
            <span className="slds-assistive-text">Remove</span>
          </button>
        </span>
      </div>
    );
  },

  popover() {
      return (
        this.state.isOpen?
          <SLDSPopover className="slds-dropdown" targetElement={this.refs.date} onClose={this.handleClose}><Body
          searchTerm={this.state.searchTerm}
          filterWith={this.props.filterWith}
          selectedItem={this.selectedItem}
          items={this.props.items}
          label={this.props.label}
          onChange={this.handleChange} /></SLDSPopover>:null);
  },

  getPlaceholder() {
    return this.state.currentSelectedItem?'':this.props.placeholder;
  },

  render() {
    return (
      <div className="slds-lookup ignore-react-onclickoutside" data-select="multi" data-scope="single" data-typeahead="true">
        <div className="slds-form-element">
          <label className="slds-form-element__label">{this.props.label}</label>
          <div className="slds-form-element__control slds-lookup__control slds-input-has-icon slds-input-has-icon--right ">
            { this.state.currentSelectedItem ? this.selectedItemPill() : null }
            <InputIcon name="down"/>
            <input
              ref="date"
              className="slds-input--bare"
              type="text"
              aria-label="lookup"
              aria-haspopup="true"
              aria-autocomplete="list"
              role="combobox"
              placeholder={this.getPlaceholder()} 
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
              onClick={this.handleClick} 
              value={this.state.searchTerm} />
          </div>
          {this.popover()}
        </div>
      </div>
    );
  }
});
