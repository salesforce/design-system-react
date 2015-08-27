/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
const PT = React.PropTypes;

import {textContent, hasChild} from '../utils/dom';

const defaultFilter = (term, item) => {
  return textContent(item.props.children).match(new RegExp(_.escapeRegExp(term), 'ig'));
};

class DropdownFilter extends React.Component {
  getClassName(cls) {
    return classNames(this.props.className, cls);
  }

  render() {
    return (
      <div { ...this.props } className={this.getClassName('slds-input-has-icon slds-input-has-icon--left slds-m-bottom--x-small')}>
        <label className="slds-assistive-text" />
        <input id="input__filter" className="slds-input" type="text" placeholder={ this.props.placeholder } onChange={ this.props.termChanged } />
      </div>
    );
  }
}

DropdownFilter.propTypes = { placeholder: PT.string };
DropdownFilter.defaultProps = { placeholder: 'Search...' };



class DropdownTitle extends React.Component {
  render() {
    return (
      <span className="slds-text-heading--label">{ this.props.children }</span>
    );
  }
}

class DropdownHeader extends React.Component {
  getClassName(cls) {
    return classNames(this.props.className, cls)
  }

  childProps(i) {
    return { termChanged: this.props.termChanged, filterWith: this.props.filterWith, hasFilter: this.props.hasFilter, key: i };
  }

  children() {
    return React.Children.map(this.props.children, (c, i) => React.cloneElement(c, this.childProps(i)));
  }

  render() {
    return (
      <div { ...this.props } className={this.getClassName('slds-dropdown__header')}>
        { this.children() }
      </div>
    );
  }
}


class DropdownItem extends React.Component {
  constructor(props) {
    super(props);
    this.id = this.props.id || `menu-${DropdownItem.globalIdx++}-${this.props.idx}`;
  }

  shouldRenderItem(term) {
    return this.props.hasFilter ? this.props.filterWith(this.props.searchTerm, this) : true;
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
    if(!this.props.isSelectable) return;
    e.preventDefault();
    if(this.props.itemSelected) this.props.itemSelected(this, this.props.idx);
    return this.props.selectedItem(this.props.idx);
  }

  itemFocused() {
    return this.props.itemFocused(this.id);
  }

  isSelected() {
    return this.props.isSelectable && this.props.currentSelection === this.props.idx;
  }

  getClassName(cls) {
    return classNames(this.props.className, cls);
  }

  renderItem() {
    const tabIndex = this.props.idx === 0 ? 0 : -1;
    const className = this.getClassName(classNames('slds-dropdown__item', {
      ['slds-is-selected']: this.isSelected(),
      ['slds-has-icon--left']: this.props.isSelectable
    }));
    return (
      <li id={this.id} onClick={this.selectedItem.bind(this)} { ...this.props } className={className} role="menuitem option" tabIndex={tabIndex} onFocus={this.itemFocused.bind(this)}>
        <a href={ this.props.href } tabIndex="-1" aria-disabled={ this.props.disabled } className="slds-truncate">
          { this.boldSearchText(this.props.children) }
        </a>
      </li>
    );
  }

  render() {
    return this.shouldRenderItem() ? this.renderItem() : null;
  }
}
DropdownItem.globalIdx = 0;



class DropdownList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentSelection: null };
  }

  selectedItem(item) {
    this.setState({currentSelection: item});
  }
  childProps(i) {
    return { searchTerm: this.props.searchTerm, filterWith: this.props.filterWith, hasFilter: this.props.hasFilter, selectedItem: this.selectedItem.bind(this), isSelectable: this.props.isSelectable, itemFocused: this.props.itemFocused, itemSelected: this.props.itemSelected, key: i };
  }

  children() {
    return React.Children.map(this.props.children, (c, i) => {
      return React.cloneElement(c, _.extend({currentSelection: this.state.currentSelection, idx: i}, this.childProps(i)));
    });
  }

  getClassName(cls) {
    return classNames(this.props.className, cls);
  }

  render() {
    return (
      <ul { ...this.props } className={this.getClassName('slds-dropdown__list')} role="menu">
        { this.children() }
      </ul>
    );
  }
}
DropdownList.defaultProps = { isSelectable: true };


class Dropdown extends React.Component {

  constructor(props) {
    super(props);
    this.state = { searchTerm: '' };
    this.hasFilter = hasChild(this.props.children, 'DropdownFilter');
  }

  childProps(i) {
    return { searchTerm: this.state.searchTerm, termChanged: this.termChanged.bind(this), filterWith: this.props.filterWith, hasFilter: this.hasFilter, itemFocused: this.props.itemFocused, itemSelected: this.props.itemSelected, key: i };
  }

  termChanged(event) {
    const target = event.target || event.currentTarget;
    this.setState({ searchTerm: target.value });
  }

  menuClassName() {
    return classNames('slds-dropdown', this.props.className, {
      ['slds-dropdown--menu']: !this.hasFilter,
      ['slds-dropdown--search']: this.hasFilter,
      ['slds-hide']: this.props.hidden
    });
  }

  children() {
    return React.Children.map(this.props.children, (c, i) => React.cloneElement(c, this.childProps(i)));
  }

  render() {
    return (
      <div { ...this.props } className={this.menuClassName()}>
        { this.children() }
      </div>
    );
  }
}
Dropdown.propTypes = {filterWith: PT.func};
Dropdown.defaultProps = { filterWith: defaultFilter, itemFocused: function(){} };

Dropdown.Header = DropdownHeader;
Dropdown.Filter = DropdownFilter;
Dropdown.Title = DropdownTitle;
Dropdown.List = DropdownList;
Dropdown.Item = DropdownItem;

module.exports = Dropdown;
