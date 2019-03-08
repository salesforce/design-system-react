"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _iconSettings = require("../../icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _constants = require("../../../utilities/constants");

var _menuPicklist = require("../../menu-picklist");

var _menuPicklist2 = _interopRequireDefault(_menuPicklist);

var _base = require("../__examples__/base");

var _base2 = _interopRequireDefault(_base);

var _snapshotDefault = require("../__examples__/snapshot-default");

var _snapshotDefault2 = _interopRequireDefault(_snapshotDefault);

var _tooltipListItem = require("../__examples__/tooltip-list-item");

var _tooltipListItem2 = _interopRequireDefault(_tooltipListItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

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

var MultipleExample =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MultipleExample, _React$Component);

  function MultipleExample() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, MultipleExample);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = MultipleExample.__proto__ || Object.getPrototypeOf(MultipleExample)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        selectedIndexes: new Set()
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleSelect", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(selectedItem, data) {
        _this.setState(function (prevState, props) {
          return {
            selectedItems: prevState.selectedIndexes.has(data.optionIndex) ? Array.from(prevState.selectedIndexes.delete(data.optionIndex)) : Array.from(prevState.selectedIndexes.add(data.optionIndex))
          };
        });
      }
    }), _temp));
  }

  _createClass(MultipleExample, [{
    key: "render",
    value: function render() {
      var _this2 = this;

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

          _this2.handleSelect(removedItem, data);
        }
      });
    }
  }]);

  return MultipleExample;
}(_react2.default.Component);

Object.defineProperty(MultipleExample, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'MultiplePicklistExample'
});
(0, _react3.storiesOf)(_constants.MENU_PICKLIST, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around_medium"
  }, _react2.default.createElement(_iconSettings2.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Modal', function () {
  return getPicklist({
    label: 'Contacts',
    placeholder: 'Select a contact',
    onSelect: function onSelect() {
      (0, _addonActions.action)('Selected').apply(void 0, arguments);
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
      (0, _addonActions.action)('Selected').apply(void 0, arguments);
    },
    options: options
  });
}).add('Error state', function () {
  return getPicklist({
    errorText: 'This field is required',
    label: 'Contacts',
    placeholder: 'Select a contact',
    onSelect: function onSelect() {
      (0, _addonActions.action)('Selected').apply(void 0, arguments);
    },
    options: options,
    required: true
  });
}).add('Multiselect', function () {
  return _react2.default.createElement(MultipleExample, null);
}).add('Docs site Base', function () {
  return _react2.default.createElement(_base2.default, null);
}).add('Docs site SnapshotDefault', function () {
  return _react2.default.createElement(_snapshotDefault2.default, null);
}).add('Docs site TooltipListItem', function () {
  return _react2.default.createElement(_tooltipListItem2.default, null);
});