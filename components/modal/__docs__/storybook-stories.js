"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _iconSettings = _interopRequireDefault(require("../../icon-settings"));

var _constants = require("../../../utilities/constants");

var _modal = _interopRequireDefault(require("../../modal"));

var _combobox = _interopRequireDefault(require("../../combobox/"));

var _timePicker = _interopRequireDefault(require("../../time-picker"));

var _datePicker = _interopRequireDefault(require("../../date-picker"));

var _button = _interopRequireDefault(require("../../button"));

var _base = _interopRequireDefault(require("../../combobox/__examples__/base"));

var _modalCustomParentNode = _interopRequireDefault(require("../__examples__/modal-custom-parent-node"));

var _SLDSSettings = _interopRequireDefault(require("../../SLDSSettings"));

var _headerFooter = _interopRequireDefault(require("../__examples__/header-footer"));

var _menuContents = _interopRequireDefault(require("../__examples__/menu-contents"));

var _prompt = _interopRequireDefault(require("../__examples__/prompt"));

var _sizes = _interopRequireDefault(require("../__examples__/sizes"));

var _taglines = _interopRequireDefault(require("../__examples__/taglines"));

var _executionEnvironment = require("../../../utilities/execution-environment");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/display-name */
// used by Modal component
if (_executionEnvironment.canUseDOM && document.querySelector('#root')) {
  _SLDSSettings.default.setAppElement('#root');
} else {
  _SLDSSettings.default.setAppElement(document.createElement('div'));
}

var getModal = function getModal(props) {
  return _react.default.createElement(_modal.default, props);
};

var modalFooter = [_react.default.createElement(_button.default, {
  key: "modalBCancel",
  label: "Cancel"
}), _react.default.createElement(_button.default, {
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

var modalContent = _react.default.createElement("section", {
  className: "slds-p-around_large"
}, _react.default.createElement("div", {
  className: "slds-form-element slds-m-bottom_large"
}, _react.default.createElement("label", {
  className: "slds-form-element__label",
  htmlFor: "opptyName"
}, "Opportunity Name"), _react.default.createElement("div", {
  className: "slds-form-element__control"
}, _react.default.createElement("input", {
  id: "opptyName",
  className: "slds-input",
  type: "text",
  placeholder: "Enter name"
}))), _react.default.createElement("div", {
  className: "slds-form-element slds-m-bottom_large"
}, _react.default.createElement("label", {
  className: "slds-form-element__label",
  htmlFor: "description"
}, "Opportunity Description"), _react.default.createElement("div", {
  className: "slds-form-element__control"
}, _react.default.createElement("textarea", {
  id: "description",
  className: "slds-textarea",
  placeholder: "Enter description"
}))), _react.default.createElement("div", {
  className: "slds-form-element slds-m-vertical_large"
}, _react.default.createElement("label", {
  className: "slds-form-element__label",
  htmlFor: "amount"
}, "Amount"), _react.default.createElement("div", {
  className: "slds-form-element__control"
}, _react.default.createElement("input", {
  id: "amount",
  className: "slds-input",
  type: "text",
  placeholder: "Enter Amount"
}))), _react.default.createElement("div", {
  className: "slds-form-element slds-m-vertical_large"
}, _react.default.createElement("label", {
  className: "slds-form-element__label",
  htmlFor: "amount"
}, "Amount"), _react.default.createElement("div", {
  className: "slds-form-element__control"
}, _react.default.createElement("input", {
  id: "amount",
  className: "slds-input",
  type: "text",
  placeholder: "Enter Amount"
}))), _react.default.createElement("div", {
  className: "slds-m-bottom_large"
}, _react.default.createElement(_datePicker.default, {
  onDateChange: function onDateChange() {
    (0, _addonActions.action)('date is selected');
  }
})), _react.default.createElement("div", {
  className: "slds-form-element slds-m-bottom_large"
}, _react.default.createElement(_base.default, null)), _react.default.createElement("div", {
  className: "slds-m-bottom_large"
}, _react.default.createElement(_combobox.default, {
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
})), _react.default.createElement("div", {
  className: "slds-m-bottom_large"
}, _react.default.createElement(_timePicker.default, {
  onDateChange: function onDateChange() {
    (0, _addonActions.action)('time is selected');
  }
})), _react.default.createElement("div", {
  className: "slds-form-element slds-m-vertical_large"
}, _react.default.createElement("label", {
  className: "slds-form-element__label",
  htmlFor: "amount"
}, "Amount"), _react.default.createElement("div", {
  className: "slds-form-element__control"
}, _react.default.createElement("input", {
  id: "amount",
  className: "slds-input",
  type: "text",
  placeholder: "Enter Amount"
}))), _react.default.createElement("div", {
  className: "slds-form-element slds-m-vertical_large"
}, _react.default.createElement("label", {
  className: "slds-form-element__label",
  htmlFor: "amount"
}, "Amount"), _react.default.createElement("div", {
  className: "slds-form-element__control"
}, _react.default.createElement("input", {
  id: "amount",
  className: "slds-input",
  type: "text",
  placeholder: "Enter Amount"
}))), _react.default.createElement("div", {
  className: "slds-form-element slds-m-vertical_large"
}, _react.default.createElement("label", {
  className: "slds-form-element__label",
  htmlFor: "amount"
}, "Amount"), _react.default.createElement("div", {
  className: "slds-form-element__control"
}, _react.default.createElement("input", {
  id: "amount",
  className: "slds-input",
  type: "text",
  placeholder: "Enter Amount"
}))), _react.default.createElement("div", {
  className: "slds-form-element slds-m-vertical_large"
}, _react.default.createElement("label", {
  className: "slds-form-element__label",
  htmlFor: "amount"
}, "Amount"), _react.default.createElement("div", {
  className: "slds-form-element__control"
}, _react.default.createElement("input", {
  id: "amount",
  className: "slds-input",
  type: "text",
  placeholder: "Enter Amount"
}))), _react.default.createElement("div", {
  className: "slds-form-element slds-m-vertical_large"
}, _react.default.createElement("label", {
  className: "slds-form-element__label",
  htmlFor: "amount"
}, "Amount"), _react.default.createElement("div", {
  className: "slds-form-element__control"
}, _react.default.createElement("input", {
  id: "amount",
  className: "slds-input",
  type: "text",
  placeholder: "Enter Amount"
}))));

(0, _react2.storiesOf)(_constants.MODAL, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, _react.default.createElement(_iconSettings.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Modal with Custom Parent Node', function () {
  return _react.default.createElement(_modalCustomParentNode.default, null);
}).add('Small', function () {
  return getModal({
    assistiveText: {
      closeButton: 'Exit'
    },
    isOpen: true,
    tagline: 'Enter in details below',
    heading: 'New Opportunity',
    children: modalContent,
    onRequestClose: (0, _addonActions.action)('modal closed'),
    portalClassName: 'portal-class-name-test'
  });
}).add('Small with footer, not dismissible', function () {
  return getModal({
    disableClose: true,
    isOpen: true,
    tagline: 'Enter in details below',
    heading: 'New Opportunity',
    children: modalContent,
    onRequestClose: (0, _addonActions.action)('modal closed'),
    footer: modalFooter
  });
}).add('Small with custom footer', function () {
  return getModal({
    directional: true,
    isOpen: true,
    tagline: 'Enter in details below',
    heading: 'New Opportunity',
    children: modalContent,
    onRequestClose: (0, _addonActions.action)('modal closed'),
    footer: _react.default.createElement("div", null, _react.default.createElement(_button.default, {
      label: "cancel"
    }), " and some random text in here", ' ', _react.default.createElement(_button.default, {
      label: "update"
    }), _react.default.createElement(_button.default, {
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
}).add('Small no header and custom footer', function () {
  return getModal({
    isOpen: true,
    children: modalContent,
    onRequestClose: (0, _addonActions.action)('modal closed'),
    portalClassName: 'portal-class-name-test',
    footer: modalFooter
  });
}).add('Large with directional footer', function () {
  return getModal({
    directional: true,
    isOpen: true,
    tagline: 'Enter in details below',
    heading: 'New Opportunity',
    children: modalContent,
    onRequestClose: (0, _addonActions.action)('modal closed'),
    footer: modalFooter,
    size: 'large'
  });
}).add('Prompt', function () {
  return getModal({
    isOpen: true,
    heading: 'Delete state - Default',
    children: _react.default.createElement("div", {
      className: "slds-p-around_medium"
    }, "Are you sure you want to delete the Default State? This action cannot be undone. Are you sure you want to delete the Default State? This action cannot be undone. Are you sure you want to delete the Default State? This action cannot be undone.", ' ', _react.default.createElement(_button.default, {
      className: "slds-m-around_medium"
    }, "Ok, got it!")),
    // eslint-disable-line max-len
    prompt: 'error',
    onRequestClose: (0, _addonActions.action)('modal closed')
  });
}).add('Docs site HeaderFooter', function () {
  return _react.default.createElement(_headerFooter.default, null);
}).add('Docs site MenuContents', function () {
  return _react.default.createElement(_menuContents.default, null);
}).add('Docs site Prompt', function () {
  return _react.default.createElement(_prompt.default, null);
}).add('Docs site Sizes', function () {
  return _react.default.createElement(_sizes.default, null);
}).add('Docs site Taglines', function () {
  return _react.default.createElement(_taglines.default, null);
});