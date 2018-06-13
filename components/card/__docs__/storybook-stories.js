"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require("lodash.uniqueid");

var _lodash2 = _interopRequireDefault(_lodash);

var _react3 = require("@storybook/react");

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var sampleItems = [{
  name: 'Cloudhub'
}, {
  name: 'Cloudhub + Anypoint Connectors'
}, {
  name: 'Cloud City'
}];
var DemoCard = (0, _createReactClass2.default)({
  displayName: 'DemoCard',
  propTypes: {
    items: _propTypes2.default.array,
    header: _propTypes2.default.node,
    heading: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string])
  },
  getInitialState: function getInitialState() {
    return {
      filter: null,
      items: this.props.items
    };
  },
  handleFilterChange: function handleFilterChange(event) {
    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    (0, _react3.action)('filter').apply(void 0, [event].concat(rest));
    var filter = event.target.value !== '' ? RegExp(event.target.value, 'i') : null;
    this.setState({
      filter: filter
    });
  },
  handleDeleteAllItems: function handleDeleteAllItems() {
    (0, _react3.action)('delete all').apply(void 0, arguments);
    this.setState({
      filter: null,
      items: []
    });
  },
  handleAddItem: function handleAddItem() {
    (0, _react3.action)('add').apply(void 0, arguments);
    this.setState({
      items: [{
        name: (0, _lodash2.default)('New item #')
      }].concat(_toConsumableArray(this.state.items))
    });
  },
  render: function render() {
    var _this = this;

    var items = this.state.items;

    if (this.state.filter) {
      items = items.filter(function (item) {
        return _this.state.filter.test(item.name);
      });
    }

    var isEmpty = items.length === 0;
    var heading = this.props.heading;

    if (!this.props.heading) {
      heading = items.length > 0 ? "Related Items (".concat(items.length, ")") : 'Related Items';
    }

    return _react2.default.createElement("div", {
      className: "slds-grid slds-grid--vertical"
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
      items: items,
      bordered: true
    }, _react2.default.createElement(_column2.default, {
      label: "Opportunity Name",
      property: "name",
      truncate: true
    }, _react2.default.createElement(_highlightCell2.default, {
      search: this.state.filter
    })))));
  }
});

var SetHeightCard = function SetHeightCard() {
  return _react2.default.createElement(_card2.default, {
    bodyClassName: "slds-grow slds-scrollable--y",
    className: "slds-grid slds-grid--vertical",
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
    className: "slds-card__body--inner"
  }, _react2.default.createElement("div", null, "asdf"), _react2.default.createElement("div", null, "asdf"), _react2.default.createElement("div", null, "asdf"), _react2.default.createElement("div", null, "asdf"), _react2.default.createElement("div", null, "asdf"), _react2.default.createElement("div", null, "asdf"), _react2.default.createElement("div", null, "asdf"), _react2.default.createElement("div", null, "asdf"), _react2.default.createElement("div", null, "asdf"), _react2.default.createElement("div", null, "asdf"), _react2.default.createElement("div", null, "asdf"), _react2.default.createElement("div", null, "asdf"), _react2.default.createElement("div", null, "asdf")));
};

SetHeightCard.displayName = 'SET_HEIGHT_CARD';
(0, _react3.storiesOf)(_constants.CARD, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around--medium"
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
        className: "slds-text-heading--small slds-truncate",
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
});