/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # FileFigure Component

// Implements the [FileFigure design pattern](https://www.lightningdesignsystem.com/components/files/) in React.

import React from 'react';
import PropTypes from 'prop-types';
import Icon from '~/components/icon';

import { FILES_FIGURE } from '../../../utilities/constants';

/**
 * A file can have a image, an icon or a loading animation as its thumbnail
 */
const FileFigure = (props) => {
	if (props.isLoading) {
		return (
			<div role="status" className="slds-spinner slds-spinner_medium">
				<span className="slds-assistive-text">Loading</span>
				<div className="slds-spinner__dot-a" />
				<div className="slds-spinner__dot-b" />
			</div>
		);
	} else if (props.image) {
		return (
			<React.Fragment>
				<span className="slds-assistive-text">Preview:</span>
				<img src={props.image} alt={props.title || props.type} />
			</React.Fragment>
		);
	}
	return (
		<React.Fragment>
			<span className="slds-assistive-text">Preview:</span>
			<span
				className="slds-file__icon slds-icon_container"
				title={props.title || props.type}
			>
				<Icon
					assistiveText={{ label: props.title || props.type }}
					category="doctype"
					name={props.type}
				/>
			</span>
		</React.Fragment>
	);
};

FileFigure.displayName = FILES_FIGURE;

FileFigure.propTypes = {
	isLoading: PropTypes.bool,
	image: PropTypes.string,
	onClick: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	type: PropTypes.string,
	title: PropTypes.string,
};

FileFigure.defaultProps = {
	isLoading: false,
	type: 'unknown',
};

export default FileFigure;
