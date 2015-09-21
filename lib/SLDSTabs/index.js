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

var _utilsCreateChainedFunction = require('../utils/create-chained-function');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash');

var React = require('react');
var PT = React.PropTypes;

var TabContent = (function (_React$Component) {
  _inherits(TabContent, _React$Component);

  function TabContent() {
    _classCallCheck(this, TabContent);

    _get(Object.getPrototypeOf(TabContent.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(TabContent, [{
    key: 'render',
    value: function render() {
      var className = (0, _classnames2['default'])(this.props.className, 'slds-tabs__content', { 'slds-show': this.props.current, 'slds-hide': !this.props.current });
      var props = (0, _lodash.omit)('className', this.props);
      return React.createElement(
        'div',
        _extends({}, props, { className: className, role: 'tabpanel' }),
        this.props.children
      );
    }
  }]);

  return TabContent;
})(React.Component);

TabContent.propTypes = { current: PT.bool };
TabContent.defaultProps = { current: true };

var TabItem = (function (_React$Component2) {
  _inherits(TabItem, _React$Component2);

  function TabItem() {
    _classCallCheck(this, TabItem);

    _get(Object.getPrototypeOf(TabItem.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(TabItem, [{
    key: 'renderCustom',
    value: function renderCustom(tabIndex) {
      return React.cloneElement(this.props.content, { onClick: this.props.onClick.bind(this), tabIndex: tabIndex, 'aria-selected': this.props.current });
    }
  }, {
    key: 'renderDefault',
    value: function renderDefault(tabIndex) {
      return React.createElement(
        'a',
        { className: this.props.innerClass, onClick: this.props.onClick.bind(this), href: '#', role: 'tab', tabIndex: tabIndex, 'aria-selected': this.props.current },
        this.props.title
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var props = (0, _lodash.omit)(['className', 'role'], this.props);
      var className = (0, _classnames2['default'])(this.props.className, 'slds-tabs__item slds-text-heading--label', { 'slds-active': this.props.current });
      var role = this.props.current ? 'presentation' : this.props.role;
      var tabIndex = this.props.current ? 0 : -1;
      return React.createElement(
        'li',
        _extends({ className: className }, props, { role: role }),
        this.props.content ? this.renderCustom(tabIndex) : this.renderDefault(tabIndex)
      );
    }
  }]);

  return TabItem;
})(React.Component);

TabItem.propTypes = { title: PT.string, content: PT.node };

var Tabs = (function (_React$Component3) {
  _inherits(Tabs, _React$Component3);

  function Tabs(props) {
    _classCallCheck(this, Tabs);

    _get(Object.getPrototypeOf(Tabs.prototype), 'constructor', this).call(this, props);
    this.state = { currentTab: this.props.selectedIndex };
  }

  _createClass(Tabs, [{
    key: 'onClick',
    value: function onClick(index, e) {
      this.setState({ currentTab: index });
      e.preventDefault();
      e.stopPropagation();
    }
  }, {
    key: 'tabs',
    value: function tabs() {
      var _this = this;

      return React.Children.map(this.props.children, function (c, i) {
        return React.cloneElement(c, { current: _this.state.currentTab === i, onClick: (0, _utilsCreateChainedFunction2['default'])(c.props.onClick, _this.onClick.bind(_this, i)) });
      });
    }
  }, {
    key: 'currentPanel',
    value: function currentPanel() {
      var _this2 = this;

      return React.Children.map(this.props.children, function (c, i) {
        if (c.props.children.type === TabContent) {
          return React.cloneElement(c.props.children, { current: _this2.state.currentTab === i });
        } else {
          return React.createElement(
            TabContent,
            { current: _this2.state.currentTab === i },
            c.props.children
          );
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var props = (0, _lodash.omit)(['className', 'flavor'], this.props);
      return React.createElement(
        'div',
        _extends({}, props, { className: 'slds-tabs--' + this.props.flavor }),
        React.createElement(
          'ul',
          { className: 'slds-tabs--' + this.props.flavor + '__nav', role: 'tablist', selectedIndex: this.props.selectedIndex },
          this.tabs()
        ),
        this.props.panel ? this.props.panel : this.currentPanel()
      );
    }
  }]);

  return Tabs;
})(React.Component);

Tabs.propTypes = {
  selectedIndex: PT.number,
  flavor: PT.oneOf(['scoped', 'default'])
};
Tabs.defaultProps = { selectedIndex: 0 };

Tabs.Item = TabItem;
Tabs.Content = TabContent;

module.exports = Tabs;