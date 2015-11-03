/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React from 'react';
const classNames = require('classnames');
import SLDSButton from '../SLDSButton';

class Notification extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  getClassName() {
    return classNames(this.props.className, 'slds-notify ', {
      [`slds-notify--${this.props.variant}`]: this.props.variant,
      [`slds-theme--${this.props.theme}`]: this.props.theme,
      [`slds-theme--alert-texture`]: this.props.texture,
    });
  }

  render(){
    return(
      <div className="slds-notify-container">
        <div className={this.getClassName()} role="alert">
          <SLDSButton
            label='Close'
            variant='icon'
            iconName='close'
            inverse={true}
            className='slds-button slds-button--icon-inverse slds-notify__close'
            onClick={this.props.onDismiss}
          />
          <span className="slds-assistive-text">Info</span>
          <div className="notify__content">
            <h2 className="slds-text-heading--small">
            {this.props.content}
            </h2>
          </div>
        </div>
      </div>
    );
  }
}
Notification.propTypes = {
};
module.exports = Notification;

