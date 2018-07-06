/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Illustration Component

// Based on SLDS v2.6.2

// ## Dependencies

// ### React
import React from 'react';
import PropTypes from 'prop-types';

// This component's `checkProps` which issues warnings to developers about properties
// when in development mode (similar to React's built in development tools)
import checkProps from './check-props';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// A simple javascript utility for conditionally joining classNames together.
import classNames from '../../utilities/class-names';

// ## SVG
import Svg from '../utilities/utility-icon/svg';

// ## Constants
import { ILLUSTRATION } from '../../utilities/constants';

const Illustration = ({
	className,
	illustration,
	internalIllustration,
	heading,
	messageBody,
	name,
	path,
	size,
	style,
}) => {
	checkProps('Illustration', {
		illustration,
		internalIllustration,
		heading,
		path,
	});
	const kababCaseName = name ? name.replace(/_| /g, '-').toLowerCase() : '';
	let illustrationSvg;
	let headingNode;
	let messagBodyNode;
	if (illustration) {
		// Use SVG data passed in with `illustration` prop
		illustrationSvg = (
			<Svg
				className="slds-illustration__svg"
				aria-hidden="true"
				data={illustration}
				name={kababCaseName}
				style={style}
			/>
		);
	} else if (path) {
		illustrationSvg = (
			<svg
				className="slds-illustration__svg"
				aria-hidden="true"
				name={kababCaseName}
				style={style}
			>
				<use xlinkHref={path} />
			</svg>
		);
	}
	if (heading) {
		headingNode = <h3 className="slds-text-heading_medium">{heading}</h3>;
	}
	if (messageBody) {
		messagBodyNode = <p className="slds-text-body_regular">{messageBody}</p>;
	}
	return (
		<div
			className={classNames(className, 'slds-illustration', {
				'slds-illustration_small': size === 'small',
				// medium intentially not present
				'slds-illustration_large': size === 'large',
			})}
		>
			{illustrationSvg}
			<div className="slds-text-longform">
				{headingNode}
				{messagBodyNode}
			</div>
		</div>
	);
};

// ### Display Name
// Always use the canonical component name as the React display name.
Illustration.displayName = ILLUSTRATION;

// ### Prop Types
Illustration.propTypes = {
	/**
	 * CSS classes that are applied to the SVG. _Tested with Mocha testing._
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * A heading text inline that must be accompanied with the illustration image. _Tested with snapshot testing._ _Tested with Mocha testing._
	 */
	heading: PropTypes.string,
	/**
	 * A custom SVG object to use instead of the supplied SLDS illustrations, look in `design-system-react/illustrations` for examples and syntax. _Tested with snapshot testing._ _Tested with Mocha testing._
	 */
	illustration: PropTypes.object,
	/**
	 * Indicates whether the illustration SVGs are from the design-system-react repo. If yes, set to true.
	 */
	internalIllustration: PropTypes.bool.isRequired,
	/**
	 * A message body below the heading to further communicate the state of the component. _Tested with snapshot testing._ _Tested with Mocha testing._
	 */
	messageBody: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	/**
	 * Name of the illustration. Visit <a href='https://lightningdesignsystem.com/components/illustration/'>Lightning Design System Illustration</a> to reference illustration names. _Tested with snapshot testing._ _Tested with Mocha testing._
	 */
	name: PropTypes.string,
	/**
	 * Path to the illustration SVG image. _Tested with snapshot testing._
	 */
	path: PropTypes.string,
	/**
	 * Size of the illustration. _Tested with Mocha testing._
	 */
	size: PropTypes.oneOf(['small', 'medium', 'large']),
	/**
	 * Custom styles to be passed to the illustration SVG. _Tested with Mocha testing._
	 */
	style: PropTypes.object,
};

Illustration.defaultProps = {
	internalIllustration: true,
	size: 'medium',
};

export default Illustration;
