/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

"use strict";

import React from "react";
import SLDSNotification from "../../../components/SLDSNotification";
import {SLDSButton, SLDSModal} from "../../../components";

module.exports = React.createClass( {

  getDefaultProps () {
    return {};
  },

  getInitialState () {
    return {
      modalIsOpen: false,
      modalToastIsOpen: false,
      alertIsOpen: false,
      toastIsOpen: false,
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
    this.setState({ modalIsOpen: true });

    setTimeout(function() {
      this.setState({
        modalToastIsOpen: true,
      })
    }, 400);
  },

  closeModal () {
    this.setState({modalIsOpen: false});
  },

  handleSubmitModal () {
    this.closeModal();
  },

  openToast(){
    this.setState({ toastIsOpen: true });
  },

  dismissToast(){
    this.setState({ toastIsOpen: false });
    console.log("====> Dismiss Toast Message");
  },

  dismissModalToast(){
    this.setState({ modalToastIsOpen: false });
    console.log("====> Dismiss Modal Toast");
  },

  openAlert(){
    this.setState({ alertIsOpen: true });
  },

  dismissAlert(){
    console.log("====> Dismiss Alert");
    this.setState({ alertIsOpen: false });
  },

  render() {
    let successMsg = ["New contact added ", <a href="#" key="0123">Sara Smith</a>];
    let errorMsg = "There was a problem updating the record.";

    return (

      <div className="slds-p-around--medium">
        <h3 className="slds-text-heading--medium slds-truncate">Notification</h3>
        <ul className="slds-p-vertical--medium">
          <li> <h4>* All notifications are fixed and centered at the top of the screen.</h4> </li>
          <li> <h4>* Toasts default duration is five seconds and will then disappear.</h4> </li>
        </ul>

        <div className="slds-p-vertical--medium">
          <div className="slds-p-vertical--small">
            <h4 className="slds-text-heading--small ">Alerts</h4>
            <SLDSButton variant="neutral" label="Show Alert" onClick={this.openAlert} />
            <SLDSNotification variant="alert" theme="success" icon="notification" isOpen={this.state.alertIsOpen} texture={true} content={successMsg} onDismiss={this.dismissAlert} />
          </div>

          <div className="slds-p-vertical--small">
            <h4 className="slds-text-heading--small ">Toasts</h4>
            <SLDSButton variant="neutral" label="Show Toast" onClick={this.openToast} />
            <SLDSNotification variant="toast" theme="error" icon="notification" isOpen={this.state.toastIsOpen} texture={true} content={errorMsg} onDismiss={this.dismissToast} />
          </div>

          <div className="slds-p-vertical--small">
            <h4 className="slds-text-heading--small ">Modal Toasts</h4>
            <SLDSButton variant="neutral" label="Show Modal Toast" onClick={this.openModal} />
            <SLDSModal
              isOpen={this.state.modalIsOpen}
              toast={
                <SLDSNotification variant="toast" theme="error" icon="warning" isOpen={this.state.modalToastIsOpen} content={errorMsg} onDismiss={this.dismissModalToast} />
              }
              title={
                <span>Lightning Design System: Style with Ease</span>
              }
              footer={[
                <SLDSButton key="cancelBtn" label="Cancel" variant="neutral" onClick={this.closeModal} />,
                <SLDSButton key="saveBtn" label="Save" variant="brand" onClick={this.handleSubmitModal} />
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

