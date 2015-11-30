/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


import React from 'react';
import {KEYS,EventUtil} from './index';
import ListItemLabelRenderer from './ListItemLabel';

const displayName = "SLDSPicklistBase-list-item";
const propTypes = {
  data: React.PropTypes.object,
  index: React.PropTypes.number,
  inverted: React.PropTypes.bool,
  isHighlighted: React.PropTypes.bool,
  isSelected: React.PropTypes.bool,
  label: React.PropTypes.string,
  labelRenderer: React.PropTypes.func,
  value: React.PropTypes.string,
  onBlur: React.PropTypes.func,
  onClick: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  onMoveFocus: React.PropTypes.func,
  onSelect: React.PropTypes.func,
};
const defaultProps = {
  data: {},
  index: 0,
  inverted: false,
  isHighlighted: false,
  isSelected: false,
  label: '',
  labelRenderer: ListItemLabelRenderer,
  value: null,
  onBlur (relatedTarget){
    console.log('onBlur should be defined ',relatedTarget);
  },
  onClick (index) {
    console.log('onClick should be defined ',index);
  },
  onFocus (index, height) {
    console.log('onFocus should be defined ',index,height);
  },
  onMoveFocus (delta){
    console.log('onMoveFocus should be defined ',delta);
  },
  onSelect (index) {
    console.log('onSelect should be defined ',index);
  },
};

class SLDSListItem extends React.Component {
  handleClick (e) {
    e.preventDefault();
    e.stopPropagation();
    if(this.props.onSelect){
      this.props.onSelect(this.props.index);
    }
  }

  handleMouseDown (e) {
    if(e.nativeEvent){
      e.nativeEvent.preventDefault();
      e.nativeEvent.stopImmediatePropagation();
    }
    e.preventDefault();
  }

  componentDidMount(){
    if(this.props.isHighlighted){
      this.setFocus();
    }
  }

  componentDidUpdate( prevProps, prevState) {
    if(!prevProps.isHighlighted && this.props.isHighlighted){
      this.setFocus();
    }
  }

  setFocus () {
    if(!this.props.isHover){
      React.findDOMNode(this.refs.link).focus();
    }
  }

  handleKeyDown(event) {
    if(event.keyCode){
      if(event.keyCode === KEYS.DOWN){
        EventUtil.trapEvent(event);
        if(this.props.onMoveFocus){
          this.props.onMoveFocus(1);
        }
      }
      else if(event.keyCode === KEYS.UP){
        EventUtil.trapEvent(event);
        if(this.props.onMoveFocus){
          this.props.onMoveFocus(-1);
        }
      }
      else if(event.keyCode === KEYS.ENTER ||
          event.keyCode === KEYS.SPACE ){
        EventUtil.trapEvent(event);
        if(this.props.onSelect){
          this.props.onSelect(this.props.index);
        }
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
        if(this.props.onSearch){
          this.props.onSearch(this.props.index,ch);
        }
      }
    }
  }

  handleBlur(e) {
    if(this.props.onBlur){
      this.props.onBlur(this.props.index, e.relatedTarget);
    }
  }

  handleFocus () {
    const height = React.findDOMNode(this).offsetHeight;
    if(height && this.props.onFocus){
      this.props.onFocus(this.props.index,height);
    }
  }

  getLabel () {
    const LabelComp = this.props.labelRenderer;
    return <LabelComp
      index={this.props.index}
      label={this.props.label}
      value={this.props.value}
      inverted={this.props.inverted}
      isSelected={this.props.isSelected}
      isHighlighted={this.props.isHighlighted}
      data={this.props.data}
    />;
  }

  render () {
    return (
      <li
        className={"slds-dropdown__item slds-has-icon slds-has-icon--left slds-theme--"+this.props.theme}
        onMouseDown={this.handleMouseDown.bind(this)}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
        tabIndex={-1}>
          <a id={'menu-0-'+this.props.index}
            href=''
            ref='link'
            className='slds-truncate'
            onClick={this.handleClick.bind(this)}
            onMouseDown={this.handleMouseDown.bind(this)}
            onKeyDown={this.handleKeyDown.bind(this)}
            onBlur={this.handleBlur.bind(this)}
            onFocus={this.handleFocus.bind(this)}
            aria-checked={this.props.isSelected}
            role='menuitemradio'
            tabIndex={-1}>
              {this.getLabel()}
          </a>
      </li>
    );
  }
}

SLDSListItem.displayName = displayName;
SLDSListItem.propTypes = propTypes;
SLDSListItem.defaultProps = defaultProps;

module.exports = SLDSListItem;

