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
import {InputIcon} from "./../SLDSIcons";
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
    console.log('selected', item);
    this.setState({currentSelectedItem: item});
  },

  selectedItemContents() {
    return this.state.currentSelectedIndex.props.children;
  },

  selectedItemPill() {
    return (
      <span className="slds-pill slds-pill--bare">
        <a href="#" className="slds-pill__label">
          { this.selectedItemContents() }
        </a>
        <button className="slds-button slds-button--icon-bare">
          <Icon className="slds-button__icon" name="close" />
          <span className="slds-assistive-text">Remove</span>
        </button>
      </span>
    );
  },

  popover() {
    if(this.state && this.state.isOpen){
      return <SLDSPopover className={"slds-lookup__menu"} targetElement={this.refs.date} onClose={this.handleClose}>
        <Body
          searchTerm={this.state.searchTerm}
          filterWith={this.props.filterWith}
          selectedItem={this.selectedItem}
          items={this.props.items}
          onChange={this.handleChange} />
      </SLDSPopover>;
    }
    return <span />;
  },

  render() {
    return (
      <div className="slds-lookup" data-select="multi" data-scope="single" data-typeahead="true">
        <div className="slds-form-element">
          <label className="slds-form-element__label" htmlFor="date">{this.props.label}</label>
          <div className="slds-form-element__control">
            <div className="slds-input-has-icon slds-input-has-icon--right">
              { this.state.currentSelectedIndex ? this.selectedItemPill() : null }
              <InputIcon name="event"/>
              <input
                className="slds-input"
                type="text"
                aria-label="lookup"
                aria-haspopup="true"
                aria-autocomplete="list"
                role="combobox"
                onChange={this.handleChange}
                placeholder={this.props.placeholder}
                onBlur={this.handleBlur}
                onFocus={this.handleFocus}
                onClick={this.handleClick} />
            </div>
          </div>
          {this.popover()}
        </div>
      </div>
    );
  }
});
