/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Progress Ring design pattern](https://lightningdesignsystem.com/components/progress-ring/) in React.
// Based on SLDS v2.4.5
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const PROGRESS_RING_SHAPE = 'SLDSProgressRingShape';

const propTypes = {
	/**
	 * HTML id for component.
	 */
	id: PropTypes.string,
	/**
	 * CSS class names to be added to the container element. `array`, `object`, or `string` are accepted.
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Decimal percentage drain of the ring [0.0 - 1.0]
	 */
	fillPercentDecimal: PropTypes.number,
	/**
	 * Direction that the progress ring "flows." Default is counter-clockwise, or `drain`. For clockwise flow, use `fill`
	 */
	flowDirection: PropTypes.oneOf(['drain', 'fill']),
	/**
	 * Size of the progress ring. Default is 'medium'
	 */
	size: PropTypes.oneOf(['medium', 'large']),
};

const defaultProps = {
	fillPercentDecimal: 0,
};

/**
 * Generates the string for the D value of the SVG path
 * @param isLong {number} a binary flag if the arc should 'take the long path' (used for > 50% fill)
 * @param arcX {decimal} the arc's x position
 * @param arcY {decimal} the arc's y position
 */
const getD = (isLong, arcX, arcY) =>
	`M 1 0 A 1 1 0 ${isLong} 1 ${arcX} ${arcY} L 0 0`;

/**
 * Calculates the fill part of the ring
 * @param fillPercent {decimal} Decimal percentage that represents the amount of the ring which is filled with color.
 */
const calculateD = (fillPercent) => {
	const isLong = fillPercent > 0.5 ? 1 : 0;
	const arcX = Math.cos(2 * Math.PI * fillPercent);
	const arcY = Math.sin(2 * Math.PI * fillPercent);

	return getD(isLong, arcX, arcY);
};

/**
 * Displays the progress ring shape.
 */
const ProgressRingShape = (props) => {
	const progressStyles = { height: props.size === 'large' ? '2rem' : '1.5rem' };

	if (props.flowDirection === 'fill') {
		progressStyles.transform = 'scaleX(1) rotate(-90deg)';
	}

	return (
		<div
			id={props.id}
			className={classNames('slds-progress-ring', props.className)}
		>
			<div
				aria-valuemin="0"
				aria-valuemax="100"
				aria-valuenow={props.fillPercentDecimal * 100}
				className="slds-progress-ring__progress"
				role="progressbar"
				style={progressStyles}
			>
				<svg viewBox="-1 -1 2 2">
					<path
						className="slds-progress-ring__path"
						d={calculateD(props.fillPercentDecimal)}
					/>
				</svg>
			</div>
			<div className="slds-progress-ring__content">{props.children}</div>
		</div>
	);
};

ProgressRingShape.displayName = PROGRESS_RING_SHAPE;
ProgressRingShape.propTypes = propTypes;
ProgressRingShape.defaultProps = defaultProps;

export default ProgressRingShape;
