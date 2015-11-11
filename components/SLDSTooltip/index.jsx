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

import {KEYS,EventUtil} from '../utils';
import omit from 'lodash.omit';


module.exports = React.createClass( {

  propTypes: {
    hoverCloseDelay:PropTypes.number
  },

  getDefaultProps(){
    return {
      hoverCloseDelay:300
    }
  },

  getInitialState(){
    return {
      isOpen:false
    };
  },

  componentDidMount(){
  },

  handleMouseEnter(event) {
    this.setState({isOpen:true});
  },

  handleMouseLeave(event) {
    this.setState({isOpen:false});
  },

  getTooltipContent() {
    return <div className='slds-popover__body'>SUPER STUFF IS HERE!</div>;
  },

  getTooltip() {
    return this.state.isOpen?<SLDSPopover
          targetElement={this.refs.tooltipTarget}
          closeOnTabKey={true}
          className=''
          marginTop='1rem'
          marginBottom='1rem'
          horizontalAlign='center'
          onClose={this.handleCancel}>
          <div className='slds-popover slds-popover--tooltip slds-nubbin--top'>
          {this.getTooltipContent()}
          </div>
        </SLDSPopover>:null;
  },

  render(){
    return (
      <span refs='tooltipTarget' onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
        { this.props.children }
        { this.getTooltip() }
      </span>
    );
  }

});