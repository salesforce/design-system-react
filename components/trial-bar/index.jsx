/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Trial Bar design pattern](https://lightningdesignsystem.com/components/trial-bar/) in React.
// Based on SLDS v2.4.5
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import assign from 'lodash.assign';

import { TRIAL_BAR } from '../../utilities/constants';

const propTypes = {
	/**
	 * **Assistive text for accessibility**
	 * This object is merged with the default props object on every render.
	 * * `backIcon`: Used for the back icon.
	 * * `helpIcon`: Used for the help icon.
	 * * `icon`: Used for the main icon next to the header title.
	 * * _Tested with snapshot testing._
	 */
	assistiveText: PropTypes.shape({
		backIcon: PropTypes.string,
		helpIcon: PropTypes.string,
		icon: PropTypes.string,
	}),
	/**
	 * Renders the actions section of the trial bar.
	 */
	labels: PropTypes.shape({
		/* Amount of time left in trial, e.g. `30` */
		timeLeft: PropTypes.string,
		/* Unit of the amount of time left, e.g. `days` */
		timeLeftUnit: PropTypes.string,
	}),
	/**
	 * Renders the actions section of the trial bar.
	 */
	children: PropTypes.node,
	/**
	 * Customs styles to be applied to the component.
	 */
	style: PropTypes.object,
	/**
	 * CSS classes to be added to the component.
	 */
	className: PropTypes.string,
	/**
	 * Renders the actions section of the trial bar.
	 */
	onRenderActions: PropTypes.func,
};

const defaultProps = {
	labels: {
		complete: 'Complete',
	},
};

/**
 * Trial bar components are used to provide an interactive and educational prospect experience for setup.
 */
class TrialBar extends React.Component {
	render() {
		const labels = assign({}, defaultProps.labels, this.props.labels);

		return (
			<div className="slds-trial-header slds-grid">
				<div className="slds-grid">
					<button className="slds-button slds-m-right_small">
						Take the salesforce tour
					</button>
					<div
						className={classNames(
							'slds-grid slds-dropdown-trigger slds-dropdown-trigger_click',
							props.tourMenuOpen ? 'slds-is-open' : null
						)}
					>
						<button className="slds-button" aria-haspopup="true">
							<SvgIcon
								className="slds-button__icon slds-button__icon_left"
								sprite="utility"
								symbol="right"
							/>
							Choose your tour
						</button>
						<Menu className="slds-dropdown_inverse slds-dropdown_left">
							<MenuList>
								<MenuItem
									tabIndex="0"
									className="slds-is-selected"
									title="Completed: Conquer Your Cases"
								>
									<SvgIcon
										className="slds-icon slds-icon_selected slds-icon_x-small slds-m-right_x-small"
										sprite="utility"
										symbol="check"
									/>
									<span className="slds-assistive-text">Completed:</span>{' '}
									Conquer Your Cases
								</MenuItem>
								<MenuItem title="Automate For Speed">
									<SvgIcon
										className="slds-icon slds-icon_selected slds-icon_x-small slds-m-right_x-small"
										sprite="utility"
										symbol="check"
									/>
									Automate For Speed
								</MenuItem>
								<MenuItem title="Share Your Knowledge">
									<SvgIcon
										className="slds-icon slds-icon_selected slds-icon_x-small slds-m-right_x-small"
										sprite="utility"
										symbol="check"
									/>
									Share Your Knowledge
								</MenuItem>
								<MenuItem title="Finish it up in a Flash">
									<SvgIcon
										className="slds-icon slds-icon_selected slds-icon_x-small slds-m-right_x-small"
										sprite="utility"
										symbol="check"
									/>
									Finish it up in a Flash
								</MenuItem>
								<li className="slds-has-divider_top-space" role="separator" />
								<MenuItem title="Import Contacts and Accounts">
									<SvgIcon
										className="slds-icon slds-icon_x-small slds-m-right_x-small"
										sprite="utility"
										symbol="upload"
									/>
									Import Contacts and Accounts
								</MenuItem>
							</MenuList>
						</Menu>
					</div>
				</div>
				<div className="slds-grid slds-grid_vertical-align-center slds-col_bump-left">
					<span className="slds-box slds-box_xx-small slds-theme_default">
						30
					</span>
					<span className="slds-m-horizontal_x-small">Days left in trial</span>
					<a
						href="javascript:void(0);"
						className="slds-button slds-button_success"
					>
						Subscribe Now
					</a>
				</div>
			</div>
		);
	}
}

TrialBar.displayName = TRIAL_BAR;
TrialBar.propTypes = propTypes;
TrialBar.defaultProps = defaultProps;

export default TrialBar;
