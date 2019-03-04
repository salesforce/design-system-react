/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable jsx-a11y/no-interactive-element-to-noninteractive-role */

// # TabItem Component

// ## Dependencies
import IconSettings from '~/components/icon-settings';
import Icon from '~/components/icon';

// ### React
import React from 'react';
import PropTypes from 'prop-types';

// ### classNames
import classNames from 'classnames';

// ## Constants
import { VISUAL_PICKER_COVERABLE } from '../../../utilities/constants';

const propTypes = {
	/**
	 *  Name for the option input tag
	 */
	name: PropTypes.string,
	/**
	 *  Value for the option input tag
	 */
	value: PropTypes.string,
	/**
	 *  Title for the option
	 */
	title: PropTypes.string,
	/**
	 *  Description for the option
	 */
	description: PropTypes.string,
	/**
	 *   Icon inside option box
	 */
	icon: PropTypes.string,
	/**
	 *   Whether to disable option
	 */
	disabled: PropTypes.bool,
};

const defaultProps = {
	name: 'options',
	disabled: false,
};

class Coverable extends React.Component {
	render() {
		return (
			<div
				className={classNames(
					`slds-visual-picker`,
					`slds-visual-picker_${this.props.size}`
				)}
			>
				<input
					type={this.props.type}
					id={`visual-picker-${this.props.index}`}
					name={this.props.name}
					disabled={this.props.disabled}
					value={
						this.props.value
							? this.props.value
							: `visual-picker-${this.props.index}`
					}
				/>
				<label htmlFor={`visual-picker-${this.props.index}`}>
					<span className="slds-visual-picker__figure slds-visual-picker__icon slds-align_absolute-center">
						<span className="slds-is-selected">
							<IconSettings iconPath="/assets/icons">
								<Icon
									category="utility"
									name="check"
									colorVariant="base"
									size="large"
								/>
							</IconSettings>
						</span>
						<span className="slds-is-not-selected">
							<IconSettings iconPath="/assets/icons">
								<Icon
									category="utility"
									name={this.props.icon}
									colorVariant="default"
									size="large"
								/>
							</IconSettings>
						</span>
					</span>
					<span className="slds-visual-picker__body">
						<span className="slds-text-heading_small">{this.props.title}</span>
						<span className="slds-text-title">{this.props.description}</span>
					</span>
				</label>
			</div>
		);
	}
}

Coverable.displayName = VISUAL_PICKER_COVERABLE;
Coverable.propTypes = propTypes;
Coverable.defaultProps = defaultProps;

export default Coverable;
