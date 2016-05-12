"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _lodash = require("lodash.isequal");

var _lodash2 = _interopRequireDefault(_lodash);

var _popover = require("../popover");

var _popover2 = _interopRequireDefault(_popover);

var _utilities = require("../../utilities");

var _icon = require("../icon");

var _icon2 = _interopRequireDefault(_icon);

var _list = require("../menu-list/list");

var _list2 = _interopRequireDefault(_list);

var _listItemLabel = require("../menu-list/list-item-label");

var _listItemLabel2 = _interopRequireDefault(_listItemLabel);

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

var displayName = "MenuPicklist";
var propTypes = {
  className: _react2.default.PropTypes.string,
  /**
   * If true, renders checkmark icon on the selected Menu Item.
   */
  checkmark: _react2.default.PropTypes.bool,
  disabled: _react2.default.PropTypes.bool,
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
  onSelect: _react2.default.PropTypes.func,
  /**
   * Menu item data.
   */
  options: _react2.default.PropTypes.array.isRequired,
  placeholder: _react2.default.PropTypes.string,
  required: _react2.default.PropTypes.bool,
  /**
   * Current selected item.
   */
  value: _react2.default.PropTypes.node
};
var defaultProps = {
  constrainToScrollParent: false,
  disabled: false,
  inheritTargetWidth: true,
  modal: true,
  required: false,
  placeholder: "Select an Option",
  checkmark: true
};

/**
 * The MenuPicklist component is a variant of the Ligtning Design System Menu component.
 */

var MenuPicklist = function (_React$Component) {
  _inherits(MenuPicklist, _React$Component);

  function MenuPicklist(props) {
    _classCallCheck(this, MenuPicklist);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MenuPicklist).call(this, props));

    _this.state = {
      highlightedIndex: 0,
      isOpen: false,
      isFocused: false,
      lastBlurredIndex: -1,
      lastBlurredTimeStamp: -1,
      selectedIndex: _this.getIndexByValue(_this.props.value),
      /* triggerId is the id of the element that triggers the Menu to open.
      * Need this for aria-labelledby on <ul> in Menu for accessibility. */
      triggerId: _this.props.label ? _this.props.label.replace(/\s+/g, '') + '_Button' : 'Picklist_Button'
    };
    return _this;
  }

  _createClass(MenuPicklist, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isUnmounting = true;
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
          if (!this.isUnmounting && this.refs.list) {
            if (_reactDom2.default.findDOMNode(this.refs.list).contains(document.activeElement)) {
              return;
            }
            this.setState({ isOpen: false });
          }
        }
      }

      if (this.props.value !== prevProps.value || !(0, _lodash2.default)(this.props.options, prevProps.options)) {
        var newSelectedIndex = this.getIndexByValue(this.props.value);
        if (newSelectedIndex !== this.state.selectedIndex) {
          this.handleValueUpdate(newSelectedIndex);
        }
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
    key: "handleValueUpdate",
    value: function handleValueUpdate(index) {
      this.setState({ selectedIndex: index });
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
      _utilities.EventUtil.trapImmediate(event);
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
      if (!this.isUnmounting) {
        _reactDom2.default.findDOMNode(this.refs.triggerbutton).focus();
      }
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(event) {
      if (event.keyCode) {
        if (event.keyCode === _utilities.KEYS.ENTER || event.keyCode === _utilities.KEYS.SPACE || event.keyCode === _utilities.KEYS.DOWN || event.keyCode === _utilities.KEYS.UP) {
          _utilities.EventUtil.trapEvent(event);

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
      return this.props.listItemRenderer ? this.props.listItemRenderer : _listItemLabel2.default;
    }
  }, {
    key: "getPopoverContent",
    value: function getPopoverContent() {
      return _react2.default.createElement(_list2.default, {
        checkmark: this.props.checkmark,
        highlightedIndex: this.state.highlightedIndex,
        itemRenderer: this.getListItemRenderer(),
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
      return !this.props.disabled && this.state.isOpen ? _react2.default.createElement(
        "div",
        {
          className: "slds-dropdown slds-dropdown--left slds-dropdown--menu",
          style: {
            maxHeight: "20em",
            overflowX: "hidden",
            minWidth: "100%"
          } },
        this.getPopoverContent()
      ) : null;
    }
  }, {
    key: "getModalPopover",
    value: function getModalPopover() {
      return !this.props.disabled && this.state.isOpen ? _react2.default.createElement(
        _popover2.default,
        {
          className: "slds-dropdown slds-dropdown--left ",
          closeOnTabKey: true,
          constrainToScrollParent: this.props.constrainToScrollParent,
          dropClass: "slds-picklist",
          flippable: true,
          onClose: this.handleCancel.bind(this),
          targetElement: this.refs.triggerbutton,
          inheritTargetWidth: this.props.inheritTargetWidth },
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
      var required = this.props.required ? _react2.default.createElement(
        "span",
        { style: { color: "red" } },
        "* "
      ) : null;
      var inputLabel = this.props.label ? _react2.default.createElement(
        "label",
        { className: "slds-form-element__label", htmlFor: this.state.triggerId, style: { width: "100%" } },
        required,
        this.props.label
      ) : null;
      return _react2.default.createElement(
        "div",
        { className: "slds-picklist " + this.props.className, "aria-expanded": this.state.isOpen },
        inputLabel,
        _react2.default.createElement(
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
            disabled: this.props.disabled,
            ref: "triggerbutton",
            tabIndex: this.state.isOpen ? -1 : 0 },
          _react2.default.createElement(
            "span",
            { className: "slds-truncate" },
            this.getPlaceholder()
          ),
          _react2.default.createElement(_icon2.default, { name: "down", category: "utility" })
        ),
        this.props.modal ? this.getModalPopover() : this.getSimplePopover()
      );
    }
  }]);

  return MenuPicklist;
}(_react2.default.Component);

MenuPicklist.displayName = displayName;
MenuPicklist.propTypes = propTypes;
MenuPicklist.defaultProps = defaultProps;

module.exports = MenuPicklist;
module.exports.ListItemLabel = _listItemLabel2.default;