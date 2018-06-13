"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _normalizr = require("normalizr");

var _tree = require("../../../utilities/sample-data/tree");

var _tree2 = _interopRequireDefault(_tree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/*
  [Normalizr](https://github.com/paularmstrong/normalizr) Many APIs, public or not, return JSON data that has deeply nested objects. Using data in this kind of structure is often very difficult for JavaScript applications, especially those using Flux or Redux.

  Normalizr is a small, but powerful utility for taking JSON with a schema definition and returning nested entities with their IDs, gathered in dictionaries.

  Hashmaps or hash tables more easily allow immutability because only one hash entry needs to be overwritten by changes. This prevents anti-patterns like `_.deepClone` or `forceUpdate` renders which update the whole tree instead of limiting the re-render to only the node that changed. React is cool like that.
 */
// Define Normalzr schema
var nodeEntity = new _normalizr.schema.Entity('nodes');
var nodes = new _normalizr.schema.Array(nodeEntity);
nodeEntity.define({
  nodes: nodes
}); // Convert nested objects to a hashmap

var base = (0, _normalizr.normalize)(_tree2.default.base, nodeEntity).entities.nodes;
var initialExpandedSelected = (0, _normalizr.normalize)(_tree2.default.initialState, nodeEntity).entities.nodes;
var large = (0, _normalizr.normalize)(_tree2.default.large, nodeEntity).entities.nodes;
var hashmap = {
  base: base,
  large: large,
  initialExpandedSelected: initialExpandedSelected
};
exports.default = hashmap;