/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # FileFigure Component

// Implements the [FileFigure design pattern](https://www.lightningdesignsystem.com/components/files/) in React.

import React, { type ReactElement } from 'react';

import { FILES_FIGURE } from '../../../utilities/constants';

import Spinner from '../../spinner';

export interface FileFigureAssistiveText {
	image?: string;
	link?: string;
	loading?: string;
}

export interface FileFigureProps {
	assistiveText?: FileFigureAssistiveText;
	/**
	 *  Icon for the file, shown when there is no image and it is not loading.
	 */
	icon?: ReactElement<{ size?: string | null }>;
	/**
	 *  Image/Figure for the file
	 */
	image?: string;
	/**
	 *  Whether the file figure is loading
	 */
	isLoading?: boolean;
	/**
	 *  Labels for the file figure component
	 */
	labels?: {
		title?: string;
	};
}

/**
 * A file can have a image, an icon or a loading animation as its thumbnail
 */
const FileFigure = ({
	isLoading = false,
	assistiveText = {},
	image,
	labels = {},
	icon,
}: FileFigureProps) => {
	if (isLoading) {
		return (
			<React.Fragment>
				<span className="slds-assistive-text">{assistiveText.link}</span>
				<Spinner
					size="medium"
					variant="base"
					assistiveText={{ label: assistiveText.loading }}
					containerStyle={{ zIndex: '1' }}
				/>
			</React.Fragment>
		);
	}
	if (image) {
		return (
			<React.Fragment>
				<span className="slds-assistive-text">{assistiveText.link}</span>
				<img alt={assistiveText.image || labels.title} src={image} />
			</React.Fragment>
		);
	}
	return (
		<React.Fragment>
			<span className="slds-assistive-text">{assistiveText.link}</span>
			<span
				className="slds-file__icon slds-icon_container"
				title={labels.title}
			>
				{icon
					? React.cloneElement(icon, {
							size: null,
						})
					: null}
			</span>
		</React.Fragment>
	);
};

FileFigure.displayName = FILES_FIGURE;

export default FileFigure;
