/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable jsx-a11y/no-interactive-element-to-noninteractive-role */

// ## Dependencies
import IconSettings from '~/components/icon-settings';
import Icon from '~/components/icon';

// ### React
import React from 'react';
import PropTypes from 'prop-types';

// ### classNames
import classNames from 'classnames';

// ## Constants
import { VISUAL_PICKER_NON_COVERABLE } from '../../../utilities/constants';

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
	 *  Content inside inside option box
	 */
	content: PropTypes.object,
	/**
	 *   Whether to disable option
	 */
	disabled: PropTypes.bool,
};

const defaultProps = {
	name: 'options',
	value: ``,
	disabled: false,
};

class NonCoverable extends React.Component {
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
					<span className="slds-visual-picker__figure slds-visual-picker__text slds-align_absolute-center">
						{this.props.content}
					</span>
					<span className="slds-visual-picker__body">
						<span className="slds-text-heading_small">{this.props.title}</span>
						<span className="slds-text-title">{this.props.description}</span>
					</span>
					<span className="slds-icon_container slds-visual-picker__text-check">
						<IconSettings iconPath="/assets/icons">
							<Icon
								assistiveText={this.props.assistiveText}
								category="utility"
								name="check"
								colorVariant="base"
								size="x-small"
							/>
						</IconSettings>
					</span>
				</label>
			</div>
		);
	}
}

NonCoverable.displayName = VISUAL_PICKER_NON_COVERABLE;
NonCoverable.propTypes = propTypes;
NonCoverable.defaultProps = defaultProps;

export default NonCoverable;
