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

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _lodashIsequal = require("lodash.isequal");

var _lodashIsequal2 = _interopRequireDefault(_lodashIsequal);

var _SLDSPopover = require("../SLDSPopover");

var _SLDSPopover2 = _interopRequireDefault(_SLDSPopover);

var _utils = require("../utils");

var _SLDSIcons = require("../SLDSIcons");

var displayName = "SLDSPicklist";
var propTypes = {
  disabled: _react2["default"].PropTypes.bool,
  label: _react2["default"].PropTypes.string.isRequired,
  /**
   * Custom element that overrides the default Menu Item component.
   */
  listItemRenderer: _react2["default"].PropTypes.node,
  /**
   * If true, component renders specifically to work inside Modal.
   */
  modal: _react2["default"].PropTypes.bool,
  onClick: _react2["default"].PropTypes.func,
  onSelect: _react2["default"].PropTypes.func.isRequired,
  /**
   * Menu item data.
   */
  options: _react2["default"].PropTypes.array.isRequired,
  placeholder: _react2["default"].PropTypes.string,
  /**
   * Current selected item.
   */
  value: _react2["default"].PropTypes.node
};
var defaultProps = {
  label: "Picklist",
  placeholder: "Select an Option"
};

/**
 * The Picklist component is a variant of the Menu component.<br />
 * For more details, please reference <a href="http://www.lightningdesignsystem.com/components/menus#picklist">SLDS Menus > Picklists</a>.
 */

var SLDSPicklist = (function (_React$Component) {
  _inherits(SLDSPicklist, _React$Component);

  function SLDSPicklist(props) {
    _classCallCheck(this, SLDSPicklist);

    _get(Object.getPrototypeOf(SLDSPicklist.prototype), "constructor", this).call(this, props);
    this.state = {
      highlightedIndex: 0,
      isOpen: false,
      isFocused: false,
      isMounted: false,
      lastBlurredIndex: -1,
      lastBlurredTimeStamp: -1,
      selectedIndex: this.getIndexByValue(this.props.value),
      triggerId: null
    };
  }

  _createClass(SLDSPicklist, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var id = _reactDom2["default"].findDOMNode(this.refs.triggerbutton).getAttribute("data-reactid");
      this.setState({
        isMounted: true,
        triggerId: id
      });
      this.setFocus();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.state.lastBlurredTimeStamp !== prevState.lastBlurredTimeStamp) {
        if (this.state.lastBlurredIndex === this.state.highlightedIndex) {
          this.handleClose();
        }
      }
      if (this.state.selectedIndex !== prevState.selectedIndex) {
        this.handleClose();
      } else if (this.state.isFocused && !prevState.isFocused) {
        this.setState({ isOpen: false });
      } else if (!this.state.isFocused && prevState.isFocused) {
        if (this.refs.list) {
          if (this.state.isMounted && this.refs.list) {
            if (_reactDom2["default"].findDOMNode(this.refs.list).contains(document.activeElement)) {
              return;
            }
            this.setState({ isOpen: false });
          }
        }
      }

      if (this.props.value !== prevProps.value || !(0, _lodashIsequal2["default"])(this.props.options, prevProps.options)) {
        var newSelectedIndex = this.getIndexByValue(this.props.value);
        if (newSelectedIndex !== this.state.selectedIndex) {
          this.handleSelect(newSelectedIndex);
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.setState({ isMounted: false });
    }
  }, {
    key: "getIndexByValue",
    value: function getIndexByValue(value) {
      var foundIndex = -1;
      if (this.props.options && this.props.options.length) {
        this.props.options.some(function (element, index, array) {
          if (element && element.value === value) {
            foundIndex = index;
            return true;
          }
          return false;
        });
      }
      return foundIndex;
    }
  }, {
    key: "getValueByIndex",
    value: function getValueByIndex(index) {
      var option = this.props.options[index];
      if (option) {
        return this.props.options[index];
      }
    }
  }, {
    key: "handleSelect",
    value: function handleSelect(index) {
      this.setState({ selectedIndex: index });
      this.setFocus();
      if (this.props.onSelect) {
        this.props.onSelect(this.getValueByIndex(index));
      }
    }
  }, {
    key: "handleClose",
    value: function handleClose() {
      this.setState({ isOpen: false });
    }
  }, {
    key: "handleClick",
    value: function handleClick() {
      if (!this.state.isOpen) {
        this.setState({ isOpen: true });
        if (this.props.onClick) this.props.onClick();
      } else {
        this.handleClose();
      }
    }
  }, {
    key: "handleMouseDown",
    value: function handleMouseDown(event) {
      _utils.EventUtil.trapImmediate(event);
    }
  }, {
    key: "handleBlur",
    value: function handleBlur(e) {
      this.setState({ isFocused: false });
    }
  }, {
    key: "handleFocus",
    value: function handleFocus() {
      this.setState({ isFocused: true });
    }
  }, {
    key: "setFocus",
    value: function setFocus() {
      if (this.state.isMounted) {
        _reactDom2["default"].findDOMNode(this.refs.triggerbutton).focus();
      }
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(event) {
      if (event.keyCode) {
        if (event.keyCode === _utils.KEYS.ENTER || event.keyCode === _utils.KEYS.SPACE || event.keyCode === _utils.KEYS.DOWN || event.keyCode === _utils.KEYS.UP) {
          _utils.EventUtil.trapEvent(event);

          this.setState({
            isOpen: true,
            highlightedIndex: 0
          });
        }
      }
    }
  }, {
    key: "handleUpdateHighlighted",
    value: function handleUpdateHighlighted(nextIndex) {
      this.setState({ highlightedIndex: nextIndex });
    }
  }, {
    key: "handleListBlur",
    value: function handleListBlur() {
      this.setState({ isOpen: false });
    }
  }, {
    key: "handleCancel",
    value: function handleCancel() {
      this.setFocus();
    }
  }, {
    key: "getListItemRenderer",
    value: function getListItemRenderer() {
      return this.props.listItemRenderer ? this.props.listItemRenderer : _utils.ListItemLabel;
    }
  }, {
    key: "getPopoverContent",
    value: function getPopoverContent() {
      return _react2["default"].createElement(_utils.List, {
        highlightedIndex: this.state.highlightedIndex,
        itemRenderer: this.getListItemRenderer(),
        label: this.props.label,
        onCancel: this.handleCancel.bind(this),
        onListBlur: this.handleListBlur.bind(this),
        onListItemBlur: this.handleListItemBlur.bind(this),
        onSelect: this.handleSelect.bind(this),
        onUpdateHighlighted: this.handleUpdateHighlighted.bind(this),
        options: this.props.options,
        ref: "list",
        selectedIndex: this.state.selectedIndex,
        triggerId: this.state.triggerId
      });
    }
  }, {
    key: "getSimplePopover",
    value: function getSimplePopover() {
      return !this.props.disabled && this.state.isOpen ? _react2["default"].createElement(
        "div",
        {
          className: "slds-dropdown slds-dropdown--left slds-dropdown--menu",
          style: { maxHeight: "20em" } },
        this.getPopoverContent()
      ) : null;
    }
  }, {
    key: "getModalPopover",
    value: function getModalPopover() {
      return !this.props.disabled && this.state.isOpen ? _react2["default"].createElement(
        _SLDSPopover2["default"],
        {
          className: "slds-dropdown slds-dropdown--left slds-dropdown--small slds-dropdown--menu",
          closeOnTabKey: true,
          onClose: this.handleCancel.bind(this),
          targetElement: this.refs.date },
        this.getPopoverContent()
      ) : null;
    }
  }, {
    key: "getPlaceholder",
    value: function getPlaceholder() {
      var option = this.props.options[this.state.selectedIndex];
      return option && option.label ? option.label : this.props.placeholder;
    }
  }, {
    key: "handleListItemBlur",
    value: function handleListItemBlur(index, relatedTarget) {
      this.setState({
        lastBlurredIndex: index,
        lastBlurredTimeStamp: Date.now()
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react2["default"].createElement(
        "div",
        { className: "slds-picklist", "aria-expanded": this.state.isOpen },
        _react2["default"].createElement(
          "button",
          {
            "aria-haspopup": "true",
            className: "slds-button slds-button--neutral slds-picklist__label",
            id: this.state.triggerId,
            onBlur: this.handleBlur.bind(this),
            onClick: this.handleClick.bind(this),
            onFocus: this.handleFocus.bind(this),
            onKeyDown: this.handleKeyDown.bind(this),
            onMouseDown: this.handleMouseDown.bind(this),
            ref: "triggerbutton",
            tabIndex: this.state.isOpen ? -1 : 0 },
          _react2["default"].createElement(
            "span",
            { className: "slds-truncate" },
            this.getPlaceholder()
          ),
          _react2["default"].createElement(_SLDSIcons.Icon, { name: "down", category: "utility" })
        ),
        this.props.modal ? this.getModalPopover() : this.getSimplePopover()
      );
    }
  }]);

  return SLDSPicklist;
})(_react2["default"].Component);

SLDSPicklist.displayName = displayName;
SLDSPicklist.propTypes = propTypes;
SLDSPicklist.defaultProps = defaultProps;

module.exports = SLDSPicklist;
module.exports.ListItem = _utils.ListItem;
module.exports.ListItemLabel = _utils.ListItemLabel;