/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _listItem = require("./list-item");

var _listItem2 = _interopRequireDefault(_listItem);

var displayName = "SLDSPicklistBase-list";
var propTypes = {
  className: _react2["default"].PropTypes.string,
  highlightedIndex: _react2["default"].PropTypes.number,
  itemRenderer: _react2["default"].PropTypes.func,
  label: _react2["default"].PropTypes.string,
  options: _react2["default"].PropTypes.array,
  onCancel: _react2["default"].PropTypes.func,
  onListBlur: _react2["default"].PropTypes.func,
  onListItemBlur: _react2["default"].PropTypes.func,
  onMoveFocus: _react2["default"].PropTypes.func,
  onSelect: _react2["default"].PropTypes.func,
  selectedIndex: _react2["default"].PropTypes.number
};
var defaultProps = {
  className: '',
  highlightedIndex: 0,
  itemRenderer: null,
  label: 'Menu',
  options: [],
  onCancel: function onCancel(delta) {
    console.log("onCancel should be overwritten");
  },
  onListBlur: function onListBlur() {
    console.log("onListBlur should be overwritten");
  },
  onListItemBlur: function onListItemBlur(listItemIndex) {
    console.log("onListItemBlur should be overwritten");
  },
  onMoveFocus: function onMoveFocus(delta) {
    console.log("onMoveFocus should be overwritten");
  },
  onSelect: function onSelect(index) {
    console.log("onSelect should be overwritten");
  },
  selectedIndex: -1
};

var SLDSList = (function (_React$Component) {
  _inherits(SLDSList, _React$Component);

  function SLDSList() {
    _classCallCheck(this, SLDSList);

    _get(Object.getPrototypeOf(SLDSList.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(SLDSList, [{
    key: "handleClick",
    value: function handleClick(e) {
      if (e.nativeEvent) {
        e.nativeEvent.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
      }
      e.preventDefault();
    }
  }, {
    key: "handleUpdateHighlighted",
    value: function handleUpdateHighlighted(nextIndex) {
      if (this.props.onUpdateHighlighted) {
        this.props.onUpdateHighlighted(nextIndex);
      }
    }
  }, {
    key: "handleListItemBlur",
    value: function handleListItemBlur(index, relatedTarget) {
      if (this.props.onListItemBlur) {
        this.props.onListItemBlur(index);
      }
      this.setState({ lastBlurredIndex: index });
    }
  }, {
    key: "handleMoveFocus",
    value: function handleMoveFocus(delta) {
      var newHighlightedIndex = this.props.highlightedIndex + delta;
      if (newHighlightedIndex < 0) {
        newHighlightedIndex = this.props.options.length - 1;
      } else if (newHighlightedIndex >= this.props.options.length) {
        newHighlightedIndex = 0;
      }
      if (this.props.onUpdateHighlighted) {
        this.props.onUpdateHighlighted(newHighlightedIndex);
      }
    }
  }, {
    key: "handleCancel",
    value: function handleCancel() {
      if (this.props.onCancel) {
        this.props.onCancel();
      }
    }
  }, {
    key: "handleSelect",
    value: function handleSelect(index) {
      if (this.props.onSelect) {
        this.props.onSelect(index);
      }
    }
  }, {
    key: "handleItemFocus",
    value: function handleItemFocus(itemIndex, itemHeight) {
      if (this.refs.scroll) {
        _react2["default"].findDOMNode(this.refs.scroll).scrollTop = itemIndex * itemHeight;
      }
    }
  }, {
    key: "handleSearch",
    value: function handleSearch(index, ch) {
      var searchChar = ch.toLowerCase();
      for (var i = index + 1; i < this.props.options.length; i++) {
        var option = this.props.options[i];
        if (option && option.label) {
          if (option.label.charAt(0).toLowerCase() === searchChar) {
            if (this.props.onUpdateHighlighted) {
              this.props.onUpdateHighlighted(i);
            }
            return;
          }
        }
      }
      for (var i = 0; i < index; i++) {
        var option = this.props.options[i];
        if (option && option.label) {
          if (option.label.charAt(0).toLowerCase() === searchChar) {
            if (this.props.onUpdateHighlighted) {
              this.props.onUpdateHighlighted(i);
            }
            return;
          }
        }
      }
    }
  }, {
    key: "getItems",
    value: function getItems() {
      var _this = this;

      return this.props.options.map(function (option, index) {
        return _react2["default"].createElement(_listItem2["default"], {
          data: option,
          index: index,
          isHighlighted: index === _this.props.highlightedIndex,
          isHover: _this.props.isHover,
          isSelected: index === _this.props.selectedIndex,
          key: 'ListItem_' + index,
          label: option.label,
          labelRenderer: _this.props.itemRenderer,
          onBlur: _this.handleListItemBlur.bind(_this),
          onCancel: _this.handleCancel.bind(_this),
          onFocus: _this.handleItemFocus.bind(_this),
          onMoveFocus: _this.handleMoveFocus.bind(_this),
          onSearch: _this.handleSearch.bind(_this),
          onSelect: _this.handleSelect.bind(_this),
          onUpdateHighlighted: _this.handleUpdateHighlighted.bind(_this),
          value: option.value });
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react2["default"].createElement(
        "div",
        {
          ref: "scroll",
          className: 'slds-wrap slds-grow slds-scrollable--y ' + this.props.className,
          onMouseEnter: this.props.onMouseEnter,
          onMouseLeave: this.props.onMouseLeave,
          style: {
            maxHeight: 260
          }
        },
        _react2["default"].createElement(
          "ul",
          {
            ref: "scroll",
            className: "slds-dropdown__list slds-theme--" + this.props.theme,
            role: "menu"
          },
          this.getItems()
        )
      );
    }
  }]);

  return SLDSList;
})(_react2["default"].Component);

SLDSList.displayName = displayName;
SLDSList.propTypes = propTypes;
SLDSList.defaultProps = defaultProps;

module.exports = SLDSList;