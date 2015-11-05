/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React, { Component } from 'react';
import {Icon} from "../../../SLDSIcons";
import {EventUtil} from '../../../utils';
import escapeRegExp from 'lodash.escaperegexp';

class Item extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.isActive !== this.props.isActive && nextProps.isActive === true) {
      this.scrollFocus();
      this.props.setFocus(this.props.id);
    }
  }

  boldSearchText(children) {
    let regex = this.props.boldRegex
    if (!regex) {
      const term = this.props.searchTerm;
      if(!children || !term) return children;
      regex = new RegExp('(' + escapeRegExp(term) + ')', 'gi');
    }
    return React.Children.map(children, c => {
      return (typeof c === 'string') ? <span dangerouslySetInnerHTML={{ __html: c.replace(regex, '<mark>$1</mark>')}}></span> : c;
    });
  }

  handleClick(e){
    return this.props.onSelect(this.props.id, this.props.data);
  }

  handleMouseDown(e){
    EventUtil.trapImmediate(e);
  }

  //Scroll menu item based on up/down mouse keys (assumes all items are the same height)
  scrollFocus(){
    const height = React.findDOMNode(this).offsetHeight;
    if(height && this.props.handleItemFocus) this.props.handleItemFocus(this.props.index,height);
  }

  render(){
    let className = 'slds-lookup__item';
    let id = this.props.id;
    if(this.props.isActive) className += ' slds-theme--shade';

    return (
      //IMPORTANT: anchor id is used to set lookup's input's aria-activedescendant
      <li className={className} role="presentation">
        <a
          href={this.props.href}
          id={id}
          ref={id}
          tabIndex="-1"
          aria-disabled={this.props.isDisabled}
          role="option"
          onClick={this.handleClick.bind(this)}
          onMouseDown={this.handleMouseDown.bind(this)}>
          <Icon name={this.props.iconName} category={this.props.iconCategory}/>
          { this.boldSearchText(this.props.children.label) }
        </a>
      </li>
    )
  }
}

Item.propTypes = {
  key: React.PropTypes.string,
  id: React.PropTypes.string,
  href: React.PropTypes.string,
  type: React.PropTypes.string,
  iconCategory: React.PropTypes.string,
  searchTerm: React.PropTypes.string,
  index: React.PropTypes.number,
  isActive: React.PropTypes.bool,
  isDisabled: React.PropTypes.bool,
  setFocus: React.PropTypes.func,
  handleItemFocus: React.PropTypes.func,
  onSelect: React.PropTypes.func,
  data: React.PropTypes.object,
  boldRegex: React.PropTypes.instanceOf(RegExp)
};

Item.defaultProps = {
};

module.exports = Item;
