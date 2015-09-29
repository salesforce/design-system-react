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
import SLDSButton from '../SLDSButton';
import {Icon} from '../SLDSIcons';
import {EventUtil} from '../utils';
import SLDSDateInput from '../SLDSDateInput';


import Modal from 'react-modal';



const customStyles = {
  content : {
    position                : 'default',
    top                     : 'default',
    left                    : 'default',
    right                   : 'default',
    bottom                  : 'default',
    border                  : 'default',
    background              : 'default',
    overflow                : 'default',
    WebkitOverflowScrolling : 'default',
    borderRadius            : 'default',
    outline                 : 'default',
    padding                 : 'default'
  },
  overlay : {
    backgroundColor: 'default'
  }
};

module.exports = React.createClass( {

  getDefaultProps () {
    return {
      title:'',
      isOpen:false
    };
  },

  getInitialState () {
    return {
      isOpen: this.props.isOpen
    };
  },

  openModal () {
    this.setState({isOpen: true});
  },

  closeModal () {
    this.setState({isOpen: false});
  },

  handleSubmitModal () {
    this.closeModal();
  },

  render() {
    return (
      <Modal
        isOpen={this.state.isOpen}
        onRequestClose={this.closeModal}
        style={customStyles}
        overlayClassName='slds-modal-backdrop slds-modal-backdrop--open' >
        <div className='slds-modal slds-fade-in-open' 
          onClick={this.closeModal}>
          <div className='slds-modal__container' onClick={(e)=>{EventUtil.trap(e);}}>
            <div className='slds-modal__header'>
              <h2 className='slds-text-heading--medium'>{this.props.title}</h2>
              <SLDSButton className='slds-button slds-modal__close' onClick={this.closeModal}>
                <Icon name='close' category='utility' size='small'/>
                <span className='slds-assistive-text'>Close</span>
              </SLDSButton>
              {this.props.children}

            </div>

            <div className='slds-modal__footer'>
              {this.props.footer}
            </div>

          </div>

        </div>

      </Modal>
    );
  },

  componentDidUpdate (prevProps, prevState) {

    if(this.state.isOpen !== prevState.isOpen){
      if(window && document && document.body){
        document.body.style.overflow = this.state.isOpen?'hidden':'inherit';
      }
    }

    if(this.props.isOpen !== prevProps.isOpen){
      this.setState({isOpen:this.props.isOpen});
    }

  }


});
