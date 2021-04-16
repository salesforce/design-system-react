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
import { FILES } from '../../utilities/constants';

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
	 * Crop ratio for the file preview image
	 */
	crop: PropTypes.oneOf(['16-by-9', '4-by-3', '1-by-1']),
	/**
	 * Column class names to be added each file in the grid
	 */
	columnClassName: PropTypes.string,
};

const defaultProps = {
	crop: '4-by-3',
};

/**
 * Files is a component that wraps multiple file components that represent an attachment
 */
class Files extends React.Component {
	constructor(props) {
		super(props);

		this.generatedId = shortid.generate();
	}

	/**
	 * Get the File's HTML id. Generate a new one if no ID present.
	 */
	getId() {
		return this.props.id || this.generatedId;
	}

	render() {
		const files = React.Children.map(this.props.children, (option) => (
			<li
				className={classNames(
					`slds-p-horizontal_xx-small slds-size_1-of-3 slds-medium-size_1-of-4`,
					this.props.columnClassName
				)}
			>
				{React.cloneElement(option, {
					crop: option.props.crop ? option.props.crop : this.props.crop,
				})}
			</li>
		));

		return (
			<ul
				className={classNames(
					'slds-grid slds-grid_pull-padded',
					this.props.className
				)}
				id={this.getId()}
			>
				{files}
			</ul>
		);
	}
}

Files.displayName = displayName;
Files.propTypes = propTypes;
Files.defaultProps = defaultProps;

export default Files;
