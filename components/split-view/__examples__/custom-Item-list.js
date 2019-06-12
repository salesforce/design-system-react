"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _iconSettings = _interopRequireDefault(require("../../../../components/icon-settings"));

var _index = _interopRequireDefault(require("../../../../components/split-view/index"));

var _header = _interopRequireDefault(require("../../../../components/split-view/header"));

var _listbox = _interopRequireDefault(require("../../../../components/split-view/listbox"));

var _icon = _interopRequireDefault(require("../../../../components/icon"));

var _button = _interopRequireDefault(require("../../../../components/button"));

var _menuDropdown = _interopRequireDefault(require("../../../../components/menu-dropdown"));

var _buttonTrigger = _interopRequireDefault(require("../../../../components/menu-dropdown/button-trigger"));

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

var SORT_OPTIONS = {
  UP: 'up',
  DOWN: 'down'
};
var listOptions = [{
  id: '001',
  name: 'Riley Shultz',
  ranking: '99',
  company: 'Biotech, Inc.',
  status: 'Nurturing'
}, {
  id: '002',
  name: 'Jason A. - VP of Sales',
  ranking: '92',
  company: 'Case Management Solutions',
  status: 'Contacted'
}, {
  id: '003',
  name: 'Josh Smith',
  ranking: '90',
  company: 'Acme, Inc.',
  status: 'Contacted'
}, {
  id: '004',
  name: 'Bobby Tree',
  ranking: '89',
  company: 'Salesforce, Inc.',
  status: 'Closing'
}, {
  id: '005',
  name: 'Riley Shultz',
  ranking: '74',
  company: 'Tesla',
  status: 'Contacted'
}];

var headerNavRight = _react.default.createElement("div", null, _react.default.createElement(_menuDropdown.default, {
  id: "header-nav-right-more",
  align: "right",
  assistiveText: {
    icon: 'More Options'
  },
  iconCategory: "utility",
  iconName: "down",
  iconVariant: "border-filled",
  options: [{
    label: 'Menu Item One',
    value: 'A0'
  }, {
    label: 'Menu Item Two',
    value: 'B0'
  }]
}));

var headerContentRight = _react.default.createElement("div", null, _react.default.createElement(_menuDropdown.default, {
  id: "header-right-refresh",
  buttonClassName: "slds-m-right_xx-small",
  assistiveText: {
    icon: 'Checkmark with right icon'
  },
  buttonVariant: "icon",
  checkmark: true,
  iconCategory: "utility",
  iconName: "side_list",
  iconSize: "large",
  iconVariant: "more",
  align: "right",
  onSelect: function onSelect(value) {
    console.log('selected: ', value);
  },
  options: [{
    label: 'Display As',
    type: 'header'
  }, {
    label: 'Table View',
    value: 'A0',
    rightIcon: {
      category: 'utility',
      name: 'table'
    }
  }, {
    label: 'List View',
    value: 'B0',
    rightIcon: {
      category: 'utility',
      name: 'side_list'
    }
  }],
  value: "B0"
}), _react.default.createElement(_button.default, {
  assistiveText: {
    icon: 'Refresh'
  },
  iconCategory: "utility",
  iconName: "refresh",
  iconVariant: "border",
  variant: "icon"
}));

var headerTitle = _react.default.createElement("div", {
  className: "slds-media__body"
}, _react.default.createElement("h1", {
  className: "slds-text-heading_small slds-text-color_default slds-p-right_x-small"
}, _react.default.createElement(_menuDropdown.default, {
  id: "header-title-leads",
  options: [{
    label: 'Menu Item One',
    value: 'A0'
  }, {
    label: 'Menu Item Two',
    value: 'B0'
  }, {
    label: 'Menu Item Three',
    value: 'C0'
  }, {
    type: 'divider'
  }, {
    label: 'Menu Item Four',
    value: 'D0'
  }]
}, _react.default.createElement(_buttonTrigger.default, null, _react.default.createElement(_button.default, {
  className: "slds-button_reset slds-type-focus",
  iconCategory: "utility",
  iconName: "down",
  iconPosition: "right",
  label: "My Leads",
  responsive: true,
  variant: "base"
})))));
/**
 * Custom list item
 * @param props
 */


var CustomListItem = function CustomListItem(props) {
  return _react.default.createElement("div", null, _react.default.createElement(_icon.default, {
    category: "action",
    name: props.item.status === 'Contacted' ? 'check' : 'call',
    size: "x-small"
  }), _react.default.createElement("span", {
    className: "slds-text-heading_small slds-m-left_medium"
  }, props.item.name));
};

CustomListItem.propsTypes = {
  item: _propTypes.default.shape({
    status: _propTypes.default.string,
    name: _propTypes.default.string
  })
};
CustomListItem.displayName = 'CustomListItem';

var Example =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Example, _React$Component);

  function Example(props) {
    var _this;

    _classCallCheck(this, Example);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Example).call(this, props));
    _this.state = {
      options: listOptions,
      selected: [listOptions[listOptions.length - 2]],
      unread: [listOptions[0], listOptions[2]],
      sortDirection: SORT_OPTIONS.DOWN
    };
    _this.sortList = _this.sortList.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Example, [{
    key: "sortList",
    value: function sortList() {
      var sortDirection = this.state.sortDirection === SORT_OPTIONS.DOWN ? SORT_OPTIONS.UP : SORT_OPTIONS.DOWN;
      this.setState({
        options: this.state.options.sort(function (a, b) {
          return sortDirection === SORT_OPTIONS.DOWN ? a.name > b.name : b.name > a.name;
        }),
        sortDirection: sortDirection
      });
    } // For multiple elements you need to pass an array in order for the scrolling to in the SplitViewList to work.
    // React also requires a key prop on each items [React Lists and Keys](https://reactjs.org/docs/lists-and-keys.html#keys).

  }, {
    key: "masterView",
    value: function masterView() {
      var _this2 = this;

      return [_react.default.createElement(_header.default, {
        key: "1",
        contentRight: headerContentRight,
        navRight: headerNavRight,
        iconAssistiveText: "User",
        iconCategory: "standard",
        iconName: "lead",
        info: "42 items \u2022 Updated just now",
        title: headerTitle,
        truncate: true,
        variant: "objectHome"
      }), _react.default.createElement(_listbox.default, {
        key: "2",
        labels: {
          header: 'Lead Score'
        },
        sortDirection: this.state.sortDirection,
        options: this.state.options,
        events: {
          onSort: this.sortList,
          onSelect: function onSelect(event, _ref) {
            var selectedItems = _ref.selectedItems,
                item = _ref.item;

            _this2.setState({
              unread: _this2.state.unread.filter(function (i) {
                return i !== item;
              }),
              selected: selectedItems
            });
          }
        },
        selection: this.state.selected,
        unread: this.state.unread,
        listItem: CustomListItem
      })];
    }
  }, {
    key: "detailView",
    value: function detailView() {
      return this.state.selected.length ? this.state.selected.map(function (item) {
        return _react.default.createElement("dl", {
          key: item.id,
          className: "slds-box slds-m-left_medium slds-m-bottom_medium slds-list_horizontal slds-wrap"
        }, _react.default.createElement("dt", {
          className: "slds-item_label slds-text-color_weak slds-truncate",
          title: "Name"
        }, "Name:"), _react.default.createElement("dd", {
          className: "slds-item_detail slds-truncate",
          title: item.name
        }, item.name), _react.default.createElement("dt", {
          className: "slds-item_label slds-text-color_weak slds-truncate",
          title: "Value"
        }, "Value:"), _react.default.createElement("dd", {
          className: "slds-item_detail slds-truncate",
          title: item.ranking
        }, item.ranking), _react.default.createElement("dt", {
          className: "slds-item_label slds-text-color_weak slds-truncate",
          title: "Company"
        }, "Company:"), _react.default.createElement("dd", {
          className: "slds-item_detail slds-truncate",
          title: item.company
        }, item.company), _react.default.createElement("dt", {
          className: "slds-item_label slds-text-color_weak slds-truncate",
          title: "Status"
        }, "Status:"), _react.default.createElement("dd", {
          className: "slds-item_detail slds-truncate",
          title: item.status
        }, item.status));
      }) : _react.default.createElement("div", null);
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement(_iconSettings.default, {
        iconPath: "/assets/icons"
      }, _react.default.createElement("div", {
        style: {
          height: '90vh'
        }
      }, _react.default.createElement(_index.default, {
        id: "custom-example",
        master: this.masterView(),
        detail: this.detailView()
      })));
    }
  }]);

  return Example;
}(_react.default.Component);

Example.displayName = 'SplitViewCustomListItem';
var _default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime

exports.default = _default;