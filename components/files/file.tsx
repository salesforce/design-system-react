/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Files design pattern](https://lightningdesignsystem.com/components/files/) in React.
// Based on SLDS v2.4.0
import React, { type ReactElement, type ReactNode } from 'react';
import classNames from 'classnames';

import { FILES_FILE } from '../../utilities/constants';
import generateId from '../../utilities/generate-id';

import FileFigure from './private/file-figure';
import FileActions from './private/file-actions';

const displayName = FILES_FILE;

export interface FileAssistiveText {
	download?: string;
	image?: string;
	link?: string;
	loading?: string;
	moreActions?: string;
}

export interface FileProps {
	/**
	 * **Assistive text for accessibility**
	 *  * download - description for the download button if present
	 *  * image - description for the file image
	 *  * link - description for the file link
	 *  * loading - description for the loading spinner if present
	 *  * moreActions - description for the more actions dropdown if present
	 */
	assistiveText?: FileAssistiveText;
	/**
	 * CSS class names to be added to the container element. `array`, `object`, or `string` are accepted.
	 */
	className?: unknown[] | Record<string, unknown> | string;
	/**
	 * Controls different cropping aspect ratios for the component
	 */
	crop?: '16-by-9' | '4-by-3' | '1-by-1';
	/**
	 * Icon to be shown in top left corner of File component. Accepts an Icon component
	 */
	externalIcon?: ReactElement<{ containerClassName?: string }>;
	/**
	 *  Controls whether the file's title should be visible
	 */
	hasNoVisibleTitle?: boolean;
	/**
	 * Href attribute for image
	 */
	href?: string;
	/**
	 * Icon associated with the file. Accepts an Icon component
	 */
	icon?: ReactElement<{ size?: string | null }>;
	/**
	 * HTML id for component.
	 */
	id?: string;
	/**
	 * Link to thumbnail image
	 */
	image?: string;
	/**
	 * Controls whether file preview is loading
	 */
	isLoading?: boolean;
	/**
	 * Labels for the File Component
	 * * image - title for the file. Required.
	 */
	labels?: {
		title?: string;
	};
	/**
	 * Dropdown for more actions button; doesn't show more actions button if empty
	 */
	moreActionsDropdown?: ReactElement<Record<string, unknown>>;
	/**
	 * Action to be done on clicking download button; doesn't show download button if empty
	 */
	onClickDownload?: (event: React.MouseEvent) => void;
	/**
	 * Function that is called when image is clicked; can be used instead of href for more advanced event handling
	 */
	onClickImage?: (event: React.MouseEvent) => void;
}

const defaultProps: Partial<FileProps> = {
	assistiveText: {
		download: 'download',
		link: 'Preview:',
		loading: 'loading',
		moreActions: 'more actions',
	},
	crop: '16-by-9',
	href: '#',
	isLoading: false,
	hasNoVisibleTitle: false,
};

/**
 * File is a component that represents content uploaded as an attachment.
 */
class File extends React.Component<FileProps> {
	static displayName = displayName;

	static defaultProps = defaultProps;

	static injectMoreActionsStyles(): ReactNode {
		return (
			<style>{`
					.dsr-file__more-actions-dropdown  ul.dropdown__list li.slds-dropdown__item > a:before
					{ background: none; }
					.dsr-file__more-actions-dropdown  ul.dropdown__list li.slds-dropdown__item > a:after
					{ background: none; }
					.dsr-file__more-actions > button:first-child
					{ border-radius: 0 0.25rem 0.25rem 0!important;}
			`}</style>
		);
	}

	generatedId: string;

	constructor(props: FileProps) {
		super(props);

		this.generatedId = generateId();
	}

	/**
	 * Get the File's HTML id. Generate a new one if no ID present.
	 */
	getId() {
		return this.props.id || this.generatedId;
	}

	handleOnClickImage = (event: React.MouseEvent) => {
		if (this.props.href === '#') {
			event.preventDefault();
		}

		if (this.props.onClickImage) {
			this.props.onClickImage(event);
		}
	};

	render() {
		const assistiveText = {
			...defaultProps.assistiveText,
			...this.props.assistiveText,
		};

		return (
			<div
				id={this.getId()}
				className={classNames(
					'slds-file',
					'slds-file_card',
					!this.props.hasNoVisibleTitle ? 'slds-has-title' : null,
					this.props.className as string
				)}
			>
				<figure>
					<a
						href={this.props.href}
						className={classNames(
							'slds-file__crop',
							this.props.crop ? `slds-file__crop_${this.props.crop}` : null
						)}
						onClick={this.handleOnClickImage}
					>
						<FileFigure
							assistiveText={assistiveText}
							labels={{
								title: this.props.labels?.title,
							}}
							isLoading={this.props.isLoading}
							image={this.props.image}
							icon={this.props.icon}
						/>
					</a>
					{!this.props.hasNoVisibleTitle ? (
						<figcaption className="slds-file__title slds-file__title_card">
							<div className="slds-media__figure slds-line-height_reset">
								{this.props.icon
									? React.cloneElement(this.props.icon, {
											size: 'x-small',
										})
									: null}
							</div>
							<div className="slds-media__body">
								<span
									className="slds-file__text slds-truncate"
									title={this.props.labels?.title}
								>
									{this.props.labels?.title}
								</span>
							</div>
						</figcaption>
					) : null}
				</figure>
				{this.props.externalIcon ? (
					<div className="slds-file__external-icon">
						{React.cloneElement(this.props.externalIcon, {
							containerClassName: 'slds-file__icon slds-icon_container',
						})}
					</div>
				) : null}
				{this.props.moreActionsDropdown ? File.injectMoreActionsStyles() : null}
				<FileActions
					assistiveText={assistiveText}
					hasNoVisibleTitle={this.props.hasNoVisibleTitle}
					onClickDownload={this.props.onClickDownload}
					moreActionsDropdown={this.props.moreActionsDropdown}
				/>
			</div>
		);
	}
}

export default File;
