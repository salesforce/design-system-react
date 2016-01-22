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
const { Link } = Router;


const displayName = "TooltipSection";
const propTypes = {};
const defaultProps = {};

class Welcome extends React.Component {
  render(){
    return (
      <section className="copy-text" style={{"maxWidth": "800px"}}>
        <h1 className='site-text--xl'>
          Design System React
        </h1>
        <p className="slds-text-heading--medium">
        Create the world’s best enterprise app experiences.
        </p>

        <p className="slds-p-vertical--small" style={{"backgroundColor":"yellow"}}>
        Current release: TODO -- add link to release notes
        </p>

        <p className="slds-p-vertical--small" style={{"backgroundColor":"yellow"}}>
        Github Stars: TODO -- add github stars button
        </p>

        <p className="slds-p-vertical--small">
        Design System React is the ReactJS implementation of <a href="http://www.lightningdesignsystem.com/">Ligtning Design System</a>, a collection of design patterns, components, and guidelines for creating unified UI in the Salesforce ecosystem.
        </p>

        <p className="slds-p-vertical--small">
        Check out the <Link to="getting-started">Getting Started</Link> page to learn how to import Design System React into your project.
        </p>
      </section>
    );
  }

}

Welcome.displayName = displayName;
Welcome.propTypes = propTypes;
Welcome.defaultProps = defaultProps;

module.exports = Welcome;

