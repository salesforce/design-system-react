/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Files design pattern](https://lightningdesignsystem.com/components/files/) in React.
// Based on SLDS v2.4.0
import React from 'react';
import classNames from 'classnames';

import { FILES_MORE } from '../../utilities/constants';
import generateId from '../../utilities/generate-id';

const displayName = FILES_MORE;

export interface MoreFilesAssistiveText {
	count?: string;
	image?: string;
	link?: string;
}

export interface MoreFilesProps {
	/**
	 * **Assistive text for accessibility**
	 *  * count - description for the more files count
	 *  * image - description for the image
	 *  * link - description for the more files link
	 */
	assistiveText?: MoreFilesAssistiveText;
	/**
	 * CSS class names to be added to the container element. `array`, `object`, or `string` are accepted.
	 */
	className?: unknown[] | Record<string, unknown> | string;
	/**
	 * Controls the number of additional files that is displayed
	 */
	count?: string;
	/**
	 * Controls different cropping aspect ratios for the component
	 */
	crop?: '16-by-9' | '4-by-3' | '1-by-1';
	/**
	 * Href attribute for image
	 */
	href?: string;
	/**
	 * HTML id for component.
	 */
	id?: string;
	/**
	 * Link to thumbnail image
	 */
	image?: string;
}

const defaultProps: Partial<MoreFilesProps> = {
	assistiveText: {
		count: 'more files',
		image: 'Show more files',
		link: 'Preview:',
	},
	crop: '16-by-9',
	href: '#',
};

/**
 * MoreFiles is a component that represents a number of file contents uploaded as an attachment.
 */
class MoreFiles extends React.Component<MoreFilesProps> {
	static displayName = displayName;

	static defaultProps = defaultProps;

	generatedId: string;

	constructor(props: MoreFilesProps) {
		super(props);

		this.generatedId = generateId();
	}

	getId() {
		return this.props.id || this.generatedId;
	}

	render() {
		const assistiveText = {
			...defaultProps.assistiveText,
			...this.props.assistiveText,
		};

		return (
			<div
				className={classNames(
					`slds-file slds-file_card`,
					this.props.className as string
				)}
				id={this.getId()}
			>
				<figure>
					<a
						href={this.props.href}
						className={classNames(
							'slds-file__crop',
							this.props.crop ? `slds-file__crop_${this.props.crop}` : null
						)}
						onClick={(event) =>
							this.props.href === '#' && event.preventDefault()
						}
					>
						<div className="slds-file_overlay" />
						<span className="slds-assistive-text">{assistiveText.link}</span>
						<img src={this.props.image} alt={assistiveText.image} />
					</a>
					<figcaption className="slds-file__title slds-file__title_overlay slds-align_absolute-center slds-text-heading_large">
						<div className="slds-media slds-media_small slds-media_center">
							<div className="slds-media__figure slds-line-height_reset" />
							<div className="slds-media__body">
								<span
									className="slds-file__text slds-truncate"
									title={this.props.count}
								>
									<span>{this.props.count}</span>
									<span className="slds-assistive-text">
										{assistiveText.count}
									</span>
								</span>
							</div>
						</div>
					</figcaption>
				</figure>
			</div>
		);
	}
}

export default MoreFiles;
