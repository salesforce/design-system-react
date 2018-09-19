"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodesBase = require("./nodes-base");

var _nodesBase2 = _interopRequireDefault(_nodesBase);

var _nodesWithLargeDataset = require("./nodes-with-large-dataset");

var _nodesWithLargeDataset2 = _interopRequireDefault(_nodesWithLargeDataset);

var _nodesWithInitialState = require("./nodes-with-initial-state");

var _nodesWithInitialState2 = _interopRequireDefault(_nodesWithInitialState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/*
  Sample data for Tree component
    * base - Default node dataset
    * large - contains 300+ branches (~1000 nodes) to test performance
    * initialState - contains selection and expanded branches
 */
var sampleNodes = {
  base: _nodesBase2.default,
  large: _nodesWithLargeDataset2.default,
  initialState: _nodesWithInitialState2.default
};
exports.default = sampleNodes;