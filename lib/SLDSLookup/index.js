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

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _lodashEscaperegexp = require("lodash.escaperegexp");

var _lodashEscaperegexp2 = _interopRequireDefault(_lodashEscaperegexp);

var _componentsSLDSPopover = require("components/SLDSPopover");

var _componentsSLDSPopover2 = _interopRequireDefault(_componentsSLDSPopover);

var _componentsSLDSButton = require("components/SLDSButton");

var _componentsSLDSButton2 = _interopRequireDefault(_componentsSLDSButton);

var _componentsSLDSIcon = require("components/SLDSIcon");

var _componentsSLDSIcon2 = _interopRequireDefault(_componentsSLDSIcon);

var _componentsSLDSIconInputIcon = require("components/SLDSIcon/InputIcon");

var _componentsSLDSIconInputIcon2 = _interopRequireDefault(_componentsSLDSIconInputIcon);

var _componentsUtils = require("components/utils");

var _Menu = require("./Menu");

var _Menu2 = _interopRequireDefault(_Menu);

var _MenuDefaultFooter = require("./Menu/DefaultFooter");

var _MenuDefaultFooter2 = _interopRequireDefault(_MenuDefaultFooter);

var _MenuDefaultHeader = require("./Menu/DefaultHeader");

var _MenuDefaultHeader2 = _interopRequireDefault(_MenuDefaultHeader);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var displayName = "SLDSLookup";
var propTypes = {
  /**
   * Custom message for when no search results found.
   */
  emptyMessage: _react2["default"].PropTypes.string.isRequired,
  filterWith: _react2["default"].PropTypes.func.isRequired,
  /**
   * Custom component for Lookup footer. The default footer allows user to add new item - see <a href="http://www.lightningdesignsystem.com/components/lookups#base">SLDS Lookup > Base</a>. To use the default footer, pass in <code>SLDSLookup.DefaultFooter</code>.
   */
  footerRenderer: _react2["default"].PropTypes.func,
  /**
   * Custom component for Lookup header. The default header has a search icon and shows the search term - see <a href="http://www.lightningdesignsystem.com/components/lookups#base">SLDS Lookup > Base</a>. To use the default header, pass in <code>SLDSLookup.DefaultHeader</code>.
   */
  headerRenderer: _react2["default"].PropTypes.func,
  /**
   * Please refer to <a href="http://www.lightningdesignsystem.com/resources/icons">SLDS Icons</a> to view categories.
   */
  iconCategory: _react2["default"].PropTypes.string,
  iconClasses: _react2["default"].PropTypes.string,
  /**
   * Name of icon. Please refer to <a href="http://www.lightningdesignsystem.com/resources/icons">SLDS Icons</a> to view icon names.
   */
  iconName: _react2["default"].PropTypes.string,
  label: _react2["default"].PropTypes.string.isRequired,
  /**
   * Custom component that overrides the default Lookup Item component.
   */
  listItemLabelRenderer: _react2["default"].PropTypes.func,
  /**
   * If true, component renders specifically to work inside Modal.
   */
  modal: _react2["default"].PropTypes.bool,
  onBlur: _react2["default"].PropTypes.func,
  onChange: _react2["default"].PropTypes.func,
  onItemSelect: _react2["default"].PropTypes.func.isRequired,
  onItemUnselect: _react2["default"].PropTypes.func,
  /**
   * Lookup items data.
   */
  options: _react2["default"].PropTypes.array.isRequired,
  searchTerm: _react2["default"].PropTypes.string,
  /**
   * Salesforce object type for Lookup items.
   */
  salesforceObj: _react2["default"].PropTypes.string
};

/**
 * A function that takes a term string and an item and returns a truthy value if the item should be kept.
 */
var defaultFilter = function defaultFilter(term, item) {
  if (!term) return true;
  return item.label.match(new RegExp((0, _lodashEscaperegexp2["default"])(term), "ig"));
};

var defaultProps = {
  filterWith: defaultFilter,
  searchTerm: ""
};

/**
 * The SLDSLookup component currently supports the base variant.
 * For more details, please reference <a href="http://www.lightningdesignsystem.com/components/lookups/#base">SLDS Lookups > Base</a>.
 */

var SLDSLookup = (function (_React$Component) {
  _inherits(SLDSLookup, _React$Component);

  function SLDSLookup(props) {
    _classCallCheck(this, SLDSLookup);

    _get(Object.getPrototypeOf(SLDSLookup.prototype), "constructor", this).call(this, props);
    this.state = {
      currentFocus: null,
      focusIndex: null,
      items: [],
      isOpen: false,
      listLength: this.props.options.length,
      searchTerm: this.props.searchTerm,
      selectedIndex: null
    };
  }

  _createClass(SLDSLookup, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var lookup = this.inputRefName();
      if (!isNaN(parseInt(prevState.selectedIndex)) && isNaN(parseInt(this.state.selectedIndex))) {
        if (this.refs[lookup]) {
          _reactDom2["default"].findDOMNode(this.refs[lookup]).focus();
        }
      } else if (isNaN(parseInt(prevState.selectedIndex)) && !isNaN(parseInt(this.state.selectedIndex))) {
        var selectedItem = "pill-" + this.state.selectedIndex;
        if (this.refs[selectedItem]) {
          _reactDom2["default"].findDOMNode(this.refs[selectedItem]).focus();
        }
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      if (newProps.options) {
        this.modifyItems(newProps.options);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.modifyItems(this.props.options);
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
    // Need to keep track of filtered list length to be able to increment/decrement the focus index so it's contained to the number of available list items.
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
        event.keyCode === _componentsUtils.KEYS.ESCAPE ? this.handleClose() : this.handleClick();

        //If user hits down key, advance aria activedescendant to next item
        if (event.keyCode === _componentsUtils.KEYS.DOWN) {
          _componentsUtils.EventUtil.trapImmediate(event);
          this.state.focusIndex === null ? this.setState({ focusIndex: 0 }) : this.increaseIndex();
        }
        //If user hits up key, advance aria activedescendant to previous item
        else if (event.keyCode === _componentsUtils.KEYS.UP) {
            _componentsUtils.EventUtil.trapImmediate(event);
            var numFocusable = this.getNumFocusableItems();
            this.state.focusIndex === null ? this.setState({ focusIndex: numFocusable - 1 }) : this.decreaseIndex();
          }
          //If user hits enter/space key, select current activedescendant item
          else if ((event.keyCode === _componentsUtils.KEYS.ENTER || event.keyCode === _componentsUtils.KEYS.SPACE) && this.state.focusIndex !== null) {
              _componentsUtils.EventUtil.trapImmediate(event);
              //If the focus is on the first fixed Action Item in Menu, click it
              if (this.refs.header && this.state.focusIndex === 0) {
                _reactDom2["default"].findDOMNode(this.refs.header).click();
              }
              //If the focus is on the last fixed Action Item in Menu, click it
              else if (this.refs.footer && this.state.focusIndex === this.state.listLength + 1) {
                  _reactDom2["default"].findDOMNode(this.refs.footer).click();
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
        if (event.keyCode === _componentsUtils.KEYS.DELETE || event.keyCode === _componentsUtils.KEYS.BACKSPACE) {
          _componentsUtils.EventUtil.trapImmediate(event);
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
            focusIndex: this.state.focusIndex,
            listLength: this.state.listLength,
            onClose: this.handleClose.bind(this),
            searchTerm: this.state.searchTerm
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
          onClose: this.handleClose.bind(this),
          salesforceObj: this.props.salesforceObj
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
          emptyMessage: this.props.emptyMessage,
          filterWith: this.props.filterWith,
          focusIndex: this.state.focusIndex,
          footer: this.getFooter(),
          getListLength: this.getListLength.bind(this),
          header: this.getHeader(),
          iconCategory: this.props.iconCategory,
          iconClasses: this.props.iconClasses,
          iconName: this.props.iconName ? this.props.iconName : this.props.salesforceObj,
          items: this.state.items,
          label: this.props.label,
          listItemLabelRenderer: this.props.listItemLabelRenderer,
          listLength: this.state.listLength,
          onSelect: this.selectItem.bind(this),
          searchTerm: this.state.searchTerm,
          setFocus: this.setFocus.bind(this),
          salesforceObj: this.props.salesforceObj
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
      var targetElem = this.refs[this.inputRefName()];
      if (this.state.isOpen) {
        return _react2["default"].createElement(
          _componentsSLDSPopover2["default"],
          {
            className: "slds-lookup__menu",
            inheritTargetWidth: true,
            closeOnTabKey: true,
            onClose: this.handleCancel.bind(this),
            flippable: false,
            constrainToScrollParent: true,
            targetElement: targetElem },
          this.renderMenuContent()
        );
      }
    }
  }, {
    key: "renderSelectedItem",
    value: function renderSelectedItem() {
      var selectedItem = this.props.options[this.state.selectedIndex].label;
      return _react2["default"].createElement(
        "a",
        { href: "javascript:void(0)", className: "slds-pill", ref: "pill-" + this.state.selectedIndex, onKeyDown: this.handlePillKeyDown.bind(this) },
        _react2["default"].createElement(
          "span",
          { className: "slds-pill__label" },
          _react2["default"].createElement(_componentsSLDSIcon2["default"], { category: this.props.iconCategory, name: this.props.iconName ? this.props.iconName : this.props.salesforceObj, className: "slds-icon slds-pill__icon " + this.props.iconClasses }),
          _react2["default"].createElement(
            "span",
            { className: "slds-pill__label" },
            selectedItem
          )
        ),
        _react2["default"].createElement(_componentsSLDSButton2["default"], {
          assistiveText: "Press delete to remove",
          className: "slds-pill__remove slds-button--icon-bare",
          iconName: "close",
          onClick: this.handleDeleteSelected.bind(this),
          ref: "clearSelectedItemButton",
          tabIndex: "-1",
          variant: "icon"
        })
      );
    }
  }, {
    key: "inputRefName",
    value: function inputRefName() {
      return this.props.salesforceObj + "Lookup";
    }
  }, {
    key: "focusInput",
    value: function focusInput() {
      this.refs[this.inputRefName()].focus();
    }
  }, {
    key: "render",
    value: function render() {
      var inputClasses = {
        "slds-input": true,
        "slds-show": this.state.selectedIndex === null,
        "slds-hide": this.state.selectedIndex !== null
      };

      var componentClasses = {
        "slds-lookup": true,
        "slds-has-selection": this.state.selectedIndex !== null
      };

      var inputContainerClasses = {
        "slds-form-element__control": true,
        "slds-input-has-icon": true,
        "slds-input-has-icon--right": true
      };

      var pillContainerClasses = {
        "slds-pill__container": true,
        "slds-show": this.state.selectedIndex !== null,
        "slds-hide": this.state.selectedIndex === null
      };

      var inputContainerStyle = this.state.selectedIndex === null ? {} : { padding: "5px" };
      var inputLabel = this.props.label ? _react2["default"].createElement(
        "label",
        { className: "slds-form-element__label", htmlFor: this.inputRefName() },
        this.props.label
      ) : null;

      return _react2["default"].createElement(
        "div",
        { className: (0, _classnames2["default"])(componentClasses), "data-select": "single", "data-scope": "single", "data-typeahead": "true" },
        _react2["default"].createElement(
          "section",
          { className: "slds-form-element" },
          inputLabel,
          _react2["default"].createElement(
            "div",
            { className: (0, _classnames2["default"])(inputContainerClasses), style: inputContainerStyle },
            _react2["default"].createElement(
              "div",
              { className: (0, _classnames2["default"])(pillContainerClasses) },
              this.state.selectedIndex !== null ? this.renderSelectedItem() : null
            ),
            _react2["default"].createElement(_componentsSLDSIconInputIcon2["default"], { name: "search", onClick: this.focusInput.bind(this) }),
            _react2["default"].createElement("input", {
              "aria-activedescendant": this.state.currentFocus ? this.state.currentFocus : "",
              "aria-autocomplete": "list",
              "aria-expanded": this.state.isOpen,
              "aria-haspopup": "true",
              className: (0, _classnames2["default"])(inputClasses),
              id: this.inputRefName(),
              onBlur: this.handleBlur.bind(this),
              onChange: this.handleChange.bind(this),
              onClick: this.handleClick.bind(this),
              onFocus: this.handleFocus.bind(this),
              onKeyDown: this.handleKeyDown.bind(this),
              ref: this.inputRefName(),
              role: "combobox",
              type: "text",
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

SLDSLookup.displayName = displayName;
SLDSLookup.propTypes = propTypes;
SLDSLookup.defaultProps = defaultProps;

module.exports = SLDSLookup;
module.exports.DefaultHeader = _MenuDefaultHeader2["default"];
module.exports.DefaultFooter = _MenuDefaultFooter2["default"];