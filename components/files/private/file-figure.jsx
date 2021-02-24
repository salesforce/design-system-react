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
			<React.Fragment>
				<span className="slds-assistive-text">{props.assistiveText.link}</span>
				<Spinner
					size="medium"
					variant="base"
					assistiveText={{ label: props.assistiveText.loading }}
					containerStyle={{ zIndex: '1' }}
				/>
			</React.Fragment>
		);
	}
	if (props.image) {
		return (
			<React.Fragment>
				<span className="slds-assistive-text">{props.assistiveText.link}</span>
				<img
					alt={props.assistiveText.image || props.labels.title}
					src={props.image}
				/>
			</React.Fragment>
		);
	}
	return (
		<React.Fragment>
			<span className="slds-assistive-text">{props.assistiveText.link}</span>
			<span
				className="slds-file__icon slds-icon_container"
				title={props.labels.title}
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
	assistiveText: PropTypes.shape({
		image: PropTypes.string,
	}),
	/**
	 *  Whether the file figure is loading
	 */
	isLoading: PropTypes.bool,
	/**
	 *  Image/Figure for the file
	 */
	image: PropTypes.string,
	/**
	 *  Labels for the file figure component
	 */
	labels: PropTypes.shape({
		title: PropTypes.string.isRequired,
	}),
};

FileFigure.defaultProps = {
	isLoading: false,
};

export default FileFigure;
