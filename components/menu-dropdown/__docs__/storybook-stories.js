"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _react3 = require("@storybook/react");

var _iconSettings = require("../../icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _constants = require("../../../utilities/constants");

var _menuDropdown = require("../../menu-dropdown");

var _menuDropdown2 = _interopRequireDefault(_menuDropdown);

var _menuDropdown3 = require("../../menu-dropdown/menu-dropdown");

var _menuList = require("../../utilities/menu-list");

var _menuList2 = _interopRequireDefault(_menuList);

var _button = require("../../button");

var _button2 = _interopRequireDefault(_button);

var _buttonTrigger = require("../../menu-dropdown/button-trigger");

var _buttonTrigger2 = _interopRequireDefault(_buttonTrigger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  return _react2.default.createElement(_menuDropdown2.default, _extends({}, props, {
    onClose: (0, _react3.action)('Closed'),
    onOpen: (0, _react3.action)('Opened')
  }));
};

var DropdownControlled = (0, _createReactClass2.default)({
  displayName: 'DropdownControlled',
  getInitialState: function getInitialState() {
    return {
      forcedState: undefined,
      menuOptions: options
    };
  },
  handleButtonClickReset: function handleButtonClickReset() {
    this.setState({
      forcedState: undefined
    });
  },
  handleOpen: function handleOpen() {
    (0, _react3.action)('Force Open').apply(void 0, arguments);
    this.setState({
      forcedState: true
    });
  },
  handleClose: function handleClose() {
    (0, _react3.action)('Force Closed').apply(void 0, arguments);
    this.setState({
      forcedState: false
    });
  },
  toggleDisabledOption: function toggleDisabledOption() {
    this.setState(function (prevState, props) {
      prevState.menuOptions.splice(1, 1, {
        disabled: false,
        label: 'An option that is Super Super Long',
        value: 'A0'
      });
      return {
        options: prevState.menuOptions
      };
    });
  },
  render: function render() {
    return _react2.default.createElement("div", {
      className: "slds-grid"
    }, _react2.default.createElement("div", {
      className: "slds-col"
    }, _react2.default.createElement(_menuDropdown2.default, _extends({}, this.props, {
      modal: false,
      isOpen: this.state.forcedState,
      onClose: (0, _react3.action)('Attempt Close'),
      onOpen: (0, _react3.action)('Attempt Open'),
      options: this.state.menuOptions
    }))), _react2.default.createElement("div", {
      className: "slds-col"
    }, _react2.default.createElement(_button2.default, {
      label: "Force Open Dropdown",
      onClick: this.handleOpen
    }), _react2.default.createElement(_button2.default, {
      label: "Force Close Dropdown",
      onClick: this.handleClose
    }), _react2.default.createElement(_button2.default, {
      label: "Reset Dropdown",
      onClick: this.handleButtonClickReset
    }), _react2.default.createElement(_button2.default, {
      label: "Toggle Option A disabled",
      onClick: this.toggleDisabledOption
    })));
  }
});

var getDropdownPositioned = function getDropdownPositioned(props) {
  var positionedDropdowns = [];

  _menuDropdown3.DropdownNubbinPositions.forEach(function (position) {
    positionedDropdowns.push(_react2.default.createElement("div", {
      className: "slds-col slds-size--1-of-3",
      style: {
        minHeight: '500px'
      }
    }, _react2.default.createElement(_menuDropdown2.default, _extends({}, props, {
      isOpen: true,
      nubbinPosition: position,
      onClose: (0, _react3.action)('Closed'),
      onOpen: (0, _react3.action)('Opened')
    }), _react2.default.createElement(_buttonTrigger2.default, null, _react2.default.createElement(_button2.default, {
      iconVariant: "container",
      iconCategory: "utility",
      iconName: "settings",
      label: position
    })))));
  });

  return _react2.default.createElement("div", null, _react2.default.createElement("div", {
    className: "slds-grid slds-wrap"
  }, positionedDropdowns), _react2.default.createElement("div", {
    className: "slds-col",
    style: {
      minHeight: '500px'
    }
  }, _react2.default.createElement(_menuDropdown2.default, _extends({}, props, {
    nubbinPosition: "top right",
    onClose: (0, _react3.action)('Closed'),
    onOpen: (0, _react3.action)('Opened')
  }), _react2.default.createElement(_buttonTrigger2.default, null, _react2.default.createElement(_button2.default, {
    iconVariant: "container",
    iconCategory: "utility",
    iconName: "settings",
    assistiveText: {
      icon: 'top right'
    }
  })))));
};

var getDropdownCustomTrigger = function getDropdownCustomTrigger(props) {
  return _react2.default.createElement(_menuDropdown2.default, _extends({}, props, {
    onClose: (0, _react3.action)('Closed'),
    onOpen: (0, _react3.action)('Opened')
  }), _react2.default.createElement(_buttonTrigger2.default, null, _react2.default.createElement(_button2.default, {
    iconCategory: "utility",
    iconName: "settings"
  })));
};
/* eslint-disable react/prop-types */

/* eslint-disable no-script-url */


var DropdownCustomContent = function DropdownCustomContent(props) {
  return _react2.default.createElement("div", {
    id: "custom-dropdown-menu-content"
  }, _react2.default.createElement("div", {
    className: "slds-m-around--medium"
  }, _react2.default.createElement("div", {
    className: "slds-tile slds-tile--board slds-m-horizontal--small"
  }, _react2.default.createElement("p", {
    className: "tile__title slds-text-heading--small"
  }, "Art Vandelay"), _react2.default.createElement("div", {
    className: "slds-tile__detail"
  }, _react2.default.createElement("p", {
    className: "slds-truncate"
  }, _react2.default.createElement("a", {
    className: "slds-m-right--medium",
    href: "javascript:void(0)",
    onClick: props.onClick
  }, "Settings"), _react2.default.createElement("a", {
    href: "javascript:void(0)",
    onClick: props.onClick
  }, "Log Out"))))));
};

var getDropdownCustomContent = function getDropdownCustomContent(props) {
  return _react2.default.createElement(_menuDropdown2.default, _extends({}, props, {
    onClose: (0, _react3.action)('Closed'),
    onOpen: (0, _react3.action)('Opened')
  }), _react2.default.createElement(DropdownCustomContent, null), _react2.default.createElement(_menuList2.default, {
    options: [{
      label: 'Custom Content Option'
    }].concat(options)
  }));
};

(0, _react3.storiesOf)(_constants.MENU_DROPDOWN, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around--medium slds-text-align--center"
  }, _react2.default.createElement(_iconSettings2.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Base', function () {
  return getDropdown({
    align: 'right',
    label: 'Dropdown Click',
    onClick: function onClick() {
      (0, _react3.action)('Clicked').apply(void 0, arguments);
    },
    onSelect: function onSelect() {
      (0, _react3.action)('Selected').apply(void 0, arguments);
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
      (0, _react3.action)('Clicked').apply(void 0, arguments);
    },
    onSelect: function onSelect() {
      (0, _react3.action)('Selected').apply(void 0, arguments);
    },
    options: options
  });
}).add('Render inline', function () {
  return getDropdown({
    align: 'right',
    label: 'Dropdown Click',
    menuPosition: 'relative',
    onClick: function onClick() {
      (0, _react3.action)('Clicked').apply(void 0, arguments);
    },
    onSelect: function onSelect() {
      (0, _react3.action)('Selected').apply(void 0, arguments);
    },
    options: options
  });
}).add('Render inline w/ Nubbins', function () {
  return getDropdownPositioned({
    menuPosition: 'relative',
    onSelect: function onSelect() {
      (0, _react3.action)('Selected').apply(void 0, arguments);
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
      (0, _react3.action)('Selected').apply(void 0, arguments);
    },
    options: options
  });
}).add('Custom Content', function () {
  return getDropdownCustomContent({
    label: 'Custom Content Dropdown Click',
    onSelect: function onSelect() {
      (0, _react3.action)('Selected').apply(void 0, arguments);
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
      (0, _react3.action)('Selected').apply(void 0, arguments);
    },
    openOn: 'hover',
    options: options
  });
}).add('Two Hovers', function () {
  return _react2.default.createElement("div", null, getDropdown({
    assistiveText: {
      icon: 'Icon More large'
    },
    buttonVariant: 'icon',
    iconCategory: 'utility',
    iconName: 'settings',
    iconVariant: 'more',
    onSelect: function onSelect() {
      (0, _react3.action)('Selected').apply(void 0, arguments);
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
      (0, _react3.action)('Selected').apply(void 0, arguments);
    },
    openOn: 'hover',
    options: options
  }));
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
    onMouseEnter: (0, _react3.action)('Mouse enter'),
    onMouseLeave: (0, _react3.action)('Mouse leave'),
    onSelect: function onSelect() {
      (0, _react3.action)('Selected').apply(void 0, arguments);
    },
    openOn: 'hover',
    options: options,
    value: 'C0'
  });
}).add('Controled w/ isOpen', function () {
  return _react2.default.createElement(DropdownControlled, {
    align: "right",
    label: "Dropdown Click",
    options: options
  });
});