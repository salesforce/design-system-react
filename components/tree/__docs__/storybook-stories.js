"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react3 = require("@storybook/react");

var _lodash = require("lodash.clonedeep");

var _lodash2 = _interopRequireDefault(_lodash);

var _iconSettings = require("../../icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _constants = require("../../../utilities/constants");

var _tree = require("../../../utilities/sample-data/tree");

var _tree2 = _interopRequireDefault(_tree);

var _tree3 = require("../../tree");

var _tree4 = _interopRequireDefault(_tree3);

var _search = require("../../forms/input/search");

var _search2 = _interopRequireDefault(_search);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var branchExpandClicked = _react3.action;
var itemClicked = _react3.action;
var treeScrolled = _react3.action;
var DemoTree = (0, _createReactClass2.default)({
  displayName: 'DemoTree',
  // ### Prop Types
  propTypes: {
    exampleNodesIndex: _propTypes2.default.string,
    noBranchSelection: _propTypes2.default.bool,
    searchTerm: _propTypes2.default.string,
    searchable: _propTypes2.default.bool,
    singleSelection: _propTypes2.default.bool
  },
  getDefaultProps: function getDefaultProps() {
    return {
      exampleNodesIndex: 'sampleNodesDefault',
      id: 'example-tree'
    };
  },
  getInitialState: function getInitialState() {
    var initalNodes = this.props.exampleNodesIndex ? _tree2.default[this.props.exampleNodesIndex] : _tree2.default.sampleNodesDefault;
    return {
      nodes: (0, _lodash2.default)(initalNodes),
      selectedNode: undefined,
      searchTerm: this.props.searchable ? 'fruit' : undefined
    };
  },
  // By default Tree can have multiple selected nodes and folders/branches can be selected. To disable either of these, you can use the following logic. However, `props` are immutable. The node passed in shouldn't be modified, and due to object and arrays being reference variables, forceUpate is needed. This is just a "working example" not a prescription.
  handleExpandClick: function handleExpandClick(event, data) {
    var _this = this;

    branchExpandClicked('Expand Branch')(event, data);
    data.node.loading = data.expand ? true : undefined; // Fake delay to demonstrate use of loading node attibute

    setTimeout(function (node) {
      node.loading = false;

      _this.forceUpdate();
    }, 500, data.node);
    data.node.expanded = data.expand;
  },
  handleClick: function handleClick(event, data) {
    var _this2 = this;

    if (this.props.singleSelection) {
      data.node.selected = data.select;
      this.setState(function (prevState) {
        if (_this2.state.selectedNode && _this2.state.selectedNode.id !== data.node.id) {
          _this2.state.selectedNode.selected = false;
        }

        return {
          selectedNode: data.node
        };
      });
      itemClicked('Node Selected')(event, data);
    } else if (!this.props.noBranchSelection || this.props.noBranchSelection && data.node.type !== 'branch') {
      data.node.selected = data.select; // trigger render

      this.setState(function (prevState) {
        return _objectSpread({}, prevState);
      });
      itemClicked('Node Selected')(event, data);
    }
  },
  handleScroll: function handleScroll(event, data) {
    treeScrolled('Tree scrolled')(event, data);
  },
  handleSearchChange: function handleSearchChange(event) {
    this.setState({
      searchTerm: event.target.value
    });
  },
  render: function render() {
    return _react2.default.createElement("div", null, this.props.searchable ? _react2.default.createElement("div", null, _react2.default.createElement(_search2.default, {
      assistiveText: "Search Tree",
      value: this.state.searchTerm,
      onChange: this.handleSearchChange
    }), _react2.default.createElement("br", null)) : null, _react2.default.createElement(_tree4.default, _extends({
      nodes: this.state.nodes,
      onExpandClick: this.handleExpandClick,
      onClick: this.handleClick,
      onScroll: this.handleScroll,
      searchTerm: this.state.searchTerm
    }, this.props)));
  }
});
(0, _react3.storiesOf)(_constants.TREE, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around--medium"
  }, _react2.default.createElement(_iconSettings2.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Base', function () {
  return _react2.default.createElement(DemoTree, {
    heading: "Miscellaneous Foods"
  });
}).add('Initial Expanded/Selection', function () {
  return _react2.default.createElement(DemoTree, {
    heading: "Miscellaneous Foods",
    exampleNodesIndex: "sampleNodesWithInitialState"
  });
}).add('No Branch Select', function () {
  return _react2.default.createElement(DemoTree, {
    heading: "Miscellaneous Foods",
    noBranchSelection: true
  });
}).add('Single Selection', function () {
  return _react2.default.createElement(DemoTree, {
    heading: "Miscellaneous Foods",
    singleSelection: true
  });
}).add('Assistive Heading', function () {
  return _react2.default.createElement(DemoTree, {
    assistiveText: "Miscellaneous Foods"
  });
}).add('Overflow Hidden', function () {
  return _react2.default.createElement(DemoTree, {
    heading: "Miscellaneous Foods",
    exampleNodesIndex: "sampleNodesWithLargeDataset",
    listStyle: {
      height: '300px',
      overflowY: 'auto'
    }
  });
}).add('Large dataset (300+)', function () {
  return _react2.default.createElement(DemoTree, {
    heading: "Miscellaneous Foods",
    exampleNodesIndex: "sampleNodesWithLargeDataset"
  });
}).add('Highlighted Search', function () {
  return _react2.default.createElement(DemoTree, {
    heading: "Results for fruit",
    searchable: true
  });
});