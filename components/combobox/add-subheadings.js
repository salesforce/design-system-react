"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/* eslint-disable fp/no-mutating-methods */

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/**
 * This is a UX pattern recommendation for auto-complete search results that can contain multiple subheadings within the results. It inserts a subheading object based on `option.type === subheading.id` directly before a found option object and only inserts the subheading at the first occurence of that type of option.
 */
var addSubheadings = function addSubheadings(_ref) {
  var _ref2;

  var subheadings = _ref.subheadings,
      filteredOptions = _ref.filteredOptions;

  // Let's not mutate things we don't own.
  var subheadingsCopy = _toConsumableArray(subheadings);

  var sortedOptions = {
    noSubHeaderType: []
  }; // populate an object with subheader ID as the keys

  subheadingsCopy.forEach(function (subH) {
    if (subH.id) {
      sortedOptions[subH.id] = [subH];
    }
  }); // sort options into arrays using option type
  // if option type and subheader ID are equal, add to array, if no option type, add to noSubHeaderType array

  filteredOptions.forEach(function (option) {
    if (sortedOptions[option.type]) {
      sortedOptions[option.type].push(option);
    } else {
      sortedOptions.noSubHeaderType.push(option);
    }
  }); // get object values by dropping keys
  // flatten and remove child arrays, so that we have one array
  // `...` operates on each array item, not the array

  return (_ref2 = []).concat.apply(_ref2, _toConsumableArray(Object.values(sortedOptions)));
};

var _default = addSubheadings;
exports.default = _default;