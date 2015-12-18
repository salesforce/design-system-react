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
import SLDSLookup from '../../../components/SLDSLookup';
//import DefaultHeader from '../../../components/SLDSLookup/Menu/DefaultHeader';
//import DefaultFooter from '../../../components/SLDSLookup/Menu/DefaultFooter';
import CustomLookupListItemLabel from './CustomLookupListItemLabel.cjsx';

const items = [
  {label:'Paddy\'s Pub'},
  {label:'Tyrell Corp'},
  {label:'Paper St. Soap Company'},
  {label:'Nakatomi Investments'},
  {label:'Acme Landscaping'},
  {label:'Acme Construction'}
];



module.exports = React.createClass( {

  getDefaultProps () {
    return {};
  },

  getInitialState () {
    return {searchVal:null};
  },

  onChange(newValue){
    console.log('New search term: ', newValue);
    this.setState({searchVal: newValue});
  },

  selectItem(item){
    console.log(item , ' Selected');
  },

  getFooter(){
    return <SLDSLookup.DefaultFooter type='account' />;
  },

  render() {
    return (



            <div className="slds-p-around--medium">

              <h3 className="slds-text-heading--medium slds-truncate">
                Lookup with Custom Item Label Renderer
              </h3>

              <div className="slds-p-vertical--large">
                <SLDSLookup
                  emptyMessage="No items found"
                  footerRenderer={SLDSLookup.DefaultFooter}
                  hasError={true}
                  headerRenderer={SLDSLookup.DefaultHeader}
                  iconCategory='utility'
                  iconClasses='slds-icon-text-default'
                  iconName='open_folder'
                  items={items}
                  label="Account"
                  listItemLabelRenderer={CustomLookupListItemLabel}
                  onChange={this.onChange}
                  onItemSelect={this.selectItem}
                  type="account"
                />
              </div>

            </div>


    );
  }
});
