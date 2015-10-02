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
import {KEYS,EventUtil} from '../../../utils';

class Item extends React.Component {
  constructor(props) {
    super(props);
  }

  boldSearchText(children) {
    const term = this.props.searchTerm;
    if(!children || !term) return children;
    const regex = new RegExp('(' + term + ')', 'gi');
    return React.Children.map(children, c => {
      return (typeof c === 'string') ? <span dangerouslySetInnerHTML={{ __html: c.replace(regex, '<mark>$1</mark>')}}></span> : c;
    });
  }

  handleClick(e){
    e.preventDefault();
    if(e.nativeEvent){
      e.nativeEvent.preventDefault();
      e.nativeEvent.stopImmediatePropagation();
    }
    return this.props.onSelect(this.props.id);
  }

  render(){
    let className = 'slds-lookup__item';

    //TODO: make isActive styles into a class??
    let styles = {};
    if(this.props.isActive) className += ' slds-theme--shade';


    return (
      //IMPORTANT: id is used to set lookup's input's aria-activedescendant
      <li
        className={className}
        style={styles}
        role="presentaion">
        <a
          href={this.props.href}
          id={this.props.id}
          tabIndex="-1"
          aria-disabled={this.props.disabled}
          role="option"
          onClick={this.handleClick.bind(this)}
          onMouseDown={this.handleClick.bind(this)}>
          <Icon name="account" />
          { this.boldSearchText(this.props.children.label) }
        </a>
      </li>
    )
  }

}

module.exports = Item;
