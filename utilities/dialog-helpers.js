"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapPropToPopperPlacement = exports.getNubbinClassName = exports.getNubbinMargins = undefined;

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
// Translates the prop into a string popper can use https://popper.js.org/popper-documentation.html#Popper.placements
var mapPropToPopperPlacement = function mapPropToPopperPlacement(propString) {
  var placement;

  switch (propString) {
    case 'top left':
      placement = 'top-start';
      break;

    case 'top right':
      placement = 'top-end';
      break;

    case 'right top':
      placement = 'right-start';
      break;

    case 'right bottom':
      placement = 'right-end';
      break;

    case 'bottom left':
      placement = 'bottom-start';
      break;

    case 'bottom right':
      placement = 'bottom-end';
      break;

    case 'left top':
      placement = 'left-start';
      break;

    case 'left bottom':
      placement = 'left-end';
      break;

    default:
      placement = propString;
  }

  return placement;
};

var getNubbinClassName = function getNubbinClassName(align) {
  var popperData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (popperData.flipped) {
    return (0, _classnames2.default)({
      'slds-nubbin--top': align === 'top',
      'slds-nubbin--top-left': align === 'top left',
      'slds-nubbin--top-right': align === 'top right',
      'slds-nubbin--bottom': align === 'bottom',
      'slds-nubbin--bottom-left': align === 'bottom left',
      'slds-nubbin--bottom-right': align === 'bottom right',
      'slds-nubbin--left': align === 'left',
      'slds-nubbin--left-bottom': align === 'left bottom',
      'slds-nubbin--left-top': align === 'left top',
      'slds-nubbin--right': align === 'right',
      'slds-nubbin--right-bottom': align === 'right bottom',
      'slds-nubbin--right-top': align === 'right top'
    });
  }

  return (0, _classnames2.default)({
    'slds-nubbin--top': align === 'bottom',
    'slds-nubbin--top-left': align === 'bottom left',
    'slds-nubbin--top-right': align === 'bottom right',
    'slds-nubbin--bottom': align === 'top',
    'slds-nubbin--bottom-left': align === 'top left',
    'slds-nubbin--bottom-right': align === 'top right',
    'slds-nubbin--left': align === 'right',
    'slds-nubbin--left-bottom': align === 'right bottom',
    'slds-nubbin--left-top': align === 'right top',
    'slds-nubbin--right': align === 'left',
    'slds-nubbin--right-bottom': align === 'left bottom',
    'slds-nubbin--right-top': align === 'left top'
  });
};

var DISTANCE_OFFSET = 1.5; // 'rem'

var NUBBIN_SIZE = 1; // 'rem'

var ROTATED_HEIGHT = NUBBIN_SIZE / Math.sqrt(2); // 'rem'

/*
*
*
*
*
*/
// FIXME - still need to account for border shadow of 2px. probably only needs to be added to the rotated height.
// TODO - should we convert all rem to pixels right from the get go? Keep units consistent. Memoize the values for perf?

var getNubbinMargins = function getNubbinMargins() {
  var popperData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var placement = popperData.placement;
  var top = 0;
  var left = 0;
  var DISTANCE_OFFSET_PX = 16 * DISTANCE_OFFSET; // FIXME - actually do a real convert based on font size.

  var ROTATED_HEIGHT_PX = 16 * ROTATED_HEIGHT; // FIXME - actually do a real convert based on font size.

  var halfWidth = popperData.offsets.reference.width * 0.5;
  var halfHeight = popperData.offsets.reference.height * 0.5;

  if (placement === 'top') {
    top = ROTATED_HEIGHT_PX * -1;
  } else if (placement === 'top-end') {
    top = ROTATED_HEIGHT_PX * -1;
    left = DISTANCE_OFFSET_PX - halfWidth;
  } else if (placement === 'top-start') {
    top = ROTATED_HEIGHT_PX * -1;
    left = halfWidth - DISTANCE_OFFSET_PX;
  }

  if (placement === 'bottom') {
    top = ROTATED_HEIGHT_PX;
  } else if (placement === 'bottom-end') {
    top = ROTATED_HEIGHT_PX;
    left = DISTANCE_OFFSET_PX - halfWidth;
  } else if (placement === 'bottom-start') {
    top = ROTATED_HEIGHT_PX;
    left = halfWidth - DISTANCE_OFFSET_PX;
  }

  if (placement === 'right') {
    left = ROTATED_HEIGHT_PX;
  } else if (placement === 'right-end') {
    left = ROTATED_HEIGHT_PX;
    top = DISTANCE_OFFSET_PX - halfHeight;
  } else if (placement === 'right-start') {
    left = ROTATED_HEIGHT_PX;
    top = halfHeight - DISTANCE_OFFSET_PX;
  }

  if (placement === 'left') {
    left = ROTATED_HEIGHT_PX * -1;
  } else if (placement === 'left-end') {
    left = ROTATED_HEIGHT_PX * -1;
    top = DISTANCE_OFFSET_PX - halfHeight;
  } else if (placement === 'left-start') {
    left = ROTATED_HEIGHT_PX * -1;
    top = halfHeight - DISTANCE_OFFSET_PX;
  }

  return {
    left: left,
    top: top
  };
};

exports.getNubbinMargins = getNubbinMargins;
exports.getNubbinClassName = getNubbinClassName;
exports.mapPropToPopperPlacement = mapPropToPopperPlacement;