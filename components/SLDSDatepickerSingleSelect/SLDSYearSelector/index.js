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
import SLDSMenuPicklist from '../../SLDSMenuPicklist';

module.exports = React.createClass( {

  displayName: 'SLDSYearSelector',

  getDefaultProps (){
    return {
      displayedDate:new Date(),
      relativeYearFrom:-5,
      relativeYearTo:5,
      onChange (displayedDate){
        console.log('onChange should be defined: ',displayedDate);
      }
    };
  },

  getOptions () {
    const now = new Date();
    const fromYear = now.getFullYear()+this.props.relativeYearFrom;
    const toYear = now.getFullYear()+this.props.relativeYearTo;
    let opts = [];

    for (let year = fromYear; year < toYear; year++){
      opts.push({label:year,value:year});
    }
    return opts;
  },

  handleSelect(selectedValue){
    if(selectedValue){
      if(this.props.onChange){
        this.props.onChange(new Date(this.props.displayedDate.setFullYear(parseInt(selectedValue.value))));
      }
    }
  },

  render() {
    return (
      <div className='slds-form-element'>

        <SLDSMenuPicklist
          options={this.getOptions()}
          placeholder='Year'
          checkmark={false}
          value={this.props.displayedDate.getFullYear()}
          onSelect={this.handleSelect}
          className='slds-picklist--fluid slds-shrink-none'
          initialFocus={true}/>
      </div>
    );
  }
});
