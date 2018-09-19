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

// ## Constants
import { BRAND_BAND } from '../../utilities/constants';

/**
 * The brand band provides theming capability that adds personality and improves information density and contrast.
 */
class BrandBand extends React.Component {
	constructor(props) {
		super(props);
		this.generatedId = shortid.generate();
	}

	getId() {
		return this.props.id || this.generatedId;
	}

	injectLightningBlueStyles() {
		return (
			<style>{`#${this.getId()}.slds-brand-band:before {
	background-image: url(/assets/images/themes/oneSalesforce/banner-brand-default.png), linear-gradient(to top, rgba(175, 197, 222, 0) 0, #1B5F9E);
}
#${this.getId()}.slds-brand-band:after {
	background-image: linear-gradient(to bottom, rgba(175, 197, 222, 0) 60%, #AFC5DE);
}`}</style>
		);
	}

	render() {
		const props = this.props;

		return (
			<div
				style={{
					background:
						props.theme === 'lightning-blue'
							? 'rgb(176, 196, 223)'
							: 'rgb(250, 250, 249)',
					height: '100%',
					position: 'relative',
					width: '100%',
					zIndex: 1,
					...props.styleContainer,
				}}
			>
				<div
					className={classNames(
						'slds-brand-band',
						{
							'slds-brand-band_small': props.size === 'small',
							'slds-brand-band_medium': props.size === 'medium',
							'slds-brand-band_large': props.size === 'large',

							'slds-brand-band_none': props.image === 'none',
						},
						props.className
					)}
					id={this.getId()}
					style={props.style}
				>
					{props.theme === 'lightning-blue' && this.injectLightningBlueStyles()}
					{props.children}
				</div>
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
	image: PropTypes.oneOf(['default', 'none']),

	/**
	 * Size of the brand band. Default is 'medium'
	 */
	size: PropTypes.oneOf(['small', 'medium', 'large']),

	/**
	 * Custom styles to be passed to the component
	 */
	style: PropTypes.object,

	/**
	 * Custom styles to be passed to the component container
	 */
	styleContainer: PropTypes.object,

	/**
	 * Different brand band styling
	 */
	theme: PropTypes.oneOf(['default', 'lightning-blue']),
};

BrandBand.defaultProps = {
	image: 'default',
	size: 'medium',
	theme: 'default',
};

export default BrandBand;
