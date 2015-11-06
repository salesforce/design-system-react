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
import SLDSNotification from '../../../components/SLDSNotification';
import {SLDSButton, SLDSModal} from '../../../components';
import {default as PrismCode} from "react-prism/lib/PrismCode";

module.exports = React.createClass( {

  getDefaultProps () {
    return {};
  },

  getInitialState () {
    return {
      modalIsOpen: false
    };
  },

  getModalContent(){
    return (
      <div>
        <p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
        <p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
        <p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
        <p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
        <p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
        <p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
        <p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
        <p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
        <p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
        <p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
        <p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
        <p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
        <p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
        <p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
        <p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
        <p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
        <p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
        <p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
        <p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
        <p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
        <p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
        <p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
        <p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
        <p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
        <p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
        <p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
        <p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
      </div>
    )
  },

  openModal () {
    this.setState({modalIsOpen: true});
  },

  closeModal () {
    this.setState({modalIsOpen: false});
  },

  handleSubmitModal () {
    this.closeModal();
  },

  dismissToast(){
    console.log('====> Dismiss Toast Message');
  },

  render() {
    let successMsg = ['New contact added ', <a href="#" key="0123">Sara Smith</a>];
    let errorMsg = 'There was a problem updating the record.';
    let toastStyle = { display: 'inline-block'};
    return (

      <div className='slds-p-around--medium'>
        <h3 id='notificationSection' className='slds-text-heading--medium slds-truncate'>
          Notification
        </h3>
        <h4>
          * All notifications are fixed and centered at the top of the screen.
        </h4>
        <PrismCode className='language-markup'>
          {require('raw-loader!../../code-snippets/SLDSNotification.txt')}
        </PrismCode>
        <div className='slds-p-vertical--medium'>
          <div className="slds-p-vertical--small">
            <h4 className="slds-text-heading--small ">Alerts</h4>
            <div className="demo-only">
              <div className="slds-p-bottom--small">
                {this.state.modalIsOpen ? null: <SLDSNotification variant='alert' theme='success' icon='notification' texture={true} content={successMsg} onDismiss={this.dismissToast} />}
              </div>
              <div className="slds-p-bottom--small">
                {this.state.modalIsOpen ? null: <SLDSNotification variant='alert' theme='error' icon='warning' texture={true} content={errorMsg} onDismiss={this.dismissToast} />}
              </div>
            </div>
          </div>

          <div className="slds-p-vertical--small">
            <h4 className="slds-text-heading--small ">Toasts</h4>

            <div className="demo-only" style={toastStyle}>
              Base
              {this.state.modalIsOpen ? null: <SLDSNotification variant='toast' theme='success' icon='notification' content={successMsg} onDismiss={this.dismissToast} />}
            </div>

            <p>Modal Toasts</p>
            <SLDSButton
              label='Open Modal Toast'
              variant='brand'
              onClick={this.openModal} />
            <SLDSModal
              isOpen={this.state.modalIsOpen}
              toast={<SLDSNotification variant='toast' theme='error' icon='warning' content={errorMsg} onDismiss={this.dismissToast} />}
              title={<span>Lightning Design System: Style with Ease</span>}
              footer={[
                <SLDSButton key='cancelBtn' label='Cancel' variant='neutral' onClick={this.closeModal} />,
                  <SLDSButton key='saveBtn' label='Save' variant='brand' onClick={this.handleSubmitModal} />
                  ]}
                  onRequestClose={this.closeModal}>
                  {this.getModalContent()}
                </SLDSModal>
              </div>

            </div>
          </div>


    );
  }
});

