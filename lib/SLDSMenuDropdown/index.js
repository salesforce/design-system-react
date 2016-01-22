"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _SLDSPopover = require("../SLDSPopover");

var _SLDSPopover2 = _interopRequireDefault(_SLDSPopover);

var _SLDSButton = require("../SLDSButton");

var _SLDSButton2 = _interopRequireDefault(_SLDSButton);

var _utils = require("../utils");

var _List = require("./List");

var _List2 = _interopRequireDefault(_List);

var _ListItem = require("./ListItem");

var _ListItem2 = _interopRequireDefault(_ListItem);

var _ListItemLabel = require("./ListItemLabel");

var _ListItemLabel2 = _interopRequireDefault(_ListItemLabel);

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

var displayName = "SLDSMenuDropdown";
var propTypes = {
  align: _react2.default.PropTypes.oneOf(["left", "right"]),
  /**
   * Classes applied to the Button component.
   */
  buttonClassName: _react2.default.PropTypes.string,
  /**
   * Determines variant of the Button component that triggers dropdown.
   */
  buttonVariant: _react2.default.PropTypes.oneOf(["base", "neutral", "brand", "destructive", "icon", "inverse", "icon-inverse"]),
  /**
   * If true, renders checkmark icon on the selected Menu Item.
   */
  checkmark: _react2.default.PropTypes.bool,
  disabled: _react2.default.PropTypes.bool,
  /**
   * Delay on menu closing.
   */
  hoverCloseDelay: _react2.default.PropTypes.number,
  label: _react2.default.PropTypes.string,
  /**
   * Custom element that overrides the default Menu Item component.
   */
  listItemRenderer: _react2.default.PropTypes.func,
  /**
   * If true, component renders specifically to work inside Modal.
   */
  modal: _react2.default.PropTypes.bool,
  onClick: _react2.default.PropTypes.func,
  onSelect: _react2.default.PropTypes.func.isRequired,
  openOn: _react2.default.PropTypes.oneOf(["hover", "click"]),
  /**
   * Menu item data.
   */
  options: _react2.default.PropTypes.array.isRequired,
  /**
   * Current selected menu item.
   */
  value: _react2.default.PropTypes.string,

  tooltip: _react2.default.PropTypes.node

};
var defaultProps = {
  align: "left",
  hoverCloseDelay: 300,
  openOn: "click",
  modal: true,
  buttonVariant: "neutral"
};

/**
 * The SLDSMenuDropdown component is a variant of the Ligtning Design System Menu component.
 * For more details on the markup, please review the Menu > Dropdown documentation on the <a href="http://www.lightningdesignsystem.com/components/menus#dropdown">Lightning Design System website</a>.
 */

var SLDSMenuDropdown = function (_React$Component) {
  _inherits(SLDSMenuDropdown, _React$Component);

  function SLDSMenuDropdown(props) {
    _classCallCheck(this, SLDSMenuDropdown);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SLDSMenuDropdown).call(this, props));

    _this.state = {
      highlightedIndex: 0,
      isClosing: false,
      isFocused: false,
      isHover: false,
      isOpen: false,
      lastBlurredIndex: -1,
      lastBlurredTimeStamp: -1,
      selectedIndex: _this.getIndexByValue(_this.props.value)
    };
    return _this;
  }

  _createClass(SLDSMenuDropdown, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isUnmounting = true;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this2 = this;

      if (this.state.lastBlurredTimeStamp !== prevState.lastBlurredTimeStamp) {
        if (this.state.lastBlurredIndex === this.state.highlightedIndex) this.handleClose();
      }

      if (this.state.isOpen && !prevState.isOpen) this.state.isClosing = false;

      if (this.state.selectedIndex !== prevState.selectedIndex) {
        this.handleClose();
      } else if (this.state.isFocused && !prevState.isFocused) {
        this.setState({ isOpen: false });
      } else if (!this.state.isFocused && prevState.isFocused) {
        if (this.refs.list) {
          if (!this.isUnmounting && this.refs.list) {
            if (_reactDom2.default.findDOMNode(this.refs.list).contains(document.activeElement)) {
              return;
            }
            this.setState({ isOpen: false });
          }
        }
      } else if (this.state.isClosing && !prevState.isClosing) {
        setTimeout(function () {
          if (_this2.state.isClosing) {
            _this2.setState({ isOpen: false });
          }
        }, this.props.hoverCloseDelay);
      }

      if (this.props.value !== prevProps.value) {
        this.handleSelect(this.getIndexByValue(this.props.value));
      }
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
      if (option) return this.props.options[index];
    }
  }, {
    key: "getListItemRenderer",
    value: function getListItemRenderer() {
      return this.props.listItemRenderer ? this.props.listItemRenderer : _ListItemLabel2.default;
    }
  }, {
    key: "handleSelect",
    value: function handleSelect(index) {
      this.setState({ selectedIndex: index });
      this.setFocus();
      if (this.props.onSelect) this.props.onSelect(this.getValueByIndex(index));
    }
  }, {
    key: "handleClose",
    value: function handleClose() {
      this.setState({
        isOpen: false,
        isHover: false
      });
    }
  }, {
    key: "handleMouseEnter",
    value: function handleMouseEnter() {
      this.state.isClosing = false;
      if (!this.state.isOpen) {
        this.setState({
          isOpen: true,
          isHover: true
        });
      }
      if (this.props.onMouseEnter) this.props.onMouseEnter();
    }
  }, {
    key: "handleMouseLeave",
    value: function handleMouseLeave() {
      this.setState({ isClosing: true });
      if (this.props.onMouseLeave) this.props.onMouseLeave();
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
      if (event) _utils.EventUtil.trapImmediate(event);
      if (this.props.onMouseDown) this.props.onMouseDown();
    }
  }, {
    key: "handleBlur",
    value: function handleBlur(e) {
      this.setState({ isFocused: false });
      if (this.props.onBlur) this.props.onBlur();
    }
  }, {
    key: "handleFocus",
    value: function handleFocus() {
      this.setState({
        isFocused: true,
        isHover: false
      });
      if (this.props.onFocus) this.props.onFocus();
    }
  }, {
    key: "setFocus",
    value: function setFocus() {
      if (!this.isUnmounting) _reactDom2.default.findDOMNode(this.getButtonNode()).focus();
    }
  }, {
    key: "getButtonNode",
    value: function getButtonNode() {
      return _reactDom2.default.findDOMNode(this.refs.button);
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(event) {
      if (event.keyCode) {
        if (event.keyCode === _utils.KEYS.ENTER || event.keyCode === _utils.KEYS.SPACE || event.keyCode === _utils.KEYS.DOWN || event.keyCode === _utils.KEYS.UP) {

          _utils.EventUtil.trap(event);
          this.setState({
            isOpen: true,
            highlightedIndex: 0
          });
        }
        if (this.props.onKeyDown) this.props.onKeyDown();
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
    key: "handleListItemBlur",
    value: function handleListItemBlur(index, relatedTarget) {
      this.setState({
        lastBlurredIndex: index,
        lastBlurredTimeStamp: Date.now()
      });
    }
  }, {
    key: "handleCancel",
    value: function handleCancel() {
      if (!this.state.isHover) this.setFocus();
    }
  }, {
    key: "getPopoverContent",
    value: function getPopoverContent() {
      return _react2.default.createElement(_List2.default, {
        checkmark: this.props.checkmark,
        highlightedIndex: this.state.highlightedIndex,
        isHover: this.state.isHover,
        itemRenderer: this.getListItemRenderer(),
        onListBlur: this.handleListBlur.bind(this),
        onListItemBlur: this.handleListItemBlur.bind(this),
        onCancel: this.handleCancel.bind(this),
        onMouseEnter: this.props.openOn === "hover" ? this.handleMouseEnter.bind(this) : null,
        onMouseLeave: this.props.openOn === "hover" ? this.handleMouseLeave.bind(this) : null,
        onSelect: this.handleSelect.bind(this),
        onUpdateHighlighted: this.handleUpdateHighlighted.bind(this),
        options: this.props.options,
        ref: "list",
        selectedIndex: this.state.selectedIndex
      });
    }
  }, {
    key: "getSimplePopover",
    value: function getSimplePopover() {
      return !this.props.disabled && this.state.isOpen ? _react2.default.createElement(
        "div",
        {
          className: "slds-dropdown slds-dropdown--menu slds-dropdown--left",
          style: { maxHeight: "20em" } },
        this.getPopoverContent()
      ) : null;
    }
  }, {
    key: "getModalPopover",
    value: function getModalPopover() {
      var className = "slds-dropdown slds-dropdown--menu slds-dropdown--" + this.props.align;
      return !this.props.disabled && this.state.isOpen ? _react2.default.createElement(
        _SLDSPopover2.default,
        {
          className: className,
          closeOnTabKey: true,
          horizontalAlign: this.props.align,
          flippable: false,
          onClose: this.handleCancel.bind(this),
          targetElement: this.refs.button
        },
        this.getPopoverContent()
      ) : null;
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        _SLDSButton2.default,
        {
          "aria-haspopup": "true",
          className: this.props.buttonClassName,
          iconName: this.props.iconName,
          iconVariant: this.props.iconVariant,
          label: this.props.label,
          onBlur: this.props.openOn === "hover" ? this.handleBlur.bind(this) : null,
          onClick: this.props.openOn === "click" ? this.handleClick.bind(this) : null,
          onFocus: this.props.openOn === "hover" ? this.handleFocus.bind(this) : null,
          onKeyDown: this.handleKeyDown.bind(this),
          onMouseDown: this.props.openOn === "click" ? this.handleMouseDown.bind(this) : null,
          onMouseEnter: this.props.openOn === "hover" ? this.handleMouseEnter.bind(this) : null,
          onMouseLeave: this.props.openOn === "hover" ? this.handleMouseLeave.bind(this) : null,
          ref: "button",
          style: this.props.style,
          tabIndex: this.state.isOpen ? "-1" : "0",
          variant: this.props.buttonVariant,
          tooltip: this.props.tooltip
        },
        this.props.modal ? this.getModalPopover() : this.getSimplePopover()
      );
    }
  }]);

  return SLDSMenuDropdown;
}(_react2.default.Component);

SLDSMenuDropdown.displayName = displayName;
SLDSMenuDropdown.propTypes = propTypes;
SLDSMenuDropdown.defaultProps = defaultProps;

module.exports = SLDSMenuDropdown;
module.exports.ListItem = _ListItem2.default;
module.exports.ListItemLabel = _ListItemLabel2.default;