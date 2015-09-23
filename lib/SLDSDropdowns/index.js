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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _SLDSIcons = require("./../SLDSIcons");

var _utilsDom = require('../utils/dom');

var PT = _react2['default'].PropTypes;

var defaultFilter = function defaultFilter(term, item) {
  return (0, _utilsDom.textContent)(item.props.children).match(new RegExp(_lodash2['default'].escapeRegExp(term), 'ig'));
};

var DropdownFilter = (function (_React$Component) {
  _inherits(DropdownFilter, _React$Component);

  function DropdownFilter() {
    _classCallCheck(this, DropdownFilter);

    _get(Object.getPrototypeOf(DropdownFilter.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(DropdownFilter, [{
    key: 'getClassName',
    value: function getClassName(cls) {
      return (0, _classnames2['default'])(this.props.className, cls);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        _extends({}, this.props, { className: this.getClassName('slds-input-has-icon slds-input-has-icon--left slds-m-bottom--x-small') }),
        _react2['default'].createElement('label', { className: 'slds-assistive-text' }),
        _react2['default'].createElement('input', { id: 'input__filter', className: 'slds-input', type: 'text', placeholder: this.props.placeholder, onChange: this.props.termChanged })
      );
    }
  }]);

  return DropdownFilter;
})(_react2['default'].Component);

DropdownFilter.propTypes = { placeholder: PT.string };
DropdownFilter.defaultProps = { placeholder: 'Search...' };

var DropdownTitle = (function (_React$Component2) {
  _inherits(DropdownTitle, _React$Component2);

  function DropdownTitle() {
    _classCallCheck(this, DropdownTitle);

    _get(Object.getPrototypeOf(DropdownTitle.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(DropdownTitle, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'span',
        { className: 'slds-text-heading--label' },
        this.props.children
      );
    }
  }]);

  return DropdownTitle;
})(_react2['default'].Component);

var DropdownHeader = (function (_React$Component3) {
  _inherits(DropdownHeader, _React$Component3);

  function DropdownHeader() {
    _classCallCheck(this, DropdownHeader);

    _get(Object.getPrototypeOf(DropdownHeader.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(DropdownHeader, [{
    key: 'getClassName',
    value: function getClassName(cls) {
      return (0, _classnames2['default'])(this.props.className, cls);
    }
  }, {
    key: 'childProps',
    value: function childProps(i) {
      return { termChanged: this.props.termChanged, filterWith: this.props.filterWith, hasFilter: this.props.hasFilter, key: i };
    }
  }, {
    key: 'children',
    value: function children() {
      var _this = this;

      return _react2['default'].Children.map(this.props.children, function (c, i) {
        return _react2['default'].cloneElement(c, _this.childProps(i));
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        _extends({}, this.props, { className: this.getClassName('slds-dropdown__header') }),
        this.children()
      );
    }
  }]);

  return DropdownHeader;
})(_react2['default'].Component);

var DropdownItem = (function (_React$Component4) {
  _inherits(DropdownItem, _React$Component4);

  function DropdownItem(props) {
    _classCallCheck(this, DropdownItem);

    _get(Object.getPrototypeOf(DropdownItem.prototype), 'constructor', this).call(this, props);
    this.id = this.props.id || 'menu-' + DropdownItem.globalIdx++ + '-' + this.props.idx;
  }

  _createClass(DropdownItem, [{
    key: 'shouldRenderItem',
    value: function shouldRenderItem(term) {
      return this.props.hasFilter ? this.props.filterWith(this.props.searchTerm, this) : true;
    }
  }, {
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
      if (!this.props.isSelectable) return;
      e.preventDefault();
      if (this.props.itemSelected) this.props.itemSelected(this, this.props.idx);
      return this.props.selectedItem(this.props.idx);
    }
  }, {
    key: 'itemFocused',
    value: function itemFocused() {
      return this.props.itemFocused(this.id);
    }
  }, {
    key: 'isSelected',
    value: function isSelected() {
      return this.props.isSelectable && this.props.currentSelection === this.props.idx;
    }
  }, {
    key: 'getClassName',
    value: function getClassName(cls) {
      return (0, _classnames2['default'])(this.props.className, cls);
    }
  }, {
    key: 'renderItem',
    value: function renderItem() {
      var _classNames;

      var tabIndex = this.props.idx === 0 ? 0 : -1;
      var className = this.getClassName((0, _classnames2['default'])('slds-dropdown__item', (_classNames = {}, _defineProperty(_classNames, 'slds-is-selected', this.isSelected()), _defineProperty(_classNames, 'slds-has-icon--left', this.props.isSelectable), _classNames)));
      return _react2['default'].createElement(
        'li',
        _extends({ id: this.id, onClick: this.selectedItem.bind(this) }, this.props, { className: className, role: 'menuitem option', tabIndex: tabIndex, onFocus: this.itemFocused.bind(this) }),
        _react2['default'].createElement(
          'a',
          { href: this.props.href, tabIndex: '-1', 'aria-disabled': this.props.disabled, className: 'slds-truncate' },
          this.isSelected() ? _react2['default'].createElement(_SLDSIcons.Icon, { className: 'slds-icon--small slds-icon--left', name: 'task2' }) : null,
          this.boldSearchText(this.props.children)
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return this.shouldRenderItem() ? this.renderItem() : null;
    }
  }]);

  return DropdownItem;
})(_react2['default'].Component);

DropdownItem.globalIdx = 0;

var DropdownList = (function (_React$Component5) {
  _inherits(DropdownList, _React$Component5);

  function DropdownList(props) {
    _classCallCheck(this, DropdownList);

    _get(Object.getPrototypeOf(DropdownList.prototype), 'constructor', this).call(this, props);
    this.state = { currentSelection: null };
  }

  _createClass(DropdownList, [{
    key: 'selectedItem',
    value: function selectedItem(item) {
      this.setState({ currentSelection: item });
    }
  }, {
    key: 'childProps',
    value: function childProps(i) {
      return { searchTerm: this.props.searchTerm, filterWith: this.props.filterWith, hasFilter: this.props.hasFilter, selectedItem: this.selectedItem.bind(this), isSelectable: this.props.isSelectable, itemFocused: this.props.itemFocused, itemSelected: this.props.itemSelected, key: i };
    }
  }, {
    key: 'children',
    value: function children() {
      var _this2 = this;

      return _react2['default'].Children.map(this.props.children, function (c, i) {
        return _react2['default'].cloneElement(c, _lodash2['default'].extend({ currentSelection: _this2.state.currentSelection, idx: i }, _this2.childProps(i)));
      });
    }
  }, {
    key: 'getClassName',
    value: function getClassName(cls) {
      return (0, _classnames2['default'])(this.props.className, cls);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'ul',
        _extends({}, this.props, { className: this.getClassName('slds-dropdown__list'), role: 'menu' }),
        this.children()
      );
    }
  }]);

  return DropdownList;
})(_react2['default'].Component);

DropdownList.defaultProps = { isSelectable: true };

var Dropdown = (function (_React$Component6) {
  _inherits(Dropdown, _React$Component6);

  function Dropdown(props) {
    _classCallCheck(this, Dropdown);

    _get(Object.getPrototypeOf(Dropdown.prototype), 'constructor', this).call(this, props);
    this.state = { searchTerm: '' };
    this.hasFilter = (0, _utilsDom.hasChild)(this.props.children, 'DropdownFilter');
  }

  _createClass(Dropdown, [{
    key: 'childProps',
    value: function childProps(i) {
      return { searchTerm: this.state.searchTerm, termChanged: this.termChanged.bind(this), filterWith: this.props.filterWith, hasFilter: this.hasFilter, itemFocused: this.props.itemFocused, itemSelected: this.props.itemSelected, key: i };
    }
  }, {
    key: 'termChanged',
    value: function termChanged(event) {
      var target = event.target || event.currentTarget;
      this.setState({ searchTerm: target.value });
    }
  }, {
    key: 'menuClassName',
    value: function menuClassName() {
      var _classNames2;

      return (0, _classnames2['default'])('slds-dropdown', this.props.className, (_classNames2 = {}, _defineProperty(_classNames2, 'slds-dropdown--menu', !this.hasFilter), _defineProperty(_classNames2, 'slds-dropdown--search', this.hasFilter), _defineProperty(_classNames2, 'slds-hide', this.props.hidden), _classNames2));
    }
  }, {
    key: 'children',
    value: function children() {
      var _this3 = this;

      return _react2['default'].Children.map(this.props.children, function (c, i) {
        return _react2['default'].cloneElement(c, _this3.childProps(i));
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        _extends({}, this.props, { className: this.menuClassName() }),
        this.children()
      );
    }
  }]);

  return Dropdown;
})(_react2['default'].Component);

Dropdown.propTypes = { filterWith: PT.func };
Dropdown.defaultProps = { filterWith: defaultFilter, itemFocused: function itemFocused() {} };

Dropdown.Header = DropdownHeader;
Dropdown.Filter = DropdownFilter;
Dropdown.Title = DropdownTitle;
Dropdown.List = DropdownList;
Dropdown.Item = DropdownItem;

module.exports = Dropdown;