/*
   Copyright (c) 2015, salesforce.com, inc. All rights reserved.
   Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
   Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
   Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
   Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   */

import React, { Component } from "react";
import Menu from "./Menu";
import SLDSPopover from "../SLDSPopover";
import {ButtonIcon, Icon, InputIcon} from "./../SLDSIcons";
import SLDSButton from "../SLDSButton";
import {KEYS,EventUtil} from "../utils";
import escapeRegExp from "lodash.escaperegexp";

import DefaultFooter from "./Menu/DefaultFooter";
import DefaultHeader from "./Menu/DefaultHeader";

import cx from "classnames";


const defaultFilter = (term, item) => {
  if(!term) return true;
  return item.label.match(new RegExp(escapeRegExp(term), "ig"));
};

class SLDSLookup extends React.Component {
  constructor(props) {
    super(props);

    //Dynamically assign ids to list items to reference for focusing and selecting items

    this.state = {
      searchTerm: "",
      isOpen:false,
      currentFocus:null,
      focusIndex:null,
      selectedIndex: null,
      listLength:this.props.items.length,
      items:[]
    };
  }

  componentDidUpdate(prevProps, prevState) {
    let lookup = this.props.type + "Lookup";
    if(!isNaN(parseInt(prevState.selectedIndex)) && isNaN(parseInt(this.state.selectedIndex))){
      if(this.refs[lookup]){
        React.findDOMNode(this.refs[lookup]).focus();
      }
    }
    else if(isNaN(parseInt(prevState.selectedIndex)) && !isNaN(parseInt(this.state.selectedIndex))){
      let selectedItem = "pill-" + this.state.selectedIndex;
      if(this.refs[selectedItem]){
        React.findDOMNode(this.refs[selectedItem]).focus();
      }
    }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.items){
      this.modifyItems(newProps.items);
    }
  }

  componentDidMount() {
    this.modifyItems(this.props.items);
  }

  modifyItems(itemsToModify) {
    const items = itemsToModify.map((item, index) => {
      return {
        id : "item-" + index,
        label: item.label,
        data : item
      }
    });

    this.setState({items:items});
  }

  //=================================================
  // Using down/up keys, set Focus on list item and assign it to aria-activedescendant attribute in input.
  // Need to keep track of filtered list length to be able to increment/decrement the focus index so it"s contained to the number of available list items.
  // Adding/subtracting 1 from focusIndex to account for fixed action items (searchRecords and addNewItem buttons)
  increaseIndex() {
    let numFocusable = this.getNumFocusableItems();
    this.setState({ focusIndex: this.state.focusIndex < numFocusable - 1 ? this.state.focusIndex + 1 : 0 });
  }

  decreaseIndex() {
    let numFocusable = this.getNumFocusableItems();
    this.setState({ focusIndex: this.state.focusIndex > 0 ? this.state.focusIndex - 1 : numFocusable - 1 });
  }

  setFocus(id) {
    this.setState({currentFocus:id});
  }

  getListLength(qty) {
    if(qty !== this.state.listLength){
      this.setState({ listLength:qty });
    }
  }

  getNumFocusableItems() {
    let offset = 0
    if(this.refs.footer){
      offset += 1
    }
    if(this.refs.header){
      offset += 1
    }
    return this.state.listLength + offset
  }

  //=================================================
  // Select menu item (onClick or on key enter/space)
  selectItem(itemId) {
    if(itemId){
      const index = itemId.replace("item-", "");
      this.selectItemByIndex(index);
    }
  }

  selectItemByIndex(index){
    if(index >= 0 && index < this.state.items.length){
	    this.setState({
	      selectedIndex: index,
	      searchTerm: null
	    });
	    const data = this.state.items[index].data;
      if(this.props.onItemSelect){
        this.props.onItemSelect(data);
      }
	  }
  }

  handleDeleteSelected() {
    this.setState({
      selectedIndex: null,
      isOpen: true,
    });
    if(this.props.onItemUnselect){
      this.props.onItemUnselect();
    }
  }

  //=================================================
  // Event Listeners on Input
  handleClose() {
    this.setState({
      isOpen:false,
      focusIndex:null,
      currentFocus:null,
    });
  }

  handleCancel(){
    this.setState({
      isOpen:false,
      focusIndex:null,
      currentFocus:null,
    });
  };

  handleClick() {
    this.setState({ isOpen:true });
  }

  handleBlur(event) {
    this.handleClose();
    if(this.props.onBlur){
      const target = event.target || event.currentTarget;
      this.props.onBlur(target.value);
    }
  }

  handleFocus() {
    this.setState({ isOpen:true });
  }

  handleChange(event) {
    const target = event.target || event.currentTarget;
    this.setState({searchTerm: target.value});
    if(this.props.onChange){
      this.props.onChange(target.value);
    }
  }

  handleKeyDown(event) {
    if(event.keyCode){
      //If user hits esc key, close menu
      event.keyCode === KEYS.ESCAPE ? this.handleClose() : this.handleClick();

      //If user hits down key, advance aria activedescendant to next item
      if(event.keyCode === KEYS.DOWN){
        EventUtil.trapImmediate(event);
        this.state.focusIndex === null ? this.setState({ focusIndex: 0 }) : this.increaseIndex();
      }
      //If user hits up key, advance aria activedescendant to previous item
      else if(event.keyCode === KEYS.UP){
        EventUtil.trapImmediate(event);
        let numFocusable = this.getNumFocusableItems()
        this.state.focusIndex === null ? this.setState({ focusIndex: numFocusable - 1 }) : this.decreaseIndex();
      }
      //If user hits enter/space key, select current activedescendant item
      else if((event.keyCode === KEYS.ENTER || event.keyCode === KEYS.SPACE) && this.state.focusIndex !== null){
        EventUtil.trapImmediate(event);
        //If the focus is on the first fixed Action Item in Menu, click it
        if(this.refs.header && this.state.focusIndex === 0){
          React.findDOMNode(this.refs.header).click();
        }
        //If the focus is on the last fixed Action Item in Menu, click it
        else if(this.refs.footer && this.state.focusIndex === (this.state.listLength + 1)){
          React.findDOMNode(this.refs.footer).click();
        }
        //If not, then select menu item
        else{
          this.selectItem(this.state.currentFocus);
        }
      }
    }
  }

  handlePillKeyDown(event){
    if(event.keyCode){
      if(event.keyCode === KEYS.DELETE || event.keyCode === KEYS.BACKSPACE){
        EventUtil.trapImmediate(event);
        this.handleDeleteSelected();
      }
    }
  }

  getHeader(){
    if(this.props.headerRenderer){
      let headerActive = false;
      let isActiveClass = null;
      if(this.state.focusIndex === 0){
        headerActive = true;
        isActiveClass = "slds-theme--shade";
      }else{
        headerActive = false;
        isActiveClass = "";
      }
      const Header = this.props.headerRenderer;
      return <div className={isActiveClass}>
        <Header ref="header" {... this.props}
          searchTerm={this.state.searchTerm}
          focusIndex={this.state.focusIndex}
          listLength={this.state.listLength}
          onClose={this.handleClose.bind(this)}
        />
      </div>;
    }
  }

  getFooter() {
    if(this.props.footerRenderer){
      const Footer = this.props.footerRenderer;
      return <Footer ref="footer" {... this.props}
        focusIndex={this.state.focusIndex}
        listLength={this.state.listLength}
        onClose={this.handleClose.bind(this)}
      />;
    }
  }

  //=================================================
  // Rendering Things
  renderMenuContent() {
    if(this.state.isOpen){
      return <Menu
        searchTerm={this.state.searchTerm}
        label={this.props.label}
        type={this.props.type}
        iconCategory={this.props.iconCategory}
        iconName={this.props.iconName?this.props.iconName:this.props.type}
        iconClasses={this.props.iconClasses}
        focusIndex={this.state.focusIndex}
        listLength={this.state.listLength}
        items={this.state.items}
        emptyMessage={this.props.emptyMessage}
        messages={this.props.messages}
        errors={this.props.errors}
        filterWith={this.props.filterWith}
        getListLength={this.getListLength.bind(this)}
        setFocus={this.setFocus.bind(this)}
        onSelect={this.selectItem.bind(this)}
        header={this.getHeader()}
        footer={this.getFooter()}
        boldRegex={this.props.boldRegex}
        listItemLabelRenderer={this.props.listItemLabelRenderer}
      />;
    }
  }

  renderSimpleMenu() {
    if(this.state.isOpen){
      return <div className="ignore-react-onclickoutside slds-lookup__menu" role="listbox" ref="scroll">
        {this.renderMenuContent()}
      </div>;
    }
  }

  renderModalMenu() {
    let targetElem = this.props.type + "Lookup";
    if(this.state.isOpen){
      return <SLDSPopover
          className="slds-dropdown slds-dropdown--left slds-dropdown--small slds-dropdown--menu"
          targetElement={this.refs[targetElem]}
          closeOnTabKey={true}
          onClose={this.handleCancel.bind(this)}>
          {this.renderMenuContent()}
        </SLDSPopover>;
      }
  }

  renderSelectedItem() {
    let selectedItem = this.props.items[this.state.selectedIndex].label;
    return <span tabIndex="0" className="slds-pill" ref={"pill-" + this.state.selectedIndex} onKeyDown={this.handlePillKeyDown.bind(this)}>
        <span className="slds-pill__label">
          <Icon category={this.props.iconCategory} name={this.props.iconName?this.props.iconName:this.props.type} className={"slds-m-right--x-small " + this.props.iconClasses} />
          {selectedItem}
        </span>
        <SLDSButton
          assistiveText="Press delete to remove"
          tabIndex="-1"
          variant="icon"
          iconName="close"
          iconSize="medium"
          onClick={this.handleDeleteSelected.bind(this)}
          ref="clearSelectedItemButton"
          className="slds-m-left--x-small "
        />
      </span>
  }

  render() {
    const inputClasses = this.state.selectedIndex === null ? "slds-input":"slds-input slds-hide";
    const componentClasses = this.state.selectedIndex === null ? "slds-lookup ignore-react-onclickoutside":"slds-lookup ignore-react-onclickoutside slds-has-selection";

    const inputContainerClasses = {
      "slds-lookup__control": true,
      "slds-input-has-icon":true,
      "slds-input-has-icon--right": true,
      "slds-input": this.state.selectedIndex !== null,
      "slds-has-error":this.props.hasError
    };

    const inputContainerStyle = this.state.selectedIndex === null ? {} : {padding: "5px"};
    const inputLabel = this.props.label?<label className="slds-form-element__label" htmlFor={this.props.type + "Lookup"}>{this.props.label}</label>:null;

    return (
      <div className={componentClasses} data-select="multi" data-scope="single" data-typeahead="true">
        <section className="slds-form-element">

          {inputLabel}

          <div className={cx(inputContainerClasses)} style={inputContainerStyle}>
            { this.state.selectedIndex !== null ? this.renderSelectedItem() : null }
            <InputIcon name="search"/>
            <input
              id={this.props.type + "Lookup"}
              ref={this.props.type + "Lookup"}
              className={inputClasses}
              type="text"
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
              value={this.state.searchTerm}
            />
          </div>
          {this.props.modal?this.renderModalMenu():this.renderSimpleMenu()}
        </section>
      </div>
    );
  }
}

SLDSLookup.propTypes = {
  items: React.PropTypes.array,
  emptyMessage: React.PropTypes.string,
  messages: React.PropTypes.arrayOf(React.PropTypes.string),
  errors: React.PropTypes.arrayOf(React.PropTypes.string),
  label: React.PropTypes.string,
  type: React.PropTypes.string,
  iconCategory: React.PropTypes.string,
  iconName: React.PropTypes.string,
  filterWith: React.PropTypes.func,
  onItemSelect: React.PropTypes.func,
  onItemUnselect: React.PropTypes.func,
  onChange: React.PropTypes.func,
  onBlur: React.PropTypes.func,
  modal: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  hasError: React.PropTypes.bool,
  boldRegex: React.PropTypes.instanceOf(RegExp),
  listItemLabelRenderer: React.PropTypes.func
};

SLDSLookup.defaultProps = {
  filterWith: defaultFilter,
  modal: false,
  disabled: false,
};

module.exports = SLDSLookup;
module.exports.DefaultHeader = DefaultHeader;
module.exports.DefaultFooter = DefaultFooter;

