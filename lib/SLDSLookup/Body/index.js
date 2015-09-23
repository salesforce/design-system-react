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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SLDSIcons = require("../../SLDSIcons");

var Item = (function (_React$Component) {
  _inherits(Item, _React$Component);

  function Item(props) {
    _classCallCheck(this, Item);

    _get(Object.getPrototypeOf(Item.prototype), 'constructor', this).call(this, props);
    this.id = this.props.id || 'item-' + Item.globalIdx++ + '-' + this.props.idx;
  }

  _createClass(Item, [{
    key: 'boldSearchText',
    value: function boldSearchText(children) {
      var term = this.props.searchTerm;
      if (!children || !term) return children;
      var regex = new RegExp('(' + term + ')', 'gi');
      return _react2['default'].Children.map(children, function (c) {
        return typeof c === 'string' ? _react2['default'].createElement('span', { dangerouslySetInnerHTML: { __html: c.replace(regex, '<mark>$1</mark>') } }) : c;
      });
    }
  }, {
    key: 'selectedItem',
    value: function selectedItem(e) {
      e.preventDefault();
      if (e.nativeEvent) {
        e.nativeEvent.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
      }
      return this.props.selectedItem(this.props.idx, this);
    }
  }, {
    key: 'getClassName',
    value: function getClassName(cls) {
      return classNames(this.props.className, cls);
    }
  }, {
    key: 'render',
    value: function render() {
      var className = 'slds-lookup__item';
      if (this.props.isSelected) className += ' slds-is-selected';
      var tabIndex = this.props.idx === 0 ? 0 : -1;

      return _react2['default'].createElement(
        'li',
        _extends({ key: this.id }, this.props, { className: className, role: 'presentation', tabIndex: tabIndex, style: { whiteSpace: 'nowrap' } }),
        _react2['default'].createElement(
          'a',
          { href: this.props.href, onClick: this.selectedItem.bind(this), onMouseDown: this.selectedItem.bind(this), tabIndex: '-1', 'aria-disabled': this.props.disabled, role: 'option' },
          _react2['default'].createElement(_SLDSIcons.Icon, { name: 'account' }),
          this.boldSearchText(this.props.children)
        )
      );
    }
  }]);

  return Item;
})(_react2['default'].Component);

Item.globalIdx = 0;

module.exports = _react2['default'].createClass({

  displayName: "SLDSLookup",

  getInitialState: function getInitialState() {
    return { currentSelectedIndex: null };
  },

  getDefaultProps: function getDefaultProps() {
    return {};
  },

  selectedItem: function selectedItem(idx, item) {
    console.log(this.props.selectedItem);
    if (this.props.selectedItem) this.props.selectedItem(item);
    this.setState({ currentSelectedIndex: idx });
  },

  filter: function filter(item) {
    return this.props.filterWith(this.props.searchTerm, item);
  },

  items: function items() {
    var _this = this;

    return this.props.items.filter(this.filter, this).map(function (c, i) {
      var isSelected = i === _this.state.currentSelectedIndex;
      return _react2['default'].createElement(
        Item,
        { key: i, isSelected: isSelected, idx: i, searchTerm: _this.props.searchTerm, selectedItem: _this.selectedItem },
        c
      );
    });
  },

  render: function render() {
    return _react2['default'].createElement(
      'div',
      {
        className: 'ignore-react-onclickoutside',
        style: {
          position: 'inherit',
          float: 'inherit'
        },
        role: 'listbox' },
      _react2['default'].createElement(
        'ul',
        { className: 'slds-lookup__list', role: 'presentation' },
        this.items()
      )
    );
  }

});