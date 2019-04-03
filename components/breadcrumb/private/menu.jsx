/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/* eslint-disable react/no-did-update-set-state */

const displayName = 'Breadcrumbs-Overflow-Menu';
const propTypes = {
	items: PropTypes.array,
};
const defaultProps = {};
class Menu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isMenuOpen: false,
		};
	}

	toggleMenu = () => {
		this.setState((prevState) => ({
			isMenuOpen: !prevState.isMenuOpen,
		}));
	};
	render() {
		return (
			<div
				className={classNames({
					'slds-dropdown-trigger slds-dropdown-trigger_click': true,
					'slds-is-open': this.state.isMenuOpen,
				})}
			>
				<button
					className="slds-button slds-button_icon slds-button_icon-border-filled slds-button_icon-x-small"
					aria-haspopup="true"
					title="Show More"
					onClick={this.toggleMenu}
				>
					<svg className="slds-button__icon" aria-hidden="true">
						<use
							xmlnsXlink="http://www.w3.org/1999/xlink"
							xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#threedots"
						/>
					</svg>
					<span className="slds-assistive-text">Show More</span>
				</button>
				<div className="slds-dropdown slds-dropdown_left slds-dropdown_actions slds-is-open">
					<ul className="slds-dropdown__list" role="menu">
						{this.props.items.map((item, index) => (
							/* eslint-disable react/no-array-index-key */

							<li
								className="slds-dropdown__item"
								role="presentation"
								key={`menuItem${index}`}
							>
								{item}
							</li>
						))}
					</ul>
				</div>
			</div>
		);
	}
}

Menu.displayName = displayName;
Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

export default Menu;
