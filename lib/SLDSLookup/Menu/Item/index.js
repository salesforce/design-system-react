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

var _SLDSIcons = require("../../../SLDSIcons");

var _utils = require('../../../utils');

var _lodashEscaperegexp = require('lodash.escaperegexp');

var _lodashEscaperegexp2 = _interopRequireDefault(_lodashEscaperegexp);

var displayName = 'SLDSLookup-Menu-Item';
var propTypes = {
  boldRegex: _react2['default'].PropTypes.instanceOf(RegExp),
  data: _react2['default'].PropTypes.object,
  handleItemFocus: _react2['default'].PropTypes.func,
  href: _react2['default'].PropTypes.string,
  iconCategory: _react2['default'].PropTypes.string,
  id: _react2['default'].PropTypes.string,
  index: _react2['default'].PropTypes.number,
  isActive: _react2['default'].PropTypes.bool,
  isDisabled: _react2['default'].PropTypes.bool,
  key: _react2['default'].PropTypes.string,
  listItemLabelRenderer: _react2['default'].PropTypes.func,
  onSelect: _react2['default'].PropTypes.func,
  searchTerm: _react2['default'].PropTypes.string,
  setFocus: _react2['default'].PropTypes.func,
  type: _react2['default'].PropTypes.string
};
var defaultProps = {};

var Item = (function (_React$Component) {
  _inherits(Item, _React$Component);

  function Item(props) {
    _classCallCheck(this, Item);

    _get(Object.getPrototypeOf(Item.prototype), 'constructor', this).call(this, props);
  }

  _createClass(Item, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.isActive !== this.props.isActive && nextProps.isActive === true) {
        this.scrollFocus();
        this.props.setFocus(this.props.id);
      }
    }
  }, {
    key: 'boldSearchText',
    value: function boldSearchText(children) {
      var regex = this.props.boldRegex;
      if (!regex) {
        var term = this.props.searchTerm;
        if (!children || !term) return children;
        regex = new RegExp('(' + (0, _lodashEscaperegexp2['default'])(term) + ')', 'gi');
      }
      return _react2['default'].Children.map(children, function (c) {
        return typeof c === 'string' ? _react2['default'].createElement('span', { dangerouslySetInnerHTML: { __html: c.replace(regex, '<mark>$1</mark>') } }) : c;
      });
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      return this.props.onSelect(this.props.id, this.props.data);
    }
  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown(e) {
      _utils.EventUtil.trapImmediate(e);
    }

    //Scroll menu item based on up/down mouse keys (assumes all items are the same height)
  }, {
    key: 'scrollFocus',
    value: function scrollFocus() {
      var height = _react2['default'].findDOMNode(this).offsetHeight;
      if (height && this.props.handleItemFocus) this.props.handleItemFocus(this.props.index, height);
    }
  }, {
    key: 'getLabel',
    value: function getLabel() {
      if (this.props.listItemLabelRenderer) {
        var ListItemLabel = this.props.listItemLabelRenderer;
        return _react2['default'].createElement(ListItemLabel, this.props);
      }
      return [_react2['default'].createElement(_SLDSIcons.Icon, { name: this.props.iconName, category: this.props.iconCategory, className: this.props.iconClasses }), this.boldSearchText(this.props.children.label)];
    }
  }, {
    key: 'render',
    value: function render() {
      var className = 'slds-lookup__item';
      var id = this.props.id;
      if (this.props.isActive) className += ' slds-theme--shade';

      return(
        //IMPORTANT: anchor id is used to set lookup's input's aria-activedescendant
        _react2['default'].createElement(
          'li',
          { className: className },
          _react2['default'].createElement(
            'a',
            {
              href: this.props.href,
              id: id,
              ref: id,
              tabIndex: '-1',
              'aria-disabled': this.props.isDisabled,
              role: 'option',
              onClick: this.handleClick.bind(this),
              onMouseDown: this.handleMouseDown.bind(this) },
            this.getLabel()
          )
        )
      );
    }
  }]);

  return Item;
})(_react2['default'].Component);

Item.displayName = displayName;
Item.propTypes = propTypes;
Item.defaultProps = defaultProps;

module.exports = Item;