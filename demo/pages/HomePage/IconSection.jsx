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
import SLDSButton from '../../../components/SLDSButton';
import {ButtonIcon, Icon} from "./../../../components/SLDSIcons";
import {default as PrismCode} from "react-prism/lib/PrismCode";
import SLDSUtilityIcon from '../../../components/SLDSUtilityIcon';





module.exports = React.createClass( {

  getDefaultProps () {
    return {};
  },

  getInitialState () {
    return {};
  },



  handleButtonClick () {
    alert('Test Button Clicked');
  },

  render() {
    return (

            <div className='slds-p-around--medium'>
              <h3 id='iconSection' className='slds-text-heading--medium slds-truncate'>
                Icon
              </h3>
              <PrismCode className='language-markup'>
                {require('raw-loader!../../code-snippets/SLDSIcon.txt')}
              </PrismCode>
              <div className='slds-p-vertical--large'>

              <table className="slds-container--small">
              <tr>
                <td className="slds-p-vertical--medium">
                Action
                </td>
                <td>
                <Icon name='announcement' category='action' size="medium" assistiveText='Action' />
                </td>
              </tr>
              <tr>
                <td className="slds-p-vertical--medium">
                Custom
                </td>
                <td>
                <Icon name='custom3' category='custom' size="large" assistiveText='Custom' />
                </td>
              </tr>
              <tr>
                <td className="slds-p-vertical--medium">
                Standard
                </td>
                <td>
                <Icon name='account' category='standard' size="large" assistiveText='Standard' />
                </td>
              </tr>
              <tr>
                <td className="slds-p-vertical--medium">
                Utility
                </td>
                <td>
                <Icon name='open_folder' category='utility' size="medium" assistiveText='Files' className="slds-icon-text-default" />
                </td>
              </tr>
              </table>

              </div>
            </div>


    );
  }
});
