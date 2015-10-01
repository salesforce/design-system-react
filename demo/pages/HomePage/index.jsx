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
import SLDSGrid from '../../../components/SLDSGrid';
import {ButtonIcon, Icon} from "./../../../components/SLDSIcons";


import ButtonSection from './ButtonSection';
import PicklistBaseSection from './PicklistBaseSection';
import ModalSection from './ModalSection';
import DatePickerSingleSelectSection from './DatePickerSingleSelectSection';
import LookupBaseSection from './LookupBaseSection';

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
                    <Icon name='lead' category='standard' size='large' position='left' />
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
          <div className='region region--main slds-grow slds-size--1-of-1 slds-medium-size--1-of-2 slds-large-size--8-of-12 slds-col-rule--right slds-p-around--large'>


            <ButtonSection />

            <PicklistBaseSection />

            <ModalSection />

            <DatePickerSingleSelectSection />

            <LookupBaseSection />


{/*

            <div className="slds-p-around--medium">

              <h3 className="slds-text-heading--medium slds-truncate">
                Tabs
              </h3>

              <PrismCode className='language-markup'>
                {require("raw-loader!../code-snippets/SLDSTabsPage.txt")}
              </PrismCode>

              <div className="slds-p-vertical--large">


                <SLDSTabs flavor="default">
                  <SLDSTabs.Item title="Item One">
                    <h2>Item One Content</h2>
                  </SLDSTabs.Item>
                  <SLDSTabs.Item title="Item Two">
                    <h2>Item Two Content</h2>
                  </SLDSTabs.Item>
                  <SLDSTabs.Item title="Item Three">
                    <h2>Item Three Content</h2>
                  </SLDSTabs.Item>
                </SLDSTabs>
              </div>
            </div>
*/}




          </div>
        </main>
    </SLDSGrid>
    );
  }
});
