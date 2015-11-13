/*
   Copyright (c) 2015, salesforce.com, inc. All rights reserved.
   Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
   Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
   Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
   Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   */

"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Menu = require("./Menu");

var _Menu2 = _interopRequireDefault(_Menu);

var _SLDSPopover = require("../SLDSPopover");

var _SLDSPopover2 = _interopRequireDefault(_SLDSPopover);

var _SLDSIcons = require("./../SLDSIcons");

var _SLDSButton = require("../SLDSButton");

var _SLDSButton2 = _interopRequireDefault(_SLDSButton);

var _utils = require("../utils");

var _lodashEscaperegexp = require("lodash.escaperegexp");

var _lodashEscaperegexp2 = _interopRequireDefault(_lodashEscaperegexp);

var _MenuDefaultFooter = require("./Menu/DefaultFooter");

var _MenuDefaultFooter2 = _interopRequireDefault(_MenuDefaultFooter);

var _MenuDefaultHeader = require("./Menu/DefaultHeader");

var _MenuDefaultHeader2 = _interopRequireDefault(_MenuDefaultHeader);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var defaultFilter = function defaultFilter(term, item) {
  if (!term) return true;
  return item.label.match(new RegExp((0, _lodashEscaperegexp2["default"])(term), "ig"));
};

var SLDSLookup = (function (_React$Component) {
  _inherits(SLDSLookup, _React$Component);

  function SLDSLookup(props) {
    _classCallCheck(this, SLDSLookup);

    _get(Object.getPrototypeOf(SLDSLookup.prototype), "constructor", this).call(this, props);

    //Dynamically assign ids to list items to reference for focusing and selecting items

    this.state = {
      searchTerm: "",
      isOpen: false,
      currentFocus: null,
      focusIndex: null,
      selectedIndex: null,
      listLength: this.props.items.length,
      items: []
    };
  }

  _createClass(SLDSLookup, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var lookup = this.props.type + "Lookup";
      if (!isNaN(parseInt(prevState.selectedIndex)) && isNaN(parseInt(this.state.selectedIndex))) {
        if (this.refs[lookup]) {
          _react2["default"].findDOMNode(this.refs[lookup]).focus();
        }
      } else if (isNaN(parseInt(prevState.selectedIndex)) && !isNaN(parseInt(this.state.selectedIndex))) {
        var selectedItem = "pill-" + this.state.selectedIndex;
        if (this.refs[selectedItem]) {
          _react2["default"].findDOMNode(this.refs[selectedItem]).focus();
        }
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      if (newProps.items) {
        this.modifyItems(newProps.items);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.modifyItems(this.props.items);
    }
  }, {
    key: "modifyItems",
    value: function modifyItems(itemsToModify) {
      var items = itemsToModify.map(function (item, index) {
        return {
          id: "item-" + index,
          label: item.label,
          data: item
        };
      });

      this.setState({ items: items });
    }

    //=================================================
    // Using down/up keys, set Focus on list item and assign it to aria-activedescendant attribute in input.
    // Need to keep track of filtered list length to be able to increment/decrement the focus index so it"s contained to the number of available list items.
    // Adding/subtracting 1 from focusIndex to account for fixed action items (searchRecords and addNewItem buttons)
  }, {
    key: "increaseIndex",
    value: function increaseIndex() {
      var numFocusable = this.getNumFocusableItems();
      this.setState({ focusIndex: this.state.focusIndex < numFocusable - 1 ? this.state.focusIndex + 1 : 0 });
    }
  }, {
    key: "decreaseIndex",
    value: function decreaseIndex() {
      var numFocusable = this.getNumFocusableItems();
      this.setState({ focusIndex: this.state.focusIndex > 0 ? this.state.focusIndex - 1 : numFocusable - 1 });
    }
  }, {
    key: "setFocus",
    value: function setFocus(id) {
      this.setState({ currentFocus: id });
    }
  }, {
    key: "getListLength",
    value: function getListLength(qty) {
      if (qty !== this.state.listLength) {
        this.setState({ listLength: qty });
      }
    }
  }, {
    key: "getNumFocusableItems",
    value: function getNumFocusableItems() {
      var offset = 0;
      if (this.refs.footer) {
        offset += 1;
      }
      if (this.refs.header) {
        offset += 1;
      }
      return this.state.listLength + offset;
    }

    //=================================================
    // Select menu item (onClick or on key enter/space)
  }, {
    key: "selectItem",
    value: function selectItem(itemId) {
      if (itemId) {
        var index = itemId.replace("item-", "");
        this.selectItemByIndex(index);
      }
    }
  }, {
    key: "selectItemByIndex",
    value: function selectItemByIndex(index) {
      if (index >= 0 && index < this.state.items.length) {
        this.setState({
          selectedIndex: index,
          searchTerm: null
        });
        var data = this.state.items[index].data;
        if (this.props.onItemSelect) {
          this.props.onItemSelect(data);
        }
      }
    }
  }, {
    key: "handleDeleteSelected",
    value: function handleDeleteSelected() {
      this.setState({
        selectedIndex: null,
        isOpen: true
      });
      if (this.props.onItemUnselect) {
        this.props.onItemUnselect();
      }
    }

    //=================================================
    // Event Listeners on Input
  }, {
    key: "handleClose",
    value: function handleClose() {
      this.setState({
        isOpen: false,
        focusIndex: null,
        currentFocus: null
      });
    }
  }, {
    key: "handleCancel",
    value: function handleCancel() {
      this.setState({
        isOpen: false,
        focusIndex: null,
        currentFocus: null
      });
    }
  }, {
    key: "handleClick",
    value: function handleClick() {
      this.setState({ isOpen: true });
    }
  }, {
    key: "handleBlur",
    value: function handleBlur(event) {
      this.handleClose();
      if (this.props.onBlur) {
        var target = event.target || event.currentTarget;
        this.props.onBlur(target.value);
      }
    }
  }, {
    key: "handleFocus",
    value: function handleFocus() {
      this.setState({ isOpen: true });
    }
  }, {
    key: "handleChange",
    value: function handleChange(event) {
      var target = event.target || event.currentTarget;
      this.setState({ searchTerm: target.value });
      if (this.props.onChange) {
        this.props.onChange(target.value);
      }
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(event) {
      if (event.keyCode) {
        //If user hits esc key, close menu
        event.keyCode === _utils.KEYS.ESCAPE ? this.handleClose() : this.handleClick();

        //If user hits down key, advance aria activedescendant to next item
        if (event.keyCode === _utils.KEYS.DOWN) {
          _utils.EventUtil.trapImmediate(event);
          this.state.focusIndex === null ? this.setState({ focusIndex: 0 }) : this.increaseIndex();
        }
        //If user hits up key, advance aria activedescendant to previous item
        else if (event.keyCode === _utils.KEYS.UP) {
            _utils.EventUtil.trapImmediate(event);
            var numFocusable = this.getNumFocusableItems();
            this.state.focusIndex === null ? this.setState({ focusIndex: numFocusable - 1 }) : this.decreaseIndex();
          }
          //If user hits enter/space key, select current activedescendant item
          else if ((event.keyCode === _utils.KEYS.ENTER || event.keyCode === _utils.KEYS.SPACE) && this.state.focusIndex !== null) {
              _utils.EventUtil.trapImmediate(event);
              //If the focus is on the first fixed Action Item in Menu, click it
              if (this.refs.header && this.state.focusIndex === 0) {
                _react2["default"].findDOMNode(this.refs.header).click();
              }
              //If the focus is on the last fixed Action Item in Menu, click it
              else if (this.refs.footer && this.state.focusIndex === this.state.listLength + 1) {
                  _react2["default"].findDOMNode(this.refs.footer).click();
                }
                //If not, then select menu item
                else {
                    this.selectItem(this.state.currentFocus);
                  }
            }
      }
    }
  }, {
    key: "handlePillKeyDown",
    value: function handlePillKeyDown(event) {
      if (event.keyCode) {
        if (event.keyCode === _utils.KEYS.DELETE || event.keyCode === _utils.KEYS.BACKSPACE) {
          _utils.EventUtil.trapImmediate(event);
          this.handleDeleteSelected();
        }
      }
    }
  }, {
    key: "getHeader",
    value: function getHeader() {
      if (this.props.headerRenderer) {
        var headerActive = false;
        var isActiveClass = null;
        if (this.state.focusIndex === 0) {
          headerActive = true;
          isActiveClass = "slds-theme--shade";
        } else {
          headerActive = false;
          isActiveClass = "";
        }
        var Header = this.props.headerRenderer;
        return _react2["default"].createElement(
          "div",
          { className: isActiveClass },
          _react2["default"].createElement(Header, _extends({ ref: "header" }, this.props, {
            searchTerm: this.state.searchTerm,
            focusIndex: this.state.focusIndex,
            listLength: this.state.listLength,
            onClose: this.handleClose.bind(this)
          }))
        );
      }
    }
  }, {
    key: "getFooter",
    value: function getFooter() {
      if (this.props.footerRenderer) {
        var Footer = this.props.footerRenderer;
        return _react2["default"].createElement(Footer, _extends({ ref: "footer" }, this.props, {
          focusIndex: this.state.focusIndex,
          listLength: this.state.listLength,
          onClose: this.handleClose.bind(this)
        }));
      }
    }

    //=================================================
    // Rendering Things
  }, {
    key: "renderMenuContent",
    value: function renderMenuContent() {
      if (this.state.isOpen) {
        return _react2["default"].createElement(_Menu2["default"], {
          searchTerm: this.state.searchTerm,
          label: this.props.label,
          type: this.props.type,
          iconCategory: this.props.iconCategory,
          iconName: this.props.iconName ? this.props.iconName : this.props.type,
          focusIndex: this.state.focusIndex,
          listLength: this.state.listLength,
          items: this.state.items,
          emptyMessage: this.props.emptyMessage,
          messages: this.props.messages,
          errors: this.props.errors,
          filterWith: this.props.filterWith,
          getListLength: this.getListLength.bind(this),
          setFocus: this.setFocus.bind(this),
          onSelect: this.selectItem.bind(this),
          header: this.getHeader(),
          footer: this.getFooter(),
          boldRegex: this.props.boldRegex,
          listItemLabelRenderer: this.props.listItemLabelRenderer
        });
      }
    }
  }, {
    key: "renderSimpleMenu",
    value: function renderSimpleMenu() {
      if (this.state.isOpen) {
        return _react2["default"].createElement(
          "div",
          { className: "ignore-react-onclickoutside slds-lookup__menu", role: "listbox", ref: "scroll" },
          this.renderMenuContent()
        );
      }
    }
  }, {
    key: "renderModalMenu",
    value: function renderModalMenu() {
      var targetElem = this.props.type + "Lookup";
      if (this.state.isOpen) {
        return _react2["default"].createElement(
          _SLDSPopover2["default"],
          {
            className: "slds-dropdown slds-dropdown--left slds-dropdown--small slds-dropdown--menu",
            targetElement: this.refs[targetElem],
            closeOnTabKey: true,
            onClose: this.handleCancel.bind(this) },
          this.renderMenuContent()
        );
      }
    }
  }, {
    key: "renderSelectedItem",
    value: function renderSelectedItem() {
      var selectedItem = this.props.items[this.state.selectedIndex].label;
      return _react2["default"].createElement(
        "span",
        { tabIndex: "0", className: "slds-pill", ref: "pill-" + this.state.selectedIndex, onKeyDown: this.handlePillKeyDown.bind(this) },
        _react2["default"].createElement(
          "span",
          { className: "slds-pill__label" },
          _react2["default"].createElement(_SLDSIcons.Icon, { category: this.props.iconCategory, name: this.props.iconName ? this.props.iconName : this.props.type, className: this.props.iconClasses }),
          selectedItem
        ),
        _react2["default"].createElement(_SLDSButton2["default"], {
          label: "Press delete to remove",
          tabIndex: "-1",
          variant: "icon",
          iconName: "close",
          iconSize: "medium",
          onClick: this.handleDeleteSelected.bind(this),
          ref: "clearSelectedItemButton"
        })
      );
    }
  }, {
    key: "render",
    value: function render() {
      var inputClasses = this.state.selectedIndex === null ? "slds-input" : "slds-input slds-hide";
      var componentClasses = this.state.selectedIndex === null ? "slds-lookup ignore-react-onclickoutside" : "slds-lookup ignore-react-onclickoutside slds-has-selection";

      var inputContainerClasses = {
        "slds-lookup__control": true,
        "slds-input-has-icon": true,
        "slds-input-has-icon--right": true,
        "slds-input": this.state.selectedIndex !== null,
        "slds-has-error": this.props.hasError
      };

      var inputContainerStyle = this.state.selectedIndex === null ? {} : { padding: "5px" };
      var inputLabel = this.props.label ? _react2["default"].createElement(
        "label",
        { className: "slds-form-element__label", htmlFor: this.props.type + "Lookup" },
        this.props.label
      ) : null;

      return _react2["default"].createElement(
        "div",
        { className: componentClasses, "data-select": "multi", "data-scope": "single", "data-typeahead": "true" },
        _react2["default"].createElement(
          "section",
          { className: "slds-form-element" },
          inputLabel,
          _react2["default"].createElement(
            "div",
            { className: (0, _classnames2["default"])(inputContainerClasses), style: inputContainerStyle },
            this.state.selectedIndex !== null ? this.renderSelectedItem() : null,
            _react2["default"].createElement(_SLDSIcons.InputIcon, { name: "search" }),
            _react2["default"].createElement("input", {
              id: this.props.type + "Lookup",
              ref: this.props.type + "Lookup",
              className: inputClasses,
              type: "text",
              "aria-haspopup": "true",
              "aria-autocomplete": "list",
              "aria-activedescendant": this.state.currentFocus ? this.state.currentFocus : "",
              "aria-expanded": this.state.isOpen,
              role: "combobox",
              onChange: this.handleChange.bind(this),
              onFocus: this.handleFocus.bind(this),
              onBlur: this.handleBlur.bind(this),
              onClick: this.handleClick.bind(this),
              onKeyDown: this.handleKeyDown.bind(this),
              value: this.state.searchTerm
            })
          ),
          this.props.modal ? this.renderModalMenu() : this.renderSimpleMenu()
        )
      );
    }
  }]);

  return SLDSLookup;
})(_react2["default"].Component);

SLDSLookup.propTypes = {
  items: _react2["default"].PropTypes.array,
  emptyMessage: _react2["default"].PropTypes.string,
  messages: _react2["default"].PropTypes.arrayOf(_react2["default"].PropTypes.string),
  errors: _react2["default"].PropTypes.arrayOf(_react2["default"].PropTypes.string),
  label: _react2["default"].PropTypes.string,
  type: _react2["default"].PropTypes.string,
  iconCategory: _react2["default"].PropTypes.string,
  iconName: _react2["default"].PropTypes.string,
  filterWith: _react2["default"].PropTypes.func,
  onItemSelect: _react2["default"].PropTypes.func,
  onItemUnselect: _react2["default"].PropTypes.func,
  onChange: _react2["default"].PropTypes.func,
  onBlur: _react2["default"].PropTypes.func,
  modal: _react2["default"].PropTypes.bool,
  disabled: _react2["default"].PropTypes.bool,
  hasError: _react2["default"].PropTypes.bool,
  boldRegex: _react2["default"].PropTypes.instanceOf(RegExp),
  listItemLabelRenderer: _react2["default"].PropTypes.func
};

SLDSLookup.defaultProps = {
  filterWith: defaultFilter,
  modal: false,
  disabled: false
};

module.exports = SLDSLookup;
module.exports.DefaultHeader = _MenuDefaultHeader2["default"];
module.exports.DefaultFooter = _MenuDefaultFooter2["default"];