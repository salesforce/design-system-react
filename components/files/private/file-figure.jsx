/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # FileFigure Component

// Implements the [FileFigure design pattern](https://www.lightningdesignsystem.com/components/files/) in React.

import React from 'react';
import PropTypes from 'prop-types';

import { FILES_FIGURE } from '../../../utilities/constants';

import Spinner from '../../spinner';

/**
 * A file can have a image, an icon or a loading animation as its thumbnail
 */
const FileFigure = (props) => {
	if (props.isLoading) {
		return (
			<Spinner
				size="medium"
				variant="base"
				assistiveText={{ label: 'Loading' }}
				containerStyle={{ zIndex: '1' }}
			/>
		);
	}
	if (props.image) {
		return (
			<a href={props.href}>
				<span className="slds-assistive-text">Preview:</span>
				<img src={props.image} alt={props.title || props.type} />
			</a>
		);
	}
	return (
		<React.Fragment>
			<span className="slds-assistive-text">Preview:</span>
			<span
				className="slds-file__icon slds-icon_container"
				title={props.title || props.type}
			>
				{React.cloneElement(props.icon, {
					size: null,
				})}
			</span>
		</React.Fragment>
	);
};

FileFigure.displayName = FILES_FIGURE;

FileFigure.propTypes = {
	isLoading: PropTypes.bool,
	image: PropTypes.string,
	type: PropTypes.string,
	title: PropTypes.string,
	href: PropTypes.string,
};

FileFigure.defaultProps = {
	isLoading: false,
	type: 'unknown',
};

export default FileFigure;
