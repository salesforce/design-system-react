"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require("lodash.isfunction");

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
// # Tree Initial Branch
var propTypes = {
  /**
   * HTML `id` of the wrapping container element.
   */
  htmlId: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired,

  /*
   * Class names to be added to the top-level `ul` element.
   */
  initalClassName: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),

  /*
   * Styles to be added to the top-level `ul` element. Useful for `overflow:hidden`.
   */
  initialStyle: _propTypes2.default.object
};

var handleScroll = function handleScroll(event, props) {
  var percentage = event.target.scrollTop / (event.target.scrollHeight - event.target.clientHeight) * 100;

  if ((0, _lodash2.default)(props.onScroll)) {
    props.onScroll(event, {
      percentage: percentage
    });
  }
};

var renderInitialNode = function renderInitialNode(children, props) {
  return (// id intentionally not rendered here, and is present on
    // container that includes the header
    _react2.default.createElement("ul", {
      "aria-labelledby": "".concat(props.htmlId, "__heading"),
      className: (0, _classnames2.default)('slds-tree', props.initalClassName),
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
exports.default = renderInitialNode;