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

import SLDSButtonGroup from '../../../components/SLDSButtonGroup';
import SLDSDropdownBase from '../../../components/SLDSDropdownBase';
import SLDSButton from '../../../components/SLDSButton';
import SLDSButtonStateful from '../../../components/SLDSButton/SLDSButtonStateful';
import {ButtonIcon, Icon} from "./../../../components/SLDSIcons";
import {default as PrismCode} from "react-prism/lib/PrismCode";

module.exports = React.createClass( {

  getDefaultProps () {
    return {};
  },

  getInitialState () {
    return {};
  },

  handleOnSelect(){
    console.log('onSelect triggered');
  },

  render() {

    return (

            <div className='slds-p-around--medium'>
              <h3 className='slds-text-heading--medium slds-truncate'>
                <a href="javascript:void(0)" id='buttonGroupSection'>
                  Button Group
                </a>
              </h3>

              <PrismCode className='language-markup'>
                {require('raw-loader!../../code-snippets/SLDSButtonGroup.txt')}
              </PrismCode>

              <div className='slds-p-vertical--small'>
                <SLDSButtonGroup>
                  <SLDSButton label='Refresh' variant='neutral' />
                  <SLDSButton label='Edit' variant='neutral' />
                  <SLDSButton label='Save' variant='neutral' />

                <SLDSDropdownBase
                    assistiveText='More Options'
                    variant='icon'
                    iconName='down'
                    iconVariant='border-filled'
                    options={[
                      {label:'A Option Option Super Super Long',value:'A0'},
                      {label:'B Option',value:'B0'},
                      {label:'C Option',value:'C0'},
                      {label:'D Option',value:'D0'},
                      {label:'E Option',value:'E0'},
                      {label:'A1 Option',value:'A1'},
                      {label:'B2 Option',value:'B1'},
                      {label:'C2 Option',value:'C1'},
                      {label:'D2 Option',value:'D1'},
                      {label:'E2 Option Super Super Long',value:'E1'},

                    ]}
                    horizontalAlign='right'
                    onSelect={this.handleOnSelect}
                    onClick={this.handleOnClick}
                    onUpdateHighlighted={this.handleOnUpdateHighlighted}
                    />


                </SLDSButtonGroup>
              </div>

              <div className='slds-p-vertical--small'>
                <SLDSButtonGroup>
                  <SLDSButtonStateful type="icon" assistiveText="View Reports" label='Chart' variant='icon' iconName='chart' />
                  <SLDSButtonStateful type="icon" assistiveText="Filter Data" label='Filter' variant='icon' iconName='filter' />
                  <SLDSButton assistiveText='Sort' variant='icon' iconName='sort' iconVariant='more'/>
                </SLDSButtonGroup>
              </div>
            </div>


    );

  }
});
