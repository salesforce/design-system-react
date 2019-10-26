/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Summary Detail design pattern](https://lightningdesignsystem.com/components/summary-detail/) in React.
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

import assign from 'lodash.assign';

import Icon from '../icon';

import { SUMMARY_DETAIL } from '../../utilities/constants';

const displayName = SUMMARY_DETAIL;

const propTypes = {
	assistiveText: PropTypes.shape({
		toggleButton: PropTypes.string,
	}),
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
	 * Title for the summary
	 */
	title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	/**
	 * Summary in detail
	 */
	detail: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	/**
	 * Sub-title for the summary.
	 */
	subTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	/**
	 * Accepts a badge that will be shown on right of the title
	 */
	badge: PropTypes.node,
	/**
	 * Whether summary details are visible
	 */
	isOpen: PropTypes.bool,
	/**
	 * Callback function to be triggered when details is toggled
	 */
	onToggleDetails: PropTypes.func,
};

const defaultProps = {
	assistiveText: {
		toggleButton: 'Toggle details for Summary Title',
	},
};

/**
 * Use Summary Detail to show and hide details while always showing a summary
 */
class SummaryDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
		};
		this.generatedId = shortid.generate();
	}

	/**
	 * Get the Summary Detail Component's HTML id. Generate a new one if no ID present.
	 */
	getId = () => {
		return this.props.id || this.generatedId;
	};

	/**
	 * Function that checks if toggling is controlled or uncontrolled,
	 * and accordingly returns if the details section is open
	 */
	getIsOpen = () => {
		if (typeof this.props.isOpen === 'boolean') return this.props.isOpen;
		return this.state.isOpen;
	};

	/**
	 * Function to handle opening and closing of details section
	 */
	handleToggle = (event) => {
		if (typeof this.props.onToggleDetails === 'function')
			this.props.onToggleDetails(event);
		this.setState({ isOpen: !this.getIsOpen() });
	};

	render() {
		const assistiveText = assign(
			{},
			defaultProps.assistiveText,
			this.props.assistiveText
		);

		const title = (
			<h3
				className={classNames(`slds-text-heading_small`, `slds-truncate`, {
					'slds-p-right_small': this.props.badge,
				})}
				title={this.props.title}
			>
				{this.props.title}
			</h3>
		);

		return (
			<div
				id={this.getId()}
				className={classNames(
					`slds-summary-detail`,
					{ 'slds-is-open': this.getIsOpen() },
					this.props.className
				)}
			>
				<button
					type="button"
					className="slds-button slds-button_icon slds-m-right_x-small"
					title={assistiveText.toggleButton}
					onClick={(event) => this.handleToggle(event)}
					aria-controls={`${this.getId()}-details`}
					aria-expanded={this.getIsOpen()}
				>
					<Icon
						assistiveText={{
							label: assistiveText.toggleButton,
						}}
						category="utility"
						className="slds-summary-detail__action-icon"
						size="x-small"
						name="switch"
					/>
				</button>
				<div>
					<div className="slds-summary-detail__title">
						{this.props.subTitle || this.props.badge ? (
							<React.Fragment>
								<div className="slds-grid">
									{title}
									{this.props.badge}
								</div>
								{this.props.subTitle ? <p>{this.props.subTitle}</p> : null}
							</React.Fragment>
						) : (
							title
						)}
					</div>
					<div
						aria-hidden={!this.getIsOpen()}
						className="slds-summary-detail__content"
						id={`${this.getId()}-details`}
					>
						{typeof this.props.detail === 'string' ? (
							<p>{this.props.detail}</p>
						) : (
							this.props.detail
						)}
					</div>
				</div>
			</div>
		);
	}
}

SummaryDetail.displayName = displayName;
SummaryDetail.propTypes = propTypes;
SummaryDetail.defaultProps = defaultProps;

export default SummaryDetail;
