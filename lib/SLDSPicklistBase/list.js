/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SLDSIcons = require("../SLDSIcons");

var _listItem = require("./list-item");

var _listItem2 = _interopRequireDefault(_listItem);

module.exports = _react2["default"].createClass({

  displayName: "SLDSPicklistBase-list",

  getInitialState: function getInitialState() {
    return {};
  },

  getDefaultProps: function getDefaultProps() {
    return {
      options: [],
      label: 'Menu',
      selectedIndex: -1,
      highlightedIndex: 0,
      className: '',
      itemRenderer: null,
      onListBlur: function onListBlur() {
        console.log("onListBlur should be overwritten");
      },
      onMoveFocus: function onMoveFocus(delta) {
        console.log("onMoveFocus should be overwritten");
      },
      onCancel: function onCancel(delta) {
        console.log("onCancel should be overwritten");
      },
      onSelect: function onSelect(index) {
        console.log("onSelect should be overwritten");
      },
      onListItemBlur: function onListItemBlur(listItemIndex) {
        console.log("onListItemBlur should be overwritten");
      }
    };
  },

  handleClick: function handleClick(e) {
    if (e.nativeEvent) {
      e.nativeEvent.preventDefault();
      e.nativeEvent.stopImmediatePropagation();
    }
    e.preventDefault();
  },

  handleUpdateHighlighted: function handleUpdateHighlighted(nextIndex) {
    if (this.props.onUpdateHighlighted) {
      this.props.onUpdateHighlighted(nextIndex);
    }
  },

  handleListItemBlur: function handleListItemBlur(index, relatedTarget) {
    if (this.props.onListItemBlur) {
      this.props.onListItemBlur(index);
    }
    this.setState({ lastBlurredIndex: index });
  },

  handleMoveFocus: function handleMoveFocus(delta) {
    var newHighlightedIndex = this.props.highlightedIndex + delta;
    if (newHighlightedIndex < 0) {
      newHighlightedIndex = this.props.options.length - 1;
    } else if (newHighlightedIndex >= this.props.options.length) {
      newHighlightedIndex = 0;
    }
    if (this.props.onUpdateHighlighted) {
      this.props.onUpdateHighlighted(newHighlightedIndex);
    }
  },

  handleCancel: function handleCancel() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  },

  handleSelect: function handleSelect(index) {
    if (this.props.onSelect) {
      this.props.onSelect(index);
    }
  },

  handleItemFocus: function handleItemFocus(itemIndex, itemHeight) {
    if (this.refs.scroll) {
      this.refs.scroll.getDOMNode().scrollTop = itemIndex * itemHeight;
    }
  },

  handleSearch: function handleSearch(index, ch) {
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
  },

  getItems: function getItems() {
    var _this = this;

    return this.props.options.map(function (option, index) {
      return _react2["default"].createElement(_listItem2["default"], {
        key: 'ListItem_' + index,
        index: index,
        label: option.label,
        value: option.value,
        isHighlighted: index === _this.props.highlightedIndex,
        isSelected: index === _this.props.selectedIndex,
        onUpdateHighlighted: _this.handleUpdateHighlighted,
        onMoveFocus: _this.handleMoveFocus,
        onBlur: _this.handleListItemBlur,
        onFocus: _this.handleItemFocus,
        onSelect: _this.handleSelect,
        onSearch: _this.handleSearch,
        labelRenderer: _this.props.itemRenderer,
        onCancel: _this.handleCancel });
    });
  },

  render: function render() {
    return _react2["default"].createElement(
      "div",
      {
        ref: "scroll",
        className: 'slds-wrap slds-grow slds-scrollable--y ' + this.props.className,
        style: {
          maxHeight: 260
        }
      },
      _react2["default"].createElement(
        "ul",
        {
          ref: "scroll",
          className: "slds-dropdown__list slds-theme--" + this.props.theme,
          role: "menu",
          "aria-labelledby": this.props.label },
        this.getItems()
      )
    );
  },

  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {}

});