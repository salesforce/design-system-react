"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ListItemLabel", {
  enumerable: true,
  get: function get() {
    return _itemLabel.default;
  }
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _createReactClass = _interopRequireDefault(require("create-react-class"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash.isfunction"));

var _classnames = _interopRequireDefault(require("classnames"));

var _shortid = _interopRequireDefault(require("shortid"));

var _checkProps = _interopRequireDefault(require("./check-props"));

var _dialog = _interopRequireDefault(require("../utilities/dialog"));

var _icon = _interopRequireDefault(require("../icon"));

var _menuList = _interopRequireDefault(require("../utilities/menu-list"));

var _itemLabel = _interopRequireDefault(require("../utilities/menu-list/item-label"));

var _pill = _interopRequireDefault(require("../utilities/pill"));

var _event = _interopRequireDefault(require("../../utilities/event"));

var _keyBuffer = _interopRequireDefault(require("../../utilities/key-buffer"));

var _keyboardNavigate = _interopRequireDefault(require("../../utilities/keyboard-navigate"));

var _keyCode = _interopRequireDefault(require("../../utilities/key-code"));

var _constants = require("../../utilities/constants");

var _iconSettings = require("../icon-settings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable max-lines */

/* eslint-disable react/no-access-state-in-setstate */

/* eslint-disable no-param-reassign */

/* eslint-disable prefer-destructuring */

/* eslint-disable max-lines */

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable react/prefer-es6-class */
// # Picklist Component [DEPRECATED]
// Implements the [Picklist design pattern](https://www.lightningdesignsystem.com/components/menus/#flavor-picklist) in React.
// Based on SLDS v2.1.0-rc.2
// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
// This component's `checkProps` which issues warnings to developers about properties
// when in development mode (similar to React's built in development tools)
// ### Children
var noop = function noop() {};

var itemIsSelectable = function itemIsSelectable(item) {
  return item.type !== 'header' && item.type !== 'divider' && !item.disabled;
};

var getNavigableItems = function getNavigableItems(items) {
  var navigableItems = [];
  navigableItems.indexes = [];
  navigableItems.keyBuffer = new _keyBuffer.default();

  if (Array.isArray(items)) {
    items.forEach(function (item, index) {
      if (itemIsSelectable(item)) {
        // eslint-disable-next-line fp/no-mutating-methods
        navigableItems.push({
          index: index,
          text: "".concat(item.label).toLowerCase()
        }); // eslint-disable-next-line fp/no-mutating-methods

        navigableItems.indexes.push(index);
      }
    });
  }

  return navigableItems;
};

function getMenuItem(menuItemId) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  var menuItem;

  if (menuItemId) {
    menuItem = context.getElementById(menuItemId);
  }

  return menuItem;
}

function getMenu(componentRef) {
  return _reactDom.default.findDOMNode(componentRef).querySelector('ul.dropdown__list'); // eslint-disable-line react/no-find-dom-node
}
/**
 * ** MenuPicklist is deprecated. Please use a read-only Combobox instead.**
 *
 * The MenuPicklist component is a variant of the Lightning Design System Menu component.
 */


var MenuPicklist = (0, _createReactClass.default)({
  // ### Display Name
  // Always use the canonical component name as the React display name.
  displayName: _constants.MENU_PICKLIST,
  // ### Prop Types
  propTypes: {
    /**
     * Callback that passes in the DOM reference of the `<button>` DOM node within this component. Primary use is to allow `focus` to be called. You should still test if the node exists, since rendering is asynchronous. `buttonRef={(component) => { if(component) console.log(component); }}`
     */
    buttonRef: _propTypes.default.func,
    className: _propTypes.default.string,

    /**
     * If true, renders checkmark icon on the selected Menu Item.
     */
    checkmark: _propTypes.default.bool,
    disabled: _propTypes.default.bool,

    /**
     * Message to display when the input is in an error state. When this is present, also visually highlights the component as in error.
     */
    errorText: _propTypes.default.string,

    /**
     * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
     */
    id: _propTypes.default.string,

    /**
     * Renders menu within the wrapping trigger as a sibling of the button. By default, you will have an absolutely positioned container at an elevated z-index.
     */
    isInline: _propTypes.default.bool,

    /**
     * Form element label
     */
    label: _propTypes.default.string,

    /**
     * **Text labels for internationalization**
     * This object is merged with the default props object on every render.
     * * `multipleOptionsSelected`: Text to be used when multiple items are selected. "2 Options Selected" is a good pattern to use.
     */
    labels: _propTypes.default.shape({
      multipleOptionsSelected: _propTypes.default.string
    }),

    /**
     * Custom element that overrides the default Menu Item component.
     */
    listItemRenderer: _propTypes.default.func,

    /**
     * Triggered when the trigger button is clicked to open.
     */
    onClick: _propTypes.default.func,

    /**
     * Triggered when an item is selected. Passes in the option object that has been selected and a data object in the format: `{ option, optionIndex }`. The first parameter may be deprecated in the future and changed to an event for consistency. Please use the data object.
     */
    onSelect: _propTypes.default.func,

    /**
     * Triggered when a pill is removed. Passes in the option object that has been removed and a data object in the format: `{ option, optionIndex }`. The first parameter may be deprecated in the future and changed to an event for consistency. Please use the data object.
     */
    onPillRemove: _propTypes.default.func,

    /**
     * Menu item data.
     */
    options: _propTypes.default.array.isRequired,

    /**
     * Text present in trigger button if no items are selected.
     */
    placeholder: _propTypes.default.string,

    /**
     * Add styling of a required form element.
     */
    required: _propTypes.default.bool,

    /**
     * Current selected item.
     */
    value: _propTypes.default.node,

    /**
     * Initial selected item index.
     */
    initValueIndex: _propTypes.default.number
  },
  getDefaultProps: function getDefaultProps() {
    return {
      inheritTargetWidth: true,
      placeholder: 'Select an Option',
      checkmark: true,
      labels: {
        multipleOptionsSelected: 'Multiple Options Selected'
      },
      menuPosition: 'absolute'
    };
  },
  getInitialState: function getInitialState() {
    return {
      focusedIndex: this.props.initValueIndex ? this.props.initValueIndex : -1,
      selectedIndex: this.props.initValueIndex ? this.props.initValueIndex : -1,
      selectedIndices: [],
      currentPillLabel: ''
    };
  },
  // eslint-disable-next-line camelcase, react/sort-comp
  UNSAFE_componentWillMount: function UNSAFE_componentWillMount() {
    // `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
    (0, _checkProps.default)(_constants.MENU_PICKLIST, this.props);
    this.generatedId = _shortid.default.generate();

    if (this.props.errorText) {
      this.generatedErrorId = _shortid.default.generate();
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('click', this.closeOnClick, false);
    }

    if (!this.props.multiple) {
      this.setState({
        selectedIndex: this.getIndexByValue(this.props)
      });
    } else {
      var currentSelectedIndex = this.getIndexByValue(this.props);
      var currentIndices = this.state.selectedIndices;

      if (currentSelectedIndex !== -1) {
        // eslint-disable-next-line fp/no-mutating-methods
        currentIndices.push(currentSelectedIndex);
      }

      this.setState({
        selectedIndices: currentIndices
      });
    }

    this.navigableItems = getNavigableItems(this.props.options);
  },
  // eslint-disable-next-line camelcase, react/sort-comp
  UNSAFE_componentWillReceiveProps: function UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value || this.props.options.length !== nextProps.length) {
      if (this.props.multiple !== true) {
        this.setState({
          selectedIndex: this.getIndexByValue(nextProps)
        });
      } else {
        var currentSelectedIndex = this.getIndexByValue(nextProps);

        if (currentSelectedIndex !== -1) {
          var currentIndices = this.state.selectedIndices.concat(currentSelectedIndex);
          this.setState({
            selectedIndices: currentIndices
          });
        }
      }
    }

    if (nextProps.options) {
      this.navigableItems = getNavigableItems(nextProps.options);
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    this.isUnmounting = true;
    window.removeEventListener('click', this.closeOnClick, false);
  },
  getListItemId: function getListItemId(index) {
    var menuItemId;

    if (index !== undefined) {
      var menuId = (0, _lodash.default)(this.getId) ? this.getId() : this.props.id;
      menuItemId = "".concat(menuId, "-item-").concat(index);
    }

    return menuItemId;
  },
  getId: function getId() {
    return this.props.id || this.generatedId;
  },
  getErrorId: function getErrorId() {
    return this.props['aria-describedby'] || this.generatedErrorId;
  },
  getClickEventName: function getClickEventName() {
    return "SLDS".concat(this.getId(), "ClickEvent");
  },
  getIndexByValue: function getIndexByValue() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props,
        value = _ref.value,
        options = _ref.options;

    var foundIndex = -1;

    if (options && options.length) {
      options.some(function (element, index) {
        if (element && element.value === value) {
          foundIndex = index;
          return true;
        }

        return false;
      });
    }

    return foundIndex;
  },
  getValueByIndex: function getValueByIndex(index) {
    return this.props.options[index];
  },
  getListItemRenderer: function getListItemRenderer() {
    return this.props.listItemRenderer ? this.props.listItemRenderer : _itemLabel.default;
  },
  setFocus: function setFocus() {
    if (!this.isUnmounting && this.button) {
      this.button.focus();
    }
  },
  handleSelect: function handleSelect(index) {
    if (!this.props.multiple) {
      this.setState({
        selectedIndex: index
      });
      this.handleClose();
      this.setFocus();
    } else {
      var currentIndices;

      if (this.state.selectedIndices.indexOf(index) === -1) {
        currentIndices = this.state.selectedIndices.concat(index);
      } else {
        var deselectIndex = this.state.selectedIndices.indexOf(index);
        currentIndices = this.state.selectedIndices; // eslint-disable-next-line fp/no-mutating-methods

        currentIndices.splice(deselectIndex, 1);
      }

      this.setState({
        selectedIndices: currentIndices
      });
    }

    if (this.props.onSelect) {
      var option = this.getValueByIndex(index);
      this.props.onSelect(option, {
        option: option,
        optionIndex: index
      });
    }
  },
  handleClose: function handleClose() {
    this.setState({
      isOpen: false
    });
  },
  handleClick: function handleClick(event) {
    if (event) {
      event.nativeEvent[this.getClickEventName()] = true;
    }

    if (!this.state.isOpen) {
      this.setState({
        isOpen: true
      });
      this.setFocus();

      if (this.props.onClick) {
        this.props.onClick(event);
      }
    } else {
      this.handleClose();
    }
  },
  handleMouseDown: function handleMouseDown(event) {
    if (event) {
      _event.default.trapImmediate(event);

      event.nativeEvent[this.getClickEventName()] = true;
    }
  },
  handleKeyDown: function handleKeyDown(event) {
    if (event.keyCode) {
      if (event.keyCode === _keyCode.default.ENTER || event.keyCode === _keyCode.default.SPACE || event.keyCode === _keyCode.default.DOWN || event.keyCode === _keyCode.default.UP) {
        _event.default.trap(event);
      }

      if (event.keyCode !== _keyCode.default.TAB) {
        // The outer div with onKeyDown is overriding button onClick so we need to add it here.
        var openMenuKeys = event.keyCode === _keyCode.default.ENTER || event.keyCode === _keyCode.default.DOWN || event.keyCode === _keyCode.default.UP;
        var isTrigger = event.target.tagName === 'BUTTON';

        if (openMenuKeys && isTrigger && this.props.onClick) {
          this.props.onClick(event);
        }

        this.handleKeyboardNavigate({
          isOpen: this.state.isOpen || false,
          keyCode: event.keyCode,
          onSelect: this.handleSelect,
          toggleOpen: this.toggleOpen
        });
      } else {
        this.handleCancel();
      }
    }
  },
  handleCancel: function handleCancel() {
    this.setFocus();
    this.handleClose();
  },
  // Handling open / close toggling is optional, and a default implementation is provided for handling focus, but selection _must_ be handled
  handleKeyboardNavigate: function handleKeyboardNavigate(_ref2) {
    var event = _ref2.event,
        _ref2$isOpen = _ref2.isOpen,
        isOpen = _ref2$isOpen === void 0 ? true : _ref2$isOpen,
        keyCode = _ref2.keyCode,
        _ref2$onFocus = _ref2.onFocus,
        onFocus = _ref2$onFocus === void 0 ? this.handleKeyboardFocus : _ref2$onFocus,
        onSelect = _ref2.onSelect,
        target = _ref2.target,
        _ref2$toggleOpen = _ref2.toggleOpen,
        toggleOpen = _ref2$toggleOpen === void 0 ? noop : _ref2$toggleOpen;
    (0, _keyboardNavigate.default)({
      componentContext: this,
      currentFocusedIndex: this.state.focusedIndex,
      event: event,
      isOpen: isOpen,
      keyCode: keyCode,
      navigableItems: this.navigableItems,
      onFocus: onFocus,
      onSelect: onSelect,
      target: target,
      toggleOpen: toggleOpen
    });
  },
  // This is a bit of an anti-pattern, but it has the upside of being a nice default. Component authors can always override to only set state and do their own focusing in their subcomponents.
  handleKeyboardFocus: function handleKeyboardFocus(focusedIndex) {
    if (this.state.focusedIndex !== focusedIndex) {
      this.setState({
        focusedIndex: focusedIndex
      });
    }

    var menu = (0, _lodash.default)(this.getMenu) ? this.getMenu() : getMenu(this);
    var menuItem = (0, _lodash.default)(this.getMenuItem) ? this.getMenuItem(focusedIndex, menu) : getMenuItem(this.getListItemId(focusedIndex));

    if (menuItem) {
      this.focusMenuItem(menuItem);
      this.scrollToMenuItem(menu, menuItem);
    }
  },
  focusMenuItem: function focusMenuItem(menuItem) {
    menuItem.getElementsByTagName('a')[0].focus();
  },
  scrollToMenuItem: function scrollToMenuItem(menu, menuItem) {
    if (menu && menuItem) {
      var menuHeight = menu.offsetHeight;
      var menuTop = menu.scrollTop;
      var menuItemTop = menuItem.offsetTop - menu.offsetTop;

      if (menuItemTop < menuTop) {
        menu.scrollTop = menuItemTop;
      } else {
        var menuBottom = menuTop + menuHeight + menu.offsetTop;
        var menuItemBottom = menuItemTop + menuItem.offsetHeight + menu.offsetTop;

        if (menuItemBottom > menuBottom) {
          menu.scrollTop = menuItemBottom - menuHeight - menu.offsetTop;
        }
      }
    }
  },
  closeOnClick: function closeOnClick(event) {
    if (!event[this.getClickEventName()] && this.state.isOpen) {
      this.handleClose();
    }
  },
  toggleOpen: function toggleOpen() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  },
  saveRefToList: function saveRefToList(list) {
    this.list = list;
  },
  saveRefToListItem: function saveRefToListItem(listItem, index) {
    if (!this.listItems) {
      this.listItems = {};
    }

    this.listItems[index] = listItem;

    if (index === this.state.focusedIndex) {
      this.handleKeyboardFocus(this.state.focusedIndex);
    }
  },
  // Trigger opens, closes, and recieves focus on close
  saveRefToTrigger: function saveRefToTrigger(trigger) {
    this.button = trigger;

    if (this.props.buttonRef) {
      this.props.buttonRef(this.button);
    }

    if (!this.state.triggerRendered) {
      this.setState({
        triggerRendered: true
      });
    }
  },
  renderMenuContent: function renderMenuContent() {
    return /*#__PURE__*/_react.default.createElement(_menuList.default, {
      checkmark: this.props.checkmark,
      getListItemId: this.getListItemId,
      itemRefs: this.saveRefToListItem,
      itemRenderer: this.getListItemRenderer(),
      onCancel: this.handleCancel,
      onSelect: this.handleSelect,
      options: this.props.options,
      ref: this.saveRefToList,
      selectedIndex: !this.props.multiple ? this.state.selectedIndex : undefined,
      selectedIndices: this.props.multiple ? this.state.selectedIndices : undefined,
      triggerId: this.getId()
    });
  },
  renderInlineMenu: function renderInlineMenu() {
    return !this.props.disabled && this.state.isOpen ? /*#__PURE__*/_react.default.createElement("div", {
      className: "slds-dropdown slds-dropdown_left" // inline style override
      ,
      style: {
        maxHeight: '20em',
        overflowX: 'hidden',
        minWidth: '100%'
      }
    }, this.renderMenuContent()) : null;
  },
  renderDialog: function renderDialog() {
    var _this = this;

    return !this.props.disabled && this.state.isOpen ? /*#__PURE__*/_react.default.createElement(_dialog.default, {
      closeOnTabKey: true,
      constrainToScrollParent: this.props.constrainToScrollParent,
      contentsClassName: "slds-dropdown slds-dropdown_left",
      context: this.context,
      flippable: true,
      onClose: this.handleCancel,
      onKeyDown: this.handleKeyDown,
      onRequestTargetElement: function onRequestTargetElement() {
        return _this.button;
      },
      inheritWidthOf: this.props.inheritTargetWidth ? 'target' : 'none',
      position: this.props.menuPosition
    }, this.renderMenuContent()) : null;
  },
  renderTrigger: function renderTrigger() {
    var isInline;
    /* eslint-disable react/prop-types */

    if (this.props.isInline) {
      isInline = true;
    } else if (this.props.modal !== undefined) {
      isInline = !this.props.modal;
    }
    /* eslint-enable react/prop-types */


    var inputValue;

    if (this.props.multiple && this.state.selectedIndices.length === 0) {
      inputValue = this.props.placeholder;
    } else if (this.props.multiple && this.state.selectedIndices.length === 1) {
      var option = this.props.options[this.state.selectedIndices];
      inputValue = option.label;
    } else if (this.props.multiple && this.state.selectedIndices.length > 1) {
      inputValue = this.props.labels.multipleOptionsSelected;
    } else {
      var _option = this.props.options[this.state.selectedIndex];
      inputValue = _option && _option.label ? _option.label : this.props.placeholder;
    } // TODO: make use of <Button>


    return (
      /*#__PURE__*/
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      _react.default.createElement("div", {
        className: (0, _classnames.default)('slds-picklist slds-dropdown-trigger slds-dropdown-trigger_click', {
          'slds-is-open': this.state.isOpen
        }, this.props.className),
        onKeyDown: this.handleKeyDown,
        onMouseDown: this.handleMouseDown
      }, /*#__PURE__*/_react.default.createElement("button", {
        "aria-describedby": this.getErrorId(),
        "aria-expanded": this.state.isOpen,
        "aria-haspopup": "true",
        className: "slds-button slds-button_neutral slds-picklist__label",
        disabled: this.props.disabled,
        id: this.getId(),
        onClick: !this.props.disabled ? this.handleClick : undefined,
        ref: this.saveRefToTrigger,
        tabIndex: this.state.isOpen ? -1 : 0,
        type: "button"
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-truncate"
      }, inputValue), /*#__PURE__*/_react.default.createElement(_icon.default, {
        name: "down",
        category: "utility"
      })), isInline ? this.renderInlineMenu() : this.renderDialog())
    );
  },
  renderPills: function renderPills() {
    var _this2 = this;

    var selectedPills = this.state.selectedIndices.map(function (selectedPill) {
      var pillLabel = _this2.getValueByIndex(selectedPill).label;

      return /*#__PURE__*/_react.default.createElement("li", {
        className: "slds-listbox__item",
        key: "pill-".concat(selectedPill),
        role: "presentation"
      }, /*#__PURE__*/_react.default.createElement(_pill.default, {
        eventData: {
          item: _this2.props.options[selectedPill],
          index: selectedPill
        },
        events: {
          onRequestFocus: function onRequestFocus() {},
          onRequestFocusOnNextPill: function onRequestFocusOnNextPill() {},
          onRequestFocusOnPreviousPill: function onRequestFocusOnPreviousPill() {},
          onRequestRemove: function onRequestRemove(event, data) {
            var newData = _this2.state.selectedIndices;
            var index = data.index; // eslint-disable-next-line fp/no-mutating-methods

            newData.splice(_this2.state.selectedIndices.indexOf(index), 1);

            _this2.setState({
              selectedIndices: newData
            });

            if (_this2.props.onPillRemove) {
              var option = _this2.getValueByIndex(index);

              _this2.props.onPillRemove(option, {
                option: option,
                optionIndex: index
              });
            }
          }
        },
        labels: {
          label: pillLabel
        }
      }));
    });
    return /*#__PURE__*/_react.default.createElement("div", {
      id: "listbox-selections-unique-id",
      orientation: "horizontal",
      role: "listbox"
    }, /*#__PURE__*/_react.default.createElement("ul", {
      className: "slds-listbox slds-listbox_inline slds-p-top_xxx-small",
      role: "group",
      "aria-label": "Selected Options:"
    }, selectedPills));
  },
  render: function render() {
    var _this$props = this.props,
        className = _this$props.className,
        errorText = _this$props.errorText,
        label = _this$props.label,
        required = _this$props.required;
    var requiredElem = required ?
    /*#__PURE__*/
    // eslint-disable-next-line react/jsx-curly-brace-presence
    _react.default.createElement("span", {
      style: {
        color: 'red'
      }
    }, '* ') : null;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)('slds-form-element', {
        'slds-has-error': errorText
      }, className)
    }, this.props.label ? /*#__PURE__*/_react.default.createElement("label", {
      className: "slds-form-element__label",
      htmlFor: this.getId() // inline style override
      ,
      style: {
        width: '100%'
      }
    }, requiredElem, label) : null, this.renderTrigger(), this.renderPills(), errorText && /*#__PURE__*/_react.default.createElement("div", {
      id: this.getErrorId(),
      className: "slds-form-element__help"
    }, errorText));
  }
});
MenuPicklist.contextType = _iconSettings.IconSettingsContext;
var _default = MenuPicklist;
exports.default = _default;