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

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.id = this.props.id || `item-${Item.globalIdx++}-${this.props.idx}`;
  }

  boldSearchText(children) {
    const term = this.props.searchTerm;
    if(!children || !term) return children;
    const regex = new RegExp('(' + term + ')', 'gi');
    return React.Children.map(children, c => {
      return (typeof c === 'string') ? <span dangerouslySetInnerHTML={{ __html: c.replace(regex, '<mark>$1</mark>')}}></span> : c;
    });
  }

  selectedItem(e) {
    e.preventDefault();
    if(e.nativeEvent){
      e.nativeEvent.preventDefault();
      e.nativeEvent.stopImmediatePropagation();
    }
    return this.props.selectedItem(this.props.idx, this);
  }

  getClassName(cls) {
    return classNames(this.props.className, cls);
  }

  render() {
    let className = 'slds-lookup__item';
    let liStyles = {whiteSpace: 'nowrap'};
    let aStyles = null;
    if(this.props.isSelected) className += ' slds-is-selected';

    if(this.props.isHighlighted) {
      liStyles = { background: '#005fb2', whiteSpace: 'nowrap' };
      aStyles = { color: 'white' };
    }

    const tabIndex = this.props.idx === 0 ? 0 : -1;

    return (
      <li
      key={this.id}
      { ...this.props }
      className={className}
      role="presentation"
      tabIndex={tabIndex}
      style={liStyles}>
        <a href={ this.props.href } onClick={this.selectedItem.bind(this)} onMouseDown={this.selectedItem.bind(this)} tabIndex="-1" aria-disabled={ this.props.disabled } role="option" style={aStyles}>
          <Icon name="account" />
          { this.boldSearchText(this.props.children) }
        </a>
      </li>
    );
  }
}
Item.globalIdx = 0;


module.exports = React.createClass({

  displayName: "SLDSLookupList",

  getInitialState: function(){
    return {
      currentSelectedIndex: null
    };
  },

  getDefaultProps: function(){
    return {
    };
  },

  selectedItem: function(idx, item) {
    //console.log(this.props.selectedItem);
    if(this.props.selectedItem) this.props.selectedItem(item);
    this.setState({currentSelectedIndex: idx});
  },

  filter: function(item) {
    return this.props.filterWith(this.props.searchTerm, item);
  },

  items: function() {
    return this.props.items.filter(this.filter, this).map((c, i) => {
      const isSelected = (i === this.state.currentSelectedIndex);
      const isHighlighted = (i === this.props.highlightedIndex && this.props.tabEvent);

      return <Item key={i} isSelected={isSelected} isHighlighted={isHighlighted} idx={i} searchTerm={this.props.searchTerm} selectedItem={this.selectedItem}>{c}</Item>
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
        <ul id="slds-lookup__menu-js" className="slds-lookup__list" role="presentation">
          {this.items()}
        </ul>
      </div>
    );
  },



});
