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

  render() {
    let message = ['New contact added ', <a href="#" key="0123">Sara Smith</a>];
    let errorMessage = 'Error';
    return (

            <div className='slds-p-around--medium'>
              <h3 className='slds-text-heading--medium slds-truncate'>
                Notification
              </h3>
              <div className='slds-p-vertical--large'>
                1. Toasts
                <div className="demo-only">
                  <SLDSNotification variant='toast' theme='success' icon='notification' texture={true} content={message} animated={true} />
                </div>

                2. Modal Toasts
              </div>
            </div>


    );
  }
});

