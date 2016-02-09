/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

'use strict';

import React from 'react';
import Router from 'react-router';
const { Route, DefaultRoute, RouteHandler, Link } = Router;
import SLDSGrid from '../../components/SLDSGrid';


module.exports = React.createClass( {
  getDefaultProps () {
    return {};
  },

  getInitialState () {
    return {};
  },

  render() {
    return (
      <SLDSGrid flavor='vertical' className='stage slds-nowrap'>
        <section className="demo-only">
        <header className='bg-lt-gray bb-gray slds-clearfix slds-p-vertical--small slds-p-horizontal--medium'>
          <Link to="welcome" className="slds-float--left a-plain slds-p-vertical--x-small">
            <div className='slds-media slds-media--center'>
              <span className='slds-media__figure site-logo'>Salesforce</span>
              <div className='slds-media__body'>
                <h1 className='slds-text-heading--small slds-m-right--small slds-truncate slds-align-middle' title='Record Title'>
                interactive accessible components</h1>
              </div>
            </div>
          </Link>

          <p className="slds-float--right slds-p-vertical--x-small">
            <a href="https://github.com/salesforce-ux/design-system-react" className="a-plain ">
              <span className="slds-p-right--x-small">View on GitHub</span>
              <img src="/assets/gitHubLogo.png" alt="GitHub Logo" width="40" height="40" />
            </a>
          </p>
        </header>
        </section>

        <main className='stage-main slds-grid slds-wrap slds-grow'>
          <aside className='region region--main slds-grow slds-size--1-of-6 slds-medium-size--1-of-6 slds-large-size--2-of-12 slds-col-rule--right slds-p-vertical--large'>
            {/*
            <p className="slds-text-heading--small slds-p-vertical--small">
              <Link to="getting-started" className="a-plain slds-p-horizontal--large slds-p-vertical--x-small">Getting Started</Link>
            </p>
            */}
            <p className="slds-text-heading--small slds-p-horizontal--large slds-p-vertical--small">Components</p>
            <ul className="slds-p-bottom--small">
              <li><Link to="button" className="a-plain slds-p-horizontal--x-large slds-p-vertical--x-small">Button</Link></li>
              <li><Link to="button-group" className="a-plain slds-p-horizontal--x-large slds-p-vertical--x-small">ButtonGroup</Link></li>
              <li><Link to="button-stateful" className="a-plain slds-p-horizontal--x-large slds-p-vertical--x-small">ButtonStateful</Link></li>
              <li><Link to="dateinput" className="a-plain slds-p-horizontal--x-large slds-p-vertical--x-small">DatepickerSingleSelect</Link></li>

              <li><Link to="icon" className="a-plain slds-p-horizontal--x-large slds-p-vertical--x-small">Icon</Link></li>
              <li><Link to="lookup" className="a-plain slds-p-horizontal--x-large slds-p-vertical--x-small">Lookup</Link></li>
              <li><Link to="dropdown" className="a-plain slds-p-horizontal--x-large slds-p-vertical--x-small">MenuDropdown</Link></li>
              <li><Link to="picklist" className="a-plain slds-p-horizontal--x-large slds-p-vertical--x-small">MenuPicklist</Link></li>
              <li><Link to="modal" className="a-plain slds-p-horizontal--x-large slds-p-vertical--x-small">Modal</Link></li>
              <li><Link to="notification" className="a-plain slds-p-horizontal--x-large slds-p-vertical--x-small">Notification</Link></li>
              <li><Link to="tooltip" className="a-plain slds-p-horizontal--x-large slds-p-vertical--x-small">PopoverTooltip</Link></li>
            </ul>
          </aside>

          <div className="region region--main slds-grow slds-size--5-of-6 slds-medium-size--5-of-6 slds-large-size--10-of-12 slds-col-rule--right slds-p-around--large">
            <RouteHandler/>
          </div>
      </main>

    </SLDSGrid>
    );
  }
});
