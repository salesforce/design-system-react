/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SLDSButton = require('../SLDSButton');

var _SLDSButton2 = _interopRequireDefault(_SLDSButton);

var _utils = require('../utils');

var _SLDSSettings = require('../SLDSSettings');

var _SLDSSettings2 = _interopRequireDefault(_SLDSSettings);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var customStyles = {
  content: {
    position: 'default',
    top: 'default',
    left: 'default',
    right: 'default',
    bottom: 'default',
    border: 'default',
    background: 'default',
    overflow: 'default',
    WebkitOverflowScrolling: 'default',
    borderRadius: 'default',
    outline: 'default',
    padding: 'default'
  },
  overlay: {
    backgroundColor: 'default'
  }
};

module.exports = _react2['default'].createClass({
  displayName: 'exports',

  propTypes: {
    size: _react2['default'].PropTypes.oneOf(['medium', 'large']),
    prompt: _react2['default'].PropTypes.oneOf(['', 'success', 'warning', 'error', 'wrench', 'offline', 'info'])
  },

  getDefaultProps: function getDefaultProps() {
    return {
      title: '',
      tagline: '',
      isOpen: false,
      content: [],
      footer: [],
      returnFocusTo: null,
      prompt: '', //if prompt !== '', it renders modal as prompt
      directional: false
    };
  },

  getInitialState: function getInitialState() {
    return {
      isClosing: false,
      revealed: false
    };
  },

  componentDidMount: function componentDidMount() {
    var _this = this;

    //console.log('!!! window.activeElement !!! ',document.activeElement);
    this.setState({ returnFocusTo: document.activeElement });
    if (!this.state.revealed) {
      setTimeout(function () {
        _this.setState({ revealed: true });
      });
    }
    this.updateBodyScroll();
  },

  closeModal: function closeModal() {
    this.setState({ isClosing: true });
    if (this.state.returnFocusTo && this.state.returnFocusTo.focus) {
      this.state.returnFocusTo.focus();
    }
    if (this.props.onRequestClose) {
      this.props.onRequestClose();
    }
  },

  handleSubmitModal: function handleSubmitModal() {
    this.closeModal();
  },

  updateBodyScroll: function updateBodyScroll() {
    if (window && document && document.body) {
      if (this.props.isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'inherit';
      }
    }
  },

  handleModalClick: function handleModalClick(event) {
    if (event && event.stopPropagation) {
      event.stopPropagation();
    }
  },

  isPrompt: function isPrompt() {
    return this.props.prompt !== '';
  },

  getModal: function getModal() {
    var modalClass = {
      'slds-modal': true,
      'slds-fade-in-open': this.state.revealed,
      'slds-modal--large': this.props.size === 'large'
    };

    return _react2['default'].createElement(
      'div',
      {
        className: (0, _classnames2['default'])(modalClass),
        style: { pointerEvents: 'inherit' },
        onClick: this.isPrompt() ? undefined : this.closeModal
      },
      _react2['default'].createElement(
        'div',
        {
          role: 'dialog',
          className: 'slds-modal__container',
          onClick: this.handleModalClick
        },
        this.headerComponent(),
        _react2['default'].createElement(
          'div',
          { className: 'slds-modal__content' },
          this.props.children,
          this.isPrompt() ? this.props.footer : null
        ),
        this.footerComponent()
      )
    );
  },

  render: function render() {
    var overlayClasses = {
      'slds-modal-backdrop': true,
      'slds-modal-backdrop--open': this.state.revealed
    };

    return _react2['default'].createElement(
      _reactModal2['default'],
      {
        isOpen: this.props.isOpen,
        onRequestClose: this.closeModal,
        style: customStyles,
        overlayClassName: (0, _classnames2['default'])(overlayClasses) },
      this.getModal()
    );
  },

  footerComponent: function footerComponent() {
    var footer = undefined;

    var footerClass = {
      'slds-modal__footer': true,
      'slds-modal__footer--directional': this.props.directional
    };

    var hasFooter = this.props.footer && this.props.footer.length > 0;

    if (!this.isPrompt() && hasFooter) {
      footer = _react2['default'].createElement(
        'div',
        { className: (0, _classnames2['default'])(footerClass) },
        this.props.footer
      );
    }

    return footer;
  },

  renderTagline: function renderTagline() {
    if (this.props.tagline) {
      return _react2['default'].createElement(
        'p',
        { className: 'slds-m-top--x-small' },
        this.props.tagline
      );
    }
  },

  headerComponent: function headerComponent() {
    var headingClasses = [],
        headerClasses = ['slds-modal__header'];
    var closeButton = undefined;

    if (this.isPrompt()) {
      headerClasses.push('slds-theme--' + this.props.prompt);
      headingClasses.push('slds-text-heading--small');
    } else {
      headingClasses.push('slds-text-heading--medium');
      closeButton = _react2['default'].createElement(_SLDSButton2['default'], {
        label: 'Close',
        variant: 'icon',
        iconName: 'close',
        iconSize: 'large',
        inverse: true,
        className: 'slds-modal__close',
        onClick: this.closeModal });
    }

    return _react2['default'].createElement(
      'div',
      { className: (0, _classnames2['default'])(headerClasses) },
      this.props.toast,
      _react2['default'].createElement(
        'h2',
        { className: (0, _classnames2['default'])(headingClasses) },
        this.props.title
      ),
      this.renderTagline(),
      closeButton
    );
  },

  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {

    if (this.props.isOpen !== prevProps.isOpen) {
      this.updateBodyScroll();
    }

    if (this.state.isClosing !== prevState.isClosing) {

      if (this.state.isClosing) {
        //console.log('CLOSING: ');

        if (this.isMounted()) {
          var el = this.getDOMNode().parentNode;
          if (el && el.getAttribute('data-slds-modal')) {
            _react2['default'].unmountComponentAtNode(el);
            document.body.removeChild(el);
          }
        }
      }
    }
  }

});