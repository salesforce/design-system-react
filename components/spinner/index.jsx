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

import componentDoc from './component.json';

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
	 * Custom css properties applied to Spinner container
	 */
	containerStyle: PropTypes.object,
	/**
	 * Render the spinner inside of a container.
	 */
	hasContainer: PropTypes.bool,
	/**
	 * Unique html id placed on div with role="status".
	 */
	id: PropTypes.string,
	/**
	 * Adds delay of 300ms to the spinner
	 */
	isDelayed: PropTypes.bool,
	/**
	 * Add styling to support a spinner inside an input field.
	 */
	isInput: PropTypes.bool,
	/**
	 * Add styling to support an inline spinner inside of the document flow.
	 */
	isInline: PropTypes.bool,
	/**
	 * Determines the size of the spinner
	 */
	size: PropTypes.oneOf(['xx-small', 'x-small', 'small', 'medium', 'large']),
	/**
	 * Determines the color of the spinner: `base` is gray, `brand` is blue, and `inverse` is white.
	 */
	variant: PropTypes.oneOf(['base', 'brand', 'inverse']),
};

const defaultProps = {
	assistiveText: { label: 'Loading...' },
	isDelayed: false,
	isInline: false,
	isInput: false,
	hasContainer: true,
	size: 'medium',
	variant: 'base',
};

/**
 * Spinners are CSS loading indicators that should be shown when retrieving data or performing slow computations. In some cases, the first time a parent component loads, a stencil is preferred to indicate network activity.
 */
const Spinner = (props) => {
	checkProps(SPINNER, props, componentDoc);
	const {
		containerClassName,
		containerStyle,
		id,
		isDelayed,
		isInline,
		isInput,
		hasContainer,
		size,
		variant,
	} = props;
	const assistiveText =
		typeof props.assistiveText === 'string'
			? props.assistiveText
			: {
					...defaultProps.assistiveText,
					...props.assistiveText,
			  }.label;

	const spinnerClassName = classNames('slds-spinner', {
		'slds-spinner_inline': isInline,
		'slds-input__spinner': isInput,
		'slds-spinner_brand': variant === 'brand',
		'slds-spinner_inverse': variant === 'inverse',
		'slds-spinner_delayed': isDelayed,
		[`slds-spinner_${size}`]: size,
	});

	const spinner = (
		<div aria-hidden="false" className={spinnerClassName} id={id} role="status">
			{assistiveText && (
				<span className="slds-assistive-text">{assistiveText}</span>
			)}
			<div className="slds-spinner__dot-a" />
			<div className="slds-spinner__dot-b" />
		</div>
	);

	return hasContainer ? (
		<div
			className={classNames(containerClassName, 'slds-spinner_container')}
			style={containerStyle}
		>
			{spinner}
		</div>
	) : (
		spinner
	);
};

Spinner.displayName = SPINNER;
Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;

export default Spinner;
