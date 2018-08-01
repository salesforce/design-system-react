/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Spinner Component --- SLDS for React

// Implements the [Spinner design pattern - 2.1.0-beta.3 (204)](https://latest-204.lightningdesignsystem.com/components/spinners) in React.

// ### React
import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import checkProps from './check-props';

// ## Constants
import { SPINNER } from '../../utilities/constants';

// ### Prop Types
const propTypes = {
	/**
	 * **Assistive text for accessibility.**
	 * This object is merged with the default props object on every render.
	 * * `label`: Assistive text that is read out loud to screen readers.
	 */
	assistiveText: PropTypes.shape({
		label: PropTypes.string,
	}),
	/**
	 * Custom css classes applied to Spinner container
	 */
	containerClassName: PropTypes.string,
	/**
	 * Unique html id placed on div with role="status".
	 */
	id: PropTypes.string,
	/**
	 * Add styling to support a spinner inside an input field.
	 */
	isInput: PropTypes.bool,
	/**
	 * Determines the size of the spinner
	 */
	size: PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
	/**
	 * Determines the color of the spinner: `base` is gray, `brand` is blue, and `inverse` is white.
	 */
	variant: PropTypes.oneOf(['base', 'brand', 'inverse']),
};

const defaultProps = {
	assistiveText: { label: 'Loading...' },
	size: 'medium',
	variant: 'base',
};

/**
 * Spinners are CSS loading indicators that should be shown when retrieving data or performing slow computations. In some cases, the first time a parent component loads, a stencil is preferred to indicate network activity.
 */
const Spinner = (props) => {
	checkProps(SPINNER, props);
	const { containerClassName, id, isInput, size, variant } = props;
	const assistiveText =
		typeof props.assistiveText === 'string'
			? props.assistiveText
			: {
				...defaultProps.assistiveText,
				...props.assistiveText,
			}.label;

	const spinnerClassName = classNames('slds-spinner', {
		'slds-input__spinner': isInput,
		'slds-spinner_brand': variant === 'brand',
		'slds-spinner_inverse': variant === 'inverse',
		[`slds-spinner_${size}`]: size,
	});

	return (
		<div className={classNames(containerClassName, 'slds-spinner_container')}>
			<div
				aria-hidden="false"
				className={spinnerClassName}
				id={id}
				role="status"
			>
				{assistiveText && (
					<span className="slds-assistive-text">{assistiveText}</span>
				)}
				<div className="slds-spinner__dot-a" />
				<div className="slds-spinner__dot-b" />
			</div>
		</div>
	);
};

Spinner.displayName = SPINNER;
Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;

export default Spinner;
