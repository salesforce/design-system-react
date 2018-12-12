"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _shortid = require("shortid");

var _shortid2 = _interopRequireDefault(_shortid);

var _item = require("./item");

var _item2 = _interopRequireDefault(_item);

var _renderInitialBranch = require("./render-initial-branch");

var _renderInitialBranch2 = _interopRequireDefault(_renderInitialBranch);

var _renderBranch = require("./render-branch");

var _renderBranch2 = _interopRequireDefault(_renderBranch);

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
// # Tree Branch Component
// Child components

/**
 * A Tree Item is a non-branching node in a hierarchical list.
 */
var Branch = function Branch(props) {
  var treeIndex = '';
  var children;
  var treeId = props.treeId,
      level = props.level,
      onExpand = props.onExpand,
      searchTerm = props.searchTerm;

  if (Array.isArray(props.getNodes(props.node))) {
    children = props.getNodes(props.node).map(function (node, index) {
      var child;
      var htmlId = "".concat(props.treeId, "-").concat(node.id);
      treeIndex = "".concat(index);

      if (props.treeIndex) {
        treeIndex = "".concat(props.treeIndex, "-").concat(treeIndex);
      }

      if (node.type === 'branch') {
        child = _react2.default.createElement(Branch, {
          getNodes: props.getNodes,
          htmlId: htmlId,
          key: node.id,
          label: node.label,
          level: level + 1,
          node: node,
          flattenedNodes: props.flattenedNodes,
          selectedNodeIndexes: props.selectedNodeIndexes,
          focusedNodeIndex: props.focusedNodeIndex,
          treeHasFocus: props.treeHasFocus,
          onNodeBlur: props.onNodeBlur,
          nodes: node.nodes,
          onSelect: props.onSelect,
          onExpand: onExpand,
          searchTerm: searchTerm,
          treeId: treeId,
          treeIndex: treeIndex,
          parent: props.node
        });
      } else {
        child = _react2.default.createElement(_item2.default, {
          label: node.label,
          htmlId: htmlId,
          key: _shortid2.default.generate(),
          level: level + 1,
          node: node,
          flattenedNodes: props.flattenedNodes,
          selectedNodeIndexes: props.selectedNodeIndexes,
          focusedNodeIndex: props.focusedNodeIndex,
          treeHasFocus: props.treeHasFocus,
          onNodeBlur: props.onNodeBlur,
          onSelect: props.onSelect,
          onExpand: onExpand,
          searchTerm: searchTerm,
          treeIndex: treeIndex,
          treeId: treeId,
          parent: props.node
        });
      }

      return child;
    });
  }

  var branch = props.level === 0 ? (0, _renderInitialBranch2.default)(children, props) : (0, _renderBranch2.default)(children, props);
  return branch;
}; // ### Display Name
// Always use the canonical component name as the React display name.


Branch.displayName = _constants.TREE_BRANCH; // ### Prop Types

Branch.propTypes = {
  /**
   * A function that will be called by every branch to receive its child nodes. The parent `node` object with the branch data is passed into this function: `getNodes(node)`. If your state engine is Flux or Redux, then your tree data structure will probably be flattened or normalized within the store. This will allow you to build out your tree without transversing an actual tree of data and may be more performant.
   */
  getNodes: _propTypes2.default.func,

  /**
   * HTML `id` of the wrapping container element joined with the `id` of the node. This will recursively increase as the tree depth increases.
   */
  htmlId: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired,

  /**
   * All tree nodes must have a unique HTML `id` for users of assistive technology. If no `id` key is present in the  is provided, one will be generated.
   */
  index: _propTypes2.default.number,

  /**
   * Determines if nodes in the top-level of the tree.
   */
  initial: _propTypes2.default.bool,

  /*
   * Class names to be added to the top-level `ul` element.
   */
  initalClassName: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
  initialStyle: _propTypes2.default.object,

  /**
   * The text of the tree item.
   */
  label: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string]),

  /**
   * The number of nestings. Determines the ARIA level and style alignment.
   */
  level: _propTypes2.default.number.isRequired,

  /**
   * The current node that is being rendered.
   */
  node: _propTypes2.default.object.isRequired,

  /**
   * Function that will run whenever an item or branch is selected (click or keyboard).
   */
  onSelect: _propTypes2.default.func,

  /**
   * This function triggers when the expand or collapse icon is clicked.
   */
  onExpand: _propTypes2.default.func.isRequired,

  /**
   * Highlights term if found in node label
   */
  searchTerm: _propTypes2.default.string,

  /**
   * Unique id used for a prefix of all tree nodes. This is the prefix for subsequent `htmlId` props.
   */
  treeId: _propTypes2.default.string,

  /**
   * Location of node (zero index). First node is `0`. It's first child is `0-0`. This can be used to modify your nodes without searching for the node. This index is only valid if the `nodes` prop is the same as at the time of the event.
   */
  treeIndex: _propTypes2.default.string,

  /**
   * Flattened tree structure.
   */
  flattenedNodes: _propTypes2.default.arrayOf(_propTypes2.default.object),

  /**
   * Tree indexes of nodes that are currently selected.
   */
  selectedNodeIndexes: _propTypes2.default.arrayOf(_propTypes2.default.string),

  /**
   * Tree index of the node that is currently focused.
   */
  focusedNodeIndex: _propTypes2.default.string,

  /**
   * Callback for when a node is blurred.
   */
  onNodeBlur: _propTypes2.default.func,

  /**
   * Sets focus on render.
   */
  treeHasFocus: _propTypes2.default.bool,

  /**
   * This node's parent.
   */
  parent: _propTypes2.default.object
};
Branch.defaultProps = {
  level: 0,
  label: '',
  treeIndex: '',
  selectedNodeIndexes: []
};
exports.default = Branch;