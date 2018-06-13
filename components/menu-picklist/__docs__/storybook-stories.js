"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _react3 = require("@storybook/react");

var _iconSettings = require("../../icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _constants = require("../../../utilities/constants");

var _menuPicklist = require("../../menu-picklist");

var _menuPicklist2 = _interopRequireDefault(_menuPicklist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable indent */

/* eslint-disable react/display-name */
var options = [{
  label: 'An option that is Super Super Long',
  value: 'A0'
}, {
  label: 'Another option',
  value: 'B0'
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

var getPicklist = function getPicklist(props) {
  return _react2.default.createElement("div", null, _react2.default.createElement(_menuPicklist2.default, props), _react2.default.createElement("button", {
    style: {
      padding: '10px',
      margin: '50px'
    }
  }, "test"));
};

var MultipleExample = (0, _createReactClass2.default)({
  displayName: 'MultiplePicklistExample',
  getInitialState: function getInitialState() {
    return {
      selectedIndexes: new Set()
    };
  },
  handleSelect: function handleSelect(selectedItem, data) {
    this.setState(function (prevState, props) {
      return {
        selectedItems: prevState.selectedIndexes.has(data.optionIndex) ? Array.from(prevState.selectedIndexes.delete(data.optionIndex)) : Array.from(prevState.selectedIndexes.add(data.optionIndex))
      };
    });
  },
  render: function render() {
    var _this = this;

    console.log(this.state.selectedIndexes);
    return _react2.default.createElement(_menuPicklist2.default, {
      label: "Contacts",
      labels: {
        multipleOptionsSelected: "".concat(this.state.selectedIndexes.size, " Contacts Selected")
      },
      multiple: true,
      onSelect: this.handleSelect,
      options: options,
      onPillRemove: function onPillRemove(removedItem, data) {
        console.log("data.option.label: '".concat(data.option.label, "' data.option.value: '").concat(data.option.value, "'"));

        _this.handleSelect(removedItem, data);
      }
    });
  }
});
(0, _react3.storiesOf)(_constants.MENU_PICKLIST, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around--medium"
  }, _react2.default.createElement(_iconSettings2.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Modal', function () {
  return getPicklist({
    label: 'Contacts',
    placeholder: 'Select a contact',
    onSelect: function onSelect() {
      (0, _react3.action)('Selected').apply(void 0, arguments);
    },
    options: options
  });
}).add('Non-modal', function () {
  return getPicklist({
    label: 'Contacts',
    isInline: true,
    onClick: function onClick(event) {
      console.log('clicked', event.target);
    },
    placeholder: 'Select a contact',
    onSelect: function onSelect() {
      (0, _react3.action)('Selected').apply(void 0, arguments);
    },
    options: options
  });
}).add('Error state', function () {
  return getPicklist({
    errorText: 'This field is required',
    label: 'Contacts',
    placeholder: 'Select a contact',
    onSelect: function onSelect() {
      (0, _react3.action)('Selected').apply(void 0, arguments);
    },
    options: options,
    required: true
  });
}).add('Multiselect', function () {
  return _react2.default.createElement(MultipleExample, null);
});