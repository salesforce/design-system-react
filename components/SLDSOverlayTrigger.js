/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

const React = require('react');
const ReactDOM = require('react-dom');

const PT = React.PropTypes;
const classNames = require('classnames');
import omit from 'lodash.omit';
import extend from 'lodash.assign';

import createChainedFunction from '../utils/create-chained-function';
import SLDSPopover from '../SLDSPopover';

const eventDict = {click: ['onClick'], hover: ['onMouseEnter', 'onMouseLeave', 'onFocus', 'onBlur'], focus: ['onFocus', 'onBlur'] };

class OverlayTrigger extends React.Component {
  componentDidMount() {
    this.wrapper = this.appendWrapperDiv();
  }

  unmountPopover() {
    ReactDOM.unmountComponentAtNode(this.wrapper);
    return false;
  }

  mountPopover() {
    const popover = (
      <SLDSPopover className="" targetElement={this.refs.control} targetAttachment={this.props.placement}>
        {this.cloneOverlay()}
      </SLDSPopover>
    );
    ReactDOM.render(popover, this.wrapper);
    return true;
  }

  oppositePlacement(p) {
    return {top: 'bottom', right: 'left', bottom: 'top', left: 'right'}[p];
  }

  nubbinClass() {
    const firstPart = this.props.placement.split(' ')[0];
    return 'slds-nubbin slds-nubbin--' + this.oppositePlacement(firstPart);
  }

  appendWrapperDiv() {
    const div = document.createElement('div');
    const root = ReactDOM.findDOMNode(this);
    div.className = 'slds-popover-wrapper slds-fall-into-ground';
    root.appendChild(div);
    return div;
  }

  cloneOverlay() {
    return React.cloneElement(this.props.overlay, {
      visible: true,
      className: classNames(this.nubbinClass())
    });
  }

  show() {
    this.showingPopover = this.mountPopover();
  }

  hide() {
    this.showingPopover = this.unmountPopover();
  }

  toggle() {
    this.showingPopover = this.showingPopover ? this.unmountPopover() : this.mountPopover();
  }

  getProperEventTrigger(childProps) {
    let obj = {};
    const events = eventDict[this.props.trigger] || ['onClick'];
    events.forEach( e => {
      obj[e] = createChainedFunction(childProps[e], this.toggle.bind(this));
    });
    return obj;
  }

  renderControl() {
    const child = React.Children.only(this.props.children);
    const props = this.getProperEventTrigger(child.props);
    return React.cloneElement(child, _.extend({refs: 'control'}, props));
  }

  render() {
    return this.renderControl();
  }
}

module.exports = OverlayTrigger;
