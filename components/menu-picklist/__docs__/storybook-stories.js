"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _iconSettings = _interopRequireDefault(require("../../icon-settings"));

var _constants = require("../../../utilities/constants");

var _menuPicklist = _interopRequireDefault(require("../../menu-picklist"));

var _base = _interopRequireDefault(require("../__examples__/base"));

var _snapshotDefault = _interopRequireDefault(require("../__examples__/snapshot-default"));

var _tooltipListItem = _interopRequireDefault(require("../__examples__/tooltip-list-item"));

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
  return _react.default.createElement("div", null, _react.default.createElement(_menuPicklist.default, props), _react.default.createElement("button", {
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
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, MultipleExample);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MultipleExample)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      selectedIndexes: new Set()
    });

    _defineProperty(_assertThisInitialized(_this), "handleSelect", function (selectedItem, data) {
      _this.setState(function (prevState, props) {
        return {
          selectedItems: prevState.selectedIndexes.has(data.optionIndex) ? Array.from(prevState.selectedIndexes.delete(data.optionIndex)) : Array.from(prevState.selectedIndexes.add(data.optionIndex))
        };
      });
    });

    return _this;
  }

  _createClass(MultipleExample, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      console.log(this.state.selectedIndexes);
      return _react.default.createElement(_menuPicklist.default, {
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
}(_react.default.Component);

_defineProperty(MultipleExample, "displayName", 'MultiplePicklistExample');

(0, _react2.storiesOf)(_constants.MENU_PICKLIST, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, _react.default.createElement(_iconSettings.default, {
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
  return _react.default.createElement(MultipleExample, null);
}).add('Docs site Base', function () {
  return _react.default.createElement(_base.default, null);
}).add('Docs site SnapshotDefault', function () {
  return _react.default.createElement(_snapshotDefault.default, null);
}).add('Docs site TooltipListItem', function () {
  return _react.default.createElement(_tooltipListItem.default, null);
});