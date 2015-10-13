/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React, { Component } from 'react';
import Menu from './Menu';
import {InputIcon, ButtonIcon} from "./../SLDSIcons";
import {Icon} from "../SLDSIcons";
import {KEYS,EventUtil} from '../utils';
import escapeRegExp from 'lodash.escaperegexp';

const defaultFilter = (term, item) => {
  if(!term) return true;
  return item.label.match(new RegExp(escapeRegExp(term), 'ig'));
};

class SLDSLookup extends React.Component {
  constructor(props) {
    super(props);

    //Dynamically assign ids to list items to reference for focusing and selecting items
    this.props.items.map((item, index) => { return item.id = 'item-' + index; })

    this.state = {
      searchTerm: '',
      isOpen:false,
      currentFocus:null,
      focusIndex:null,
      selectedIndex: null,
      listLength:this.props.items.length
    };
  }

  componentDidUpdate(){
    React.findDOMNode(this.refs.lookup).focus();
  }

  //=================================================
  // Using down/up keys, set Focus on list item and assign it to aria-activedescendant attribute in input.
  // Need to keep track of filtered list length to be able to increment/decrement the focus index so it's contained to the number of available list items.
  increaseIndex(){
    let items = this.state.listLength - 1;
    this.setState({ focusIndex: this.state.focusIndex < items ? this.state.focusIndex + 1 : 0 })
  }

  decreaseIndex(){
    let items = this.state.listLength - 1;
    this.setState({ focusIndex: this.state.focusIndex > 0 ? this.state.focusIndex - 1 : items })
  }

  setFocus(id){
    this.setState({currentFocus:id});
  }

  getListLength(qty){
    if(qty !== this.state.listLength){
      this.setState({listLength:qty});
    }
  }

  //=================================================
  // Select menu item (onClick or on key enter/space)
  selectItem(itemId){
    let index = itemId.replace('item-', '');
    this.setState({
      selectedIndex: index,
      searchTerm: null
    });
  }

  handleDeleteSelected() {
    this.setState({
      selectedIndex: null,
    });
  }

  //=================================================
  // Basic Event Listeners on Input
  handleClose() {
    this.setState({
      isOpen:false,
      focusIndex:null
    })
  }

  handleClick() {
    this.setState({isOpen:true})
  }

  handleBlur() {
    this.handleClose();
  }

  handleFocus() {
    this.setState({ isOpen:true });
  }

  handleChange(event) {
    const target = event.target || event.currentTarget;
    this.setState({ searchTerm: target.value });
  }

  handleKeyDown(event) {
    if(event.keyCode){
      //If user hits esc key, close menu
      event.keyCode === KEYS.ESCAPE ? this.handleClose() : this.handleClick();

      //If user hits tab key, move aria activedescendant to first menu item
      if(event.keyCode === KEYS.TAB && this.state.focusIndex === null){
        this.setState({focusIndex: 0});
        EventUtil.trapImmediate(event);
      }
      //If user hits down key, advance aria activedescendant to next item
      else if(event.keyCode === KEYS.DOWN && this.state.focusIndex !== null){
        EventUtil.trapImmediate(event);
        this.increaseIndex();
      }
      //If user hits up key, advance aria activedescendant to previous item
      else if(event.keyCode === KEYS.UP && this.state.focusIndex !== null){
        EventUtil.trapImmediate(event);
        this.decreaseIndex();
      }

      //If user hits enter/space key, select current activedescendant item
      else if((event.keyCode === KEYS.ENTER || event.keyCode === KEYS.SPACE) && this.state.focusIndex !== null){
        EventUtil.trapImmediate(event);
        this.selectItem(this.state.currentFocus);
      }
    }
  }

  //=================================================
  // Rendering Things
  renderMenu(){
    if(this.state.isOpen){
      return <Menu
        searchTerm={this.state.searchTerm}
        filterWith={this.props.filterWith}
        onSelect={this.selectItem.bind(this)}
        label={this.props.label}
        items={this.props.items}
        setFocus={this.setFocus.bind(this)}
        getListLength={this.getListLength.bind(this)}
        listLength={this.state.listLength}
        focusIndex={this.state.focusIndex}/>;
    }else{
      return null;
    }
  }

  renderSelectedItem(){
    return (
      <div className="slds-pill">
        <a href="#" className="slds-pill__label">
          <span>
            <Icon name="account" />
            {this.props.items[this.state.selectedIndex].label}
          </span>
        </a>
        <button className="slds-button slds-button--icon-bare" onClick={this.handleDeleteSelected.bind(this)} ref="clearSelectedItemButton">
          <ButtonIcon name="close" />
          <span className="slds-assistive-text">Remove</span>
        </button>
      </div>
    );
  }

  render(){
    let inputClasses = this.state.selectedIndex === null ? 'slds-input':'slds-input slds-hide';
    let componentClasses = this.state.selectedIndex === null ? "slds-lookup ignore-react-onclickoutside":"slds-lookup ignore-react-onclickoutside slds-has-selection";

    return (
      <div className={componentClasses} data-select="single" data-scope="single" data-typeahead="true">
        <section className="slds-form-element">
          <label className="slds-form-element__label" forHTML="lookup">{this.props.label}</label>

          <div className="slds-lookup__control slds-input-has-icon slds-input-has-icon--right">
            { this.state.selectedIndex !== null ? this.renderSelectedItem() : null }
            <InputIcon name="search"/>
            <input
              id="lookup"
              ref="lookup"
              className={inputClasses}
              type="text"
              aria-label="lookup"
              aria-haspopup="true"
              aria-autocomplete="list"
              aria-activedescendant={this.state.currentFocus ? this.state.currentFocus:""}
              aria-expanded={this.state.isOpen}
              role="combobox"
              onChange={this.handleChange.bind(this)}
              onFocus={this.handleFocus.bind(this)}
              onBlur={this.handleBlur.bind(this)}
              onClick={this.handleClick.bind(this)}
              onKeyDown={this.handleKeyDown.bind(this)}
              value={this.state.searchTerm} />
          </div>

          {this.renderMenu()}
        </section>
      </div>
    );
  }
}


SLDSLookup.propTypes = {
  items: React.PropTypes.array,
  label: React.PropTypes.string,
};

SLDSLookup.defaultProps = {
  filterWith: defaultFilter,
  onItemSelect: function(item){
  //console.log('onItemSelect should be defined');
  }
};

module.exports = SLDSLookup;

