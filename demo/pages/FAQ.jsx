/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


import React from 'react';
import Router from 'react-router';
const { Route, DefaultRoute, RouteHandler, Link } = Router;

const displayName = "FAQSection";
const propTypes = {};
const defaultProps = {};

class FAQSection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render(){
    return (
      <div className='slds-p-around--medium copy-text' style={{"maxWidth": "800px"}}>
        <h3 className='slds-text-heading--medium slds-truncate'>
          FAQ
        </h3>

        <section className="slds-p-vertical--medium">
          <p className="slds-text-heading--medium slds-p-vertical--medium">
            What is the <a href="http://www.lightningdesignsystem.com/">Lightning Design System</a>?
          </p>
          <p>
            It is collection of design patterns, components, and guidelines for creating unified UI in the Salesforce ecosystem.
          </p>
        </section>

        <section className="slds-p-vertical--medium">
          <p className="slds-text-heading--medium slds-p-vertical--medium">
            How is the Design System React Library different than the Lightning Design System?
          </p>
          <p>
            The Lightning Design System consists of static markup components. The Design System React Library is the ReactJS implementation.
          </p>
        </section>

        <section className="slds-p-vertical--medium">
          <p className="slds-text-heading--medium slds-p-vertical--medium">
            How do I start using the Design System React Library components in my project?
          </p>
          <p>
            Visit the <Link to="getting-started">Getting Started</Link> page for set up instructions.
          </p>
        </section>

        <section className="slds-p-vertical--medium">
          <p className="slds-text-heading--medium slds-p-vertical--medium">
            Are the Design System React components accessible?
          </p>
          <p>
            We strive to make all components accessible for keyboard users and screen readers. If you find any accessibility bugs, please submit a <a href="https://github.com/salesforce-ux/design-system-react/issues">GitHub Issue</a>.
          </p>
        </section>

        <section className="slds-p-vertical--medium">
          <p className="slds-text-heading--medium slds-p-vertical--medium">
            Which version of React and Lightning Design System do you support?
          </p>
          <p>
           Design System React is optimized for react0.14.x and uses Lightning Design System 0.12.1.
          </p>
        </section>

        <section className="slds-p-vertical--medium">
          <p className="slds-text-heading--medium slds-p-vertical--medium">
          Which browsers are supported?
          </p>
          <p>
            We support the same browsers as the Lightning Design System. Please visit <a href="http://www.lightningdesignsystem.com/faq/#what-browsers-are-supported">Lightning Design System - FAQ</a> for details.
          </p>
        </section>

        <section className="slds-p-vertical--medium">
          <p className="slds-text-heading--medium slds-p-vertical--medium">
            How can I contribute?
          </p>
          <p>
            First off - thank you! The Design System React project is open-source, and we would love your input! Please visit the <a href="https://github.com/salesforce-ux/design-system-react/blob/master/CONTRIBUTING.md">Contributing Guidelines</a> beforehand.
          </p>
        </section>

        <section className="slds-p-vertical--medium">
          <p className="slds-text-heading--small slds-p-vertical--medium">
            Visit the <a href="http://www.lightningdesignsystem.com/faq">Lightning Design System - FAQ</a> for more FAQs.
          </p>
        </section>
      </div>
    );
  }

}

FAQSection.displayName = displayName;
FAQSection.propTypes = propTypes;
FAQSection.defaultProps = defaultProps;

module.exports = FAQSection;

