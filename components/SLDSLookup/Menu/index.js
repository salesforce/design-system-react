/*
   Copyright (c) 2015, salesforce.com, inc. All rights reserved.
   Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
   Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
   Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
   Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   */

import React, { Component } from 'react';
import Item from './Item';
import {Icon} from "../../SLDSIcons";

class Menu extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  //Set filtered list length in parent to determine active indexes for aria-activedescendent
  componentDidUpdate(prevProps, prevState){
    // make an array of the children of the list
    // but only count the actual items (ignore errors/messages)
    let list = [].slice.call(React.findDOMNode(this.refs.list).children)
      .filter((child) => child.className === "slds-lookup__item").length;
    this.props.getListLength(list);
  }

  filter(item){
    return this.props.filterWith(this.props.searchTerm, item);
  }

  //Scroll menu up/down when using mouse keys
  handleItemFocus (itemIndex, itemHeight) {
    if(this.refs.list){
      React.findDOMNode(this.refs.list).scrollTop = itemIndex * itemHeight;
    }
  }

  renderHeader(){
    return this.props.header;
  }

  renderFooter(){
    if(this.props.footer){
      let footerActive = false;
      let isActiveClass = null;
      if(this.props.focusIndex === this.props.listLength+1){
        footerActive = true;
        isActiveClass = 'slds-theme--shade';
      }else{
        footerActive = false;
        isActiveClass = '';
      }

      return <div className={isActiveClass}>{this.props.footer}</div>;
    }
  }

  renderErrors(){
    return this.props.errors.map((error) => {
      return (
        <li className="slds-lookup__error" aria-live="polite">
          <span>{error}</span>
        </li>
      );
    });
  }

  renderItems(){
    return this.props.items.filter(this.filter, this).map((c, i) => {
      //isActive means it is aria-activedescendant
      const id = c.id;
      let isActive = false;
      if(this.props.header){
        isActive = this.props.focusIndex === i + 1 ? true : false;
      }else{
        isActive = this.props.focusIndex === i  ? true : false;
      }
      return <Item
        key={id}
        id={id}
        type={this.props.type}
        searchTerm={this.props.searchTerm}
        index={i}
        isActive={isActive}
        setFocus={this.props.setFocus}
        handleItemFocus={this.handleItemFocus.bind(this)}
        onSelect={this.props.onSelect}
        data={c.data}
        boldRegex={this.props.boldRegex}
      >
      {c}
      </Item>
    });
  }

  renderContent() {
    if (this.props.errors.length > 0)
      return this.renderErrors()
    else if (this.props.items.length === 0)
      return (
        <li className="slds-lookup__message" aria-live="polite">
          <span>{this.props.emptyMessage}</span>
        </li>
      );

    return this.renderItems();

  }

  render(){
    return (
      <section id="menuContainer">
        {this.renderHeader()}
        <ul id="list" className="slds-lookup__list" role="presentation" ref="list">
          {this.renderContent()}
        </ul>
        {this.renderFooter()}
      </section>
    );
  }
}

Menu.propTypes = {
  searchTerm: React.PropTypes.string,
  label: React.PropTypes.string,
  type: React.PropTypes.string,
  focusIndex: React.PropTypes.number,
  listLength: React.PropTypes.number,
  items: React.PropTypes.array,
  emptyMessage: React.PropTypes.string,
  errors: React.PropTypes.arrayOf(React.PropTypes.string),
  filterWith: React.PropTypes.func,
  getListLength: React.PropTypes.func,
  setFocus: React.PropTypes.func,
  boldRegex: React.PropTypes.instanceOf(RegExp),
};

Menu.defaultProps = {
  emptyMessage: "No matches found."
};

module.exports = Menu;
