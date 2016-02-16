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

import {KEYS, EventUtil} from "../utils";
import SLDSIcon from "../SLDSIcon";
import List from "./List";
import ListItemLabel from "./ListItemLabel";

const displayName = "SLDSMenuList";
const propTypes = {
  className: React.PropTypes.string,
  /**
   * If true, renders checkmark icon on the selected Menu Item.
   */
  checkmark: React.PropTypes.bool,
  label: React.PropTypes.string,
  /**
   * Custom element that overrides the default Menu Item component.
   */
  listItemRenderer: React.PropTypes.func,
  /**
   * If true, component renders specifically to work inside Modal.
   */
  onClick: React.PropTypes.func,
  onSelect: React.PropTypes.func,
  /**
   * Menu item data.
   */
  options: React.PropTypes.array.isRequired,
};
const defaultProps = {
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
      lastBlurredIndex: -1,
      lastBlurredTimeStamp: -1,
      selectedIndex: this.props.selectedIndex,
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

    if(this.props.selectedIndex !== prevProps.selectedIndex ||
        !isEqual(this.props.options, prevProps.options)){
      if (this.props.selectedIndex !== this.state.selectedIndex) {
        this.handleSelect(this.props.selectedIndex);
      }
    }
  }

  handleSelect(index) {
    this.setState({selectedIndex: index})
    if(this.props.onSelect){
      this.props.onSelect(index);
    }
  }

  handleClose() {
    if(this.props.onCancel){
      this.props.onCancel();
    }
  }

  handleMouseDown(event){
    EventUtil.trapImmediate(event);
  }

  handleUpdateHighlighted(nextIndex){
    this.setState({highlightedIndex: nextIndex});
  }

  handleListBlur(){
    if(this.props.onListBlur){
      this.props.onListBlur();
    }
  }

  handleCancel () {
    if(this.props.onCancel){
      this.props.onCancel();
    }
  }

  getListItemRenderer() {
    return this.props.listItemRenderer?this.props.listItemRenderer:ListItemLabel;
  }

  handleListItemBlur (index, relatedTarget) {
    this.setState({
      lastBlurredIndex: index,
      lastBlurredTimeStamp: Date.now()
    });
  }

  render() {
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
            />;
  }

}


SLDSMenuPicklist.displayName = displayName;
SLDSMenuPicklist.propTypes = propTypes;
SLDSMenuPicklist.defaultProps = defaultProps;

module.exports = SLDSMenuPicklist;
module.exports.ListItemLabel = ListItemLabel;

