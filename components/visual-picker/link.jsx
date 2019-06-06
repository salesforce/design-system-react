/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Visual Picker Link design pattern](https://lightningdesignsystem.com/components/visual-picker/) in React.
// Based on SLDS v2.4.5
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { VISUAL_PICKER_LINK } from '../../utilities/constants';

const propTypes = {
	/**
	 * HTML id for component.
	 */
	id: PropTypes.string,
	/**
	 * CSS classes to be added to tag with `.slds-form-element`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	href: PropTypes.string,
	icon: PropTypes.string,
	title: PropTypes.string,
	description: PropTypes.string,
};

class VisualPickerLink extends React.Component {
	render() {
		return (
			<a
				href={this.props.href}
				className={classNames(
					'slds-box',
					'slds-box_link',
					'slds-box_x-small',
					'slds-media',
					this.props.className
				)}
			>
				<div className="slds-media__figure slds-media__figure_fixed-width slds-align_absolute-center slds-m-left_xx-small">
					{this.props.icon}
				</div>
				<div className="slds-media__body slds-border_left slds-p-around_small">
					<h2
						className="slds-truncate slds-text-heading_small"
						title={this.props.title}
					>
						{this.props.title}
					</h2>
					<p className="slds-m-top_small">{this.props.description}</p>
				</div>
			</a>
		);
	}
}
VisualPickerLink.displayName = VISUAL_PICKER_LINK;
VisualPickerLink.propTypes = propTypes;

export default VisualPickerLink;
