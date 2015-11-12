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

//import {KEYS,EventUtil} from '../utils';
//import omit from 'lodash.omit';

import cx from 'classnames';

module.exports = React.createClass( {

  displayName: 'SLDSToolip',

  propTypes: {
    align: PropTypes.string,
    children: PropTypes.node,
    content: PropTypes.node,
    hoverCloseDelay: PropTypes.number,
    openByDefault: PropTypes.bool,
    openOn: PropTypes.string,
  },


  getDefaultProps () {
    return {
      align: 'top',
      content: <span>Tooltip</span>,
      hoverCloseDelay: 350,
      openByDefault: false,
      openOn: 'hover',
    };
  },

  getInitialState(){
    return {
      isOpen: this.props.openByDefault,
      isClosing: false
    };
  },

  componentDidMount(){
  },

  handleMouseClick(event) {
    this.setState({
      isOpen: !this.state.isOpen,
      isClosing: !this.state.isOpen
    });
  },


  handleMouseEnter(event) {
    this.setState({
      isOpen: true,
      isClosing: false
    });
  },

  handleMouseLeave(event) {
    this.setState({isClosing: true});
    setTimeout(()=>{
      if(this.isMounted && this.state.isClosing){
        this.setState({
          isOpen: false,
          isClosing: false
        });
      }
    },this.props.hoverCloseDelay)
  },

  getTooltipContent() {
    return <div className='slds-popover__body'>{this.props.content}</div>;
  },

  getHorizontalAlign() {
    if (this.props.align==='left') {
      return 'left';
    }
    else if (this.props.align==='right') {
      return 'right';
    }
    return 'center';
  },

  getVerticalAlign() {
    if (this.props.align==='bottom') {
      return 'bottom';
    }
    else if (this.props.align==='top') {
      return 'top';
    }
    return 'middle';
  },

  handleCancel() {
    this.setState({
      isOpen: false,
      isClosing: false
    });
  },

  getTooltip() {
    const style = {
      'slds-popover': true,
      'slds-popover--tooltip': true,
      'slds-nubbin--top': this.props.align === 'bottom',
      'slds-nubbin--bottom': this.props.align === 'top',
      'slds-nubbin--left': this.props.align === 'right',
      'slds-nubbin--right': this.props.align === 'left'
    };

    return this.state.isOpen?<SLDSPopover
          key={this.getHorizontalAlign()+' '+this.getVerticalAlign()}
          targetElement={this.refs.tooltipTarget}
          closeOnTabKey={true}
          className=''
          marginTop='1rem'
          marginBottom='1rem'
          marginLeft='1.5rem'
          marginRight='1.5rem'
          horizontalAlign={this.getHorizontalAlign()}
          verticalAlign={this.getVerticalAlign()}
          flippable={false}
          onClose={this.handleCancel}>
          <div className={cx(style)}>
            {this.getTooltipContent()}
          </div>
        </SLDSPopover>:null;
  },

  render(){
    return (
      <span refs='tooltipTarget' onClick={this.props.openOn === 'click' ? this.handleMouseClick:null} onMouseEnter={this.props.openOn === 'hover' ? this.handleMouseEnter:null} onMouseLeave={this.props.openOn === 'hover' ? this.handleMouseLeave:null}>
        { this.props.children }
        { this.getTooltip() }
      </span>
    );
  }

});
