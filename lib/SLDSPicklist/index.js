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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _SLDSPopover = require('../SLDSPopover');

var _SLDSPopover2 = _interopRequireDefault(_SLDSPopover);

var _SLDSDropdowns = require('../SLDSDropdowns');

var _SLDSDropdowns2 = _interopRequireDefault(_SLDSDropdowns);

var _SLDSIcons = require("./../SLDSIcons");

var _utilsDom = require('../utils/dom');

var _lodash = require('lodash');

var React = require('react');
var PT = React.PropTypes;

var classNames = require('classnames');

var PickList = (function (_React$Component) {
  _inherits(PickList, _React$Component);

  function PickList(props) {
    _classCallCheck(this, PickList);

    _get(Object.getPrototypeOf(PickList.prototype), 'constructor', this).call(this, props);
    var isInitiallyHidden = !this.props['aria-expanded'];
    this.state = { hidden: isInitiallyHidden, currentSelection: [], currentFocus: null };
  }

  _createClass(PickList, [{
    key: 'itemSelected',
    value: function itemSelected(item) {
      var sel = this.props.multiple ? this.state.currentSelection : [];
      this.setState({ currentSelection: sel.concat(item) });
    }
  }, {
    key: 'itemFocused',
    value: function itemFocused(id) {
      this.setState({ currentFocus: id });
    }
  }, {
    key: 'hasSelection',
    value: function hasSelection() {
      return this.state.currentSelection.length > 0;
    }
  }, {
    key: 'toggleHidden',
    value: function toggleHidden() {
      this.setState({ hidden: !this.state.hidden });
    }
  }, {
    key: 'selectionText',
    value: function selectionText() {
      return this.state.currentSelection.map(function (s) {
        return (0, _utilsDom.textContent)(s.props.children);
      }).join(', ');
    }
  }, {
    key: 'label',
    value: function label() {
      return this.hasSelection() ? this.selectionText() : this.props.label;
    }
  }, {
    key: 'getClassName',
    value: function getClassName(cls) {
      var className = this.props.className + ' ' + cls;
      if (this.props.flavor) className += ' slds-picklist--' + this.props.flavor;
      return className;
    }
  }, {
    key: 'items',
    value: function items() {
      return this.props.items.map(function (c, i) {
        return React.createElement(
          _SLDSDropdowns2['default'].Item,
          { href: '#', key: i },
          c
        );
      });
    }
  }, {
    key: 'popover',
    value: function popover() {
      return React.createElement(
        _SLDSPopover2['default'],
        { targetElement: this.refs.dropdown },
        React.createElement(
          _SLDSDropdowns2['default'],
          { ref: 'dropdown', itemSelected: this.itemSelected.bind(this) },
          React.createElement(
            _SLDSDropdowns2['default'].Header,
            null,
            React.createElement(_SLDSDropdowns2['default'].Filter, { placeholder: 'Find in list...' }),
            React.createElement(
              _SLDSDropdowns2['default'].Title,
              null,
              'Lists'
            )
          ),
          React.createElement(
            _SLDSDropdowns2['default'].List,
            null,
            this.items()
          )
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var className = this.getClassName('slds-picklist');
      var props = (0, _lodash.omit)(['className', 'label', 'flavor'], this.props);

      return React.createElement(
        'div',
        { className: 'slds-form-element' },
        React.createElement(
          'div',
          _extends({}, props, { className: className, 'aria-expanded': !this.state.hidden }),
          React.createElement(
            'button',
            { onClick: this.toggleHidden.bind(this), className: 'slds-button slds-button--neutral slds-picklist__label', 'aria-haspopup': 'true', 'aria-activedescendant': this.state.currentFocus },
            React.createElement(
              'span',
              { className: 'slds-truncate' },
              this.label()
            ),
            React.createElement(_SLDSIcons.Icon, { category: 'utility', name: 'down' })
          ),
          this.state.hidden ? null : this.popover()
        )
      );
    }
  }]);

  return PickList;
})(React.Component);

PickList.propTypes = { label: PT.string, flavor: PT.oneOf(['group', 'nested', 'multi', 'quickfind']) };
PickList.defaultProps = { label: 'Select an option' };

module.exports = PickList;