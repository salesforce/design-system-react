/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


import React from 'react';
import ReactDOM from 'react-dom';

import SLDSButton from '../SLDSButton';
import classNames from 'classnames';
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

const displayName = "SLDSModal";
const propTypes = {
  /**
   * Vertical alignment of modal
   */
  align: React.PropTypes.oneOf(['top', 'center']),
  /**
   * Modal content
   */
  children: React.PropTypes.node,
  /**
   * if directional, modal footer buttons render left and right. An example use case would be for "back" and "next" buttons.
   */
  directional: React.PropTypes.bool,
  footer: React.PropTypes.array,
  isOpen: React.PropTypes.bool,
  /**
   * if isPassive, prompt modals can be dismissed by clicking outside of modal or pressing esc key
   */
  isPassive: React.PropTypes.bool,
  prompt: React.PropTypes.oneOf(['', 'success', 'warning', 'error', 'wrench', 'offline', 'info']),
  returnFocusTo: React.PropTypes.node,
  size: React.PropTypes.oneOf(['medium', 'large']),
  /**
   * Text underneath the title
   */
  tagline: React.PropTypes.node,
  title: React.PropTypes.node,
};
const defaultProps = {
  align: 'center',
  directional: false,
  footer: [],
  isOpen: false,
  isPassive: true,
  prompt: '',
  returnFocusTo: null,
  tagline: '',
  title: '',
};

/**
 * The SLDSModal component is used for modals and prompts. <br />
 * For more details, please reference <a href="https://www.lightningdesignsystem.com/components/modals">SLDS Modals</a>.
 */
class SLDSModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isClosing: false,
      isMounted: false,
      revealed: false,
    };
  }

  componentDidMount () {
    this.setState({
      returnFocusTo: document.activeElement,
      isMounted: true,
    })
    if(!this.state.revealed){
      setTimeout(()=>{
        this.setState({revealed: true});
      });
    }
    this.updateBodyScroll();
  }

  componentDidUpdate (prevProps, prevState) {
    if(this.props.isOpen !== prevProps.isOpen){
      this.updateBodyScroll();
    }
    if(this.state.isClosing !== prevState.isClosing){
      if(this.state.isClosing){
        //console.log('CLOSING: ');
        if(this.state.isMounted){
          const el = ReactDOM.findDOMNode(this).parentNode;
          if(el && el.getAttribute('data-slds-modal')){
            ReactDOM.unmountComponentAtNode(el);
            document.body.removeChild(el);
          }
        }
      }
    }
  }

  componentWillUnmount () {
    this.clearBodyScroll();
    this.setState({ isMounted: false });
  }

  closeModal () {
    if(this.props.isPassive){
      this.setState({isClosing: true});
      if(this.state.returnFocusTo && this.state.returnFocusTo.focus){
        this.state.returnFocusTo.focus();
      }
      if(this.props.onRequestClose){
        this.props.onRequestClose();
      }
    }
  }

  handleSubmitModal () {
    this.closeModal();
  }

  updateBodyScroll () {
    if(window && document && document.body){
      if(this.props.isOpen){
        document.body.style.overflow = 'hidden';
      }
      else{
        document.body.style.overflow = 'inherit';
      }
    }
  }

  clearBodyScroll() {
    return function updateBodyScroll() {
      if (window && document && document.body) {
        document.body.style.overflow = 'inherit';
      }
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

  footerComponent() {
    let footer = null;
    const hasFooter = this.props.footer && this.props.footer.length > 0;
    const footerClass = {
      'slds-modal__footer': true,
      'slds-modal__footer--directional': this.props.directional,
      'slds-theme--default': this.isPrompt()
    };

    if (hasFooter) {
      footer = (<div className={classNames(footerClass)}>{this.props.footer}</div>);
    }
    return footer;
  }

  headerComponent() {
    let headerContent = null;
    const hasHeader = this.props.title || this.props.tagline;
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
      headerContent = (
        <div>
          {this.props.toast}
          <h2 className={classNames(titleClass)}>{this.props.title}</h2>
          {this.props.tagline ? <p className="slds-m-top--x-small">{this.props.tagline}</p>:null}
        </div>
      )
    }

    return (
      <div className={classNames(headerClass)} style={{position: "relative"}}>
        <SLDSButton assistiveText='Close' variant='icon-inverse' iconName='close' iconSize='large' className='slds-modal__close' onClick={this.closeModal.bind(this)} />
        {headerContent}
      </div>
    )
  }

  getModal() {
    const modalClass = {
      'slds-modal': true,
      'slds-fade-in-open': this.state.revealed,
      'slds-modal--large': this.props.size === 'large',
      'slds-modal--prompt': this.isPrompt(),
    };
    const modalStyle = this.props.align === "top" ? {"justifyContent": "flex-start"} : null;
    const contentStyle = this.props.title ? null: {"borderRadius": ".25rem"};
    return (
      <div>
        <div aria-hidden="false" role="dialog" className={classNames(modalClass)} onClick={this.closeModal.bind(this)}>
          <div className="slds-modal__container" style={modalStyle}>
            <div onClick={this.handleModalClick.bind(this)}>
              {this.headerComponent()}
              <div className="slds-modal__content" style={contentStyle}>
                {this.props.children}
              </div>
              {this.footerComponent()}
            </div>
          </div>
        </div>
        <div className="slds-backdrop slds-backdrop--open"></div>
      </div>
    )

  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.closeModal.bind(this)}
        style={customStyles}>
        {this.getModal()}
      </Modal>
    );
  }

}

SLDSModal.displayName = displayName;
SLDSModal.propTypes = propTypes;
SLDSModal.defaultProps = defaultProps;

module.exports = SLDSModal;

