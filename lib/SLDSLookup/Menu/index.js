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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Item = require('./Item');

var _Item2 = _interopRequireDefault(_Item);

var _SLDSIcons = require("../../SLDSIcons");

var Menu = (function (_React$Component) {
  _inherits(Menu, _React$Component);

  function Menu(props) {
    _classCallCheck(this, Menu);

    _get(Object.getPrototypeOf(Menu.prototype), 'constructor', this).call(this, props);
    this.state = {};
  }

  //Set filtered list length in parent to determine active indexes for aria-activedescendent

  _createClass(Menu, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      // make an array of the children of the list
      // but only count the actual items (ignore errors/messages)
      var list = [].slice.call(_react2['default'].findDOMNode(this.refs.list).children).filter(function (child) {
        return child.className.indexOf("slds-lookup__item") > -1;
      }).length;
      this.props.getListLength(list);
    }
  }, {
    key: 'filter',
    value: function filter(item) {
      return this.props.filterWith(this.props.searchTerm, item);
    }

    //Scroll menu up/down when using mouse keys
  }, {
    key: 'handleItemFocus',
    value: function handleItemFocus(itemIndex, itemHeight) {
      if (this.refs.list) {
        _react2['default'].findDOMNode(this.refs.list).scrollTop = itemIndex * itemHeight;
      }
    }
  }, {
    key: 'renderHeader',
    value: function renderHeader() {
      return this.props.header;
    }
  }, {
    key: 'renderFooter',
    value: function renderFooter() {
      if (this.props.footer) {
        var footerActive = false;
        var isActiveClass = null;
        if (this.props.focusIndex === this.props.listLength + 1) {
          footerActive = true;
          isActiveClass = 'slds-theme--shade';
        } else {
          footerActive = false;
          isActiveClass = '';
        }
        return _react2['default'].createElement(
          'div',
          { className: isActiveClass },
          this.props.footer
        );
      }
    }
  }, {
    key: 'renderErrors',
    value: function renderErrors() {
      return this.props.errors.map(function (error) {
        return _react2['default'].createElement(
          'li',
          { className: 'slds-lookup__error', 'aria-live': 'polite' },
          _react2['default'].createElement(
            'span',
            null,
            error
          )
        );
      });
    }
  }, {
    key: 'renderItems',
    value: function renderItems() {
      var _this = this;

      return this.props.items.filter(this.filter, this).map(function (c, i) {
        //isActive means it is aria-activedescendant
        var id = c.id;
        var isActive = false;
        if (_this.props.header) {
          isActive = _this.props.focusIndex === i + 1 ? true : false;
        } else {
          isActive = _this.props.focusIndex === i ? true : false;
        }
        return _react2['default'].createElement(
          _Item2['default'],
          {
            key: id,
            id: id,
            type: _this.props.type,
            iconCategory: _this.props.iconCategory,
            iconName: _this.props.iconName,
            searchTerm: _this.props.searchTerm,
            index: i,
            isActive: isActive,
            setFocus: _this.props.setFocus,
            handleItemFocus: _this.handleItemFocus.bind(_this),
            onSelect: _this.props.onSelect,
            data: c.data,
            boldRegex: _this.props.boldRegex,
            listItemLabelRenderer: _this.props.listItemLabelRenderer
          },
          c
        );
      });
    }
  }, {
    key: 'renderMessages',
    value: function renderMessages() {
      return this.props.messages.map(function (message) {
        return _react2['default'].createElement(
          'li',
          { className: 'slds-lookup__message', 'aria-live': 'polite' },
          _react2['default'].createElement(
            'span',
            null,
            message
          )
        );
      });
    }
  }, {
    key: 'renderContent',
    value: function renderContent() {
      if (this.props.errors.length > 0) return this.renderErrors();else if (this.props.items.length === 0) return _react2['default'].createElement(
        'li',
        { className: 'slds-lookup__message', 'aria-live': 'polite' },
        _react2['default'].createElement(
          'span',
          null,
          this.props.emptyMessage
        )
      );

      var elements = this.renderItems();
      if (this.props.messages.length > 0) {
        elements.concat(this.renderMessages());
      }
      return elements;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'section',
        { id: 'menuContainer' },
        this.renderHeader(),
        _react2['default'].createElement(
          'ul',
          { id: 'list', className: 'slds-lookup__list', role: 'presentation', ref: 'list' },
          this.renderContent()
        ),
        this.renderFooter()
      );
    }
  }]);

  return Menu;
})(_react2['default'].Component);

Menu.propTypes = {
  searchTerm: _react2['default'].PropTypes.string,
  label: _react2['default'].PropTypes.string,
  type: _react2['default'].PropTypes.string,
  iconCategory: _react2['default'].PropTypes.string,
  focusIndex: _react2['default'].PropTypes.number,
  listLength: _react2['default'].PropTypes.number,
  items: _react2['default'].PropTypes.array,
  emptyMessage: _react2['default'].PropTypes.string,
  errors: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.string),
  filterWith: _react2['default'].PropTypes.func,
  getListLength: _react2['default'].PropTypes.func,
  setFocus: _react2['default'].PropTypes.func,
  boldRegex: _react2['default'].PropTypes.instanceOf(RegExp)
};

Menu.defaultProps = {
  emptyMessage: "No matches found.",
  messages: [],
  errors: []
};

module.exports = Menu;