/*
   Copyright (c) 2015, salesforce.com, inc. All rights reserved.
   Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
   Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
   Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
   Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   */

import React from 'react';
import SLDSIcon from "../../../SLDSIcon";
import { EventUtil } from '../../../utils';

const displayName = "LookupDefaultSectionHeader";
const propTypes = {};
const defaultProps = {};

class DefaultSectionHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.isActive !== this.props.isActive && nextProps.isActive === true) {
      this.props.setFocus('searchRecords');
    }
  }

  handleClick(){
    console.log('=====> Lookup Header Clicked');
    if(this.props.onClose){
      this.props.onClose();
    }
  }

  handleMouseDown(event) {
    EventUtil.trapImmediate(event);
  }

  render(){
    return (
      <div className="slds-lookup__item"
        tabIndex="-1"
      >
        @@@ Section
      </div>
    )
  }
}

DefaultSectionHeader.displayName = displayName;
DefaultSectionHeader.propTypes = propTypes;
DefaultSectionHeader.defaultProps = defaultProps;

module.exports = DefaultSectionHeader;
