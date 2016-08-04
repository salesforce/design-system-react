'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _icon = require('../../../icon');

var _icon2 = _interopRequireDefault(_icon);

var _utilities = require('../../../../utilities');

var _lodash = require('lodash.escaperegexp');

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Copyright (c) 2015, salesforce.com, inc. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

var displayName = 'Lookup-Menu-Item';
var propTypes = {
  data: _react2.default.PropTypes.object,
  handleItemFocus: _react2.default.PropTypes.func,
  href: _react2.default.PropTypes.string,
  iconCategory: _react2.default.PropTypes.string,
  id: _react2.default.PropTypes.string,
  index: _react2.default.PropTypes.number,
  isActive: _react2.default.PropTypes.bool,
  isDisabled: _react2.default.PropTypes.bool,
  listItemLabelRenderer: _react2.default.PropTypes.func,
  onSelect: _react2.default.PropTypes.func,
  searchTerm: _react2.default.PropTypes.string,
  setFocus: _react2.default.PropTypes.func
};

var Item = function (_React$Component) {
  _inherits(Item, _React$Component);

  function Item(props) {
    _classCallCheck(this, Item);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Item).call(this, props));
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
      return children;
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      return this.props.onSelect(this.props.id, this.props.data);
    }
  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown(e) {
      _utilities.EventUtil.trapImmediate(e);
    }

    //Scroll menu item based on up/down mouse keys (assumes all items are the same height)

  }, {
    key: 'scrollFocus',
    value: function scrollFocus() {
      var height = _reactDom2.default.findDOMNode(this).offsetHeight;
      if (height && this.props.handleItemFocus) this.props.handleItemFocus(this.props.index, height);
    }
  }, {
    key: 'getIcon',
    value: function getIcon() {
      if (this.props.iconName && !this.props.listItemLabelRenderer) {
        return _react2.default.createElement(_icon2.default, {
          category: this.props.iconCategory,
          className: 'slds-media__figure',
          inverse: this.props.iconInverse,
          key: this.props.iconName,
          name: this.props.iconName,
          size: 'small'
        });
      }
    }
  }, {
    key: 'getCustomLabel',
    value: function getCustomLabel() {
      if (this.props.listItemLabelRenderer) {
        var ListItemLabel = this.props.listItemLabelRenderer;
        return _react2.default.createElement(ListItemLabel, this.props);
      }
    }
  }, {
    key: 'getLabel',
    value: function getLabel() {
      var label = void 0;
      if (this.props.children.data.subTitle) {
        label = _react2.default.createElement(
          'div',
          { className: 'slds-media__body' },
          _react2.default.createElement(
            'div',
            { className: 'slds-lookup__result-text' },
            this.boldSearchText(this.props.children.label)
          ),
          _react2.default.createElement(
            'span',
            { className: 'slds-lookup__result-meta slds-text-body--small' },
            this.props.children.data.subTitle
          )
        );
      } else {
        var labelClassName = (0, _classnames2.default)('slds-lookup__result-text', {
          'slds-m-left--x-small': !this.props.iconName
        });

        label = _react2.default.createElement(
          'div',
          { className: 'slds-media__body' },
          _react2.default.createElement(
            'div',
            { className: labelClassName },
            this.boldSearchText(this.props.children.label)
          )
        );
      }
      return label;
    }
  }, {
    key: 'render',
    value: function render() {
      var itemClassName = 'js-slds-lookup__item';
      var id = this.props.id;
      if (this.props.isActive) itemClassName += ' slds-theme--shade';

      return(
        //IMPORTANT: anchor id is used to set lookup's input's aria-activedescendant
        _react2.default.createElement(
          'li',
          { className: itemClassName },
          _react2.default.createElement(
            'a',
            {
              'aria-disabled': this.props.isDisabled,
              className: 'slds-lookup__item-action slds-media slds-media--center',
              href: this.props.href,
              id: id,
              onClick: this.handleClick.bind(this),
              onMouseDown: this.handleMouseDown.bind(this),
              ref: id,
              role: 'option',
              tabIndex: '-1' },
            this.getIcon(),
            this.props.listItemLabelRenderer ? this.getCustomLabel() : this.getLabel()
          )
        )
      );
    }
  }]);

  return Item;
}(_react2.default.Component);

Item.displayName = displayName;
Item.propTypes = propTypes;

module.exports = Item;