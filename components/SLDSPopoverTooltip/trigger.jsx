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

const classNames = require("classnames");

import omit from "lodash.omit";

const displayName = 'SLDSTooltip.Trigger';
const propTypes = {
  tooltip: React.PropTypes.node
};
const defaultProps = {
};

/**
 * The Trigger component 
**/
class Trigger extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isTooltipClosing: false,
      isTooltipOpen: false
    };
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this).addEventListener('mouseenter', this.handleTooltipMouseEnter.bind(this));
    ReactDOM.findDOMNode(this).addEventListener('focus', this.handleTooltipMouseEnter.bind(this));
    ReactDOM.findDOMNode(this).addEventListener('mouseleave', this.handleTooltipMouseLeave.bind(this));
    ReactDOM.findDOMNode(this).addEventListener('blur', this.handleTooltipMouseLeave.bind(this));

    const openByDefault = this.props && this.props.tooltip && this.props.tooltip.props && this.props.tooltip.props.openByDefault ? this.props.tooltip.props.openByDefault : false;
    this.setState({
      isTooltipOpen: openByDefault,
      tooltipTarget: ReactDOM.findDOMNode(this),
      isMounted: true
    });
  }

  componentWillUnmount() {
    this.isUnmounting = true;
    ReactDOM.findDOMNode(this).removeEventListener('mouseenter', this.handleTooltipMouseEnter.bind(this));
    ReactDOM.findDOMNode(this).removeEventListener('focus', this.handleTooltipMouseEnter.bind(this));
    ReactDOM.findDOMNode(this).removeEventListener('mouseleave', this.handleTooltipMouseLeave.bind(this));
    ReactDOM.findDOMNode(this).removeEventListener('blur', this.handleTooltipMouseLeave.bind(this));
    this.setState({
      isMounted: false
    });
  }

  handleTooltipMouseEnter() {
    this.setState({
      isTooltipOpen: true,
      isTooltipClosing: false
    });
  }

  handleTooltipMouseLeave() {
    if(this.isUnmounting) return;
    this.setState({ isTooltipClosing: true });
    const delay = this.props.tooltip && this.props.tooltip.props && this.props.tooltip.props.hoverCloseDelay?this.props.tooltip.props.hoverCloseDelay:0;
    setTimeout(()=>{
        if(this.state.isMounted && this.state.isTooltipClosing){
          this.setState({
            isTooltipOpen: false,
            isTooltipClosing: false
          });
        }
      }.bind(this),delay
    );
  }

  getTooltip(){
    if(this.props.tooltip && this.state.isTooltipOpen && this.state.tooltipTarget){
      return React.cloneElement(this.props.tooltip,{
        target:this.state.tooltipTarget,
        openByDefault:true
      });
    }
  }

  render() {
    return (
      <span></span>
    );
  }
}

Trigger.displayName = displayName;
Trigger.propTypes = propTypes;
Trigger.defaultProps = defaultProps;

module.exports = Trigger;
