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

class Menu extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidUpdate(){
    let list = React.findDOMNode(this.refs.list).children.length;
    this.props.getListLength(list);
  }

  filter(item){
    return this.props.filterWith(this.props.searchTerm, item);
  }

  handleItemFocus (itemIndex, itemHeight) {
    if(this.refs.list){
      React.findDOMNode(this.refs.list).scrollTop = itemIndex * itemHeight;
    }
  }

  renderItems(){
    return this.props.items.filter(this.filter, this).map((c, i) => {
      //isActive means it is aria-activedescendant
      const isActive = this.props.focusIndex === i ? true : false;
      return <Item
      key={c.id}
      id={c.id}
      index={i}
      setFocus={this.props.setFocus}
      isActive={isActive}
      handleItemFocus={this.handleItemFocus.bind(this)}
      onSelect={this.props.onSelect}
      searchTerm={this.props.searchTerm}>{c}</Item>
    });
  }

  render(){
    return (
      <div
      className="ignore-react-onclickoutside slds-lookup__menu"
      role="listbox"
      ref="scroll">
      <ul className="slds-lookup__list"
      role="presentation"
      ref="list">
      {this.renderItems()}
      </ul>
      </div>
    )
  }
}

Menu.propTypes = {
  searchTerm: React.PropTypes.string,
  filterWith: React.PropTypes.func,
  onSelect: React.PropTypes.func,
  label: React.PropTypes.string,
  items: React.PropTypes.array,
  setFocus: React.PropTypes.func,
  getListLength: React.PropTypes.func,
  listLength: React.PropTypes.number,
  focusIndex: React.PropTypes.number,
};

Menu.defaultProps = {
};

module.exports = Menu;
