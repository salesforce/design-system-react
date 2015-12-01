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

import SLDSGrid from '../../../components/SLDSGrid';
import {ButtonIcon, Icon} from "./../../../components/SLDSIcons";

import ButtonSection from './ButtonSection';
import ButtonGroupSection from './ButtonGroupSection';

import NotificationSection from './NotificationSection';

import LookupBaseSection from './LookupBaseSection';

import LookupBaseCustomSection from './LookupBaseCustomSection';

import LookupBaseDynamicSection from './LookupBaseDynamicSection';

import PicklistBaseSection from './PicklistBaseSection';
import PicklistBaseCustomSection from './PicklistBaseCustomSection';

import DropdownBaseSection from './DropdownBaseSection';

import ModalSection from './ModalSection';
import DatePickerSingleSelectSection from './DatePickerSingleSelectSection';
import IconSection from './IconSection';
import TooltipSection from './TooltipSection';

import DOCS from '../../../docs';
console.log('DOCS: ',DOCS);


const SLDSColumn = SLDSGrid.Column;


module.exports = React.createClass( {
  getDefaultProps () {
    return {};
  },

  getInitialState () {
    return {};
  },

  animate(elem,style,unit,from,to,time,prop) {
    if( !elem) return;
    var start = new Date().getTime(),
      timer = setInterval(function() {
      var step = Math.min(1,(new Date().getTime()-start)/time);
      if (prop) {
        elem[style] = (from+step*(to-from))+unit;
      } else {
        elem.style[style] = (from+step*(to-from))+unit;
      }
      if( step == 1) clearInterval(timer);
    },25);
    elem.style[style] = from+unit;
  },

  scrollTo(elemId) {
    let that = this;
    return function() {
      var target = document.getElementById(elemId);
      that.animate(document.body, "scrollTop", "", 0, target.offsetTop, 500, true);
      target.focus();
    };
  },

  render() {
    return (
      <div>Please select a component</div>

    );
  }
});

    //   { <SLDSGrid flavor='vertical' className='stage slds-nowrap'>

    //     <div className='region region--top slds-shrink-none'>
    //       <div className='slds-page-header'>
    //         <SLDSGrid>
    //           <SLDSColumn className='slds-has-flexi-truncate'>
    //             <div className='slds-media'>
    //               <div className='slds-media__figure'>
    //                 <Icon assistiveText="lead" name='lead' category='standard' size='large' position='left' />
    //               </div>
    //               <div className='slds-media__body'>
    //                 <p className='slds-text-heading--label'>Lightning Design System</p>
    //                 <div className='slds-grid'>
    //                   <h1 className='slds-text-heading--medium slds-m-right--small slds-truncate slds-align-middle' title='Record Title'>React Components</h1>
    //                 </div>
    //               </div>
    //             </div>
    //           </SLDSColumn>
    //         </SLDSGrid>
    //       </div>
    //     </div>

    //     /*

    //     <main className='stage-main slds-grid slds-wrap slds-grow' role='main'>

    //         <ButtonSection/>

    //         <ButtonGroupSection />

    //         <DropdownBaseSection />

    //         <IconSection />

    //         <LookupBaseSection />

    //         <LookupBaseDynamicSection />

    //         <LookupBaseCustomSection />

    //         <ModalSection />

    //         <NotificationSection/>

    //         <PicklistBaseSection />

    //         <PicklistBaseCustomSection />

    //         <TooltipSection/>

    //         <div class="component-details">
    //           component-details
    //         </div>

    //         <h1 className="slds-text-heading--large slds-p-top--large">Future Components</h1>

    //         <DatePickerSingleSelectSection />
    //     </main>
      
    // </SLDSGrid>
    //   }
