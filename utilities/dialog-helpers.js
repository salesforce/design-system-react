define(['exports', 'classnames'], function (exports, _classnames) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.mapPropToPopperPlacement = exports.getNubbinClassName = exports.getAlignment = exports.getMargin = undefined;

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	// Translates the prop into a string popper can use https://popper.js.org/popper-documentation.html#Popper.placements
	var mapPropToPopperPlacement = function mapPropToPopperPlacement(propString) {
		var placement = void 0;
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
	}; /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
	/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

	var getMargin = {};

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

	exports.getMargin = getMargin;
	exports.getAlignment = getAlignment;
	exports.getNubbinClassName = getNubbinClassName;
	exports.mapPropToPopperPlacement = mapPropToPopperPlacement;
});