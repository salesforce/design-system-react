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
    let list = React.findDOMNode(this.refs.list).children.length;
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
    if(this.props.header){
      let headerActive = false;
      let isActiveClass = null;
      if(this.props.focusIndex === 0){
        headerActive = true;
        isActiveClass = 'slds-theme--shade';
      }else{
        headerActive = false;
        isActiveClass = '';
      }

      return <div className={isActiveClass}>{this.props.header}</div>;
    }
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
  renderMessages(){
    return this.props.messages.map((message) => {
      return <li className="slds-lookup__message" aria-live="polite">{message}</li>;
    });
  }

  renderErrors(){
    return this.props.errors.map((error) => {
      return <li className="slds-lookup__error" aria-live="polite">{error}</li>;
    });
  }

  renderItems(){
    return this.props.items.filter(this.filter, this).map((c, i) => {
      //isActive means it is aria-activedescendant
      const id = c.id;
      let isActive = false;
      if(this.props.header){
        isActive = this.props.focusIndex === i + 1? true : false;
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
      >
      {c}
      </Item>
    });
  }

  renderContent() {
    if (this.props.errors.length)
      return this.renderErrors
    else if (this.props.items.length === 0)
      return <li className="slds-lookup__message" aria-live="polite">{this.props.emptyMessage}</li>;
    
    elements = this.renderItems()
    if (this.props.messages.length){
      return elements.concat(this.renderMessages());
    }
    return elements;

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
    )
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
  messages: React.PropTypes.arrayOf(React.PropTypes.string),
  errors: React.PropTypes.arrayOf(React.PropTypes.string),
  filterWith: React.PropTypes.func,
  getListLength: React.PropTypes.func,
  setFocus: React.PropTypes.func,
};

Menu.defaultProps = {
};

module.exports = Menu;
