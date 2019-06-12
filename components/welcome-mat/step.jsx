/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Welcome Mat Step design pattern](https://lightningdesignsystem.com/components/welcome-mat/) in React.
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
import { WELCOME_MAT_STEP } from '../../utilities/constants';

const displayName = WELCOME_MAT_STEP;

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

	title: PropTypes.string,
	description: PropTypes.string,
	icon: PropTypes.string,
	onClick: PropTypes.string,
	isComplete: PropTypes.bool,
	isInfoOnly: PropTypes.bool,
};

const defaultProps = {
	isComplete: false,
	isInfoOnly: false,
};

/**
 * Step component item represents a step in a Welcome Mat
 */
class Step extends React.Component {
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
		const body = (
			<React.Fragment>
				<div className="slds-media__figure slds-media__figure_fixed-width slds-align_absolute-center">
					<div className="slds-welcome-mat__tile-figure">
						<div className="slds-welcome-mat__tile-icon-container">
							<Icon category="utility" name={this.props.icon} />
							{this.props.isComplete ? (
								<Icon category="action" name="check" />
							) : null}
						</div>
					</div>
				</div>
				<div className="slds-media__body">
					<div className="slds-welcome-mat__tile-body">
						<h3 className="slds-welcome-mat__tile-title">{this.props.title}</h3>
						<p className="slds-welcome-mat__tile-description">
							{this.props.description}
						</p>
					</div>
				</div>
			</React.Fragment>
		);

		return (
			<IconSettings iconPath="/assets/icons">
				<div
					className={classNames(
						'slds-welcome-mat__tile',
						this.props.isInfoOnly ? 'slds-welcome-mat__tile_info-only' : null,
						this.props.isComplete && !this.props.isInfoOnly
							? 'slds-welcome-mat__tile_complete'
							: null
					)}
				>
					{this.props.isInfoOnly ? (
						<div className="slds-media">{body}</div>
					) : (
						<a
							href={this.props.onClick}
							className="slds-box slds-box_link slds-media"
						>
							{body}
						</a>
					)}
				</div>
			</IconSettings>
		);
	}
}

Step.displayName = displayName;
Step.propTypes = propTypes;
Step.defaultProps = defaultProps;

export default Step;
