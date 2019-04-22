"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _iconSettings = _interopRequireDefault(require("../../icon-settings"));

var _constants = require("../../../utilities/constants");

var _menuDropdown = _interopRequireDefault(require("../../menu-dropdown"));

var _menuDropdown2 = require("../../menu-dropdown/menu-dropdown");

var _menuList = _interopRequireDefault(require("../../utilities/menu-list"));

var _button = _interopRequireDefault(require("../../button"));

var _buttonTrigger = _interopRequireDefault(require("../../menu-dropdown/button-trigger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var options = [{
  className: 'custom-li-class',
  divider: 'bottom',
  label: 'A Header',
  type: 'header'
}, {
  disabled: true,
  label: 'An option that is Super Super Long',
  value: 'A0'
}, {
  label: 'Custom Class',
  className: 'custom-item-class',
  value: 'classssss'
}, {
  href: 'http://sfdc.co/',
  id: 'custom-li-id',
  label: 'Has a value',
  leftIcon: {
    name: 'settings',
    category: 'utility'
  },
  rightIcon: {
    name: 'settings',
    category: 'utility'
  },
  type: 'item',
  value: 'B0'
}, {
  type: 'divider'
}, {
  label: 'C Option',
  value: 'C0'
}, {
  label: 'D Option',
  value: 'D0'
}, {
  label: 'E Option',
  value: 'E0'
}, {
  label: 'A1 Option',
  value: 'A1'
}, {
  label: 'B2 Option',
  value: 'B1'
}, {
  label: 'C2 Option',
  value: 'C1'
}, {
  label: 'D2 Option',
  value: 'D1'
}, {
  label: 'E2 Option Super Super Long',
  value: 'E1'
}];

var getDropdown = function getDropdown(props) {
  return _react.default.createElement(_menuDropdown.default, _extends({}, props, {
    onClose: (0, _addonActions.action)('Closed'),
    onOpen: (0, _addonActions.action)('Opened')
  }));
};

var DropdownControlled =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DropdownControlled, _React$Component);

  function DropdownControlled() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DropdownControlled);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DropdownControlled)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      forcedState: undefined,
      menuOptions: options
    });

    _defineProperty(_assertThisInitialized(_this), "handleButtonClickReset", function () {
      _this.setState({
        forcedState: undefined
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleOpen", function () {
      (0, _addonActions.action)('Force Open').apply(void 0, arguments);

      _this.setState({
        forcedState: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleClose", function () {
      (0, _addonActions.action)('Force Closed').apply(void 0, arguments);

      _this.setState({
        forcedState: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "toggleDisabledOption", function () {
      _this.setState(function (prevState, props) {
        prevState.menuOptions.splice(1, 1, {
          disabled: false,
          label: 'An option that is Super Super Long',
          value: 'A0'
        });
        return {
          options: prevState.menuOptions
        };
      });
    });

    return _this;
  }

  _createClass(DropdownControlled, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        className: "slds-grid"
      }, _react.default.createElement("div", {
        className: "slds-col"
      }, _react.default.createElement(_menuDropdown.default, _extends({}, this.props, {
        modal: false,
        isOpen: this.state.forcedState,
        onClose: (0, _addonActions.action)('Attempt Close'),
        onOpen: (0, _addonActions.action)('Attempt Open'),
        options: this.state.menuOptions
      }))), _react.default.createElement("div", {
        className: "slds-col"
      }, _react.default.createElement(_button.default, {
        label: "Force Open Dropdown",
        onClick: this.handleOpen
      }), _react.default.createElement(_button.default, {
        label: "Force Close Dropdown",
        onClick: this.handleClose
      }), _react.default.createElement(_button.default, {
        label: "Reset Dropdown",
        onClick: this.handleButtonClickReset
      }), _react.default.createElement(_button.default, {
        label: "Toggle Option A disabled",
        onClick: this.toggleDisabledOption
      })));
    }
  }]);

  return DropdownControlled;
}(_react.default.Component);

_defineProperty(DropdownControlled, "displayName", 'DropdownControlled');

var getDropdownPositioned = function getDropdownPositioned(props) {
  var positionedDropdowns = [];

  _menuDropdown2.DropdownNubbinPositions.forEach(function (position) {
    positionedDropdowns.push(_react.default.createElement("div", {
      className: "slds-col slds-size_1-of-3",
      style: {
        minHeight: '500px'
      }
    }, _react.default.createElement(_menuDropdown.default, _extends({}, props, {
      isOpen: true,
      nubbinPosition: position,
      onClose: (0, _addonActions.action)('Closed'),
      onOpen: (0, _addonActions.action)('Opened')
    }), _react.default.createElement(_buttonTrigger.default, null, _react.default.createElement(_button.default, {
      iconVariant: "container",
      iconCategory: "utility",
      iconName: "settings",
      label: position
    })))));
  });

  return _react.default.createElement("div", null, _react.default.createElement("div", {
    className: "slds-grid slds-wrap"
  }, positionedDropdowns), _react.default.createElement("div", {
    className: "slds-col",
    style: {
      minHeight: '500px'
    }
  }, _react.default.createElement(_menuDropdown.default, _extends({}, props, {
    nubbinPosition: "top right",
    onClose: (0, _addonActions.action)('Closed'),
    onOpen: (0, _addonActions.action)('Opened')
  }), _react.default.createElement(_buttonTrigger.default, null, _react.default.createElement(_button.default, {
    iconVariant: "container",
    iconCategory: "utility",
    iconName: "settings",
    assistiveText: {
      icon: 'top right'
    }
  })))));
};

var getDropdownCustomTrigger = function getDropdownCustomTrigger(props) {
  return _react.default.createElement(_menuDropdown.default, _extends({}, props, {
    onClose: (0, _addonActions.action)('Closed'),
    onOpen: (0, _addonActions.action)('Opened')
  }), _react.default.createElement(_buttonTrigger.default, null, _react.default.createElement(_button.default, {
    iconCategory: "utility",
    iconName: "settings"
  })));
};
/* eslint-disable react/prop-types */

/* eslint-disable no-script-url */


var DropdownCustomContent = function DropdownCustomContent(props) {
  return _react.default.createElement("div", {
    id: "custom-dropdown-menu-content"
  }, _react.default.createElement("div", {
    className: "slds-m-around_medium"
  }, _react.default.createElement("div", {
    className: "slds-tile slds-tile_board slds-m-horizontal_small"
  }, _react.default.createElement("p", {
    className: "tile__title slds-text-heading_small"
  }, "Art Vandelay"), _react.default.createElement("div", {
    className: "slds-tile__detail"
  }, _react.default.createElement("p", {
    className: "slds-truncate"
  }, _react.default.createElement("a", {
    className: "slds-m-right_medium",
    href: "javascript:void(0)",
    onClick: props.onClick
  }, "Settings"), _react.default.createElement("a", {
    href: "javascript:void(0)",
    onClick: props.onClick
  }, "Log Out"))))));
};

var getDropdownCustomContent = function getDropdownCustomContent(props) {
  return _react.default.createElement(_menuDropdown.default, _extends({}, props, {
    onClose: (0, _addonActions.action)('Closed'),
    onOpen: (0, _addonActions.action)('Opened')
  }), _react.default.createElement(DropdownCustomContent, null), _react.default.createElement(_menuList.default, {
    options: [{
      label: 'Custom Content Option'
    }].concat(options)
  }));
};

(0, _react2.storiesOf)(_constants.MENU_DROPDOWN, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium slds-text-align_center"
  }, _react.default.createElement(_iconSettings.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Base', function () {
  return getDropdown({
    align: 'right',
    label: 'Dropdown Click',
    onClick: function onClick() {
      (0, _addonActions.action)('Clicked').apply(void 0, arguments);
    },
    onSelect: function onSelect() {
      (0, _addonActions.action)('Selected').apply(void 0, arguments);
    },
    options: options
  });
}).add('Base with icon', function () {
  return getDropdown({
    align: 'right',
    label: 'Dropdown Click',
    iconCategory: 'utility',
    iconName: 'down',
    iconPosition: 'right',
    onClick: function onClick() {
      (0, _addonActions.action)('Clicked').apply(void 0, arguments);
    },
    onSelect: function onSelect() {
      (0, _addonActions.action)('Selected').apply(void 0, arguments);
    },
    options: options
  });
}).add('Render inline', function () {
  return getDropdown({
    align: 'right',
    label: 'Dropdown Click',
    menuPosition: 'relative',
    onClick: function onClick() {
      (0, _addonActions.action)('Clicked').apply(void 0, arguments);
    },
    onSelect: function onSelect() {
      (0, _addonActions.action)('Selected').apply(void 0, arguments);
    },
    options: options
  });
}).add('Render inline w/ Nubbins', function () {
  return getDropdownPositioned({
    menuPosition: 'relative',
    onSelect: function onSelect() {
      (0, _addonActions.action)('Selected').apply(void 0, arguments);
    },
    options: options
  });
}).add('Custom Trigger', function () {
  return getDropdownCustomTrigger({
    tabIndex: '-1',
    assistiveText: {
      icon: 'Custom Dropdown Trigger'
    },
    onSelect: function onSelect() {
      (0, _addonActions.action)('Selected').apply(void 0, arguments);
    },
    options: options
  });
}).add('Custom Content', function () {
  return getDropdownCustomContent({
    label: 'Custom Content Dropdown Click',
    onSelect: function onSelect() {
      (0, _addonActions.action)('Selected').apply(void 0, arguments);
    },
    options: options
  });
}).add('Hover', function () {
  return getDropdown({
    assistiveText: {
      icon: 'Icon More large'
    },
    buttonVariant: 'icon',
    iconCategory: 'utility',
    iconName: 'settings',
    iconVariant: 'more',
    onSelect: function onSelect() {
      (0, _addonActions.action)('Selected').apply(void 0, arguments);
    },
    openOn: 'hover',
    options: options
  });
}).add('Two Hovers', function () {
  return _react.default.createElement("div", null, getDropdown({
    assistiveText: {
      icon: 'Icon More large'
    },
    buttonVariant: 'icon',
    iconCategory: 'utility',
    iconName: 'settings',
    iconVariant: 'more',
    onSelect: function onSelect() {
      (0, _addonActions.action)('Selected').apply(void 0, arguments);
    },
    openOn: 'hover',
    options: options
  }), ' ', getDropdown({
    assistiveText: {
      icon: 'Icon More large'
    },
    buttonVariant: 'icon',
    iconCategory: 'utility',
    iconName: 'settings',
    iconVariant: 'more',
    onSelect: function onSelect() {
      (0, _addonActions.action)('Selected').apply(void 0, arguments);
    },
    openOn: 'hover',
    options: options
  }));
}).add('Checkmark', function () {
  return getDropdown({
    assistiveText: {
      icon: 'More Options'
    },
    buttonVariant: 'icon',
    checkmark: true,
    iconCategory: 'utility',
    iconName: 'down',
    iconVariant: 'border-filled',
    onSelect: function onSelect() {
      (0, _addonActions.action)('Selected').apply(void 0, arguments);
    },
    options: options,
    value: 'C0'
  });
}).add('Hover with Checkmark', function () {
  return getDropdown({
    assistiveText: {
      icon: 'More Options'
    },
    buttonVariant: 'icon',
    checkmark: true,
    iconCategory: 'utility',
    iconName: 'down',
    iconVariant: 'border-filled',
    onMouseEnter: (0, _addonActions.action)('Mouse enter'),
    onMouseLeave: (0, _addonActions.action)('Mouse leave'),
    onSelect: function onSelect() {
      (0, _addonActions.action)('Selected').apply(void 0, arguments);
    },
    openOn: 'hover',
    options: options,
    value: 'C0'
  });
}).add('Controled w/ isOpen', function () {
  return _react.default.createElement(DropdownControlled, {
    align: "right",
    label: "Dropdown Click",
    options: options
  });
});