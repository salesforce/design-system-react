/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React, { Component } from 'react';
import {Icon} from "../../SLDSIcons";
import {KEYS} from '../../utils';
import Item from './Item';

module.exports = React.createClass({

  displayName: "SLDSLookupList",

  getInitialState: function(){
    return {
      currentSelectedIndex: null,
      currentActiveIndex: 0,
    };
  },

  getDefaultProps: function(){
    return {
    };
  },

  componentWillReceiveProps(nextProps){
    let length = this.props.items.length;

    if(nextProps.keyEvent === 'down'){
      this.setState({
        currentActiveIndex: this.state.currentActiveIndex <= length ? this.state.currentActiveIndex + 1 : 0
      });
    }
    else if(nextProps.keyEvent === 'up'){
      this.setState({
        currentActiveIndex: this.state.currentActiveIndex >= 0 ? this.state.currentActiveIndex - 1 : length
      });
    }
  },

  selectedItem: function(idx, item) {
    if(this.props.selectedItem) this.props.selectedItem(item);
    this.setState({currentSelectedIndex: idx});
  },

  filter: function(item) {
    return this.props.filterWith(this.props.searchTerm, item);
  },

  items: function() {
    return this.props.items.filter(this.filter, this).map((c, i) => {
      const isSelected = (i === this.state.currentSelectedIndex);
      let isActive = (i === this.state.currentActiveIndex);

      return <Item key={i} keyEvent={this.props.keyEvent} setActiveDescendant={this.props.setActiveDescendant} isSelected={isSelected} isActive={isActive} idx={i} searchTerm={this.props.searchTerm} selectedItem={this.selectedItem}>{c}</Item>
    });
  },

  render: function() {
    return (
      <div
        className="ignore-react-onclickoutside slds-lookup__menu"
        style={{
          position:'inherit',
          float:'inherit'
        }}
        role="listbox">
        <ul id="slds-lookup__menu-js" className="slds-lookup__list" role="presentation" ref="list">
          {this.items()}
        </ul>
      </div>
    );
  }
});
