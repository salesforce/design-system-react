"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _lodash = require("lodash.escaperegexp");

var _lodash2 = _interopRequireDefault(_lodash);

var _SLDSPopover = require("../SLDSPopover");

var _SLDSPopover2 = _interopRequireDefault(_SLDSPopover);

var _SLDSButton = require("../SLDSButton");

var _SLDSButton2 = _interopRequireDefault(_SLDSButton);

var _SLDSIcon = require("../SLDSIcon");

var _SLDSIcon2 = _interopRequireDefault(_SLDSIcon);

var _InputIcon = require("../SLDSIcon/InputIcon");

var _InputIcon2 = _interopRequireDefault(_InputIcon);

var _utils = require("../utils");

var _Menu = require("./Menu");

var _Menu2 = _interopRequireDefault(_Menu);

var _DefaultFooter = require("./Menu/DefaultFooter");

var _DefaultFooter2 = _interopRequireDefault(_DefaultFooter);

var _DefaultHeader = require("./Menu/DefaultHeader");

var _DefaultHeader2 = _interopRequireDefault(_DefaultHeader);

var _DefaultSectionDivider = require("./Menu/DefaultSectionDivider");

var _DefaultSectionDivider2 = _interopRequireDefault(_DefaultSectionDivider);

var _classnames = require("classnames");

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

var displayName = "SLDSLookup";
var propTypes = {
  /**
   * Custom message that renders when no matches found. The default empty state is just text that says, "No matches found.".
   */
  emptyMessage: _react2.default.PropTypes.string,
  /**
   * Custom function to filter the Lookup items when typing into input field. The default function is case-insensitive and uses the searchTerm to filter Lookup items on their labels.
   */
  filterWith: _react2.default.PropTypes.func,
  /**
   * Custom component for Lookup footer. The default footer allows user to add new item - see <a href="http://www.lightningdesignsystem.com/components/lookups/#base">Lightning Design System Lookup > Base</a>. To use the default footer, pass in <code>SLDSLookup.DefaultFooter</code>.
   */
  footerRenderer: _react2.default.PropTypes.func,
  /**
   * Custom component for Lookup header. The default header has a search icon and shows the search term - see <a href="http://www.lightningdesignsystem.com/components/lookups/#base">Lightning Design System Lookup > Base</a>. To use the default header, pass in <code>SLDSLookup.DefaultHeader</code>.
   */
  headerRenderer: _react2.default.PropTypes.func,
  /**
   * Please refer to <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to view categories.
   */
  iconCategory: _react2.default.PropTypes.string,
  /**
   * If true, icon color is white. If false, icon color is the default text color.
   */
  iconInverse: _react2.default.PropTypes.bool,
  /**
   * Name of icon. Please refer to <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to view icon names.
   */
  iconName: _react2.default.PropTypes.string,
  label: _react2.default.PropTypes.string,
  /**
   * Custom component that overrides the default Lookup Item component.
   */
  listItemLabelRenderer: _react2.default.PropTypes.func,
  /**
   * If true, component renders specifically to work inside Modal.
   */
  modal: _react2.default.PropTypes.bool,
  /**
   * If true, constrains the menu to the scroll parent. Has no effect if modal is false.
   */
  constrainToScrollParent: _react2.default.PropTypes.bool,
  /**
   * If true, the menu is constrained to the window and may be flipped up. Has no effect if modal is false.
   */
  flippable: _react2.default.PropTypes.bool,
  onBlur: _react2.default.PropTypes.func,
  onChange: _react2.default.PropTypes.func,
  onSelect: _react2.default.PropTypes.func,
  onUnselect: _react2.default.PropTypes.func,
  /**
   * Lookup item data.
   */
  options: _react2.default.PropTypes.array.isRequired,
  /**
   * If true, adds asterisk next to input label to indicate it is a required field.
   */
  required: _react2.default.PropTypes.bool,
  searchTerm: _react2.default.PropTypes.string,
  /**
   * Index of current selected item.
   */
  selectedItem: _react2.default.PropTypes.number
};

/**
 * A function that takes a term string and an item and returns a truthy value if the item should be kept.
 */
var defaultFilter = function defaultFilter(term, item) {
  if (!term) return true;
  return item.data && item.data.type === 'section' || item.label.match(new RegExp((0, _lodash2.default)(term), "ig"));
};

var defaultProps = {
  filterWith: defaultFilter,
  modal: false,
  required: false,
  searchTerm: "",
  constrainToScrollParent: true,
  flippable: false
};

/**
 * The SLDSLookup is the Lightning Design System Lookup base component.
 */

var SLDSLookup = function (_React$Component) {
  _inherits(SLDSLookup, _React$Component);

  function SLDSLookup(props) {
    _classCallCheck(this, SLDSLookup);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SLDSLookup).call(this, props));

    _this.state = {
      currentFocus: null,
      focusIndex: null,
      items: [],
      isOpen: false,
      listLength: _this.props.options.length,
      searchTerm: _this.normalizeSearchTerm(_this.props.searchTerm),
      selectedIndex: _this.props.selectedItem
    };
    return _this;
  }

  _createClass(SLDSLookup, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var lookup = this.inputRefName();
      if (!isNaN(parseInt(prevState.selectedIndex)) && isNaN(parseInt(this.state.selectedIndex))) {
        if (this.refs[lookup]) {
          _reactDom2.default.findDOMNode(this.refs[lookup]).focus();
        }
      } else if (isNaN(parseInt(prevState.selectedIndex)) && !isNaN(parseInt(this.state.selectedIndex))) {
        var selectedItem = "pill-" + this.state.selectedIndex;
        if (this.refs[selectedItem]) {
          _reactDom2.default.findDOMNode(this.refs[selectedItem]).focus();
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
  }, {
    key: "setFirstIndex",
    value: function setFirstIndex() {
      var numFocusable = this.getNumFocusableItems();
      var nextFocusIndex = 0;
      var filteredItem = this.state.items[0];
      if (this.refs.menu && this.refs.menu.getFilteredItemForIndex) {
        filteredItem = this.refs.menu.getFilteredItemForIndex(nextFocusIndex);
      }
      if (filteredItem && filteredItem.data.type === 'section') {
        nextFocusIndex++;
      }
      this.setState({ focusIndex: nextFocusIndex });
    }
    //=================================================
    // Using down/up keys, set Focus on list item and assign it to aria-activedescendant attribute in input.
    // Need to keep track of filtered list length to be able to increment/decrement the focus index so it's contained to the number of available list items.

  }, {
    key: "increaseIndex",
    value: function increaseIndex() {
      var numFocusable = this.getNumFocusableItems();
      var nextFocusIndex = this.state.focusIndex < numFocusable ? this.state.focusIndex + 1 : 0;
      var filteredItem = this.refs.menu.getFilteredItemForIndex(nextFocusIndex);
      if (filteredItem && filteredItem.data.type === 'section') {
        nextFocusIndex++;
      }
      this.setState({ focusIndex: nextFocusIndex });
    }
  }, {
    key: "decreaseIndex",
    value: function decreaseIndex() {
      var numFocusable = this.getNumFocusableItems();
      var prevFocusIndex = this.state.focusIndex > 0 ? this.state.focusIndex - 1 : numFocusable;
      var filteredItem = this.refs.menu.getFilteredItemForIndex(prevFocusIndex);
      if (filteredItem && filteredItem.data.type === 'section') {
        prevFocusIndex === 0 ? prevFocusIndex = numFocusable : prevFocusIndex--;
      }
      this.setState({ focusIndex: prevFocusIndex });
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
      return this.state.listLength - 1 + offset;
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
          searchTerm: ""
        });
        var data = this.state.items[index].data;
        if (this.props.onSelect) {
          this.props.onSelect(data);
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
      if (this.props.onUnselect) {
        this.props.onUnselect();
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
    key: "handleEscape",
    value: function handleEscape(event) {
      if (this.state.isOpen && event) {
        _utils.EventUtil.trap(event);
      }
      this.handleClose();
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
      this.setState({ searchTerm: this.normalizeSearchTerm(target.value) });
      if (this.props.onChange) {
        this.props.onChange(target.value);
      }
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(event) {
      if (event.keyCode) {
        //If user hits esc key, close menu
        event.keyCode === _utils.KEYS.ESCAPE ? this.handleEscape(event) : this.handleClick();

        //If user hits down key, advance aria activedescendant to next item
        if (event.keyCode === _utils.KEYS.DOWN) {
          _utils.EventUtil.trapImmediate(event);
          this.state.focusIndex === null ? this.setFirstIndex() : this.increaseIndex();
        }
        //If user hits up key, advance aria activedescendant to previous item
        else if (event.keyCode === _utils.KEYS.UP) {
            _utils.EventUtil.trapImmediate(event);
            var numFocusable = this.getNumFocusableItems();
            this.state.focusIndex === null ? this.setState({ focusIndex: numFocusable }) : this.decreaseIndex();
          }
          //If user hits enter/space key, select current activedescendant item
          else if ((event.keyCode === _utils.KEYS.ENTER || event.keyCode === _utils.KEYS.SPACE) && this.state.focusIndex !== null) {
              _utils.EventUtil.trapImmediate(event);
              //If the focus is on the first fixed Action Item in Menu, click it
              if (this.refs.header && this.state.focusIndex === 0) {
                _reactDom2.default.findDOMNode(this.refs.header).click();
              }
              //If the focus is on the last fixed Action Item in Menu, click it
              else if (this.refs.footer && this.state.focusIndex === this.state.listLength + 1) {
                  _reactDom2.default.findDOMNode(this.refs.footer).click();
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
        var Header = this.props.headerRenderer;
        var headerActive = false;
        this.state.focusIndex === 0 ? headerActive = true : headerActive = false;

        return _react2.default.createElement(Header, _extends({ ref: "header" }, this.props, {
          focusIndex: this.state.focusIndex,
          isActive: headerActive,
          onClose: this.handleClose.bind(this),
          searchTerm: this.state.searchTerm,
          setFocus: this.setFocus.bind(this)
        }));
      }
    }
  }, {
    key: "getFooter",
    value: function getFooter() {
      if (this.props.footerRenderer) {
        var Footer = this.props.footerRenderer;
        var footerActive = false;
        var numFocusable = this.getNumFocusableItems();
        this.state.focusIndex === numFocusable ? footerActive = true : footerActive = false;

        return _react2.default.createElement(Footer, _extends({ ref: "footer" }, this.props, {
          focusIndex: this.state.focusIndex,
          isActive: footerActive,
          onClose: this.handleClose.bind(this),
          setFocus: this.setFocus.bind(this)
        }));
      }
    }

    /*
    getSectionDivider(){
      if(this.props.sectionDividerRenderer){
        const SectionDivider = this.props.sectionDividerRenderer;
        return <SectionDivider {... this.props} />;
      }
    }
    */

  }, {
    key: "normalizeSearchTerm",
    value: function normalizeSearchTerm(string) {
      return (string || '').toString().replace(/^\s+/, '');
    }

    //=================================================
    // Rendering Things

  }, {
    key: "renderMenuContent",
    value: function renderMenuContent() {
      if (this.state.isOpen) {
        return _react2.default.createElement(_Menu2.default, {
          ref: "menu",
          emptyMessage: this.props.emptyMessage,
          filterWith: this.props.filterWith,
          focusIndex: this.state.focusIndex,
          footer: this.getFooter(),
          getListLength: this.getListLength.bind(this),
          header: this.getHeader(),
          iconCategory: this.props.iconCategory,
          iconInverse: this.props.iconInverse,
          iconName: this.props.iconName,
          items: this.state.items,
          label: this.props.label,
          listItemLabelRenderer: this.props.listItemLabelRenderer,
          listLength: this.state.listLength,
          onSelect: this.selectItem.bind(this),
          searchTerm: this.state.searchTerm,
          sectionDividerRenderer: this.props.sectionDividerRenderer,
          setFocus: this.setFocus.bind(this)
        });
      }
    }
  }, {
    key: "renderSimpleMenu",
    value: function renderSimpleMenu() {
      if (this.state.isOpen) {
        return _react2.default.createElement(
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
        return _react2.default.createElement(
          _SLDSPopover2.default,
          {
            className: "slds-lookup__menu",
            inheritTargetWidth: true,
            closeOnTabKey: true,
            onClose: this.handleCancel.bind(this),
            flippable: this.props.flippable,
            constrainToScrollParent: this.props.constrainToScrollParent,
            targetElement: targetElem },
          this.renderMenuContent()
        );
      }
    }
  }, {
    key: "renderSelectedItem",
    value: function renderSelectedItem() {
      var selectedItem = this.props.options[this.state.selectedIndex].label;
      var renderIcon = this.props.iconName ? _react2.default.createElement(_SLDSIcon2.default, { category: this.props.iconCategory, className: "slds-icon slds-pill__icon", inverse: this.props.iconInverse, name: this.props.iconName }) : null;
      var labelClassName = this.props.iconName ? 'slds-pill__label' : 'slds-pill__label slds-m-left--x-small';
      return _react2.default.createElement(
        "a",
        { href: "javascript:void(0)", className: "slds-pill", ref: "pill-" + this.state.selectedIndex, onKeyDown: this.handlePillKeyDown.bind(this) },
        renderIcon,
        _react2.default.createElement(
          "span",
          { className: labelClassName },
          selectedItem
        ),
        _react2.default.createElement(_SLDSButton2.default, {
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
      return this.props.label + "Lookup";
    }
  }, {
    key: "focusInput",
    value: function focusInput() {
      _reactDom2.default.findDOMNode(this.refs[this.inputRefName()]).focus();
    }
  }, {
    key: "isSelected",
    value: function isSelected() {
      var hasSelection = !isNaN(parseInt(this.state.selectedIndex)) && this.state.selectedIndex >= 0;
      return hasSelection ? true : false;
    }
  }, {
    key: "getClassName",
    value: function getClassName() {
      return (0, _classnames2.default)(this.props.className, "slds-lookup", {
        "slds-has-selection": this.isSelected()
      });
    }
  }, {
    key: "render",
    value: function render() {
      var inputClasses = {
        "slds-input": true,
        "slds-show": !this.isSelected(),
        "slds-hide": this.isSelected()
      };

      var pillContainerClasses = {
        "slds-pill__container": true,
        "slds-show": this.isSelected(),
        "slds-hide": !this.isSelected()
      };

      var required = this.props.required ? _react2.default.createElement(
        "span",
        { style: { color: "red" } },
        "* "
      ) : null;
      var inputLabel = this.props.label ? _react2.default.createElement(
        "label",
        { className: "slds-form-element__label", htmlFor: this.inputRefName(), style: { width: "100%" } },
        required,
        this.props.label
      ) : null;

      return _react2.default.createElement(
        "div",
        { className: this.getClassName(), "data-select": "single", "data-scope": "single", "data-typeahead": "true" },
        _react2.default.createElement(
          "section",
          { className: "slds-form-element" },
          inputLabel,
          _react2.default.createElement(
            "div",
            { className: "slds-form-element__control slds-input-has-icon slds-input-has-icon--right" },
            _react2.default.createElement(
              "div",
              { className: (0, _classnames2.default)(pillContainerClasses) },
              this.isSelected() ? this.renderSelectedItem() : null
            ),
            _react2.default.createElement(_InputIcon2.default, { name: "search", onClick: this.focusInput.bind(this) }),
            _react2.default.createElement("input", {
              "aria-activedescendant": this.state.currentFocus ? this.state.currentFocus : "",
              "aria-autocomplete": "list",
              "aria-expanded": this.state.isOpen,
              "aria-haspopup": "true",
              className: (0, _classnames2.default)(inputClasses),
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
}(_react2.default.Component);

SLDSLookup.displayName = displayName;
SLDSLookup.propTypes = propTypes;
SLDSLookup.defaultProps = defaultProps;

module.exports = SLDSLookup;
module.exports.DefaultHeader = _DefaultHeader2.default;
module.exports.DefaultSectionDivider = _DefaultSectionDivider2.default;
module.exports.DefaultFooter = _DefaultFooter2.default;