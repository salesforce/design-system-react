"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = _interopRequireDefault(require("lodash.find"));

var _branch = _interopRequireDefault(require("./private/branch"));

var _checkProps = _interopRequireDefault(require("./check-props"));

var _docs = _interopRequireDefault(require("./docs.json"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ### Prop Types
var propTypes = {
  /**
   * **Assistive text for accessibility.**
   * This object is merged with the default props object on every render.
   * * `label`: For users of assistive technology, if set the heading will be hidden. One of `heading` or `assistiveText.label` must be set in order to label the tree.
   */
  assistiveText: _propTypes.default.shape({
    label: _propTypes.default.string
  }),

  /**
   * Class names to be added to the container element which has the heading and the `ul.slds-tree` element as children.
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Class names to be added to the top-level `ul` element of the tree.
   */
  listClassName: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * A function that will be called by every branch to receive its child nodes. The parent `node` object with the branch data is passed into this function: `getNodes(node)`. If your state engine is Flux or Redux, then your tree data structure will probably be flattened or normalized within the store. This will allow you to build out your tree without transversing an actual tree of data and may be more performant.
   */
  getNodes: _propTypes.default.func,

  /**
   * This is the tree's heading and describes its contents. It can be hidden, see `assistiveText`.
   * */
  heading: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.string]),

  /**
   * HTML `id` of primary element that has `.slds-tree` on it. This component has a wrapping container element outside of `.slds-tree`.
   */
  id: _propTypes.default.string.isRequired,

  /**
   * Array of items starting at the top of the tree. The shape each node in the array is:
   * ```
   * {
   *   expanded: string,
   *   id: string,
   *   label: string or node,
   *   selected: string,
   *   type: string,
   *   nodes: array
   * }
   * ```
   * `assistiveText: string` is optional and helpful if the label is not a string. Only `id` and `label` are required. Use `type: 'branch'` for folder and categories.
   */
  nodes: _propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string, _propTypes.default.shape({
    id: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]).isRequired,
    label: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.string]).isRequired,
    type: _propTypes.default.string.isRequired
  })])).isRequired,

  /**
   * Function that will run whenever an item or branch is selected due to click or keyboard navigation.
   */
  onClick: _propTypes.default.func.isRequired,

  /**
   * This function triggers when the expand or collapse icon is clicked or due to keyboard navigation.
   */
  onExpandClick: _propTypes.default.func.isRequired,

  /**
   * This function triggers when the top-level `ul` element scrolls. This can be used to implement an "infinite scroll" pattern and update the `nodes` prop accordingly.
   */
  onScroll: _propTypes.default.func,

  /**
   * Highlights term if found in node label. This does not auto-expand branches.
   */
  searchTerm: _propTypes.default.string,

  /**
   * Styles to be added to the top-level `ul` element. Useful for `overflow:hidden`.
   */
  listStyle: _propTypes.default.object
};
var defaultProps = {
  assistiveText: {},
  getNodes: function getNodes(node) {
    return node.nodes;
  }
};
/**
 * A tree is visualization of a structure hierarchy. A branch can be expanded or collapsed. This is a controlled component, since visual state is present in the `nodes` data.
 */

var Tree =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Tree, _React$Component);

  function Tree(props) {
    var _this;

    _classCallCheck(this, Tree);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Tree).call(this, props)); // Find the first selected node and initialize it properly so that can be tabbed to. If no node is selected, it will be selected upon first focus.

    _defineProperty(_assertThisInitialized(_this), "flattenTree", function (root) {
      var treeIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var firstLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      if (!root.nodes) {
        return [{
          node: root,
          treeIndex: treeIndex
        }];
      }

      var nodes = [{
        node: root,
        treeIndex: treeIndex
      }];

      if (root.expanded) {
        for (var index = 0; index < root.nodes.length; index++) {
          var curNode = firstLevel ? root.nodes[index] : _this.props.getNodes(root)[index];
          nodes = nodes.concat(_this.flattenTree(curNode, treeIndex ? "".concat(treeIndex, "-").concat(index) : "".concat(index), false));
        }
      }

      return nodes;
    });

    _defineProperty(_assertThisInitialized(_this), "handleSelect", function (_ref) {
      var event = _ref.event,
          data = _ref.data,
          clearSelectedNodes = _ref.clearSelectedNodes,
          fromFocus = _ref.fromFocus;

      // When triggered by a key event, other nodes should be deselected.
      if (clearSelectedNodes) {
        _this.state.flattenedNodes.forEach(function (flattenedNode) {
          if (flattenedNode.node.selected) {
            flattenedNode.node.selected = false;
          }
        });
      } // Prevent firing twice on first click, due to the handleSelect
      // triggered by a focus event


      if (!fromFocus) {
        _this.props.onClick(event, data);
      } // Keep track of the currently selected and focused nodes.


      var selectedNodeIndexes;

      if (data.select) {
        selectedNodeIndexes = _this.state.selectedNodeIndexes.concat([data.treeIndex]);
      } else {
        selectedNodeIndexes = _this.state.selectedNodeIndexes.filter(function (treeIndex) {
          return treeIndex !== data.treeIndex;
        });
      }

      _this.treeHasFocus = true;

      _this.setState({
        focusedNodeIndex: data.treeIndex,
        selectedNodeIndexes: selectedNodeIndexes
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleNodeBlur", function () {
      // There is no need to render when blurring a node because focus is either:
      //  - outside of the tree, or
      //  - focused on another node in the tree, which triggers its own render
      _this.treeHasFocus = false;
    });

    _defineProperty(_assertThisInitialized(_this), "handleExpand", function (_ref2) {
      var event = _ref2.event,
          data = _ref2.data;
      _this.treeHasFocus = true;

      _this.props.onExpandClick(event, data);

      if (data.select) {
        _this.setState({
          focusedNodeIndex: data.treeIndex
        });
      }
    });

    var flattenedNodes = _this.flattenTree({
      nodes: _this.props.getNodes({
        nodes: _this.props.nodes
      }),
      expanded: true
    }).slice(1);

    var selectedNode = (0, _lodash.default)(flattenedNodes, function (curNode) {
      return curNode.node.selected;
    });
    var _selectedNodeIndexes = [];
    var focusedNodeIndex;

    if (selectedNode) {
      _selectedNodeIndexes.push(selectedNode.treeIndex);

      focusedNodeIndex = selectedNode.treeIndex;
    }

    _this.state = {
      flattenedNodes: flattenedNodes,
      selectedNodeIndexes: _selectedNodeIndexes,
      focusedNodeIndex: focusedNodeIndex
    };
    return _this;
  }

  _createClass(Tree, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      (0, _checkProps.default)(_constants.TREE, this.props, _docs.default);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        flattenedNodes: this.flattenTree({
          nodes: this.props.getNodes({
            nodes: nextProps.nodes
          }),
          expanded: true
        }).slice(1)
      });
    }
    /* Flattens hierarchical tree structure into a flat array. The
     * first item in the array is the whole tree and therefore should be
     * removed with `slice(1)`.` This means that root cannot call `getNodes()`
     * and should directly reference the `nodes` key. All level after that
     * should use `getNodes()` to access the correct nodes.
    */

  }, {
    key: "render",
    value: function render() {
      // One of these is required to pass accessibility tests
      var assistiveText = typeof this.props.assistiveText === 'string' ? this.props.assistiveText : _objectSpread({}, defaultProps.assistiveText, this.props.assistiveText).label;
      var headingText = assistiveText || this.props.heading; // Start the zero level branch--that is the tree root. There is no label for
      // the tree root, but is required by all other nodes

      return _react.default.createElement("div", {
        id: this.props.id,
        className: (0, _classnames.default)('slds-tree_container', this.props.className)
        /* role="application" */

      }, _react.default.createElement("h4", {
        className: (0, _classnames.default)('slds-tree__group-header', {
          'slds-assistive-text': assistiveText
        }),
        id: "".concat(this.props.id, "__heading")
      }, headingText), _react.default.createElement(_branch.default, {
        getNodes: this.props.getNodes,
        initalClassName: this.props.listClassName,
        htmlId: this.props.id,
        initialStyle: this.props.listStyle,
        level: 0,
        node: {
          nodes: this.props.nodes
        },
        flattenedNodes: this.state.flattenedNodes,
        selectedNodeIndexes: this.state.selectedNodeIndexes,
        focusedNodeIndex: this.state.focusedNodeIndex,
        treeHasFocus: this.treeHasFocus,
        onNodeBlur: this.handleNodeBlur,
        onSelect: this.handleSelect,
        onExpand: this.handleExpand,
        onScroll: this.props.onScroll,
        searchTerm: this.props.searchTerm,
        treeId: this.props.id
      }));
    }
  }]);

  return Tree;
}(_react.default.Component);

Tree.displayName = _constants.TREE;
Tree.propTypes = propTypes;
Tree.defaultProps = defaultProps;
var _default = Tree;
exports.default = _default;