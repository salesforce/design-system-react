"use strict";

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _shortid = _interopRequireDefault(require("shortid"));

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _iconSettings = _interopRequireDefault(require("../../icon-settings"));

var _constants = require("../../../utilities/constants");

var _button = _interopRequireDefault(require("../../button"));

var _card = _interopRequireDefault(require("../../card"));

var _empty = _interopRequireDefault(require("../../card/empty"));

var _filter = _interopRequireDefault(require("../../card/filter"));

var _dataTable = _interopRequireDefault(require("../../data-table"));

var _column = _interopRequireDefault(require("../../data-table/column"));

var _highlightCell = _interopRequireDefault(require("../../data-table/highlight-cell"));

var _icon = _interopRequireDefault(require("../../icon"));

var _mediaObject = _interopRequireDefault(require("../../media-object"));

var _inline = _interopRequireDefault(require("../../forms/input/inline"));

var _relatedListWithTable = _interopRequireDefault(require("../__examples__/related-list-with-table"));

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

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DemoCard);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DemoCard)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      filter: null,
      items: _this.props.items
    });

    _defineProperty(_assertThisInitialized(_this), "handleFilterChange", function (event) {
      for (var _len2 = arguments.length, rest = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        rest[_key2 - 1] = arguments[_key2];
      }

      (0, _addonActions.action)('filter').apply(void 0, [event].concat(rest));
      var filter = event.target.value !== '' ? RegExp(event.target.value, 'i') : null;

      _this.setState({
        filter: filter
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleDeleteAllItems", function () {
      (0, _addonActions.action)('delete all').apply(void 0, arguments);

      _this.setState({
        filter: null,
        items: []
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleAddItem", function () {
      (0, _addonActions.action)('add').apply(void 0, arguments);

      _this.setState({
        items: [{
          id: currentId++,
          name: "New item #".concat(_shortid.default.generate())
        }].concat(_toConsumableArray(_this.state.items))
      });
    });

    return _this;
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

      return _react.default.createElement("div", {
        className: "slds-grid slds-grid_vertical"
      }, _react.default.createElement(_card.default, {
        id: "ExampleCard",
        filter: !isEmpty || this.state.filter ? _react.default.createElement(_filter.default, {
          onChange: this.handleFilterChange
        }) : null,
        header: this.props.header,
        headerActions: !isEmpty ? _react.default.createElement(_button.default, {
          label: "Delete All Items",
          onClick: this.handleDeleteAllItems
        }) : _react.default.createElement(_button.default, {
          label: "New",
          onClick: this.handleAddItem
        }),
        footer: "Card Footer",
        heading: heading,
        icon: _react.default.createElement(_icon.default, {
          category: "standard",
          name: "document",
          size: "small"
        }),
        empty: isEmpty ? _react.default.createElement(_empty.default, {
          heading: "No Related Items"
        }) : null
      }, _react.default.createElement(_dataTable.default, {
        id: "SLDSDataTableExample-1",
        items: items
      }, _react.default.createElement(_column.default, {
        label: "Opportunity Name",
        property: "name",
        truncate: true
      }, _react.default.createElement(_highlightCell.default, {
        search: this.state.filter
      })))));
    }
  }]);

  return DemoCard;
}(_react.default.Component);

_defineProperty(DemoCard, "displayName", 'DemoCard');

_defineProperty(DemoCard, "propTypes", {
  items: _propTypes.default.array,
  header: _propTypes.default.node,
  heading: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.string])
});

var SetHeightCard = function SetHeightCard() {
  return _react.default.createElement(_card.default, {
    bodyClassName: "slds-grow slds-scrollable_y",
    className: "slds-grid slds-grid_vertical",
    footer: _react.default.createElement("a", {
      href: "javascript:void(0);"
    }, "Footer text") // eslint-disable-line no-script-url
    ,
    heading: "Card with set height",
    icon: _react.default.createElement(_icon.default, {
      category: "standard",
      name: "document",
      size: "small"
    }),
    style: {
      height: '300px'
    }
  }, _react.default.createElement("div", {
    className: "slds-card__body_inner"
  }, _react.default.createElement("div", null, "asdf"), _react.default.createElement("div", null, "asdf"), _react.default.createElement("div", null, "asdf"), _react.default.createElement("div", null, "asdf"), _react.default.createElement("div", null, "asdf"), _react.default.createElement("div", null, "asdf"), _react.default.createElement("div", null, "asdf"), _react.default.createElement("div", null, "asdf"), _react.default.createElement("div", null, "asdf"), _react.default.createElement("div", null, "asdf"), _react.default.createElement("div", null, "asdf"), _react.default.createElement("div", null, "asdf"), _react.default.createElement("div", null, "asdf")));
};

SetHeightCard.displayName = 'SET_HEIGHT_CARD';

var DemoCardWithoutHeader = function DemoCardWithoutHeader() {
  return _react.default.createElement(_card.default, {
    bodyClassName: "slds-grow slds-scrollable_y",
    className: "slds-grid slds-grid_vertical",
    footer: _react.default.createElement("a", {
      href: "javascript:void(0);"
    }, "Footer text") // eslint-disable-line no-script-url
    ,
    hasNoHeader: true,
    icon: _react.default.createElement(_icon.default, {
      category: "standard",
      name: "document",
      size: "small"
    }),
    style: {
      height: '300px'
    }
  }, _react.default.createElement(_dataTable.default, {
    id: "SLDSDataTableExample-1",
    items: sampleItems
  }, _react.default.createElement(_column.default, {
    label: "Opportunity Name",
    property: "name",
    truncate: true
  }, _react.default.createElement(_highlightCell.default, null))));
};

DemoCardWithoutHeader.displayName = 'CARD_WITHOUT_HEADER';
(0, _react2.storiesOf)(_constants.CARD, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, _react.default.createElement(_iconSettings.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('w/ Items', function () {
  return _react.default.createElement(DemoCard, {
    items: sampleItems
  });
}).add('Empty', function () {
  return _react.default.createElement(DemoCard, {
    items: []
  });
}).add('Custom Header', function () {
  return _react.default.createElement(DemoCard, {
    header: _react.default.createElement(_mediaObject.default, {
      body: _react.default.createElement(_inline.default, {
        className: "slds-text-heading_small slds-truncate",
        name: "inline-edit-standard",
        value: "Write your own heading",
        id: "inline-edit-standard"
      })
    }),
    items: sampleItems
  });
}).add('Custom Heading', function () {
  return _react.default.createElement(DemoCard, {
    items: sampleItems,
    heading: _react.default.createElement("span", {
      style: {
        color: 'red'
      }
    }, "To Wanda! This is custom!")
  });
}).add('Set height card', function () {
  return _react.default.createElement(SetHeightCard, null);
}).add('w/o Header', function () {
  return _react.default.createElement(DemoCardWithoutHeader, null);
}).add('Doc site Related List With Table', function () {
  return _react.default.createElement(_relatedListWithTable.default, null);
});