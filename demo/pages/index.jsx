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
import SLDSIcon from "../../components/SLDSIcon";

const SLDSColumn = SLDSGrid.Column;


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

        <div className='region region--top slds-shrink-none'>
          <div className='slds-page-header'>
            <SLDSGrid>
              <SLDSColumn className='slds-has-flexi-truncate'>
                <div className='slds-media'>
                  <div className='slds-media__figure'>
                    <SLDSIcon assistiveText="lead" name='lead' category='standard' size='large' />
                  </div>
                  <div className='slds-media__body'>
                    <p className='slds-text-heading--label'>Lightning Design System</p>
                    <div className='slds-grid'>
                      <h1 className='slds-text-heading--medium slds-m-right--small slds-truncate slds-align-middle' title='Record Title'>React Components</h1>
                    </div>
                  </div>
                </div>
              </SLDSColumn>
            </SLDSGrid>
          </div>
        </div>

        <main className='stage-main slds-grid slds-wrap slds-grow' role='main'>
          <div className='region region--main slds-grow slds-size--1-of-6 slds-medium-size--1-of-6 slds-large-size--2-of-12 slds-col-rule--right slds-p-around--large'>

            <section className="slds-p-bottom--large">
              <p className="slds-text-heading--small slds-p-vertical--small">
                <Link to="getting-started">Getting Started</Link>
              </p>
              <p className="slds-text-heading--small slds-p-vertical--small">Components</p>
              <ul className="slds-p-bottom--small">
                <li><Link to="button">SLDSButton</Link></li>
                <li><Link to="button-stateful">SLDSButtonStateful</Link></li>
                <li><Link to="button-group">SLDSButtonGroup</Link></li>
                <li><Link to="dropdown">SLDSDropdownBase</Link></li>
                <li><Link to="icon">SLDSIcon</Link></li>
                <li><Link to="lookup">SLDSLookup</Link></li>
                <li><Link to="modal">SLDSModal</Link></li>
                <li><Link to="notification">SLDSNotification</Link></li>
                <li><Link to="picklist">SLDSPicklistBase</Link></li>
                <li><Link to="tooltip">SLDSTooltip</Link></li>
              </ul>
              <p className="slds-text-heading--small slds-p-vertical--small">
                <Link to="faq">FAQ</Link>
              </p>
            </section>
        </div>

        <div className="region region--main slds-grow slds-size--5-of-6 slds-medium-size--5-of-6 slds-large-size--10-of-12 slds-col-rule--right slds-p-around--large">
          <RouteHandler/>
        </div>
      </main>

    </SLDSGrid>
    );
  }
});
