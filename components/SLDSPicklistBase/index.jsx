/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React from 'react';
import isEqual from 'lodash.isequal';

import SLDSPopover from '../SLDSPopover';
import {List, ListItem, ListItemLabel, KEYS, EventUtil} from "../utils";
import {Icon} from "../SLDSIcons";

const displayName = "SLDSPicklist";
const propTypes = {
  onClick: React.PropTypes.func,
  onSelect: React.PropTypes.func.isRequired,
  onUpdateHighlighted: React.PropTypes.func
};
const defaultProps = {
  className: '',
  disabled: false,
  initialFocus: false,
  label: 'Picklist',
  listClassName: '',
  listItemRenderer: null,
  modal: false,
  options: [],
  placeholder: 'Select an Option',
  theme: 'default',
  value: null,
};

class SLDSPicklist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      highlightedIndex: 0,
      isOpen: false,
      isFocused: false,
      isMounted: false,
      lastBlurredIndex: -1,
      lastBlurredTimeStamp: -1,
      selectedIndex: this.getIndexByValue(this.props.value),
      triggerId: null,
    };
  }

  componentDidMount () {
    const id = React.findDOMNode(this.refs.triggerbutton).getAttribute("data-reactid");
    this.setState({
      triggerId: id,
      isMounted: true,
    });

    if(this.props.initialFocus){
      this.setFocus();
    }
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
        if(this.state.isMounted && this.refs.list){
          if(React.findDOMNode(this.refs.list).contains(document.activeElement)){
            return;
          }
          this.setState({isOpen: false})
        }
      }
    }

    if(this.props.value !== prevProps.value ||
        !isEqual(this.props.options, prevProps.options)){
      this.handleSelect(this.getIndexByValue(this.props.value));
    }
  }


  componentWillUnmount(){
    this.setState({ isMounted: false });
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

  handleClick(event) {
    EventUtil.trap(event);
    if(!this.state.isOpen){
      this.setState({isOpen: true});
      if(this.props.onClick){
        this.props.onClick();
      }
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
    if(this.state.isMounted){
      React.findDOMNode(this.refs.triggerbutton).focus();
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
            triggerId={this.state.triggerId}
            ref='list'
            options={this.props.options}
            label={this.props.label}
            className={this.props.listClassName}
            highlightedIndex={this.state.highlightedIndex}
            selectedIndex={this.state.selectedIndex}
            onSelect={this.handleSelect.bind(this)}
            onUpdateHighlighted={this.handleUpdateHighlighted.bind(this)}
            onListBlur={this.handleListBlur.bind(this)}
            onListItemBlur={this.handleListItemBlur.bind(this)}
            onCancel={this.handleCancel.bind(this)}
            itemRenderer={this.getListItemRenderer()}
            theme={this.props.theme} />;
  }

  getSimplePopover() {
    return (
      !this.props.disabled && this.state.isOpen?
        <div
          className="slds-dropdown slds-dropdown--left slds-dropdown--menu"
          style={{maxHeight: '20em'}}>
          {this.getPopoverContent()}
        </div>:null
    );
  }

  getModalPopover() {
    return (
      !this.props.disabled && this.state.isOpen?
        <SLDSPopover
          className='slds-dropdown slds-dropdown--left slds-dropdown--small slds-dropdown--menu'
          targetElement={this.refs.date}
          closeOnTabKey={true}
          onClose={this.handleCancel.bind(this)}>
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
    return (
      <div className="slds-picklist" aria-expanded={this.state.isOpen}>
        <button
          id={this.state.triggerId}
          ref="triggerbutton"
          className="slds-button slds-button--neutral slds-picklist__label"
          aria-haspopup="true"
          onBlur={this.handleBlur.bind(this)}
          onFocus={this.handleFocus.bind(this)}
          onClick={this.handleClick.bind(this)}
          onMouseDown={this.handleMouseDown.bind(this)}
          tabIndex={this.state.isOpen?-1:0}
          onKeyDown={this.handleKeyDown.bind(this)}>
            <span className="slds-truncate">{this.getPlaceholder()}</span>
            <Icon name="down" category="utility" />
        </button>

        {this.props.modal?this.getModalPopover():this.getSimplePopover()}

      </div>
    );
  }

}


SLDSPicklist.displayName = displayName;
SLDSPicklist.propTypes = propTypes;
SLDSPicklist.defaultProps = defaultProps;

module.exports = SLDSPicklist;
module.exports.ListItem = ListItem;
module.exports.ListItemLabel = ListItemLabel;

