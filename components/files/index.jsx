/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Files design pattern](https://lightningdesignsystem.com/components/files/) in React.
// Based on SLDS v2.4.0
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import IconSettings from '~/components/icon-settings';
import Icon from '~/components/icon';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';
import { FILES } from '../../utilities/constants';

import FileFigure from './private/file-figure';
import FileActions from './private/file-actions';

const displayName = FILES;

const propTypes = {
	/**
	 * CSS class names to be added to the container element. `array`, `object`, or `string` are accepted.
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * HTML id for component.
	 */
	id: PropTypes.string,
	/**
	 *  Description for the File
	 */
	description: PropTypes.string,
	/**
	 *  Sub Text for the File
	 */
	subText: PropTypes.string,
	/**
	 *  Link in the download action button; doesnt show download button if empty
	 */
	downloadLink: PropTypes.PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	/**
	 *  Link to External Icon
	 */
	externalIcon: PropTypes.string,
	/**
	 *  Link to File Thumbnail
	 */
	image: PropTypes.string,
	/**
	 *  Whether file preview is loading
	 */
	isLoading: PropTypes.bool,
	/**
	 *  Action to be taken on clicking on image
	 */
	onClick: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	/**
	 *  Title for the File
	 */
	title: PropTypes.string,
	/**
	 *  Type of the File; shows icon according to matching SLDS Doctype Icon
	 */
	type: PropTypes.string,
};

const defaultProps = {
	isLoading: false,
	type: 'unknown',
};

/**
 * Files is a component that represents content uploaded as an attachment.
 */
class Files extends React.Component {
	componentWillMount() {
		this.generatedId = shortid.generate();
	}
	/**
	 * Get the File's HTML id. Generate a new one if no ID present.
	 */
	getId() {
		return this.props.id || this.generatedId;
	}

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div
					id={this.getId()}
					className={classNames(
						'slds-file',
						'slds-file_card',
						this.props.className
					)}
				>
					<figure>
						<a href={this.props.onClick} className="slds-file__crop">
							<FileFigure
								isLoading={this.props.isLoading}
								image={this.props.image}
								onClick={this.props.onClick}
								title={this.props.title}
								type={this.props.type}
							/>
						</a>
						{this.props.title ? (
							<figcaption className="slds-file__title slds-file__title_card">
								<div className="slds-media__figure slds-line-height_reset">
									<span className="slds-icon_container" title="pdf">
										<Icon
											assistiveText={{ label: this.props.type }}
											category="doctype"
											name={this.props.type}
											size="x-small"
										/>
										<span className="slds-assistive-text">
											{this.props.type}
										</span>
									</span>
								</div>
								<div className="slds-media__body">
									<span
										className="slds-file__text slds-truncate"
										title={this.props.title}
									>
										{this.props.title}
									</span>
								</div>
							</figcaption>
						) : null}
					</figure>
					<FileActions
						downloadLink={this.props.downloadLink}
						title={this.props.title}
					/>
				</div>
			</IconSettings>
		);
	}
}

Files.displayName = displayName;
Files.propTypes = propTypes;
Files.defaultProps = defaultProps;

export default Files;
