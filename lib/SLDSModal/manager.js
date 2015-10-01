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

var _SLDSIcons = require('../SLDSIcons');

var _utils = require('../utils');

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

  getDefaultProps: function getDefaultProps() {
    return {
      title: '',
      isOpen: false
    };
  },

  getInitialState: function getInitialState() {
    return {
      isOpen: this.props.isOpen,
      revealed: false
    };
  },

  componentDidMount: function componentDidMount() {
    var _this = this;

    if (!this.state.revealed) {
      setTimeout((function () {
        _this.setState({ revealed: true });
      }).bind(this));
    }
    this.updateBodyScroll();
  },

  openModal: function openModal() {
    this.setState({ isOpen: true });
  },

  closeModal: function closeModal() {
    this.setState({ isOpen: false });
  },

  handleSubmitModal: function handleSubmitModal() {
    this.closeModal();
  },

  updateBodyScroll: function updateBodyScroll() {
    if (window && document && document.body) {
      if (this.state.isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'inherit';
      }
    }
  },

  getModal: function getModal() {
    return _react2['default'].createElement(
      'div',
      { className: 'slds-modal' + (this.state.revealed ? ' slds-fade-in-open' : ''),
        onClick: this.closeModal },
      _react2['default'].createElement(
        'div',
        { className: 'slds-modal__container', onClick: function (e) {
            _utils.EventUtil.trap(e);
          } },
        _react2['default'].createElement(
          'div',
          { className: 'slds-modal__header' },
          _react2['default'].createElement(
            'h2',
            { className: 'slds-text-heading--medium' },
            this.props.title
          ),
          _react2['default'].createElement(
            _SLDSButton2['default'],
            { className: 'slds-button slds-modal__close', onClick: this.closeModal },
            _react2['default'].createElement(_SLDSIcons.Icon, { name: 'close', category: 'utility', size: 'small' }),
            _react2['default'].createElement(
              'span',
              { className: 'slds-assistive-text' },
              'Close'
            )
          )
        ),
        _react2['default'].createElement(
          'div',
          { className: 'slds-modal__content' },
          this.props.children
        ),
        _react2['default'].createElement(
          'div',
          { className: 'slds-modal__footer' },
          this.props.footer
        )
      )
    );
  },

  render: function render() {
    return _react2['default'].createElement(
      _reactModal2['default'],
      {
        isOpen: this.state.isOpen,
        onRequestClose: this.closeModal,
        style: customStyles,
        overlayClassName: 'slds-modal-backdrop' + (this.state.revealed ? ' slds-modal-backdrop--open' : '') },
      this.getModal()
    );
  },

  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {

    if (this.state.isOpen !== prevState.isOpen) {

      this.updateBodyScroll();

      if (!this.state.isOpen) {
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