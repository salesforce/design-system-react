"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash.isfunction"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
// # Tree Initial Branch
var propTypes = {
  /**
   * HTML `id` of the wrapping container element.
   */
  htmlId: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]).isRequired,

  /*
   * Class names to be added to the top-level `ul` element.
   */
  initalClassName: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /*
   * Styles to be added to the top-level `ul` element. Useful for `overflow:hidden`.
   */
  initialStyle: _propTypes.default.object
};

var handleScroll = function handleScroll(event, props) {
  var percentage = event.target.scrollTop / (event.target.scrollHeight - event.target.clientHeight) * 100;

  if ((0, _lodash.default)(props.onScroll)) {
    props.onScroll(event, {
      percentage: percentage
    });
  }
};

var renderInitialNode = function renderInitialNode(children, props) {
  return (
    /*#__PURE__*/
    // id intentionally not rendered here, and is present on
    // container that includes the header
    _react.default.createElement("ul", {
      "aria-labelledby": "".concat(props.htmlId, "__heading"),
      className: (0, _classnames.default)('slds-tree', props.initalClassName),
      onScroll: function onScroll(event) {
        handleScroll(event, props);
      },
      role: "tree",
      style: props.initialStyle
    }, children)
  );
};

renderInitialNode.displayName = 'TreeInitialNode';
renderInitialNode.propTypes = propTypes;
var _default = renderInitialNode;
exports.default = _default;