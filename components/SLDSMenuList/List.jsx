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

import ListItem from "./ListItem";
import EventUtil from '../utils/EventUtil';
import KEYS from '../utils/KEYS';

const displayName = "SLDSList";
const propTypes = {
  className: React.PropTypes.string,
  checkmark: React.PropTypes.bool,
  highlightedIndex: React.PropTypes.number,
  itemRenderer: React.PropTypes.func,
  options: React.PropTypes.array,
  onCancel: React.PropTypes.func,
  onListBlur: React.PropTypes.func,
  onListItemBlur: React.PropTypes.func,
  onMoveFocus: React.PropTypes.func,
  onSelect: React.PropTypes.func,
  selectedIndex: React.PropTypes.number,
};
const defaultProps = {
  className: '',
  highlightedIndex: 0,
  itemRenderer: null,
  options: [],
  onCancel: (delta)=>{
    console.log("onCancel should be overwritten");
  },
  onListBlur: () => {
    console.log("onListBlur should be overwritten");
  },
  onListItemBlur: (listItemIndex)=>{
    console.log("onListItemBlur should be overwritten");
  },
  onMoveFocus: (delta)=>{
    console.log("onMoveFocus should be overwritten");
  },
  onSelect: (index)=>{
    console.log("onSelect should be overwritten");
  },
  selectedIndex: -1,
};

class SLDSList extends React.Component {
  handleMouseDown (event) {
    EventUtil.trapImmediate(event);
  }

  handleClick (e) {
    if(e.nativeEvent){
      e.nativeEvent.preventDefault();
      e.nativeEvent.stopImmediatePropagation();
    }
    e.preventDefault();
  }

  handleUpdateHighlighted (nextIndex) {
    if(this.props.onUpdateHighlighted){
      this.props.onUpdateHighlighted(nextIndex);
    }
  }

  handleListItemBlur (event) {
    if(event && event.target){
      const indexx = parseInt(event.target.getAttribute('data-index'));
      if(this.props.onListItemBlur){
        this.props.onListItemBlur(indexx);
      }
      this.setState({lastBlurredIndex:indexx});
    }
  }

  handleMoveFocus (delta) {
    let newHighlightedIndex = this.props.highlightedIndex + delta;
    if(newHighlightedIndex < 0){
      newHighlightedIndex = this.props.options.length - 1;
    }
    else if(newHighlightedIndex >= this.props.options.length){
      newHighlightedIndex = 0;
    }
    if(this.props.onUpdateHighlighted){
      this.props.onUpdateHighlighted(newHighlightedIndex);
    }
  }

  handleCancel () {
    if(this.props.onCancel){
      this.props.onCancel();
    }
  }

  handleSelect (index) {
    if(this.props.onSelect){
      this.props.onSelect(index);
    }
  }

  handleItemFocus (itemIndex, itemHeight) {
    if(this.refs.scroll){
      ReactDOM.findDOMNode(this.refs.scroll).scrollTop = itemIndex * itemHeight;
    }
  }

  handleSearch (index, ch) {
    const searchChar = ch.toLowerCase();
    for(let i=index+1;i<this.props.options.length;i++){
      const option = this.props.options[i];
      if(option && option.label){
        if(option.label.charAt(0).toLowerCase() === searchChar){
          if(this.props.onUpdateHighlighted){
            this.props.onUpdateHighlighted(i);
          }
          return;
        }
      }
    }
    for(let i=0;i<index;i++){
      const option = this.props.options[i];
      if(option && option.label){
        if(option.label.charAt(0).toLowerCase() === searchChar){
          if(this.props.onUpdateHighlighted){
            this.props.onUpdateHighlighted(i);
          }
          return;
        }
      }
    }
  }

  getItems () {
    return this.props.options.map((option, index) =>{
      return (
        <ListItem
          checkmark={this.props.checkmark}
          data={option}
          index={index}
          isHighlighted={(index===this.props.highlightedIndex)}
          isHover={this.props.isHover}
          isSelected={(index===this.props.selectedIndex)}
          key={'ListItem_'+index}
          label={option.label}
          labelRenderer={this.props.itemRenderer}
          onFocus={this.handleItemFocus.bind(this)}
//          onMoveFocus={this.handleMoveFocus.bind(this)}
          onSelect={this.handleSelect.bind(this)}
          onUpdateHighlighted={this.handleUpdateHighlighted.bind(this)}
          value={option.value}/>
      );
    });
  }

  handleKeyDown(event) {
    if(event.keyCode){

      if(event.keyCode === KEYS.DOWN){
        EventUtil.trapEvent(event);
        this.handleMoveFocus(1);
      }
      else if(event.keyCode === KEYS.UP){
        EventUtil.trapEvent(event);
        this.handleMoveFocus(-1);
      }
      else if(event.keyCode === KEYS.ENTER ||
          event.keyCode === KEYS.SPACE ){
        EventUtil.trapEvent(event);
        const index = parseInt(event.target.getAttribute('data-index'));
        this.handleSelect(index);
      }
      else if(event.keyCode === KEYS.ESCAPE){
        EventUtil.trapEvent(event);
        if(this.props.onCancel){
          this.props.onCancel();
        }
      }
      else if(event.keyCode === KEYS.TAB){
      }
      else{
        EventUtil.trapEvent(event);
        const ch = String.fromCharCode(event.keyCode);
        const index = parseInt(event.target.getAttribute('data-index'));
        this.handleSearch(index,ch);
      }
    }
  }



  render () {
    return (
      <ul
        aria-labelledby={this.props.triggerId}
        className={"slds-dropdown__list slds-dropdown--length-5 "+this.props.className}
//        onMouseEnter={this.props.onMouseEnter}
//        onMouseDown={this.handleMouseDown.bind(this)}
//        onMouseLeave={this.props.onMouseLeave}
        onBlur={this.handleListItemBlur.bind(this)}
        onKeyDown={this.handleKeyDown.bind(this)}
        ref="scroll"
        role="menu"
        >
        {this.getItems()}
      </ul>
    );
  }
}

SLDSList.displayName = displayName;
SLDSList.propTypes = propTypes;
SLDSList.defaultProps = defaultProps;

module.exports = SLDSList;

