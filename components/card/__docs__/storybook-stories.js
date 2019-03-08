"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _shortid = require("shortid");

var _shortid2 = _interopRequireDefault(_shortid);

var _react3 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _iconSettings = require("../../icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _constants = require("../../../utilities/constants");

var _button = require("../../button");

var _button2 = _interopRequireDefault(_button);

var _card = require("../../card");

var _card2 = _interopRequireDefault(_card);

var _empty = require("../../card/empty");

var _empty2 = _interopRequireDefault(_empty);

var _filter = require("../../card/filter");

var _filter2 = _interopRequireDefault(_filter);

var _dataTable = require("../../data-table");

var _dataTable2 = _interopRequireDefault(_dataTable);

var _column = require("../../data-table/column");

var _column2 = _interopRequireDefault(_column);

var _highlightCell = require("../../data-table/highlight-cell");

var _highlightCell2 = _interopRequireDefault(_highlightCell);

var _icon = require("../../icon");

var _icon2 = _interopRequireDefault(_icon);

var _mediaObject = require("../../media-object");

var _mediaObject2 = _interopRequireDefault(_mediaObject);

var _inline = require("../../forms/input/inline");

var _inline2 = _interopRequireDefault(_inline);

var _relatedListWithTable = require("../__examples__/related-list-with-table");

var _relatedListWithTable2 = _interopRequireDefault(_relatedListWithTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var sampleItems = [{
  id: '0',
  name: 'Cloudhub'
}, {
  id: '1',
  name: 'Cloudhub + Anypoint Connectors'
}, {
  id: '2',
  name: 'Cloud City'
}];
var currentId = 3;

var DemoCard =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DemoCard, _React$Component);

  function DemoCard() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, DemoCard);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = DemoCard.__proto__ || Object.getPrototypeOf(DemoCard)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        filter: null,
        items: _this.props.items
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleFilterChange", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        for (var _len2 = arguments.length, rest = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          rest[_key2 - 1] = arguments[_key2];
        }

        (0, _addonActions.action)('filter').apply(void 0, [event].concat(rest));
        var filter = event.target.value !== '' ? RegExp(event.target.value, 'i') : null;

        _this.setState({
          filter: filter
        });
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleDeleteAllItems", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        (0, _addonActions.action)('delete all').apply(void 0, arguments);

        _this.setState({
          filter: null,
          items: []
        });
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleAddItem", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        (0, _addonActions.action)('add').apply(void 0, arguments);

        _this.setState({
          items: [{
            id: currentId++,
            name: "New item #".concat(_shortid2.default.generate())
          }].concat(_toConsumableArray(_this.state.items))
        });
      }
    }), _temp));
  }

  _createClass(DemoCard, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var items = this.state.items;

      if (this.state.filter) {
        items = items.filter(function (item) {
          return _this2.state.filter.test(item.name);
        });
      }

      var isEmpty = items.length === 0;
      var heading = this.props.heading;

      if (!this.props.heading) {
        heading = items.length > 0 ? "Related Items (".concat(items.length, ")") : 'Related Items';
      }

      return _react2.default.createElement("div", {
        className: "slds-grid slds-grid_vertical"
      }, _react2.default.createElement(_card2.default, {
        id: "ExampleCard",
        filter: !isEmpty || this.state.filter ? _react2.default.createElement(_filter2.default, {
          onChange: this.handleFilterChange
        }) : null,
        header: this.props.header,
        headerActions: !isEmpty ? _react2.default.createElement(_button2.default, {
          label: "Delete All Items",
          onClick: this.handleDeleteAllItems
        }) : _react2.default.createElement(_button2.default, {
          label: "New",
          onClick: this.handleAddItem
        }),
        footer: "Card Footer",
        heading: heading,
        icon: _react2.default.createElement(_icon2.default, {
          category: "standard",
          name: "document",
          size: "small"
        }),
        empty: isEmpty ? _react2.default.createElement(_empty2.default, {
          heading: "No Related Items"
        }) : null
      }, _react2.default.createElement(_dataTable2.default, {
        id: "SLDSDataTableExample-1",
        items: items
      }, _react2.default.createElement(_column2.default, {
        label: "Opportunity Name",
        property: "name",
        truncate: true
      }, _react2.default.createElement(_highlightCell2.default, {
        search: this.state.filter
      })))));
    }
  }]);

  return DemoCard;
}(_react2.default.Component);

Object.defineProperty(DemoCard, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'DemoCard'
});
Object.defineProperty(DemoCard, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    items: _propTypes2.default.array,
    header: _propTypes2.default.node,
    heading: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string])
  }
});

var SetHeightCard = function SetHeightCard() {
  return _react2.default.createElement(_card2.default, {
    bodyClassName: "slds-grow slds-scrollable_y",
    className: "slds-grid slds-grid_vertical",
    footer: _react2.default.createElement("a", {
      href: "javascript:void(0);"
    }, "Footer text") // eslint-disable-line no-script-url
    ,
    heading: "Card with set height",
    icon: _react2.default.createElement(_icon2.default, {
      category: "standard",
      name: "document",
      size: "small"
    }),
    style: {
      height: '300px'
    }
  }, _react2.default.createElement("div", {
    className: "slds-card__body_inner"
  }, _react2.default.createElement("div", null, "asdf"), _react2.default.createElement("div", null, "asdf"), _react2.default.createElement("div", null, "asdf"), _react2.default.createElement("div", null, "asdf"), _react2.default.createElement("div", null, "asdf"), _react2.default.createElement("div", null, "asdf"), _react2.default.createElement("div", null, "asdf"), _react2.default.createElement("div", null, "asdf"), _react2.default.createElement("div", null, "asdf"), _react2.default.createElement("div", null, "asdf"), _react2.default.createElement("div", null, "asdf"), _react2.default.createElement("div", null, "asdf"), _react2.default.createElement("div", null, "asdf")));
};

SetHeightCard.displayName = 'SET_HEIGHT_CARD';
(0, _react3.storiesOf)(_constants.CARD, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around_medium"
  }, _react2.default.createElement(_iconSettings2.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('w/ Items', function () {
  return _react2.default.createElement(DemoCard, {
    items: sampleItems
  });
}).add('Empty', function () {
  return _react2.default.createElement(DemoCard, {
    items: []
  });
}).add('Custom Header', function () {
  return _react2.default.createElement(DemoCard, {
    header: _react2.default.createElement(_mediaObject2.default, {
      body: _react2.default.createElement(_inline2.default, {
        className: "slds-text-heading_small slds-truncate",
        name: "inline-edit-standard",
        value: "Write your own heading",
        id: "inline-edit-standard"
      })
    }),
    items: sampleItems
  });
}).add('Custom Heading', function () {
  return _react2.default.createElement(DemoCard, {
    items: sampleItems,
    heading: _react2.default.createElement("span", {
      style: {
        color: 'red'
      }
    }, "To Wanda! This is custom!")
  });
}).add('Set height card', function () {
  return _react2.default.createElement(SetHeightCard, null);
}).add('Doc site Related List With Table', function () {
  return _react2.default.createElement(_relatedListWithTable2.default, null);
});