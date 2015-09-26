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

import Modal from 'react-modal';


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

module.exports = React.createClass( {

  getDefaultProps () {
    return {};
  },

  getInitialState () {
    return {
      modalIsOpen: false
    };
  },

  openModal () {
    this.setState({modalIsOpen: true});
  },

  closeModal () {
    this.setState({modalIsOpen: false});
  },

  handleButtonClick () {
    alert('Test Button Clicked');
  },

  render() {
    return (


            <div className="slds-p-around--medium">

              <h3 className="slds-text-heading--medium slds-truncate">
                Modal (Work in progress)
              </h3>
{/*
              <PrismCode className='language-markup'>
                {require("raw-loader!../../code-snippets/SLDSLookupPage.txt")}
              </PrismCode>
*/}

              <div className="slds-p-vertical--large">
                <SLDSButton flavor="brand" onClick={this.openModal}>
                  Open Modal
                </SLDSButton>

                <Modal
                  isOpen={this.state.modalIsOpen}
                  onRequestClose={this.closeModal}
                  style={customStyles} >

                  <h2>Hello</h2>
                  <button onClick={this.closeModal.bind()}>close</button>
                  <div>I am a modal</div>
                  <form>
                    <input />
                    <button>tab navigation</button>
                    <button>stays</button>
                    <button>inside</button>
                    <button>the modal</button>
                  </form>
                </Modal>

              </div>
            </div>


    );
  }
});
