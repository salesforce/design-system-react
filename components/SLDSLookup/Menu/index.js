/*
   Copyright (c) 2015, salesforce.com, inc. All rights reserved.
   Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
   Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
   Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
   Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   */

import React from 'react';
import ReactDOM from 'react-dom';

import Item from './Item';

const displayName = 'SLDSLookup-Menu';
const propTypes = {
  boldRegex: React.PropTypes.instanceOf(RegExp),
  emptyMessage: React.PropTypes.string,
  filterWith: React.PropTypes.func,
  focusIndex: React.PropTypes.number,
  getListLength: React.PropTypes.func,
  iconCategory: React.PropTypes.string,
  items: React.PropTypes.array,
  label: React.PropTypes.string,
  listLength: React.PropTypes.number,
  searchTerm: React.PropTypes.string,
  setFocus: React.PropTypes.func,
  salesforceObj: React.PropTypes.string,
};
const defaultProps = {
  emptyMessage: "No matches found."
};
class Menu extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  //Set filtered list length in parent to determine active indexes for aria-activedescendent
  componentDidUpdate(prevProps, prevState){
    // make an array of the children of the list but only count the actual items
    let list = [].slice.call(ReactDOM.findDOMNode(this.refs.list).children)
      .filter((child) => child.className.indexOf("slds-lookup__item") > -1).length;
    this.props.getListLength(list);
  }

  filter(item){
    return this.props.filterWith(this.props.searchTerm, item);
  }

  filteredItems() {
    return this.props.items.filter(this.filter, this)
  }

  //Scroll menu up/down when using mouse keys
  handleItemFocus(itemIndex, itemHeight){
    if (this.refs.list) {
      ReactDOM.findDOMNode(this.refs.list).scrollTop = itemIndex * itemHeight;
    }
  }

  renderHeader(){
    return this.props.header;
  }

  renderFooter(){
    if (this.props.footer) {
      let footerActive = false;
      let isActiveClass = null;
      if (this.props.focusIndex === this.props.listLength+1) {
        footerActive = true;
        isActiveClass = 'slds-theme--shade';
      }else{
        footerActive = false;
        isActiveClass = '';
      }
      return <div className={isActiveClass}>{this.props.footer}</div>;
    }
  }

  renderItems(){
    return this.filteredItems().map((c, i) => {
      //isActive means it is aria-activedescendant
      const id = c.id;
      let isActive = false;
      if (this.props.header) {
        isActive = this.props.focusIndex === i + 1 ? true : false;
      }else{
        isActive = this.props.focusIndex === i  ? true : false;
      }
      return <Item
        boldRegex={this.props.boldRegex}
        data={c.data}
        handleItemFocus={this.handleItemFocus.bind(this)}
        iconCategory={this.props.iconCategory}
        iconClasses={this.props.iconClasses}
        iconName={this.props.iconName}
        id={id}
        index={i}
        isActive={isActive}
        key={id}
        listItemLabelRenderer={this.props.listItemLabelRenderer}
        onSelect={this.props.onSelect}
        searchTerm={this.props.searchTerm}
        setFocus={this.props.setFocus}
        salesforceObj={this.props.salesforceObj}>
          {c}
      </Item>
    });
  }

  renderContent(){
    if (this.filteredItems().length === 0)
      return (
        <li className="slds-lookup__message" aria-live="polite">
          <span className="slds-m-left--x-large slds-p-vertical--medium">{this.props.emptyMessage}</span>
        </li>
      );

    return this.renderItems();
  }

  render(){
    return (
      <section id="menuContainer" className="ignore-react-onclickoutside">
        {this.renderHeader()}
        <ul id="list" className="slds-lookup__list" role="presentation" ref="list">
          {this.renderContent()}
        </ul>
        {this.renderFooter()}
      </section>
    );
  }
}

Menu.displayName = displayName;
Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

module.exports = Menu;
