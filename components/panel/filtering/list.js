"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _shortid = require("shortid");

var _shortid2 = _interopRequireDefault(_shortid);

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
// # Filter List
// Implements the [Panel design pattern](https://www.lightningdesignsystem.com/components/panels) in React.
// Based on SLDS v2.2.0-rc.1
// ## Dependencies
// ### React
// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
// ## Constants

/**
 * A list of Filters. This is a higher order component for filters that decorates the filter to work within a Filtering Panel. It also adds support for a Filter error label.
 */
var PanelFilterList = (0, _createReactClass2.default)({
  displayName: _constants.PANEL_FILTER_LIST,
  propTypes: function propTypes() {
    return {
      /**
       * Pass in `Filter` components
       */
      children: _propTypes2.default.node
    };
  },
  componentWillMount: function componentWillMount() {
    this.generatedId = _shortid2.default.generate();
  },
  render: function render() {
    var _this = this;

    var children = _react2.default.Children.map(this.props.children, function (child, index) {
      var id = child && child.props.id ? child.props.id : "".concat(_this.generatedId, "-").concat(index);
      var clonedChild;

      if (child && child.props.errorLabel) {
        clonedChild = _react2.default.cloneElement(child, {
          isError: true
        });
      }

      return child ? _react2.default.createElement("li", {
        className: "slds-item slds-hint-parent"
      }, clonedChild || child, child.props.errorLabel ? _react2.default.createElement("p", {
        id: "".concat(id, "-error"),
        className: "slds-text-color--error slds-m-top--xx-small"
      }, child.props.errorLabel) : null) : null;
    });

    return _react2.default.createElement("ol", {
      className: "slds-list--vertical slds-list--vertical-space"
    }, children);
  }
});
exports.default = PanelFilterList;