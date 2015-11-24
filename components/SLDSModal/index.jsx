/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


import React from 'react';
import SLDSButton from '../SLDSButton';
import Modal from 'react-modal';
import cx from 'classnames';

const displayName = "SLDSModal";
const propTypes = {
  size: React.PropTypes.oneOf(['medium', 'large']),
  prompt: React.PropTypes.oneOf(['', 'success', 'warning', 'error', 'wrench', 'offline', 'info'])
};
const defaultProps = {
  title: '',
  tagline: '',
  isOpen: false,
  content: [],
  footer: [],
  returnFocusTo: null,
  prompt: '', //if prompt !== '', it renders modal as prompt
  directional: false
};

const customStyles = {
  content: {
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
  overlay: {
    backgroundColor: 'default'
  }
};



class SLDSModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClosing: false,
      revealed: false
    };
  }

  componentDidMount () {
    //console.log('!!! window.activeElement !!! ',document.activeElement);
    this.setState({returnFocusTo: document.activeElement})
    if(!this.state.revealed){
      setTimeout(()=>{
        this.setState({revealed: true});
      });
    }
    this.updateBodyScroll();
  }

  componentDidUpdate (prevProps, prevState) {
    if(this.props.isOpen !== prevProps.isOpen) {
      this.updateBodyScroll();
    }

    if(this.state.isClosing !== prevState.isClosing) {
      if(this.state.isClosing) {
        if(this.isMounted()) {
          const el = this.getDOMNode().parentNode;
          if(el && el.getAttribute('data-slds-modal')) {
            React.unmountComponentAtNode(el);
            document.body.removeChild(el);
          }
        }
      }
    }
  }

  componentWillUnmount () {
    this.clearBodyScroll();
  }

  closeModal () {
    this.setState({ isClosing: true });
    if(this.state.returnFocusTo && this.state.returnFocusTo.focus){
      this.state.returnFocusTo.focus();
    }
    if(this.props.onRequestClose){
      this.props.onRequestClose();
    }
  }

  handleSubmitModal () {
    this.closeModal();
  }

  updateBodyScroll () {
    if(window && document && document.body){
      if(this.props.isOpen){
        document.body.style.overflow = 'hidden';
      }else{
        document.body.style.overflow = 'inherit';
      }
    }
  }

  clearBodyScroll: function updateBodyScroll() {
    if (window && document && document.body) {
      document.body.style.overflow = 'inherit';
    }
  }

  handleModalClick(event) {
    if(event && event.stopPropagation){
      event.stopPropagation();
    }
  }

  isPrompt(){
    return this.props.prompt !== '';
  }

  renderTitle(headingClasses) {
    if(this.props.title){
      return <h2 className={cx(headingClasses)}>{this.props.title}</h2>;
    }
  }

  renderTagline() {
    if(this.props.tagline){
      return <p className="slds-m-top--x-small">{this.props.tagline}</p>;
    }
  }

  headerComponent() {
    let header;
    const hasHeader = this.props.title;

    const headerClass = {
      ['slds-modal__header']: hasHeader,
      [`slds-theme--${this.props.prompt}`]: this.isPrompt(),
      ['slds-theme--alert-texture']: this.isPrompt(),
    };

    const titleClass = {
      'slds-text-heading--small': this.isPrompt(),
      'slds-text-heading--medium': !this.isPrompt(),
    };

    if(hasHeader) {
      header = (
        <div className={cx(headerClass)}>
          <SLDSButton assistiveText='Close' variant='icon-inverse' iconName='close' iconSize='large' className='slds-modal__close' onClick={this.closeModal.bind(this)} />
          {this.props.toast}
          <h2 className={cx(titleClass)}>{this.props.title}</h2>
          {this.props.tagline ? <p className="slds-m-top--x-small">{this.props.tagline}</p>:null}
        </div>
      )
    }else{
      header = (
        <div style={{position: 'relative'}}>
          <SLDSButton assistiveText='Close' variant='icon-inverse' iconName='close' iconSize='large' className='slds-modal__close' onClick={this.closeModal.bind(this)} />
        </div>
      )
    }
    return header;
  }

  footerComponent() {
    let footer;
    const footerClass = {
      'slds-modal__footer': true,
      'slds-modal__footer--directional': this.props.directional,
      'slds-theme--default': this.isPrompt()
    };
    const hasFooter = this.props.footer && this.props.footer.length > 0;

    if(hasFooter) {
      footer = (<div className={cx(footerClass)}>{this.props.footer}</div>);
    }
    return footer;
  }

  getModal() {
    const modalClass = {
      'slds-modal': true,
      'slds-fade-in-open': this.state.revealed,
      //'slds-motion--fade-in-rise': this.state.revealed,
      //'slds-motion--fade-out-fall': !this.state.revealed,
      'slds-modal--large': this.props.size === 'large',
      'slds-modal--prompt': this.isPrompt(),
    };

    return (
      <div>
        <div className={cx(modalClass)} style={{pointerEvents: 'inherit'}} onClick={this.isPrompt() ? undefined : this.closeModal}>
          <div aria-hidden="false" role='dialog' onClick={this.handleModalClick} className='slds-modal__container'>
            {this.headerComponent()}
            <div className='slds-modal__content'>
              {this.props.children}
            </div>
            {this.footerComponent()}
          </div>
        </div>
        <div style={{pointerEvents: 'inherit'}} className="slds-backdrop slds-backdrop--open slds-motion--fade-in--promptly" onClick={this.isPrompt() ? undefined : this.closeModal}></div>
      </div>
    )
  }

  render() {
    const overlayClasses = {
      'slds-modal-backdrop': true,
      'slds-modal-backdrop--open': this.state.revealed
    };

    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.closeModal}
        style={customStyles}
        overlayClassName={cx(overlayClasses)} >
        {this.getModal()}
      </Modal>
    );
  }
}

SLDSModal.displayName = displayName;
SLDSModal.propTypes = propTypes;
SLDSModal.defaultProps = defaultProps;

module.exports = SLDSModal;

