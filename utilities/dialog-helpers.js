/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import classNames from 'classnames';

// Translates the prop into a string popper can use https://popper.js.org/popper-documentation.html#Popper.placements
const mapPropToPopperPlacement = (propString) => {
	let placement;
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

const getMargin = {};

const getNubbinClassName = (align) =>
	classNames({
		'slds-nubbin--top': align === 'bottom',
		'slds-nubbin--top-left': align === 'bottom left',
		'slds-nubbin--top-right': align === 'bottom right',
		'slds-nubbin--bottom': align === 'top',
		'slds-nubbin--bottom-left': align === 'top left',
		'slds-nubbin--bottom-right': align === 'top right',
		'slds-nubbin--left':
			align === 'right' || align === 'right bottom' || align === 'right top',
		'slds-nubbin--right':
			align === 'left' || align === 'left bottom' || align === 'left top',
	});

const getAlignment = {};

// `indexOf` is used becauses `align` can be a string OR an array at this time.
getAlignment.horizontal = (align) => {
	let alignment = 'center';
	if (align && align.indexOf('left') > -1) {
		alignment = 'left';
	} else if (align && align.indexOf('right') > -1) {
		alignment = 'right';
	}
	return alignment;
};

getAlignment.vertical = (align) => {
	let alignment = 'middle';
	if (align && align.indexOf('bottom') > -1) {
		alignment = 'bottom';
	} else if (align && align.indexOf('top') > -1) {
		alignment = 'top';
	}
	return alignment;
};

getMargin.right = (align) => {
	if (getAlignment.horizontal(align) === 'right') {
		return '-.75rem';
	}
	return '.75rem';
};

getMargin.left = (align) => {
	if (getAlignment.horizontal(align) === 'left') {
		return '-.75rem';
	}
	return '.75rem';
};

getMargin.top = (align) => {
	if (
		align &&
		getAlignment.vertical(align) === 'top' &&
		align.indexOf('top') > 0
	) {
		return '0.25rem';
	}
	return '1.25rem';
};

getMargin.bottom = (align) => {
	if (
		align &&
		getAlignment.vertical(align) === 'bottom' &&
		align.indexOf('bottom') > 0
	) {
		return '0.25rem';
	}
	return '1rem';
};

export {
	getMargin,
	getAlignment,
	getNubbinClassName,
	mapPropToPopperPlacement,
};
