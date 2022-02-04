/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Brand Band Component

// Implements the [Brand Band design pattern](https://latest-216.lightningdesignsystem.com/components/brand-band/) in React.

// ## Dependencies

// ### React
import React from 'react';
import PropTypes from 'prop-types';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// A simple javascript utility for conditionally joining classNames together.
import classNames from '../../utilities/class-names';

// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import checkProps from './check-props';

// ## Constants
import { BRAND_BAND } from '../../utilities/constants';

/**
 * The brand band provides theming capability that adds personality and improves information density and contrast.
 */
class BrandBand extends React.Component {
	constructor(props) {
		super(props);

		checkProps(BRAND_BAND, this.props);
		this.generatedId = shortid.generate();
	}

	getId() {
		return this.props.id || this.generatedId;
	}

	render() {
		const { props } = this;

		return (
			<div
				className={classNames(
					'slds-brand-band',
					{
						'slds-brand-band_small': props.size === 'small',
						'slds-brand-band_medium': props.size === 'medium',
						'slds-brand-band_large': props.size === 'large',
						'slds-brand-band_cover': props.backgroundSize === 'cover',
						'slds-brand-band_none': props.image === 'none',
						'slds-brand-band_group': props.image === 'group',
						'slds-brand-band_user': props.image === 'user',
					},
					props.className
				)}
				id={this.getId()}
				style={props.style}
			>
				{props.children}
			</div>
		);
	}
}

BrandBand.displayName = BRAND_BAND;

BrandBand.propTypes = {
	/**
	 * Primary application grid layout or a white background component such as a `Card` should be passed into this component.
	 */
	children: PropTypes.node,

	/**
	 * CSS classes that are applied to the component
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),

	/**
	 * Id of component, if desired. If not provided an id is automatically generated
	 */
	id: PropTypes.string,

	/**
	 * Image of the brand band
	 */
	image: PropTypes.oneOf(['default', 'none', 'group', 'user']),

	/**
	 * Background size of the brand band. Default is 'contain'
	 */
	backgroundSize: PropTypes.oneOf(['contain', 'cover']),

	/**
	 * Size of the brand band. Default is 'medium'
	 */
	size: PropTypes.oneOf(['small', 'medium', 'large']),

	/**
	 * Custom styles to be passed to the component
	 */
	style: PropTypes.object,
};

BrandBand.defaultProps = {
	backgroundSize: 'contain',
	image: 'default',
	size: 'medium',
};

export default BrandBand;
