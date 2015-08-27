/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React, { Component } from 'react';
import SLDSDateInput from '../slds/SLDSDateInput/index';
import SLDSLookup from '../slds/SLDSLookup/index';
import SLDSPopover from '../slds/SLDSPopover';
import {ButtonIcon, Icon} from "./../slds/SLDSIcons";
import {default as PrismCode} from "react-prism/lib/PrismCode";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.items = ["Paddy's Pub", "Tyrell Corp", "Paper St. Soap Company", "Nakatomi Investments", "Acme Landscaping", "Acme Construction"];
  }

  render() {
    return (
      <section className="stage slds-grid slds-grid--vertical slds-nowrap"> 
        <div className="region region--top slds-shrink-none">
          <div className="slds-page-header">
            <div className="slds-grid">
              <div className="slds-col slds-has-flexi-truncate">
                <div className="slds-media">
                  <div className="slds-media__figure">
                    <Icon name="lead" category="standard" size="large" position="left" />
                  </div>
                  <div className="slds-media__body">
                    <p className="slds-text-heading--label">Interactive</p>
                    <div className="slds-grid">
                      <h1 className="slds-text-heading--medium slds-m-right--small slds-truncate slds-align-middle" title="Record Title">Components</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <main className="stage-main slds-grid slds-wrap slds-grow slds-scrollable--y" role="main">
          <div className="region region--main slds-grow slds-size--1-of-1 slds-medium-size--1-of-2 slds-large-size--8-of-12 slds-col-rule--right slds-p-around--large">
            <div className="slds-p-around--medium">
              <PrismCode className='language-markup'>
                {require("raw-loader!../code-snippets/SLDSDateInputPage.txt")}
              </PrismCode>
            </div>
            <div className="slds-p-around--medium">
              <SLDSDateInput />
            </div>
            <div className="slds-p-around--medium">
              <SLDSLookup items={this.items} label="Contacts" />
            </div>
          </div>
        </main>
    </section>
    );
  }
}
