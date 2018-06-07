"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _iconSettings = require("../../../../components/icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _tree = require("../../../../components/tree");

var _tree2 = _interopRequireDefault(_tree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var sampleNodes = {
  sampleNodesWithInitialState: [{
    label: 'Grains',
    type: 'item',
    id: 1,
    selected: true
  }, {
    label: 'Fruits',
    type: 'branch',
    id: 2,
    expanded: true,
    nodes: [{
      assistiveText: 'Ground Fruits',
      label: _react2.default.createElement("span", null, "Ground Fruits"),
      type: 'branch',
      id: 4,
      nodes: [{
        label: 'Watermelon',
        type: 'item',
        id: 12
      }, {
        label: 'Canteloupe',
        type: 'item',
        _iconClass: 'glyphicon-file',
        id: 13
      }, {
        label: 'Strawberries',
        type: 'item',
        id: 14
      }]
    }, {
      label: 'Tree Fruits',
      type: 'branch',
      id: 5,
      selected: true,
      nodes: [{
        label: 'Peaches',
        type: 'item',
        id: 15
      }, {
        label: 'Pears',
        type: 'item',
        _iconClass: 'glyphicon-file',
        id: 16
      }, {
        label: 'Citrus',
        type: 'branch',
        id: 17,
        nodes: [{
          label: 'Orange',
          type: 'item',
          id: 20
        }, {
          label: 'Grapefruit',
          type: 'item',
          id: 21
        }, {
          label: 'Lemon',
          type: 'item',
          id: 22
        }, {
          label: 'Lime',
          type: 'item',
          id: 23
        }]
      }, {
        label: 'Apples',
        type: 'branch',
        id: 18,
        nodes: [{
          label: 'Granny Smith',
          type: 'item',
          id: 24
        }, {
          label: 'Pinklady',
          type: 'item',
          _iconClass: 'glyphicon-file',
          id: 25
        }, {
          label: 'Rotten',
          type: 'item',
          id: 26
        }, {
          label: 'Jonathan',
          type: 'item',
          id: 27
        }]
      }, {
        label: 'Cherries',
        type: 'branch',
        id: 19,
        nodes: [{
          label: 'Balaton',
          type: 'item',
          id: 28
        }, {
          label: 'Erdi Botermo',
          type: 'item',
          id: 29
        }, {
          label: 'Montmorency',
          type: 'item',
          id: 30
        }, {
          label: 'Queen Ann',
          type: 'item',
          id: 31
        }, {
          label: 'Ulster',
          type: 'item',
          id: 32
        }, {
          label: 'Viva',
          type: 'item',
          id: 33
        }]
      }, {
        label: 'Raspberries',
        type: 'item',
        id: 6
      }]
    }]
  }, {
    label: 'Nuts',
    type: 'branch',
    _iconClass: 'glyphicon-file',
    id: 3,
    nodes: [{
      label: 'Almonds',
      type: 'item',
      id: 8
    }, {
      label: 'Cashews',
      type: 'item',
      id: 9
    }, {
      label: 'Pecans',
      type: 'item',
      id: 10
    }, {
      label: 'Walnuts',
      type: 'item',
      id: 11
    }]
  }, {
    label: 'Empty folder',
    type: 'branch',
    id: 7,
    expanded: true
  }],
  sampleNodesDefault: [{
    label: 'Grains',
    type: 'item',
    id: 1
  }, {
    label: 'Fruits',
    type: 'branch',
    id: 2,
    nodes: [{
      label: 'Ground Fruits',
      type: 'branch',
      id: 4,
      nodes: [{
        label: 'Watermelon',
        type: 'item',
        id: 12
      }, {
        label: 'Canteloupe',
        type: 'item',
        _iconClass: 'glyphicon-file',
        id: 13
      }, {
        label: 'Strawberries',
        type: 'item',
        id: 14
      }]
    }, {
      label: 'Tree Fruits',
      type: 'branch',
      id: 5,
      nodes: [{
        label: 'Peaches',
        type: 'item',
        id: 15
      }, {
        label: 'Pears',
        type: 'item',
        _iconClass: 'glyphicon-file',
        id: 16
      }, {
        label: 'Citrus',
        type: 'branch',
        id: 17,
        nodes: [{
          label: 'Orange',
          type: 'item',
          id: 20
        }, {
          label: 'Grapefruit',
          type: 'item',
          id: 21
        }, {
          label: 'Lemon',
          type: 'item',
          id: 22
        }, {
          label: 'Lime',
          type: 'item',
          id: 23
        }]
      }, {
        label: 'Apples',
        type: 'branch',
        id: 18,
        nodes: [{
          label: 'Granny Smith',
          type: 'item',
          id: 24
        }, {
          label: 'Pinklady',
          type: 'item',
          _iconClass: 'glyphicon-file',
          id: 25
        }, {
          label: 'Rotten',
          type: 'item',
          id: 26
        }, {
          label: 'Jonathan',
          type: 'item',
          id: 27
        }]
      }, {
        label: 'Cherries',
        type: 'branch',
        id: 19,
        nodes: [{
          label: 'Balaton',
          type: 'item',
          id: 28
        }, {
          label: 'Erdi Botermo',
          type: 'item',
          id: 29
        }, {
          label: 'Montmorency',
          type: 'item',
          id: 30
        }, {
          label: 'Queen Ann',
          type: 'item',
          id: 31
        }, {
          label: 'Ulster',
          type: 'item',
          id: 32
        }, {
          label: 'Viva',
          type: 'item',
          id: 33
        }]
      }, {
        label: 'Raspberries',
        type: 'item',
        id: 6
      }]
    }]
  }, {
    label: 'Nuts',
    type: 'branch',
    _iconClass: 'glyphicon-file',
    id: 3,
    nodes: [{
      label: 'Almonds',
      type: 'item',
      id: 8
    }, {
      label: 'Cashews',
      type: 'item',
      id: 9
    }, {
      label: 'Pecans',
      type: 'item',
      id: 10
    }, {
      label: 'Walnuts',
      type: 'item',
      id: 11
    }]
  }, {
    label: 'Empty folder',
    type: 'branch',
    id: 7
  }]
};
var Example = (0, _createReactClass2.default)({
  displayName: 'TreeExample',
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
      exampleNodesIndex: 'sampleNodesDefault'
    };
  },
  getInitialState: function getInitialState() {
    var initalNodes = this.props.exampleNodesIndex ? sampleNodes[this.props.exampleNodesIndex] : sampleNodes.sampleNodesDefault;
    return {
      nodes: initalNodes,
      searchTerm: this.props.searchable ? 'fruit' : undefined
    };
  },
  // By default Tree can have multiple selected nodes and folders/branches can be selected. To disable either of these, you can use the following logic. However, `props` are immutable. The node passed in shouldn't be modified, and due to object and arrays being reference variables, forceUpate is needed. This is just a "working example" not a prescription.
  handleExpandClick: function handleExpandClick(event, data) {
    var _this = this;

    console.log('[handleExpandClick] (event, data)', event, data);
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
      console.log('[handleClick] (event, data)', event, data);
    } else if (!this.props.noBranchSelection || this.props.noBranchSelection && data.node.type !== 'branch') {
      data.node.selected = data.select; // trigger render

      this.setState(function (prevState) {
        return _objectSpread({}, prevState);
      });
      console.log('[handleClick] (event, data)', event, data);
    }
  },
  handleScroll: function handleScroll(event, data) {
    console.log('[handleScroll] (event, data)', event, data);
  },
  handleSearchChange: function handleSearchChange(event) {
    this.setState({
      searchTerm: event.target.value
    });
  },
  render: function render() {
    return _react2.default.createElement(_iconSettings2.default, {
      iconPath: "/assets/icons"
    }, _react2.default.createElement("div", null, _react2.default.createElement(_tree2.default, {
      id: "example-tree",
      heading: "Miscellaneous Foods",
      nodes: this.state.nodes,
      onExpandClick: this.handleExpandClick,
      onClick: this.handleClick,
      onScroll: this.handleScroll,
      searchTerm: this.state.searchTerm
    })));
  }
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime