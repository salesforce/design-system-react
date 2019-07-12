/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Files design pattern](https://lightningdesignsystem.com/components/files/) in React.
// Based on SLDS v2.4.0
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';
import { FILES_MORE } from '../../utilities/constants';

const displayName = FILES_MORE;

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
	crop: PropTypes.oneOf(['16-by-9', '4-by-3', '1-by-1']),

	image: PropTypes.string,
	count: PropTypes.string,
	/**
	 *  Action to be taken on clicking on image
	 */
	href: PropTypes.string,
};

const defaultProps = {
	crop: '16-by-9',
	href: 'javascript:void(0);',
};

class MoreFiles extends React.Component {
	componentWillMount() {
		this.generatedId = shortid.generate();
	}

	getId() {
		return this.props.id || this.generatedId;
	}

	render() {
		return (
			<div
				className={classNames(`slds-file slds-file_card`, this.props.className)}
				id={this.getId()}
			>
				<figure>
					<a
						href={this.props.href}
						className={classNames(
							'slds-file__crop',
							this.props.crop ? `slds-file__crop_${this.props.crop}` : null
						)}
					>
						<div className="slds-file_overlay" />
						<span className="slds-assistive-text">Preview:</span>
						<img src={this.props.image} alt="Show more files" />
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
									<span className="slds-assistive-text">more files</span>
								</span>
							</div>
						</div>
					</figcaption>
				</figure>
			</div>
		);
	}
}

MoreFiles.displayName = displayName;
MoreFiles.propTypes = propTypes;
MoreFiles.defaultProps = defaultProps;

export default MoreFiles;
