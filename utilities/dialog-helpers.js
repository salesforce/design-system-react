/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import classNames from 'classnames';
import { DIRECTIONS } from './../components/utilities/UNSAFE_direction';

// Translates the prop into a string popper can use https://popper.js.org/popper-documentation.html#Popper.placements
const mapPropToPopperPlacement = (align, direction) => {
	let placement;
	switch (align) {
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
			placement = align;
	}
	if (direction === DIRECTIONS.RTL) {
		if (placement.indexOf('left') > -1) {
			placement = placement.replace('left', 'right');
		} else if (placement.indexOf('right') > -1) {
			placement = placement.replace('right', 'left');
		} else if (placement.indexOf('start') > -1) {
			placement = placement.replace('start', 'end');
		} else if (placement.indexOf('end') > -1) {
			placement = placement.replace('end', 'start');
		}
	}
	return placement;
};

const getNubbinClassName = (align, popperData = {}) => {
	if (popperData.flipped) {
		return classNames({
			'slds-nubbin_top': align === 'top',
			'slds-nubbin_top-left': align === 'top left',
			'slds-nubbin_top-right': align === 'top right',
			'slds-nubbin_bottom': align === 'bottom',
			'slds-nubbin_bottom-left': align === 'bottom left',
			'slds-nubbin_bottom-right': align === 'bottom right',
			'slds-nubbin_left': align === 'left',
			'slds-nubbin_left-bottom': align === 'left bottom',
			'slds-nubbin_left-top': align === 'left top',
			'slds-nubbin_right': align === 'right',
			'slds-nubbin_right-bottom': align === 'right bottom',
			'slds-nubbin_right-top': align === 'right top',
		});
	}

	return classNames({
		'slds-nubbin_top': align === 'bottom',
		'slds-nubbin_top-left': align === 'bottom left',
		'slds-nubbin_top-right': align === 'bottom right',
		'slds-nubbin_bottom': align === 'top',
		'slds-nubbin_bottom-left': align === 'top left',
		'slds-nubbin_bottom-right': align === 'top right',
		'slds-nubbin_left': align === 'right',
		'slds-nubbin_left-bottom': align === 'right bottom',
		'slds-nubbin_left-top': align === 'right top',
		'slds-nubbin_right': align === 'left',
		'slds-nubbin_right-bottom': align === 'left bottom',
		'slds-nubbin_right-top': align === 'left top',
	});
};

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
const getNubbinMargins = (popperData = {}) => {
	const { placement } = popperData;

	let top = 0;
	let left = 0;

	const DISTANCE_OFFSET_PX = 16 * DISTANCE_OFFSET; // FIXME - actually do a real convert based on font size.
	const ROTATED_HEIGHT_PX = 16 * ROTATED_HEIGHT; // FIXME - actually do a real convert based on font size.

	const halfWidth = popperData.offsets.reference.width * 0.5;
	const halfHeight = popperData.offsets.reference.height * 0.5;

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
		left,
		top,
	};
};

export { getNubbinMargins, getNubbinClassName, mapPropToPopperPlacement };
