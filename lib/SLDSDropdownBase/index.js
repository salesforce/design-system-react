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

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _SLDSPopover = require("../SLDSPopover");

var _SLDSPopover2 = _interopRequireDefault(_SLDSPopover);

var _SLDSButton = require("../SLDSButton");

var _SLDSButton2 = _interopRequireDefault(_SLDSButton);

var _utilsCreateChainedFunction = require("../utils/create-chained-function");

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var _utils = require("../utils");

var _lodashOmit = require("lodash.omit");

var _lodashOmit2 = _interopRequireDefault(_lodashOmit);

var displayName = "SLDSDropdown";
var propTypes = {
  className: _react2["default"].PropTypes.string,
  disabled: _react2["default"].PropTypes.bool,
  horizontalAlign: _react2["default"].PropTypes.string,
  hoverCloseDelay: _react2["default"].PropTypes.number,
  initialFocus: _react2["default"].PropTypes.bool,
  label: _react2["default"].PropTypes.string,
  listClassName: _react2["default"].PropTypes.string,
  listItemRenderer: _react2["default"].PropTypes.func,
  modal: _react2["default"].PropTypes.bool,
  onClick: _react2["default"].PropTypes.func,
  onSelect: _react2["default"].PropTypes.func.isRequired,
  onUpdateHighlighted: _react2["default"].PropTypes.func,
  openOn: _react2["default"].PropTypes.string,
  options: _react2["default"].PropTypes.array,
  placeholder: _react2["default"].PropTypes.string,
  theme: _react2["default"].PropTypes.string,
  value: _react2["default"].PropTypes.string,
  variant: _react2["default"].PropTypes.string
};
var defaultProps = {
  className: "",
  disabled: false,
  horizontalAlign: "left",
  hoverCloseDelay: 300,
  initialFocus: false,
  label: "Dropdown",
  listClassName: "",
  listItemRenderer: _utils.ListItemLabel,
  modal: true,
  openOn: "hover",
  options: [],
  placeholder: "Select an Option",
  theme: "default",
  value: null,
  variant: "neutral"
};

var SLDSDropdown = (function (_React$Component) {
  _inherits(SLDSDropdown, _React$Component);

  function SLDSDropdown(props) {
    _classCallCheck(this, SLDSDropdown);

    _get(Object.getPrototypeOf(SLDSDropdown.prototype), "constructor", this).call(this, props);
    this.state = {
      highlightedIndex: 0,
      isClosing: false,
      isFocused: false,
      isHover: false,
      isMounted: false,
      isOpen: false,
      lastBlurredIndex: -1,
      lastBlurredTimeStamp: -1,
      selectedIndex: this.getIndexByValue(this.props.value)
    };
  }

  _createClass(SLDSDropdown, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({ isMounted: true });
      if (this.props.initialFocus) {
        this.setFocus();
      }
      if (this.props.openOn === "hover") {
        //TODO:Add functionality here
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.setState({ isMounted: false });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this = this;

      if (this.state.lastBlurredTimeStamp !== prevState.lastBlurredTimeStamp) {
        if (this.state.lastBlurredIndex === this.state.highlightedIndex) {
          this.handleClose();
        }
      }

      if (this.state.isOpen && !prevState.isOpen) {
        this.state.isClosing = false;
      }

      if (this.state.selectedIndex !== prevState.selectedIndex) {
        this.handleClose();
      } else if (this.state.isFocused && !prevState.isFocused) {
        this.setState({ isOpen: false });
      } else if (!this.state.isFocused && prevState.isFocused) {
        if (this.refs.list) {
          if (this.state.isMounted && this.refs.list) {
            if (_react2["default"].findDOMNode(this.refs.list).contains(document.activeElement)) {
              return;
            }
            this.setState({ isOpen: false });
          }
        }
      } else if (this.state.isClosing && !prevState.isClosing) {
        setTimeout(function () {
          if (_this.state.isClosing) {
            _this.setState({ isOpen: false });
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
      this.setState({
        isOpen: false,
        isHover: false
      });
    }
  }, {
    key: "handleMouseEnter",
    value: function handleMouseEnter() {
      if (this.props.openOn === "hover") {
        this.state.isClosing = false;
        if (!this.state.isOpen) {
          this.setState({
            isOpen: true,
            isHover: true
          });
        }
      }
    }
  }, {
    key: "handleMouseLeave",
    value: function handleMouseLeave() {
      if (this.props.openOn === "hover") {
        this.setState({ isClosing: true });
      }
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      _utils.EventUtil.trap(event);
      if (!this.state.isOpen) {
        this.setState({ isOpen: true });
        if (this.props.onClick) {
          this.props.onClick();
        }
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
      this.setState({
        isFocused: true,
        isHover: false
      });
    }
  }, {
    key: "setFocus",
    value: function setFocus() {
      if (this.state.isMounted) {
        _react2["default"].findDOMNode(this.getButtonNode()).focus();
      }
    }
  }, {
    key: "getButtonNode",
    value: function getButtonNode() {
      return _react2["default"].findDOMNode(this.refs.button);
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
      if (!this.state.isHover) {
        this.setFocus();
      }
    }
  }, {
    key: "getPopoverContent",
    value: function getPopoverContent() {
      return _react2["default"].createElement(_utils.List, {
        ref: "list",
        options: this.props.options,
        className: this.props.listClassName,
        highlightedIndex: this.state.highlightedIndex,
        selectedIndex: this.state.selectedIndex,
        onSelect: this.handleSelect.bind(this),
        onUpdateHighlighted: this.handleUpdateHighlighted.bind(this),
        onListBlur: this.handleListBlur.bind(this),
        onListItemBlur: this.handleListItemBlur.bind(this),
        onMouseEnter: this.props.openOn === "hover" ? this.handleMouseEnter.bind(this) : null,
        onMouseLeave: this.props.openOn === "hover" ? this.handleMouseLeave.bind(this) : null,
        onCancel: this.handleCancel.bind(this),
        itemRenderer: this.props.listItemRenderer,
        isHover: this.state.isHover,
        theme: this.props.theme });
    }
  }, {
    key: "getSimplePopover",
    value: function getSimplePopover() {
      return !this.props.disabled && this.state.isOpen ? _react2["default"].createElement(
        "div",
        {
          className: "slds-dropdown slds-dropdown--left slds-dropdown--small slds-dropdown--menu",
          style: { maxHeight: "20em" } },
        this.getPopoverContent()
      ) : null;
    }
  }, {
    key: "getModalPopover",
    value: function getModalPopover() {
      var className = "slds-dropdown slds-dropdown--small slds-dropdown--menu slds-dropdown--" + this.props.horizontalAlign;
      return !this.props.disabled && this.state.isOpen ? _react2["default"].createElement(
        _SLDSPopover2["default"],
        {
          className: className,
          horizontalAlign: this.props.horizontalAlign,
          targetElement: this.refs.button,
          closeOnTabKey: true,
          onClose: this.handleCancel.bind(this) },
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
    key: "render",
    value: function render() {
      return _react2["default"].createElement(
        _SLDSButton2["default"],
        {
          "aria-haspopup": "true",
          className: this.props.className,
          iconName: this.props.iconName,
          iconVariant: this.props.iconVariant,
          label: this.props.label,
          onBlur: (0, _utilsCreateChainedFunction2["default"])(this.props.onBlur, this.handleBlur.bind(this)),
          onClick: (0, _utilsCreateChainedFunction2["default"])(this.props.onClick, this.handleClick.bind(this)),
          onFocus: (0, _utilsCreateChainedFunction2["default"])(this.props.onFocus, this.handleFocus.bind(this)),
          onKeyDown: (0, _utilsCreateChainedFunction2["default"])(this.props.onKeyDown, this.handleKeyDown.bind(this)),
          onMouseDown: (0, _utilsCreateChainedFunction2["default"])(this.props.onMouseDown, this.handleMouseDown.bind(this)),
          onMouseEnter: (0, _utilsCreateChainedFunction2["default"])(this.props.onMouseEnter, this.props.openOn === "hover" ? this.handleMouseEnter.bind(this) : null),
          onMouseLeave: (0, _utilsCreateChainedFunction2["default"])(this.props.onMouseLeave, this.props.openOn === "hover" ? this.handleMouseLeave.bind(this) : null),
          ref: "button",
          style: this.props.style,
          tabIndex: this.state.isOpen ? -1 : 0,
          variant: this.props.variant
        },
        this.props.modal ? this.getModalPopover() : this.getSimplePopover()
      );
    }
  }]);

  return SLDSDropdown;
})(_react2["default"].Component);

SLDSDropdown.displayName = displayName;
SLDSDropdown.propTypes = propTypes;
SLDSDropdown.defaultProps = defaultProps;

module.exports = SLDSDropdown;
module.exports.ListItem = _utils.ListItem;
module.exports.ListItemLabel = _utils.ListItemLabel;