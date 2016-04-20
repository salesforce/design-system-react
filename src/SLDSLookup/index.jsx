/*
   Copyright (c) 2015, salesforce.com, inc. All rights reserved.
   Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
   Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
   Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
   Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   */

import React from "react";
import ReactDOM from "react-dom";
import escapeRegExp from "lodash.escaperegexp";

import SLDSPopover from "../SLDSPopover";
import SLDSButton from "../SLDSButton";
import SLDSIcon from "../SLDSIcon";
import InputIcon from "../SLDSIcon/InputIcon";
import {KEYS,EventUtil} from "../utils";

import Menu from "./Menu";
import DefaultFooter from "./Menu/DefaultFooter";
import DefaultHeader from "./Menu/DefaultHeader";
import cx from "classnames";

const displayName = "SLDSLookup";
const propTypes = {
  /**
   * Custom message that renders when no matches found. The default empty state is just text that says, "No matches found.".
   */
  emptyMessage: React.PropTypes.string,
  /**
   * Custom function to filter the Lookup items when typing into input field. The default function is case-insensitive and uses the searchTerm to filter Lookup items on their labels.
   */
  filterWith: React.PropTypes.func,
  /**
   * Custom component for Lookup footer. The default footer allows user to add new item - see <a href="http://www.lightningdesignsystem.com/components/lookups/#base">Lightning Design System Lookup > Base</a>. To use the default footer, pass in <code>SLDSLookup.DefaultFooter</code>.
   */
  footerRenderer: React.PropTypes.func,
  /**
   * Custom component for Lookup header. The default header has a search icon and shows the search term - see <a href="http://www.lightningdesignsystem.com/components/lookups/#base">Lightning Design System Lookup > Base</a>. To use the default header, pass in <code>SLDSLookup.DefaultHeader</code>.
   */
  headerRenderer: React.PropTypes.func,
  /**
   * Please refer to <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to view categories.
   */
  iconCategory: React.PropTypes.string,
  /**
   * If true, icon color is white. If false, icon color is the default text color.
   */
  iconInverse: React.PropTypes.bool,
  /**
   * Name of icon. Please refer to <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to view icon names.
   */
  iconName: React.PropTypes.string,
  label: React.PropTypes.string,
  /**
   * Custom component that overrides the default Lookup Item component.
   */
  listItemLabelRenderer: React.PropTypes.func,
  /**
   * If true, component renders specifically to work inside Modal.
   */
  modal: React.PropTypes.bool,
  /**
   * If true, constrains the menu to the scroll parent. Has no effect if modal is false.
   */
  constrainToScrollParent: React.PropTypes.bool,
  /**
   * If true, the menu is constrained to the window and may be flipped up. Has no effect if modal is false.
   */
  flippable: React.PropTypes.bool,
  onBlur: React.PropTypes.func,
  onChange: React.PropTypes.func,
  onSelect: React.PropTypes.func,
  onUnselect: React.PropTypes.func,
  /**
   * Lookup item data.
   */
  options: React.PropTypes.array.isRequired,
  /**
   * If true, adds asterisk next to input label to indicate it is a required field.
   */
  required: React.PropTypes.bool,
  searchTerm: React.PropTypes.string,
  /**
   * Index of current selected item.
   */
  selectedItem: React.PropTypes.number,
};



/**
 * A function that takes a term string and an item and returns a truthy value if the item should be kept.
 */
const defaultFilter = (term, item) => {
  if(!term) return true;
  return item.label.match(new RegExp(escapeRegExp(term), "ig"));
};


const defaultProps = {
  filterWith: defaultFilter,
  modal: false,
  required: false,
  searchTerm: "",
  constrainToScrollParent: true,
  flippable: false,
};


/**
 * The SLDSLookup is the Lightning Design System Lookup base component.
 */
class SLDSLookup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFocus: null,
      focusIndex: null,
      items: [],
      isOpen: false,
      listLength: this.props.options.length,
      searchTerm: this.normalizeSearchTerm(this.props.searchTerm),
      selectedIndex: this.props.selectedItem,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    let lookup = this.inputRefName()
    if(!isNaN(parseInt(prevState.selectedIndex)) && isNaN(parseInt(this.state.selectedIndex))){
      if(this.refs[lookup]){
        ReactDOM.findDOMNode(this.refs[lookup]).focus();
      }
    }
    else if(isNaN(parseInt(prevState.selectedIndex)) && !isNaN(parseInt(this.state.selectedIndex))){
      let selectedItem = "pill-" + this.state.selectedIndex;
      if(this.refs[selectedItem]){
        ReactDOM.findDOMNode(this.refs[selectedItem]).focus();
      }
    }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.options){
      this.modifyItems(newProps.options);
    }
  }

  componentDidMount() {
    this.modifyItems(this.props.options);
  }

  modifyItems(itemsToModify) {
    const items = itemsToModify.map((item, index) => {
      return {
        id: "item-" + index,
        label: item.label,
        data: item
      }
    });
    this.setState({items: items});
  }

  //=================================================
  // Using down/up keys, set Focus on list item and assign it to aria-activedescendant attribute in input.
  // Need to keep track of filtered list length to be able to increment/decrement the focus index so it's contained to the number of available list items.
  increaseIndex() {
    let numFocusable = this.getNumFocusableItems();
    this.setState({ focusIndex: this.state.focusIndex < numFocusable ? this.state.focusIndex + 1 : 0 });
  }

  decreaseIndex() {
    let numFocusable = this.getNumFocusableItems();
    this.setState({ focusIndex: this.state.focusIndex > 0 ? this.state.focusIndex - 1 : numFocusable});
  }

  setFocus(id) {
    this.setState({currentFocus: id});
  }

  getListLength(qty) {
    if(qty !== this.state.listLength){
      this.setState({ listLength: qty });
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
    return (this.state.listLength - 1) + offset
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
        searchTerm: ""
      });
      const data = this.state.items[index].data;
      if(this.props.onSelect){
        this.props.onSelect(data);
      }
    }
  }

  handleDeleteSelected() {
    this.setState({
      selectedIndex: null,
      isOpen: true,
    });
    if(this.props.onUnselect){
      this.props.onUnselect();
    }
  }

  //=================================================
  // Event Listeners on Input
  handleClose() {
    this.setState({
      isOpen: false,
      focusIndex: null,
      currentFocus: null,
    });
  }

  handleEscape(event) {
    if(this.state.isOpen && event){
      EventUtil.trap(event);
    }
    this.handleClose();
  }

  handleCancel(){
    this.setState({
      isOpen: false,
      focusIndex: null,
      currentFocus: null,
    });
  }

  handleClick() {
    this.setState({ isOpen: true });
  }

  handleBlur(event) {
    this.handleClose();
    if(this.props.onBlur){
      const target = event.target || event.currentTarget;
      this.props.onBlur(target.value);
    }
  }

  handleFocus() {
    this.setState({ isOpen: true });
  }

  handleChange(event) {
    const target = event.target || event.currentTarget;
    this.setState({searchTerm: this.normalizeSearchTerm(target.value)});
    if(this.props.onChange){
      this.props.onChange(target.value);
    }
  }

  handleKeyDown(event) {
    if(event.keyCode){
      //If user hits esc key, close menu
      event.keyCode === KEYS.ESCAPE ? this.handleEscape(event) : this.handleClick();

      //If user hits down key, advance aria activedescendant to next item
      if(event.keyCode === KEYS.DOWN){
        EventUtil.trapImmediate(event);
        this.state.focusIndex === null ? this.setState({ focusIndex: 0 }) : this.increaseIndex();
      }
      //If user hits up key, advance aria activedescendant to previous item
      else if(event.keyCode === KEYS.UP){
        EventUtil.trapImmediate(event);
        let numFocusable = this.getNumFocusableItems()
        this.state.focusIndex === null ? this.setState({ focusIndex: numFocusable}) : this.decreaseIndex();
      }
      //If user hits enter/space key, select current activedescendant item
      else if((event.keyCode === KEYS.ENTER || event.keyCode === KEYS.SPACE) && this.state.focusIndex !== null){
        EventUtil.trapImmediate(event);
        //If the focus is on the first fixed Action Item in Menu, click it
        if(this.refs.header && this.state.focusIndex === 0){
          ReactDOM.findDOMNode(this.refs.header).click();
        }
        //If the focus is on the last fixed Action Item in Menu, click it
        else if(this.refs.footer && this.state.focusIndex === (this.state.listLength + 1)){
          ReactDOM.findDOMNode(this.refs.footer).click();
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
      const Header = this.props.headerRenderer;
      let headerActive = false;
      this.state.focusIndex === 0 ? headerActive = true : headerActive = false;

      return <Header ref="header" {...this.props}
          focusIndex={this.state.focusIndex}
          isActive={headerActive}
          onClose={this.handleClose.bind(this)}
          searchTerm={this.state.searchTerm}
          setFocus={this.setFocus.bind(this)}
        />
    }
  }

  getFooter() {
    if(this.props.footerRenderer){
      const Footer = this.props.footerRenderer;
      let footerActive = false;
      let numFocusable = this.getNumFocusableItems();
      this.state.focusIndex === numFocusable ? footerActive = true : footerActive = false;

      return <Footer ref="footer" {... this.props}
        focusIndex={this.state.focusIndex}
        isActive={footerActive}
        onClose={this.handleClose.bind(this)}
        setFocus={this.setFocus.bind(this)}
      />;
    }
  }

  normalizeSearchTerm(string) {
    return (string || '').toString().replace(/^\s+/, '');
  }

  //=================================================
  // Rendering Things
  renderMenuContent() {
    if(this.state.isOpen){
      return <Menu
        emptyMessage={this.props.emptyMessage}
        filterWith={this.props.filterWith}
        focusIndex={this.state.focusIndex}
        footer={this.getFooter()}
        getListLength={this.getListLength.bind(this)}
        header={this.getHeader()}
        iconCategory={this.props.iconCategory}
        iconInverse={this.props.iconInverse}
        iconName={this.props.iconName}
        items={this.state.items}
        label={this.props.label}
        listItemLabelRenderer={this.props.listItemLabelRenderer}
        listLength={this.state.listLength}
        onSelect={this.selectItem.bind(this)}
        searchTerm={this.state.searchTerm}
        setFocus={this.setFocus.bind(this)}
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
    let targetElem = this.refs[this.inputRefName()];
    if(this.state.isOpen){
      return <SLDSPopover
      className="slds-lookup__menu"
      inheritTargetWidth={true}
      closeOnTabKey={true}
      onClose={this.handleCancel.bind(this)}
      flippable={this.props.flippable}
      constrainToScrollParent={this.props.constrainToScrollParent}
      targetElement={targetElem}>
      {this.renderMenuContent()}
      </SLDSPopover>;
    }
  }

  renderSelectedItem() {
    let selectedItem = this.props.options[this.state.selectedIndex].label;
    return (
      <a href="javascript:void(0)" className="slds-pill" ref={"pill-" + this.state.selectedIndex} onKeyDown={this.handlePillKeyDown.bind(this)}>
        <span className="slds-pill__label">
          <SLDSIcon category={this.props.iconCategory} className="slds-icon slds-pill__icon" inverse={this.props.iconInverse} name={this.props.iconName} />
          <span className="slds-pill__label">
            {selectedItem}
          </span>
        </span>
        <SLDSButton
          assistiveText="Press delete to remove"
          className="slds-pill__remove slds-button--icon-bare"
          iconName="close"
          onClick={this.handleDeleteSelected.bind(this)}
          ref="clearSelectedItemButton"
          tabIndex="-1"
          variant="icon"
          />
      </a>
    )
  }

  inputRefName() {
    return `${this.props.label}Lookup`;
  }

  focusInput() {
    ReactDOM.findDOMNode(this.refs[this.inputRefName()]).focus();
  }

  isSelected() {
    const hasSelection = !isNaN(parseInt(this.state.selectedIndex)) && this.state.selectedIndex >= 0;
    return hasSelection ? true : false;
  }

  getClassName(){
    return cx(this.props.className, "slds-lookup", {
      "slds-has-selection": this.isSelected(),
    });
  }

  render() {
    const inputClasses = {
      "slds-input": true,
      "slds-show": !this.isSelected(),
      "slds-hide": this.isSelected(),
    };

    const pillContainerClasses = {
      "slds-pill__container": true,
      "slds-show": this.isSelected(),
      "slds-hide": !this.isSelected(),
    };

    const required = this.props.required ? <span style={{color:"red"}}>* </span>:null;
    const inputLabel = this.props.label?<label className="slds-form-element__label" htmlFor={this.inputRefName()} style={{width: "100%"}}>{required}{this.props.label}</label>:null;

    return (
      <div className={this.getClassName()} data-select="single" data-scope="single" data-typeahead="true">
        <section className="slds-form-element">
          {inputLabel}
          <div className="slds-form-element__control slds-input-has-icon slds-input-has-icon--right">
            <div className={cx(pillContainerClasses)}>
            { this.isSelected() ? this.renderSelectedItem() : null }
            </div>
            <InputIcon name="search" onClick={this.focusInput.bind(this)} />
            <input
              aria-activedescendant={this.state.currentFocus ? this.state.currentFocus:""}
              aria-autocomplete="list"
              aria-expanded={this.state.isOpen}
              aria-haspopup="true"
              className={cx(inputClasses)}
              id={this.inputRefName()}
              onBlur={this.handleBlur.bind(this)}
              onChange={this.handleChange.bind(this)}
              onClick={this.handleClick.bind(this)}
              onFocus={this.handleFocus.bind(this)}
              onKeyDown={this.handleKeyDown.bind(this)}
              ref={this.inputRefName()}
              role="combobox"
              type="text"
              value={this.state.searchTerm}
            />
          </div>
          {this.props.modal?this.renderModalMenu():this.renderSimpleMenu()}
        </section>
      </div>
    );
  }
}

SLDSLookup.displayName = displayName;
SLDSLookup.propTypes = propTypes;
SLDSLookup.defaultProps = defaultProps;

module.exports = SLDSLookup;
module.exports.DefaultHeader = DefaultHeader;
module.exports.DefaultFooter = DefaultFooter;

