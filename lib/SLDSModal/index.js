/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _SLDSIcons = require("../SLDSIcons");

var _SLDSButton = require("../SLDSButton");

var _SLDSButton2 = _interopRequireDefault(_SLDSButton);

var _lodash = require('lodash');

var React = require('react');
var ReactDOM = require('react-dom');
var PT = React.PropTypes;

var classNames = require('classnames');

var ModalFooter = (function (_React$Component) {
  _inherits(ModalFooter, _React$Component);

  function ModalFooter() {
    _classCallCheck(this, ModalFooter);

    _get(Object.getPrototypeOf(ModalFooter.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(ModalFooter, [{
    key: 'getClassName',
    value: function getClassName(cls) {
      return classNames(this.props.className, 'slds-modal__footer');
    }
  }, {
    key: 'render',
    value: function render() {
      var props = (0, _lodash.omit)(['className', 'flavor'], this.props);
      return React.createElement(
        'div',
        _extends({}, props, { className: this.getClassName() }),
        this.props.children
      );
    }
  }]);

  return ModalFooter;
})(React.Component);

var ModalBody = (function (_React$Component2) {
  _inherits(ModalBody, _React$Component2);

  function ModalBody() {
    _classCallCheck(this, ModalBody);

    _get(Object.getPrototypeOf(ModalBody.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(ModalBody, [{
    key: 'getClassName',
    value: function getClassName(cls) {
      return classNames(this.props.className, 'slds-modal__content');
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        _extends({}, this.props, { className: this.getClassName() }),
        this.props.children
      );
    }
  }]);

  return ModalBody;
})(React.Component);

var ModalHeader = (function (_React$Component3) {
  _inherits(ModalHeader, _React$Component3);

  function ModalHeader() {
    _classCallCheck(this, ModalHeader);

    _get(Object.getPrototypeOf(ModalHeader.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(ModalHeader, [{
    key: 'getClassName',
    value: function getClassName(cls) {
      return classNames(this.props.className, 'slds-modal__header');
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        _extends({}, this.props, { className: this.getClassName() }),
        this.props.children,
        this.props.closeButton ? React.createElement(
          _SLDSButton2['default'],
          { className: 'slds-modal__close' },
          React.createElement(_SLDSIcons.ButtonIcon, {
            onClick: this.context.onRequestClose,
            iconFlavor: 'inverse,large',
            inverse: true,
            size: 'large',
            sprite: 'action',
            name: 'close',
            assistiveText: 'Close' })
        ) : null
      );
    }
  }]);

  return ModalHeader;
})(React.Component);

ModalHeader.propTypes = { closeButton: PT.bool };
ModalHeader.defaultProps = { closeButton: true };
ModalHeader.contextTypes = { onRequestClose: PT.func };

var Modal = (function (_React$Component4) {
  _inherits(Modal, _React$Component4);

  function Modal() {
    _classCallCheck(this, Modal);

    _get(Object.getPrototypeOf(Modal.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Modal, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return { onRequestClose: this.onClick.bind(this) };
    }
  }, {
    key: 'onClick',
    value: function onClick() {
      if (this.props.onRequestClose) {
        this.props.onRequestClose();
      }
    }
  }, {
    key: 'onContentClick',
    value: function onContentClick(e) {
      e.stopPropagation();
    }
  }, {
    key: 'isModalChild',
    value: function isModalChild(t) {
      var container = ReactDOM.findDOMNode(this);
      var node = t.parentNode;
      while (node !== null) {
        if (node === container) {
          return true;
        }
        node = node.parentNode;
      }
      return false;
    }
  }, {
    key: 'getClassName',
    value: function getClassName(cls) {
      return classNames(this.props.className, cls);
    }
  }, {
    key: 'render',
    value: function render() {
      var className = this.getClassName(classNames('slds-modal', _defineProperty({}, 'slds-fade-in-open', this.props.isOpen)));
      var classNameModalContainer = 'slds-modal__container';
      var classNameModalBackdrop = classNames('slds-modal-backdrop', _defineProperty({}, 'slds-modal-backdrop--open', this.props.isOpen));
      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { 'aria-hidden': !this.props.isOpen, role: 'dialog', className: className, onClick: this.onClick.bind(this) },
          React.createElement(
            'div',
            { className: classNameModalContainer, onClick: this.onContentClick.bind(this), key: 'content' },
            this.props.children
          )
        ),
        React.createElement('div', { className: classNameModalBackdrop })
      );
    }
  }]);

  return Modal;
})(React.Component);

Modal.childContextTypes = { onRequestClose: PT.func };

var ModalWrapper = (function (_React$Component5) {
  _inherits(ModalWrapper, _React$Component5);

  function ModalWrapper() {
    _classCallCheck(this, ModalWrapper);

    _get(Object.getPrototypeOf(ModalWrapper.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(ModalWrapper, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var renderInline = this.props.renderInline;

      var hasDOM = document && document.createElement;
      if (!renderInline && hasDOM) {
        this.__node = document.createElement('div');
        document.body.appendChild(this.__node);
        this.renderModal(this.props);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.__node) {
        ReactDOM.unmountComponentAtNode(this.__node);
        document.body.removeChild(this.__node);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.renderModal(nextProps);
    }
  }, {
    key: 'render',
    value: function render() {
      var renderInline = this.props.renderInline;

      return renderInline ? React.createElement(Modal, _extends({}, this.props, { tabindex: '-1' })) : null;
    }
  }, {
    key: 'renderModal',
    value: function renderModal(props) {
      if (this.__node) {
        this.__modal = React.render(React.createElement(Modal, props), this.__node);
      }
    }
  }]);

  return ModalWrapper;
})(React.Component);

ModalWrapper.propTypes = {
  isOpen: React.PropTypes.bool.isRequired,
  onRequestClose: React.PropTypes.func,
  renderInline: React.PropTypes.bool
};
ModalWrapper.defaultProps = { renderInline: false };

ModalWrapper.displayName = 'Modal';

ModalWrapper.Header = ModalHeader;
ModalWrapper.Body = ModalBody;
ModalWrapper.Footer = ModalFooter;

module.exports = ModalWrapper;