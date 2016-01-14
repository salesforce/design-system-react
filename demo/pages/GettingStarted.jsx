/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


import React from 'react';
//import {PrismCode} from "react-prism";

const displayName = "GettingStartedSection";
const propTypes = {};
const defaultProps = {};


class GettingStartedSection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render(){
    return (
      <div className='slds-p-around--medium'>
        <div className='slds-p-around--medium'>
        <h3 className='slds-text-heading--medium slds-truncate'>
          Getting Started
        </h3>

        <p className="slds-m-top--large">
          Note: design-system-react is optimized for React 0.14.x.
        </p>

        <p className="slds-p-vertical--small">
          To use it in your code base via npm, proceed as follows.
        </p>
        </div>

        <div className='slds-p-around--medium'>
        <h3 className='slds-text-heading--medium slds-p-vertical--small'>
          Example for tooltip over an info icon
        </h3>

        <p className="slds-p-vertical--small">
          First, install the npm module:
        </p>

        <code className="slds-p-vertical--small">
          {"npm install --save design-system-react"}
        </code>

        <p className="slds-p-vertical--small slds-m-top--large ">
          Then, in the files where you're using the components, refer to each Lightning Design System component using the "SLDS" prefix. For example to import the Tooltip and Icon components:
        </p>

        <code className="slds-p-vertical--small">
          {"import {SLDSPopoverTooltip, SLDSIcon} from \"design-system-react\""}
        </code>

        <p className="slds-p-vertical--small slds-m-top--large ">
          You can then use the components in your JSX markup. For example:
        </p>

        <code className="slds-p-vertical--small">
          {'Note: the SLDSPopoverTooltip requires a focusable element as a child (ie. either a button or anchor).'}<br />
          <br />
          {'<div ref="tooltipDemoExample">'}<br />
          &nbsp;&nbsp;{'<SLDSPopoverTooltip'}<br />
           &nbsp;&nbsp;&nbsp;&nbsp;{'align="top"'}<br />
           &nbsp;&nbsp;&nbsp;&nbsp;{'content={<span>Here is more information.</span>}'}<br />
           &nbsp;&nbsp;&nbsp;&nbsp;{'targetElement={this.refs.tooltipDemoExample}>'}<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'<a href="javascript:void(0)">'}<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'<SLDSIcon assistiveText="info" category="utility" name="info" className="slds-icon-text-default" />'}<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'</a>'}<br />
          &nbsp;&nbsp;{'</SLDSPopoverTooltip>'}<br />
          {'</div>'}<br />
        </code>

        <p className="slds-p-vertical--small slds-m-top--large ">
          Here's the result when you hover over the info icon:
        </p>
        <img src="demo/assets/images/tooltipHover.png" alt="Tooltip opened on hover" />

        <p className="slds-p-vertical--small slds-m-top--large ">
          Have fun! If you have any questions (and we hope you do!), please check out our <a href="/#/home/faq">FAQ</a>. If you don't find an answer there, then please let us know via our <a href="https://github.com/salesforce-ux/design-system-react/issues">Github Issues</a>.
        </p>

      </div>
      </div>
    );
  }

}

GettingStartedSection.displayName = displayName;
GettingStartedSection.propTypes = propTypes;
GettingStartedSection.defaultProps = defaultProps;

module.exports = GettingStartedSection;
