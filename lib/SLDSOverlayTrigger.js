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

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _lodashOmit = require('lodash.omit');

var _lodashOmit2 = _interopRequireDefault(_lodashOmit);

var _lodashAssign = require('lodash.assign');

var _lodashAssign2 = _interopRequireDefault(_lodashAssign);

var _utilsCreateChainedFunction = require('./utils/create-chained-function');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var _SLDSPopover = require('./SLDSPopover');

var _SLDSPopover2 = _interopRequireDefault(_SLDSPopover);

var React = require('react');
var PT = React.PropTypes;
var classNames = require('classnames');

var eventDict = { click: ['onClick'], hover: ['onMouseEnter', 'onMouseLeave', 'onFocus', 'onBlur'], focus: ['onFocus', 'onBlur'] };

var OverlayTrigger = (function (_React$Component) {
  _inherits(OverlayTrigger, _React$Component);

  function OverlayTrigger() {
    _classCallCheck(this, OverlayTrigger);

    _get(Object.getPrototypeOf(OverlayTrigger.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(OverlayTrigger, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.wrapper = this.appendWrapperDiv();
    }
  }, {
    key: 'unmountPopover',
    value: function unmountPopover() {
      React.unmountComponentAtNode(this.wrapper);
      return false;
    }
  }, {
    key: 'mountPopover',
    value: function mountPopover() {
      var popover = React.createElement(
        _SLDSPopover2['default'],
        { className: '', targetElement: this.refs.control, targetAttachment: this.props.placement },
        this.cloneOverlay()
      );
      React.render(popover, this.wrapper);
      return true;
    }
  }, {
    key: 'oppositePlacement',
    value: function oppositePlacement(p) {
      return ({ top: 'bottom', right: 'left', bottom: 'top', left: 'right' })[p];
    }
  }, {
    key: 'nubbinClass',
    value: function nubbinClass() {
      var firstPart = this.props.placement.split(' ')[0];
      return 'slds-nubbin slds-nubbin--' + this.oppositePlacement(firstPart);
    }
  }, {
    key: 'appendWrapperDiv',
    value: function appendWrapperDiv() {
      var div = document.createElement('div');
      var root = React.findDOMNode(this);
      div.className = 'slds-popover-wrapper slds-fall-into-ground';
      root.appendChild(div);
      return div;
    }
  }, {
    key: 'cloneOverlay',
    value: function cloneOverlay() {
      return React.cloneElement(this.props.overlay, {
        visible: true,
        className: classNames(this.nubbinClass())
      });
    }
  }, {
    key: 'show',
    value: function show() {
      this.showingPopover = this.mountPopover();
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.showingPopover = this.unmountPopover();
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      this.showingPopover = this.showingPopover ? this.unmountPopover() : this.mountPopover();
    }
  }, {
    key: 'getProperEventTrigger',
    value: function getProperEventTrigger(childProps) {
      var _this = this;

      var obj = {};
      var events = eventDict[this.props.trigger] || ['onClick'];
      events.forEach(function (e) {
        obj[e] = (0, _utilsCreateChainedFunction2['default'])(childProps[e], _this.toggle.bind(_this));
      });
      return obj;
    }
  }, {
    key: 'renderControl',
    value: function renderControl() {
      var child = React.Children.only(this.props.children);
      var props = this.getProperEventTrigger(child.props);
      return React.cloneElement(child, _.extend({ refs: 'control' }, props));
    }
  }, {
    key: 'render',
    value: function render() {
      return this.renderControl();
    }
  }]);

  return OverlayTrigger;
})(React.Component);

module.exports = OverlayTrigger;