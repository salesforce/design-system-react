/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SLDSButton = require('../SLDSButton');

var _SLDSButton2 = _interopRequireDefault(_SLDSButton);

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

var displayName = "SLDSModal";
var propTypes = {
  align: _react2['default'].PropTypes.oneOf(['top', 'center']),
  isPassive: _react2['default'].PropTypes.bool,
  prompt: _react2['default'].PropTypes.oneOf(['', 'success', 'warning', 'error', 'wrench', 'offline', 'info']),
  size: _react2['default'].PropTypes.oneOf(['medium', 'large'])
};
var defaultProps = {
  align: 'center',
  content: [],
  directional: false,
  footer: [],
  isOpen: false,
  isPassive: true,
  prompt: '', //if prompt !== '', it renders modal as prompt
  returnFocusTo: null,
  tagline: '',
  title: ''
};

var SLDSModal = (function (_React$Component) {
  _inherits(SLDSModal, _React$Component);

  function SLDSModal(props) {
    _classCallCheck(this, SLDSModal);

    _get(Object.getPrototypeOf(SLDSModal.prototype), 'constructor', this).call(this, props);
    this.state = {
      isClosing: false,
      isMounted: false,
      revealed: false
    };
  }

  _createClass(SLDSModal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this = this;

      this.setState({
        returnFocusTo: document.activeElement,
        isMounted: true
      });
      if (!this.state.revealed) {
        setTimeout(function () {
          _this.setState({ revealed: true });
        });
      }
      this.updateBodyScroll();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.isOpen !== prevProps.isOpen) {
        this.updateBodyScroll();
      }
      if (this.state.isClosing !== prevState.isClosing) {
        if (this.state.isClosing) {
          //console.log('CLOSING: ');
          if (this.state.isMounted) {
            var el = _react2['default'].findDOMNode(this).parentNode;
            if (el && el.getAttribute('data-slds-modal')) {
              _react2['default'].unmountComponentAtNode(el);
              document.body.removeChild(el);
            }
          }
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.clearBodyScroll();
      this.setState({ isMounted: false });
    }
  }, {
    key: 'closeModal',
    value: function closeModal() {
      if (this.props.isPassive) {
        this.setState({ isClosing: true });
        if (this.state.returnFocusTo && this.state.returnFocusTo.focus) {
          this.state.returnFocusTo.focus();
        }
        if (this.props.onRequestClose) {
          this.props.onRequestClose();
        }
      }
    }
  }, {
    key: 'handleSubmitModal',
    value: function handleSubmitModal() {
      this.closeModal();
    }
  }, {
    key: 'updateBodyScroll',
    value: function updateBodyScroll() {
      if (window && document && document.body) {
        if (this.props.isOpen) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'inherit';
        }
      }
    }
  }, {
    key: 'clearBodyScroll',
    value: function clearBodyScroll() {
      return function updateBodyScroll() {
        if (window && document && document.body) {
          document.body.style.overflow = 'inherit';
        }
      };
    }
  }, {
    key: 'handleModalClick',
    value: function handleModalClick(event) {
      if (event && event.stopPropagation) {
        event.stopPropagation();
      }
    }
  }, {
    key: 'isPrompt',
    value: function isPrompt() {
      return this.props.prompt !== '';
    }
  }, {
    key: 'footerComponent',
    value: function footerComponent() {
      var footer = undefined;
      var hasFooter = this.props.footer && this.props.footer.length > 0;

      var footerClass = {
        'slds-modal__footer': true,
        'slds-modal__footer--directional': this.props.directional,
        'slds-theme--default': this.isPrompt()
      };

      if (hasFooter) {
        footer = _react2['default'].createElement(
          'div',
          { className: (0, _classnames2['default'])(footerClass) },
          this.props.footer
        );
      }

      return footer;
    }
  }, {
    key: 'renderTitle',
    value: function renderTitle(headingClasses) {
      if (this.props.title) {
        return _react2['default'].createElement(
          'h2',
          { className: (0, _classnames2['default'])(headingClasses) },
          this.props.title
        );
      }
    }
  }, {
    key: 'renderTagline',
    value: function renderTagline() {
      if (this.props.tagline) {
        return _react2['default'].createElement(
          'p',
          { className: 'slds-m-top--x-small' },
          this.props.tagline
        );
      }
    }
  }, {
    key: 'headerComponent',
    value: function headerComponent() {
      var _headerClass;

      var header = undefined;
      var hasHeader = this.props.title;

      var headerClass = (_headerClass = {}, _defineProperty(_headerClass, 'slds-modal__header', hasHeader), _defineProperty(_headerClass, 'slds-theme--' + this.props.prompt, this.isPrompt()), _defineProperty(_headerClass, 'slds-theme--alert-texture', this.isPrompt()), _headerClass);

      var titleClass = {
        'slds-text-heading--small': this.isPrompt(),
        'slds-text-heading--medium': !this.isPrompt()
      };

      if (hasHeader) {
        header = _react2['default'].createElement(
          'div',
          { className: (0, _classnames2['default'])(headerClass) },
          _react2['default'].createElement(_SLDSButton2['default'], { assistiveText: 'Close', variant: 'icon-inverse', iconName: 'close', iconSize: 'large', className: 'slds-modal__close', onClick: this.closeModal.bind(this) }),
          this.props.toast,
          _react2['default'].createElement(
            'h2',
            { className: (0, _classnames2['default'])(titleClass) },
            this.props.title
          ),
          this.props.tagline ? _react2['default'].createElement(
            'p',
            { className: 'slds-m-top--x-small' },
            this.props.tagline
          ) : null
        );
      } else {
        header = _react2['default'].createElement(
          'div',
          { style: { position: 'relative' } },
          _react2['default'].createElement(_SLDSButton2['default'], { assistiveText: 'Close', variant: 'icon-inverse', iconName: 'close', iconSize: 'large', className: 'slds-modal__close', onClick: this.closeModal.bind(this) })
        );
      }

      return header;
    }
  }, {
    key: 'getModal',
    value: function getModal() {
      var modalClass = {
        'slds-modal': true,
        'slds-fade-in-open': this.state.revealed,
        'slds-modal--large': this.props.size === 'large',
        'slds-modal--prompt': this.isPrompt()
      };
      var modalStyle = this.props.align === "top" ? { "justify-content": "flex-start" } : null;
      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          'div',
          { className: (0, _classnames2['default'])(modalClass), style: { pointerEvents: 'inherit' }, onClick: this.closeModal.bind(this) },
          _react2['default'].createElement(
            'div',
            { 'aria-hidden': 'false', role: 'dialog', onClick: this.handleModalClick.bind(this), className: 'slds-modal__container', style: modalStyle },
            this.headerComponent(),
            _react2['default'].createElement(
              'div',
              { className: 'slds-modal__content' },
              this.props.children
            ),
            this.footerComponent()
          )
        ),
        _react2['default'].createElement('div', { style: { pointerEvents: 'inherit' }, className: 'slds-backdrop slds-backdrop--open slds-motion--fade-in--promptly' })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        _reactModal2['default'],
        {
          isOpen: this.props.isOpen,
          onRequestClose: this.closeModal.bind(this),
          style: customStyles },
        this.getModal()
      );
    }
  }]);

  return SLDSModal;
})(_react2['default'].Component);

SLDSModal.displayName = displayName;
SLDSModal.propTypes = propTypes;
SLDSModal.defaultProps = defaultProps;

module.exports = SLDSModal;