"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _iconSettings = require("../../icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _constants = require("../../../utilities/constants");

var _modal = require("../../modal");

var _modal2 = _interopRequireDefault(_modal);

var _combobox = require("../../combobox/");

var _combobox2 = _interopRequireDefault(_combobox);

var _timePicker = require("../../time-picker");

var _timePicker2 = _interopRequireDefault(_timePicker);

var _datePicker = require("../../date-picker");

var _datePicker2 = _interopRequireDefault(_datePicker);

var _button = require("../../button");

var _button2 = _interopRequireDefault(_button);

var _base = require("../../combobox/__examples__/base");

var _base2 = _interopRequireDefault(_base);

var _modalCustomParentNode = require("../__examples__/modal-custom-parent-node");

var _modalCustomParentNode2 = _interopRequireDefault(_modalCustomParentNode);

var _SLDSSettings = require("../../SLDSSettings");

var _SLDSSettings2 = _interopRequireDefault(_SLDSSettings);

var _headerFooter = require("../__examples__/header-footer");

var _headerFooter2 = _interopRequireDefault(_headerFooter);

var _menuContents = require("../__examples__/menu-contents");

var _menuContents2 = _interopRequireDefault(_menuContents);

var _prompt = require("../__examples__/prompt");

var _prompt2 = _interopRequireDefault(_prompt);

var _sizes = require("../__examples__/sizes");

var _sizes2 = _interopRequireDefault(_sizes);

var _taglines = require("../__examples__/taglines");

var _taglines2 = _interopRequireDefault(_taglines);

var _executionEnvironment = require("../../../utilities/execution-environment");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/display-name */
// used by Modal component
if (_executionEnvironment.canUseDOM && document.querySelector('#root')) {
  _SLDSSettings2.default.setAppElement('#root');
} else {
  _SLDSSettings2.default.setAppElement(document.createElement('div'));
}

var getModal = function getModal(props) {
  return _react2.default.createElement(_modal2.default, props);
};

var modalFooter = [_react2.default.createElement(_button2.default, {
  key: "modalBCancel",
  label: "Cancel"
}), _react2.default.createElement(_button2.default, {
  key: "modalBSave",
  label: "Save",
  variant: "brand"
})];
var leadSourceTypes = [{
  id: 1,
  label: 'Third Party Program',
  value: 'A0'
}, {
  id: 2,
  label: 'Cold Call',
  value: 'B0'
}, {
  id: 3,
  label: 'LinkedIn',
  value: 'C0'
}, {
  id: 4,
  label: 'Direct Mail',
  value: 'D0'
}, {
  id: 5,
  label: 'Other',
  value: 'E0'
}];

var modalContent = _react2.default.createElement("section", {
  className: "slds-p-around_large"
}, _react2.default.createElement("div", {
  className: "slds-form-element slds-m-bottom_large"
}, _react2.default.createElement("label", {
  className: "slds-form-element__label",
  htmlFor: "opptyName"
}, "Opportunity Name"), _react2.default.createElement("div", {
  className: "slds-form-element__control"
}, _react2.default.createElement("input", {
  id: "opptyName",
  className: "slds-input",
  type: "text",
  placeholder: "Enter name"
}))), _react2.default.createElement("div", {
  className: "slds-form-element slds-m-bottom_large"
}, _react2.default.createElement("label", {
  className: "slds-form-element__label",
  htmlFor: "description"
}, "Opportunity Description"), _react2.default.createElement("div", {
  className: "slds-form-element__control"
}, _react2.default.createElement("textarea", {
  id: "description",
  className: "slds-textarea",
  placeholder: "Enter description"
}))), _react2.default.createElement("div", {
  className: "slds-form-element slds-m-vertical_large"
}, _react2.default.createElement("label", {
  className: "slds-form-element__label",
  htmlFor: "amount"
}, "Amount"), _react2.default.createElement("div", {
  className: "slds-form-element__control"
}, _react2.default.createElement("input", {
  id: "amount",
  className: "slds-input",
  type: "text",
  placeholder: "Enter Amount"
}))), _react2.default.createElement("div", {
  className: "slds-form-element slds-m-vertical_large"
}, _react2.default.createElement("label", {
  className: "slds-form-element__label",
  htmlFor: "amount"
}, "Amount"), _react2.default.createElement("div", {
  className: "slds-form-element__control"
}, _react2.default.createElement("input", {
  id: "amount",
  className: "slds-input",
  type: "text",
  placeholder: "Enter Amount"
}))), _react2.default.createElement("div", {
  className: "slds-m-bottom_large"
}, _react2.default.createElement(_datePicker2.default, {
  onDateChange: function onDateChange() {
    (0, _addonActions.action)('date is selected');
  }
})), _react2.default.createElement("div", {
  className: "slds-form-element slds-m-bottom_large"
}, _react2.default.createElement(_base2.default, null)), _react2.default.createElement("div", {
  className: "slds-m-bottom_large"
}, _react2.default.createElement(_combobox2.default, {
  events: {
    onSelect: function onSelect(event, data) {
      return (0, _addonActions.action)('selected: ', data.selection[0].label);
    }
  },
  labels: {
    label: 'Lead Source',
    placeholder: 'Select Lead Source'
  },
  menuPosition: "relative",
  options: leadSourceTypes,
  selection: [leadSourceTypes[1]],
  variant: "readonly"
})), _react2.default.createElement("div", {
  className: "slds-m-bottom_large"
}, _react2.default.createElement(_timePicker2.default, {
  onDateChange: function onDateChange() {
    (0, _addonActions.action)('time is selected');
  }
})), _react2.default.createElement("div", {
  className: "slds-form-element slds-m-vertical_large"
}, _react2.default.createElement("label", {
  className: "slds-form-element__label",
  htmlFor: "amount"
}, "Amount"), _react2.default.createElement("div", {
  className: "slds-form-element__control"
}, _react2.default.createElement("input", {
  id: "amount",
  className: "slds-input",
  type: "text",
  placeholder: "Enter Amount"
}))), _react2.default.createElement("div", {
  className: "slds-form-element slds-m-vertical_large"
}, _react2.default.createElement("label", {
  className: "slds-form-element__label",
  htmlFor: "amount"
}, "Amount"), _react2.default.createElement("div", {
  className: "slds-form-element__control"
}, _react2.default.createElement("input", {
  id: "amount",
  className: "slds-input",
  type: "text",
  placeholder: "Enter Amount"
}))), _react2.default.createElement("div", {
  className: "slds-form-element slds-m-vertical_large"
}, _react2.default.createElement("label", {
  className: "slds-form-element__label",
  htmlFor: "amount"
}, "Amount"), _react2.default.createElement("div", {
  className: "slds-form-element__control"
}, _react2.default.createElement("input", {
  id: "amount",
  className: "slds-input",
  type: "text",
  placeholder: "Enter Amount"
}))), _react2.default.createElement("div", {
  className: "slds-form-element slds-m-vertical_large"
}, _react2.default.createElement("label", {
  className: "slds-form-element__label",
  htmlFor: "amount"
}, "Amount"), _react2.default.createElement("div", {
  className: "slds-form-element__control"
}, _react2.default.createElement("input", {
  id: "amount",
  className: "slds-input",
  type: "text",
  placeholder: "Enter Amount"
}))), _react2.default.createElement("div", {
  className: "slds-form-element slds-m-vertical_large"
}, _react2.default.createElement("label", {
  className: "slds-form-element__label",
  htmlFor: "amount"
}, "Amount"), _react2.default.createElement("div", {
  className: "slds-form-element__control"
}, _react2.default.createElement("input", {
  id: "amount",
  className: "slds-input",
  type: "text",
  placeholder: "Enter Amount"
}))));

(0, _react3.storiesOf)(_constants.MODAL, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around_medium"
  }, _react2.default.createElement(_iconSettings2.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Modal with Custom Parent Node', function () {
  return _react2.default.createElement(_modalCustomParentNode2.default, null);
}).add('Small', function () {
  return getModal({
    assistiveText: {
      closeButton: 'Exit'
    },
    isOpen: true,
    tagline: 'Enter in details below',
    title: 'New Opportunity',
    children: modalContent,
    onRequestClose: (0, _addonActions.action)('modal closed'),
    portalClassName: 'portal-class-name-test'
  });
}).add('Small with footer, not dismissible', function () {
  return getModal({
    dismissible: false,
    isOpen: true,
    tagline: 'Enter in details below',
    title: 'New Opportunity',
    children: modalContent,
    onRequestClose: (0, _addonActions.action)('modal closed'),
    footer: modalFooter
  });
}).add('Small with custom footer', function () {
  return getModal({
    directional: true,
    isOpen: true,
    tagline: 'Enter in details below',
    title: 'New Opportunity',
    children: modalContent,
    onRequestClose: (0, _addonActions.action)('modal closed'),
    footer: _react2.default.createElement("div", null, _react2.default.createElement(_button2.default, {
      label: "cancel"
    }), " and some random text in here", ' ', _react2.default.createElement(_button2.default, {
      label: "update"
    }), _react2.default.createElement(_button2.default, {
      label: "run"
    }))
  });
}).add('Small no header', function () {
  return getModal({
    isOpen: true,
    children: modalContent,
    onRequestClose: (0, _addonActions.action)('modal closed'),
    portalClassName: 'portal-class-name-test'
  });
}).add('Large with directional footer', function () {
  return getModal({
    directional: true,
    isOpen: true,
    tagline: 'Enter in details below',
    title: 'New Opportunity',
    children: modalContent,
    onRequestClose: (0, _addonActions.action)('modal closed'),
    footer: modalFooter,
    size: 'large'
  });
}).add('Prompt', function () {
  return getModal({
    isOpen: true,
    title: 'Delete state - Default',
    children: _react2.default.createElement("div", {
      className: "slds-p-around_medium"
    }, "Are you sure you want to delete the Default State? This action cannot be undone. Are you sure you want to delete the Default State? This action cannot be undone. Are you sure you want to delete the Default State? This action cannot be undone.", ' ', _react2.default.createElement(_button2.default, {
      className: "slds-m-around_medium"
    }, "Ok, got it!")),
    // eslint-disable-line max-len
    prompt: 'error',
    onRequestClose: (0, _addonActions.action)('modal closed')
  });
}).add('Docs site HeaderFooter', function () {
  return _react2.default.createElement(_headerFooter2.default, null);
}).add('Docs site MenuContents', function () {
  return _react2.default.createElement(_menuContents2.default, null);
}).add('Docs site Prompt', function () {
  return _react2.default.createElement(_prompt2.default, null);
}).add('Docs site Sizes', function () {
  return _react2.default.createElement(_sizes2.default, null);
}).add('Docs site Taglines', function () {
  return _react2.default.createElement(_taglines2.default, null);
});