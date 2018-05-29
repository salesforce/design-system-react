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

const DISTANCE_OFFSET = 1.5; // 'rem'
const NUBBIN_SIZE = 1; // 'rem'
const ROTATED_HEIGHT = NUBBIN_SIZE / Math.sqrt(2); // 'rem'
/*
*
*
*
*
*/
// FIXME - still need to account for border shadow of 2px. probably only needs to be added to the rotated height.
// TODO - should we convert all rem to pixels right from the get go? Keep units consistent. Memoize the values for perf?
const getNubbinMargins = (offsets, alignProp) => {
	// Backwards compatability for align passed as array.
	const align = Array.isArray(alignProp) ? alignProp.join(' ') : alignProp;
	const margins = {};

	const DISTANCE_OFFSET_PX = 16 * DISTANCE_OFFSET; // FIXME - actually do a real convert based on font size.

	if (align === 'top') {
		margins.marginBottom = `${ROTATED_HEIGHT}rem`;
	} else if (align === 'top right') {
		margins.marginBottom = `${ROTATED_HEIGHT}rem`;
		// const setLeft = (offsets.reference.left - (DISTANCE_OFFSET * REM_CONVERT));
		// const moveRight = (offsets.reference.width * 0.5);
		const moveLeft = (offsets.reference.width * 0.5);
		margins.marginLeft = DISTANCE_OFFSET_PX - moveLeft; // setRight  be negative
		debugger;

	} else if (align === 'top left') {
		const moveRight = (offsets.reference.width * 0.5);
		margins.marginLeft = moveRight - DISTANCE_OFFSET_PX; // px
		margins.marginBottom = `${ROTATED_HEIGHT}rem`;

	} else if (align === 'bottom') {
		console.log('hi');
	} else {
		console.log('hi');
	}
	// 	case 'top right':
	// 		break;
	// 	case 'top left':
	// 		break;
	// 	case 'bottom':
	// 		margins.marginTop = `${ROTATED_HEIGHT}rem`;
	// 		break;
	// 	case 'bottom left':
	// 		margins.marginTop = `${ROTATED_HEIGHT}rem`;
	// 		break;
	// 	case 'bottom right':
	// 		margins.marginTop = `${ROTATED_HEIGHT}rem`;
	// 		break;
	// 	default:
	// }
	//
	return margins;
};

export {
	getMargin,
	getNubbinMargins,
	getNubbinClassName,
	mapPropToPopperPlacement,
};
