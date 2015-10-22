/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

'use strict';

import React, {PropTypes} from 'react';
import SLDSPopover from '../SLDSPopover';
import List from './list';
import ListItem from './list-item';
import ListItemLabel from './list-item-label';
import chain from '../utils/create-chained-function';

import SLDSButton from '../SLDSButton';

import {InputIcon, ButtonIcon} from "./../SLDSIcons";
import {Icon} from "../SLDSIcons";

import {KEYS,EventUtil} from '../utils';
import omit from 'lodash.omit';


module.exports = React.createClass( {

  propTypes : {
        onClick: PropTypes.func,
        onSelect: PropTypes.func.isRequired,
        onUpdateHighlighted: PropTypes.func
    },

  getDefaultProps(){
    return {
      variant:'neutral',
      placeholder: 'Select an Option',
      disabled: false,
      theme: 'default',
      label: 'Dropdown',
      value: null,
      options: [],
      initialFocus: false,
      modal: true,
      className:'',
      listClassName:'',
      openOn:'hover',
      listItemRenderer:ListItemLabel,
      hoverCloseDelay:300
    }
  },

  getInitialState(){
    return {
      isOpen:false,
      isFocused:false,
      isClosing:false,
      highlightedIndex:0,
      selectedIndex:this.getIndexByValue(this.props.value),
      lastBlurredIndex:-1,
      lastBlurredTimeStamp:-1,
      isHover: false
    };
  },

  componentDidMount () {
    if(this.props.initialFocus){
      this.setFocus();
    }
    if(this.props.openOn === 'hover'){

    }
  },

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
  },

  getValueByIndex(index){
    return this.props.options[index].value;
  },

  handleSelect(index) {
    this.setState({selectedIndex:index})
    this.setFocus();
    if(this.props.onSelect){
      this.props.onSelect(this.getValueByIndex(index));
    }
  },

  handleClose() {
    this.setState({
      isOpen:false,
      isHover:false
    });
  },

  handleMouseEnter(event) {
    if(this.props.openOn === 'hover'){
      this.state.isClosing = false;
      if(!this.state.isOpen){
        this.setState({
          isOpen:true,
          isHover:true
        });
      }
    }
  },

  handleMouseLeave(event) {
    if(this.props.openOn === 'hover'){
      this.setState({isClosing:true});
    }
  },

  handleClick(event) {
    EventUtil.trap(event);
    if(!this.state.isOpen){
      this.setState({isOpen:true});
      if(this.props.onClick){
        this.props.onClick();
      }
    }
    else{
      this.handleClose();
    }
  },

  handleMouseDown(event){
    EventUtil.trapImmediate(event);
  },

  handleBlur(e) {
    this.setState({isFocused:false});
  },

  handleFocus() {
    this.setState({
      isFocused:true,
      isHover:false
    });
  },

  setFocus () {
    if(this.isMounted()){
      React.findDOMNode(this.getButtonNode()).focus();
    }
  },

  getButtonNode () {
    return React.findDOMNode(this.refs.button);
  },

  moveHighlight(delta) {
  },

  handleKeyDown(event) {
    if (event.keyCode){
      if (event.keyCode === KEYS.ENTER ||
          event.keyCode === KEYS.SPACE ||
          event.keyCode === KEYS.DOWN ||
          event.keyCode === KEYS.UP){
        EventUtil.trapEvent(event);

        this.setState({
          isOpen:true,
          highlightedIndex:0
        });

      }
    }
  },

  handleUpdateHighlighted(nextIndex){
    this.setState({highlightedIndex:nextIndex});
  },

  handleListBlur(){
    this.setState({isOpen:false});
  },

  handleCancel () {
    if(!this.state.isHover){
      this.setFocus();
    }
  },

  getPopoverContent() {
    return <List
            ref='list'
            options={this.props.options}
            className={this.props.listClassName}
            highlightedIndex={this.state.highlightedIndex}
            selectedIndex={this.state.selectedIndex}
            onSelect={this.handleSelect}
            onUpdateHighlighted={this.handleUpdateHighlighted}
            onListBlur={this.handleListBlur}
            onListItemBlur={this.handleListItemBlur}
            onMouseEnter={(this.props.openOn === 'hover')?this.handleMouseEnter:null}
            onMouseLeave={(this.props.openOn === 'hover')?this.handleMouseLeave:null}
            onCancel={this.handleCancel}
            itemRenderer={this.props.listItemRenderer}
            isHover={this.state.isHover}
            theme={this.props.theme} />;
  },

  getSimplePopover() {
    return (
      !this.props.disabled && this.state.isOpen?
        <div
          className="slds-dropdown slds-dropdown--left slds-dropdown--small slds-dropdown--menu"
          style={{maxHeight:'20em'}}>
          {this.getPopoverContent()}
        </div>:null
    );
  },

  getModalPopover() {
    return (
      !this.props.disabled && this.state.isOpen?
        <SLDSPopover
          className='slds-dropdown slds-dropdown--left slds-dropdown--small slds-dropdown--menu'
          targetElement={this.refs.button}
          closeOnTabKey={true}
          onClose={this.handleCancel}>
          {this.getPopoverContent()}
        </SLDSPopover>:null
    );
  },

  getPlaceholder() {
    const option = this.props.options[this.state.selectedIndex];
    return (option && option.label)?option.label:this.props.placeholder;
  },

  handleListItemBlur (index, relatedTarget) {
    this.setState({
      lastBlurredIndex:index,
      lastBlurredTimeStamp:Date.now()
    });
  },

  render() {
    let className = this.state.currentSelectedItem? 'slds-input--bare slds-hide':'slds-input--bare';

    const props = omit(this.props, [
        'aria-haspopup',
        'label',
        'className',
        'style',
        'variant',
        'iconName',
        'iconVariant',
        'onBlur',
        'onFocus',
        'onClick',
        'onMouseDown',
        'onMouseEnter',
        'onMouseLeave',
        'tabIndex',
        'onKeyDown'
      ]);
    return (

      <SLDSButton 
        ref='button'
        aria-haspopup='true'
        label={this.props.label}
        className={this.props.className}
        style={this.props.style}
        variant={this.props.variant}
        iconName={this.props.iconName}
        iconVariant={this.props.iconVariant}
        onBlur={ chain(this.props.onBlur, this.handleBlur) }
        onFocus={ chain(this.props.onFocus, this.handleFocus) }
        onClick={ chain(this.props.onClick, this.handleClick) }
        onMouseDown={ chain(this.props.onMouseDown, this.handleMouseDown) }
        onMouseEnter={ chain(this.props.onMouseEnter, (this.props.openOn === 'hover')?this.handleMouseEnter:null) }
        onMouseLeave={ chain(this.props.onMouseLeave, (this.props.openOn === 'hover')?this.handleMouseLeave:null ) }
        tabIndex={this.state.isOpen?-1:0}
        onKeyDown={ chain(this.props.onKeyDown, this.handleKeyDown) }
        {...props}
        >
        {this.props.modal?this.getModalPopover():this.getSimplePopover()}
      </SLDSButton>

    );
  },

  componentDidUpdate( prevProps, prevState) {

    if(this.state.lastBlurredTimeStamp !== prevState.lastBlurredTimeStamp){
      if(this.state.lastBlurredIndex === this.state.highlightedIndex){
        this.handleClose();
      }
    }

    if(this.state.isOpen && !prevState.isOpen){
      this.state.isClosing = false;
    }

    if(this.state.selectedIndex !== prevState.selectedIndex){
      this.handleClose();
    }
    else if(this.state.isFocused && !prevState.isFocused){
      this.setState({isOpen:false});
    }
    else if(!this.state.isFocused && prevState.isFocused){
      if(this.refs.list){
        if(this.isMounted() && this.refs.list){
          if(this.refs.list.getDOMNode().contains(document.activeElement)){
            return;
          }
          this.setState({isOpen:false})
        }
      }
    }
    else if(this.state.isClosing && !prevState.isClosing){
      setTimeout(()=>{
        if(this.state.isClosing){
          this.setState({isOpen:false});
        }
      },this.props.hoverCloseDelay);
    }

    if(this.props.value !== prevProps.value){
      this.handleSelect(this.getIndexByValue(this.props.value));
    }

  },

});

module.exports.ListItem = ListItem;
module.exports.ListItemLabel = ListItemLabel;