"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = _interopRequireDefault(require("lodash.findindex"));

var _lodash2 = _interopRequireDefault(require("lodash.isfunction"));

var _button = _interopRequireDefault(require("../../button"));

var _highlighter = _interopRequireDefault(require("../../utilities/highlighter"));

var _event = _interopRequireDefault(require("../../../utilities/event"));

var _keyCode = _interopRequireDefault(require("../../../utilities/key-code"));

var _keyCallbacks = _interopRequireDefault(require("../../../utilities/key-callbacks"));

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var handleSelect = function handleSelect(_ref) {
  var event = _ref.event,
      props = _ref.props,
      fromFocus = _ref.fromFocus;

  _event.default.trap(event);

  if ((0, _lodash2.default)(props.onSelect)) {
    props.onSelect({
      event: event,
      data: {
        node: props.node,
        select: !props.node.selected,
        treeIndex: props.treeIndex
      },
      fromFocus: fromFocus
    });
  }
};

var findNextNode = function findNextNode(flattenedNodes, node) {
  var nodes = flattenedNodes.map(function (flattenedNode) {
    return flattenedNode.node;
  });
  var index = (0, _lodash.default)(nodes, {
    id: node.id
  });
  return flattenedNodes[(index + 1) % flattenedNodes.length];
};

var findPreviousNode = function findPreviousNode(flattenedNodes, node) {
  var nodes = flattenedNodes.map(function (flattenedNode) {
    return flattenedNode.node;
  });
  var index = (0, _lodash.default)(nodes, {
    id: node.id
  }) - 1;

  if (index < 0) {
    index += flattenedNodes.length;
  }

  return flattenedNodes[index];
};

var handleKeyDownDown = function handleKeyDownDown(event, props) {
  if (props.focusedNodeIndex === props.treeIndex) {
    // Select the next visible node
    var flattenedNode = findNextNode(props.flattenedNodes, props.node);
    props.onSelect({
      event: event,
      data: {
        node: flattenedNode.node,
        select: true,
        treeIndex: flattenedNode.treeIndex
      },
      clearSelectedNodes: true
    });
  }
};

var handleKeyDownUp = function handleKeyDownUp(event, props) {
  if (props.focusedNodeIndex === props.treeIndex) {
    // Go to the previous visible node
    var flattenedNode = findPreviousNode(props.flattenedNodes, props.node);
    props.onSelect({
      event: event,
      data: {
        node: flattenedNode.node,
        select: true,
        treeIndex: flattenedNode.treeIndex
      },
      clearSelectedNodes: true
    });
  }
};

var handleKeyDownLeft = function handleKeyDownLeft(event, props) {
  var nodes = props.flattenedNodes.map(function (flattenedNode) {
    return flattenedNode.node;
  });
  var index = (0, _lodash.default)(nodes, {
    id: props.parent.id
  });

  if (index !== -1) {
    props.onExpand({
      event: event,
      data: {
        node: props.parent,
        select: true,
        expand: !props.parent.expanded,
        treeIndex: props.flattenedNodes[index].treeIndex
      }
    });
  }
};

var handleKeyDownEnter = function handleKeyDownEnter(event, props) {
  handleSelect({
    event: event,
    props: props
  });
};

var handleKeyDown = function handleKeyDown(event, props) {
  var _callbacks;

  (0, _keyCallbacks.default)(event, {
    callbacks: (_callbacks = {}, _defineProperty(_callbacks, _keyCode.default.DOWN, {
      callback: function callback(evt) {
        return handleKeyDownDown(evt, props);
      }
    }), _defineProperty(_callbacks, _keyCode.default.UP, {
      callback: function callback(evt) {
        return handleKeyDownUp(evt, props);
      }
    }), _defineProperty(_callbacks, _keyCode.default.LEFT, {
      callback: function callback(evt) {
        return handleKeyDownLeft(evt, props);
      }
    }), _defineProperty(_callbacks, _keyCode.default.ENTER, {
      callback: function callback(evt) {
        return handleKeyDownEnter(evt, props);
      }
    }), _callbacks)
  });
};

var handleFocus = function handleFocus(event, props) {
  if (!props.treeHasFocus && !props.focusedNodeIndex && event.target === event.currentTarget) {
    handleSelect({
      event: event,
      props: props
    });
  }
};

var getTabIndex = function getTabIndex(props) {
  var initialFocus = props.selectedNodeIndexes.length === 0 && props.treeIndex === props.flattenedNodes[0].treeIndex;
  return props.treeIndex === props.focusedNodeIndex || initialFocus ? 0 : -1;
};
/**
 * A Tree Item is a non-branching node in a hierarchical list.
 */


var Item = function Item(props) {
  var isSelected = props.node.selected;
  var isFocused = props.treeIndex === props.focusedNodeIndex;
  return /*#__PURE__*/_react.default.createElement("li", {
    id: "".concat(props.treeId, "-").concat(props.node.id),
    role: "treeitem",
    "aria-level": props.level,
    "aria-selected": isSelected ? 'true' : 'false',
    tabIndex: getTabIndex(props),
    onKeyDown: function onKeyDown(event) {
      return handleKeyDown(event, props);
    },
    onFocus: function onFocus(event) {
      return handleFocus(event, props);
    },
    onBlur: props.onNodeBlur,
    ref: function ref(component) {
      if (props.treeHasFocus && component && isFocused) {
        component.focus();
      }
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)('slds-tree__item', {
      'slds-is-selected': isSelected
    }),
    onClick: function onClick(event) {
      handleSelect({
        event: event,
        props: props
      });
    }
  }, /*#__PURE__*/_react.default.createElement(_button.default, {
    tabIndex: "-1",
    "aria-hidden": true,
    assistiveText: {
      icon: ''
    },
    role: "presentation",
    iconCategory: "utility",
    iconName: "chevronright",
    iconSize: "small",
    variant: "icon",
    className: "slds-m-right_small slds-is-disabled",
    disabled: true
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: "slds-size_1-of-1"
  }, /*#__PURE__*/_react.default.createElement(_highlighter.default, {
    search: props.searchTerm,
    className: "slds-tree__item-label slds-truncate"
  }, props.label))));
}; // ### Display Name
// Always use the canonical component name as the React display name.


Item.displayName = _constants.TREE_ITEM; // ### Prop Types

Item.propTypes = {
  /**
   * HTML `id` of the wrapping container element joined with the `id` of the node. This will recursively increase as the tree depth increases.
   */
  htmlId: _propTypes.default.string.isRequired,

  /**
   * The text of the tree item.
   */
  label: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.string]).isRequired,

  /**
   * The number of nestings. Determines the ARIA level and style alignment.
   */
  level: _propTypes.default.number.isRequired,

  /**
   * The current node that is being rendered.
   */
  node: _propTypes.default.object.isRequired,

  /**
   * This function triggers when the expand or collapse icon is clicked or due to keyboard navigation.
   */
  onExpand: _propTypes.default.func.isRequired,

  /**
   * Function that will run whenever an item or branch is selected (click or keyboard).
   */
  onSelect: _propTypes.default.func,

  /**
   * Highlights term if found in node label
   */
  searchTerm: _propTypes.default.string,

  /**
   * Unique id used for a prefix of all tree nodes
   */
  treeId: _propTypes.default.string,

  /**
   * Location of node (zero index). First node is `0`. It's first child is `0-0`. This can be used to modify your nodes without searching for the node. This index is only valid if the `nodes` prop is the same as at the time of the event.
   */
  treeIndex: _propTypes.default.string,

  /**
   * Flattened tree structure.
   */
  flattenedNodes: _propTypes.default.arrayOf(_propTypes.default.object),

  /**
   * Tree indexes of nodes that are currently selected.
   */
  selectedNodeIndexes: _propTypes.default.arrayOf(_propTypes.default.string),

  /**
   * Tree index of the node that is currently focused.
   */
  focusedNodeIndex: _propTypes.default.string,

  /**
   * Callback for when a node is blurred.
   */
  onNodeBlur: _propTypes.default.func,

  /**
   * Sets focus on render.
   */
  treeHasFocus: _propTypes.default.bool,

  /**
   * This node's parent.
   */
  parent: _propTypes.default.object
};
Item.defaultProps = {
  selected: false,
  selectedNodeIndexes: []
};
var _default = Item;
exports.default = _default;