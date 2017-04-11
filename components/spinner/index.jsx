/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */


// # Spinner Component --- SLDS for React

// Implements the [Spinner design pattern - 2.1.0-beta.3 (204)](https://latest-204.lightningdesignsystem.com/components/spinners) in React.

// ### React
// React is an external dependency of the project.
import React from 'react';

import classNames from 'classnames';

// ## Constants
import { SPINNER } from '../../utilities/constants';

// Removes the need for `PropTypes`.
const { PropTypes } = React;

// ### Prop Types
const PROP_TYPES = {
  /**
   * Custom css classes applied to Spinner container
   */
	containerClassName: PropTypes.string,
  /**
   * Determines the size of the spinner
   */
	size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Determines the color of the spinner: `base` is gray, `brand` is blue, and `inverse` is white.
   */
	variant: PropTypes.oneOf(['base', 'brand', 'inverse'])
};

const DEFAULT_PROPS = {
	size: 'medium',
	variant: 'base'
};

// ## Spinner
const Spinner = (props) => {
	const {
		containerClassName,
		variant,
		size
	} = props;

	const sizeClass = `slds-spinner--${props.size}`;
	const variants = {
		brand: 'slds-spinner--brand',
		inverse: 'slds-spinner--inverse'
	};

	return (
		<div className={classNames(props.containerClassName, 'slds-spinner_container')}>
			<div
				className={classNames('slds-spinner', sizeClass, variants[props.variant])}
				aria-hidden="false"
				role="alert"
			>
				<div className="slds-spinner__dot-a" />
				<div className="slds-spinner__dot-b" />
			</div>
		</div>
	);
};

Spinner.displayName = SPINNER;
Spinner.propTypes = PROP_TYPES;
Spinner.defaultProps = DEFAULT_PROPS;

module.exports = Spinner;

