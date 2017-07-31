'use strict';

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getMargin = {}; /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

var getNubbinClassName = function getNubbinClassName(align) {
	return (0, _classnames2.default)({
		'slds-nubbin--top': align === 'bottom',
		'slds-nubbin--top-left': align === 'bottom left',
		'slds-nubbin--top-right': align === 'bottom right',
		'slds-nubbin--bottom': align === 'top',
		'slds-nubbin--bottom-left': align === 'top left',
		'slds-nubbin--bottom-right': align === 'top right',
		'slds-nubbin--left': align === 'right' || align === 'right bottom' || align === 'right top',
		'slds-nubbin--right': align === 'left' || align === 'left bottom' || align === 'left top'
	});
};

var getAlignment = {};

// `indexOf` is used becauses `align` can be a string OR an array at this time.
getAlignment.horizontal = function (align) {
	var alignment = 'center';
	if (align && align.indexOf('left') > -1) {
		alignment = 'left';
	} else if (align && align.indexOf('right') > -1) {
		alignment = 'right';
	}
	return alignment;
};

getAlignment.vertical = function (align) {
	var alignment = 'middle';
	if (align && align.indexOf('bottom') > -1) {
		alignment = 'bottom';
	} else if (align && align.indexOf('top') > -1) {
		alignment = 'top';
	}
	return alignment;
};

getMargin.right = function (align) {
	if (getAlignment.horizontal(align) === 'right') {
		return '-.75rem';
	}
	return '.75rem';
};

getMargin.left = function (align) {
	if (getAlignment.horizontal(align) === 'left') {
		return '-.75rem';
	}
	return '.75rem';
};

getMargin.top = function (align) {
	if (align && getAlignment.vertical(align) === 'top' && align.indexOf('top') > 0) {
		return '0.25rem';
	}
	return '1.25rem';
};

getMargin.bottom = function (align) {
	if (align && getAlignment.vertical(align) === 'bottom' && align.indexOf('bottom') > 0) {
		return '0.25rem';
	}
	return '1rem';
};

module.exports.getMargin = getMargin;
module.exports.getAlignment = getAlignment;
module.exports.getNubbinClassName = getNubbinClassName;