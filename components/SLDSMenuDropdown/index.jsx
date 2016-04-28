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
import SLDSPopover from "../SLDSPopover";
import SLDSButton from "../SLDSButton";
import {KEYS, EventUtil} from "../utils";
import List from "../SLDSMenuList/List";
import ListItem from "../SLDSMenuList/ListItem";
import ListItemLabel from "../SLDSMenuList/ListItemLabel";


const displayName = "SLDSMenuDropdown";
const propTypes = {
  align: React.PropTypes.oneOf(["left", "right"]),
  /**
   * Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means.
   * If the Dropdown button has an icon and a visible label, you can omit the <code>assistiveText</code> prop and use the <code>label</code> prop.
   */
  assistiveText: React.PropTypes.string,
  /**
   * Determines variant of the Button component that triggers dropdown.
   */
  buttonVariant: React.PropTypes.oneOf(["base", "neutral", "brand", "destructive", "icon", "inverse", "icon-inverse"]),
  /**
   * If true, renders checkmark icon on the selected Menu Item.
   */
  checkmark: React.PropTypes.bool,
  className: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  /**
   * Delay on menu closing.
   */
  hoverCloseDelay: React.PropTypes.number,
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
  openOn: React.PropTypes.oneOf(["hover", "click"]),
  /**
   * Menu item data.
   */
  options: React.PropTypes.array.isRequired,
  /**
   * Current selected menu item.
   */
  value: React.PropTypes.string,

  tooltip: React.PropTypes.node

};
const defaultProps = {
  align: "left",
  buttonVariant: "neutral",
  checkmark: false,
  disabled: false,
  hoverCloseDelay: 300,
  openOn: "click",
  modal: true,
};

/**
 * The SLDSMenuDropdown component is a variant of the Ligtning Design System Menu component.
 */
class SLDSMenuDropdown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      highlightedIndex: 0,
      isClosing: false,
      isFocused: false,
      isHover: false,
      isOpen: false,
      lastBlurredIndex: -1,
      lastBlurredTimeStamp: -1,
      selectedIndex: this.getIndexByValue(this.props.value),
      /* triggerId is the id of the element that triggers the Menu to open.
      * Need this for aria-labelledby on <ul> in Menu for accessibility. */
      triggerId: this.props.label ? this.props.label.replace(/\s+/g, '') + '_Button': this.props.assistiveText.replace(/\s+/g, '') + '_Button',
    };
  }

  componentWillUnmount() {
    this.isUnmounting = true;
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.lastBlurredTimeStamp !== prevState.lastBlurredTimeStamp){
      if(this.state.lastBlurredIndex === this.state.highlightedIndex) this.handleClose();
    }

    if(this.state.isOpen && !prevState.isOpen) this.state.isClosing = false;

    if(this.state.selectedIndex !== prevState.selectedIndex){
      this.handleClose();
    } else if(this.state.isFocused && !prevState.isFocused){
      this.setState({isOpen: false});
    } else if(!this.state.isFocused && prevState.isFocused){
      if (this.refs.list) {
        if (!this.isUnmounting && this.refs.list) {
          if (ReactDOM.findDOMNode(this.refs.list).contains(document.activeElement)) {
            return;
          }
          this.setState({ isOpen: false });
        }
      }
    } else if(this.state.isClosing && !prevState.isClosing) {
      setTimeout(()=>{
        if(this.state.isClosing){
          this.setState({isOpen: false});
        }
      }, this.props.hoverCloseDelay);
    }

    if(this.props.value !== prevProps.value){
      this.handleSelect(this.getIndexByValue(this.props.value));
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
    if(option) return this.props.options[index];
  }

  getListItemRenderer() {
    return this.props.listItemRenderer?this.props.listItemRenderer:ListItemLabel;
  }

  handleSelect(index){
    this.setState({selectedIndex: index})
    this.setFocus();
    if(this.props.onSelect) this.props.onSelect(this.getValueByIndex(index));
  }

  handleClose(){
    this.setState({
      isOpen: false,
      isHover: false
    })
  }

  handleMouseEnter(){
    this.state.isClosing = false;
    if(!this.state.isOpen){
      this.setState({
        isOpen: true,
        isHover: true
      });
    }
    if(this.props.onMouseEnter) this.props.onMouseEnter();
  }

  handleMouseLeave(){
    this.setState({isClosing: true});
    if(this.props.onMouseLeave) this.props.onMouseLeave();
  }

  handleClick(){
    if(!this.state.isOpen){
      this.setState({isOpen: true});
      if(this.props.onClick) this.props.onClick();
    }else{
      this.handleClose();
    }
  }

  handleMouseDown(event){
    if(event) EventUtil.trapImmediate(event);
    if(this.props.onMouseDown) this.props.onMouseDown();
  }

  handleBlur(e){
    this.setState({isFocused: false});
    if(this.props.onBlur) this.props.onBlur();
  }

  handleFocus(){
    this.setState({
      isFocused: true,
      isHover: false
    });
    if(this.props.onFocus) this.props.onFocus();
  }

  setFocus(){
    if(!this.isUnmounting) ReactDOM.findDOMNode(this.getButtonNode()).focus();
  }

  getButtonNode(){
    return ReactDOM.findDOMNode(this.refs.button);
  }

  handleKeyDown(event){
    if(event.keyCode){
      if(event.keyCode === KEYS.ENTER ||
         event.keyCode === KEYS.SPACE ||
         event.keyCode === KEYS.DOWN ||
         event.keyCode === KEYS.UP) {

          EventUtil.trap(event);
          this.setState({
            isOpen: true,
            highlightedIndex: 0
          });
      }
      if(this.props.onKeyDown) this.props.onKeyDown();
    }
  }

  handleUpdateHighlighted(nextIndex){
    this.setState({highlightedIndex: nextIndex});
  }

  handleListBlur(){
    this.setState({isOpen: false});
  }

  handleListItemBlur(index, relatedTarget){
    this.setState({
      lastBlurredIndex: index,
      lastBlurredTimeStamp: Date.now()
    });
  }

  handleCancel(){
    if(!this.state.isHover) this.setFocus();
  }

  getPopoverContent(){
    return <List
            checkmark={this.props.checkmark}
            highlightedIndex={this.state.highlightedIndex}
            isHover={this.state.isHover}
            itemRenderer={this.getListItemRenderer()}
            onListBlur={this.handleListBlur.bind(this)}
            onListItemBlur={this.handleListItemBlur.bind(this)}
            onCancel={this.handleCancel.bind(this)}
//            onMouseEnter={(this.props.openOn === "hover")?this.handleMouseEnter.bind(this):null}
//            onMouseLeave={(this.props.openOn === "hover")?this.handleMouseLeave.bind(this):null}
            onSelect={this.handleSelect.bind(this)}
            onUpdateHighlighted={this.handleUpdateHighlighted.bind(this)}
            options={this.props.options}
            ref="list"
            selectedIndex={this.state.selectedIndex}
            triggerId={this.state.triggerId}
            />;
  }

  getSimplePopover(){
    return(
      !this.props.disabled && this.state.isOpen?
        <div className={"slds-dropdown slds-dropdown--menu slds-dropdown--left " + this.props.className}
          onMouseEnter={(this.props.openOn === "hover")?this.handleMouseEnter.bind(this):null}
          onMouseLeave={(this.props.openOn === "hover")?this.handleMouseLeave.bind(this):null}
        >
          {this.getPopoverContent()}
        </div>:null
    );
  }

  getModalPopover(){
    const className = "slds-dropdown slds-dropdown--menu slds-dropdown--"+this.props.align + " " + this.props.className;
    return(
      !this.props.disabled && this.state.isOpen?
        <SLDSPopover
          className={className}
          closeOnTabKey={true}
          dropClass="slds-picklist" //TODO: in next SLDS release, remove slds-picklist class because slds-dropdown--length-5 will be active.
          horizontalAlign={this.props.align}
          flippable={true}
          onMouseEnter={(this.props.openOn === "hover")?this.handleMouseEnter.bind(this):null}
          onMouseLeave={(this.props.openOn === "hover")?this.handleMouseLeave.bind(this):null}
          onClose={this.handleCancel.bind(this)}
          targetElement={this.refs.button}
          >
          {this.getPopoverContent()}
        </SLDSPopover>:null
    );
  }

  render(){
    return <SLDSButton
        aria-haspopup="true"
        assistiveText={this.props.assistiveText}
        className={this.props.buttonClassName}
        disabled={this.props.disabled}
        hint={this.props.hint}
        iconName={this.props.iconName}
        iconVariant={this.props.iconVariant}
        id={this.state.triggerId}
        label={this.props.label}
        onBlur={this.props.openOn === "hover" ? this.handleBlur.bind(this):null}
        onClick={this.props.openOn === "click" ? this.handleClick.bind(this):null}
        onFocus={this.props.openOn === "hover" ? this.handleFocus.bind(this):null}
        onKeyDown={this.handleKeyDown.bind(this)}
        onMouseDown={this.props.openOn === "click" ? this.handleMouseDown.bind(this):null}
        onMouseEnter={this.props.openOn === "hover" ? this.handleMouseEnter.bind(this):null}
        onMouseLeave={this.props.openOn === "hover" ? this.handleMouseLeave.bind(this):null}
        ref="button"
        style={this.props.style}
        tabIndex={this.state.isOpen ? "-1" : "0"}
        variant={this.props.buttonVariant}
        tooltip={this.props.tooltip}
        >
        {this.props.modal?this.getModalPopover():this.getSimplePopover()}
      </SLDSButton>;
  }

}

SLDSMenuDropdown.displayName = displayName;
SLDSMenuDropdown.propTypes = propTypes;
SLDSMenuDropdown.defaultProps = defaultProps;

module.exports = SLDSMenuDropdown;
module.exports.ListItem = ListItem;
module.exports.ListItemLabel = ListItemLabel;
