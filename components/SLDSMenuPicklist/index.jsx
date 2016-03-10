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
import isEqual from "lodash.isequal";

import SLDSPopover from "../SLDSPopover";
import {KEYS, EventUtil} from "../utils";
import SLDSIcon from "../SLDSIcon";
import List from "../SLDSMenuList/List";
import ListItemLabel from "../SLDSMenuList/ListItemLabel";

const displayName = "SLDSMenuPicklist";
const propTypes = {
  className: React.PropTypes.string,
  /**
   * If true, renders checkmark icon on the selected Menu Item.
   */
  checkmark: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  label: React.PropTypes.string,
  /**
   * Custom element that overrides the default Menu Item component.
   */
  listItemRenderer: React.PropTypes.func,
  /**
   * If true, component renders specifically to work inside Modal.
   */
  modal: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  onSelect: React.PropTypes.func,
  /**
   * Menu item data.
   */
  options: React.PropTypes.array.isRequired,
  placeholder: React.PropTypes.string,
  required: React.PropTypes.bool,
  /**
   * Current selected item.
   */
  value: React.PropTypes.node,
};
const defaultProps = {
  disabled: false,
  modal: true,
  required: false,
  placeholder: "Select an Option",
  checkmark: true
};

/**
 * The SLDSMenuPicklist component is a variant of the Ligtning Design System Menu component.
 */
class SLDSMenuPicklist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      highlightedIndex: 0,
      isOpen: false,
      isFocused: false,
      lastBlurredIndex: -1,
      lastBlurredTimeStamp: -1,
      selectedIndex: this.getIndexByValue(this.props.value),
      /* triggerId is the id of the element that triggers the Menu to open.
      * Need this for aria-labelledby on <ul> in Menu for accessibility. */
      triggerId: this.props.label ? this.props.label.replace(/\s+/g, '') + '_Button': 'Picklist_Button',
    };
  }

  componentWillUnmount(){
    this.isUnmounting = true;
  }

  componentDidUpdate( prevProps, prevState) {
    if(this.state.lastBlurredTimeStamp !== prevState.lastBlurredTimeStamp){
      if(this.state.lastBlurredIndex === this.state.highlightedIndex){
        this.handleClose();
      }
    }
    if(this.state.selectedIndex !== prevState.selectedIndex){
      this.handleClose();
    }
    else if(this.state.isFocused && !prevState.isFocused){
      this.setState({isOpen: false});
    }
    else if(!this.state.isFocused && prevState.isFocused){
      if(this.refs.list){
        if(!this.isUnmounting && this.refs.list){
          if(ReactDOM.findDOMNode(this.refs.list).contains(document.activeElement)){
            return;
          }
          this.setState({isOpen: false})
        }
      }
    }

    if(this.props.value !== prevProps.value ||
        !isEqual(this.props.options, prevProps.options)){
      var newSelectedIndex = this.getIndexByValue(this.props.value);
      if (newSelectedIndex !== this.state.selectedIndex) {
        this.handleSelect(newSelectedIndex);
      }
    }
  }

  getIndexByValue(value){
    let foundIndex = -1;
    if(this.props.options && this.props.options.length){
      this.props.options.some((element, index, array)=>{
        if(element && element.value === value){
          foundIndex = index;
          return true;
        }
        return false;
      });
    }
    return foundIndex;
  }

  getValueByIndex(index){
    const option = this.props.options[index];
    if(option){
      return this.props.options[index];
    }
  }

  handleSelect(index) {
    this.setState({selectedIndex: index})
    this.setFocus();
    if(this.props.onSelect){
      this.props.onSelect(this.getValueByIndex(index));
    }
  }

  handleClose() {
    this.setState({isOpen: false});
  }

  handleClick() {
    if(!this.state.isOpen){
      this.setState({isOpen: true});
      if(this.props.onClick) this.props.onClick();
    }
    else{
      this.handleClose();
    }
  }

  handleMouseDown(event){
    EventUtil.trapImmediate(event);
  }

  handleBlur(e) {
    this.setState({isFocused: false});
  }

  handleFocus() {
    this.setState({isFocused: true});
  }

  setFocus() {
    if(!this.isUnmounting){
      ReactDOM.findDOMNode(this.refs.triggerbutton).focus();
    }
  }

  handleKeyDown(event) {
    if (event.keyCode){
      if (event.keyCode === KEYS.ENTER ||
          event.keyCode === KEYS.SPACE ||
          event.keyCode === KEYS.DOWN ||
          event.keyCode === KEYS.UP){
        EventUtil.trapEvent(event);

        this.setState({
          isOpen: true,
          highlightedIndex: 0
        });

      }
    }
  }

  handleUpdateHighlighted(nextIndex){
    this.setState({highlightedIndex: nextIndex});
  }

  handleListBlur(){
    this.setState({isOpen: false});
  }

  handleCancel () {
    this.setFocus();
  }

  getListItemRenderer() {
    return this.props.listItemRenderer?this.props.listItemRenderer:ListItemLabel;
  }

  getPopoverContent() {
    return <List
            checkmark={this.props.checkmark}
            highlightedIndex={this.state.highlightedIndex}
            itemRenderer={this.getListItemRenderer()}
            onCancel={this.handleCancel.bind(this)}
            onListBlur={this.handleListBlur.bind(this)}
            onListItemBlur={this.handleListItemBlur.bind(this)}
            onSelect={this.handleSelect.bind(this)}
            onUpdateHighlighted={this.handleUpdateHighlighted.bind(this)}
            options={this.props.options}
            ref="list"
            selectedIndex={this.state.selectedIndex}
            triggerId={this.state.triggerId}
            />;
  }

  getSimplePopover() {
    return (
      !this.props.disabled && this.state.isOpen?
        <div
          className="slds-dropdown slds-dropdown--left slds-dropdown--menu"
          style={{
            maxHeight: "20em",
            overflowX: "hidden",
            minWidth: "100%"
          }}>
          {this.getPopoverContent()}
        </div>:null
    );
  }

  getModalPopover() {
    return (
      !this.props.disabled && this.state.isOpen?
        <SLDSPopover
          className="slds-dropdown slds-dropdown--left "
          closeOnTabKey={true}
          constrainToScrollParent={true}
          dropClass="slds-picklist"
          flippable={true}
          onClose={this.handleCancel.bind(this)}
          targetElement={this.refs.triggerbutton}>
          {this.getPopoverContent()}
        </SLDSPopover>:null
    );
  }

  getPlaceholder() {
    const option = this.props.options[this.state.selectedIndex];
    return (option && option.label)?option.label:this.props.placeholder;
  }

  handleListItemBlur (index, relatedTarget) {
    this.setState({
      lastBlurredIndex: index,
      lastBlurredTimeStamp: Date.now()
    });
  }

  render() {
    const required = this.props.required ? <span style={{color: "red"}}>* </span>:null;
    const inputLabel = this.props.label?<label className="slds-form-element__label" htmlFor={this.state.triggerId} style={{width: "100%"}}>{required}{this.props.label}</label>:null;
    return (
      <div className={"slds-picklist " + this.props.className} aria-expanded={this.state.isOpen}>
        {inputLabel}
        <button
          aria-haspopup="true"
          className="slds-button slds-button--neutral slds-picklist__label"
          id={this.state.triggerId}
          onBlur={this.handleBlur.bind(this)}
          onClick={this.handleClick.bind(this)}
          onFocus={this.handleFocus.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}
          onMouseDown={this.handleMouseDown.bind(this)}
          ref="triggerbutton"
          tabIndex={this.state.isOpen?-1:0}>
            <span className="slds-truncate">{this.getPlaceholder()}</span>
            <SLDSIcon name="down" category="utility" />
        </button>
        {this.props.modal?this.getModalPopover():this.getSimplePopover()}
      </div>
    );
  }

}


SLDSMenuPicklist.displayName = displayName;
SLDSMenuPicklist.propTypes = propTypes;
SLDSMenuPicklist.defaultProps = defaultProps;

module.exports = SLDSMenuPicklist;
module.exports.ListItemLabel = ListItemLabel;
