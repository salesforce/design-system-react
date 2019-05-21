/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Expandable Section Component

// Implements the [Expandable Section design pattern](https://www.lightningdesignsystem.com/components/expandable-section/) in React.

import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import shortid from 'shortid';

import Button from '../button';

// ### Event Helpers
// import KEYS from '../../utilities/key-code';
// import EventUtil from '../../utilities/event';

import { EXPANDABLE_SECTION } from '../../utilities/constants';

const propTypes = {
	/**
	 * **Assistive text for accessibility.**
	 * * `toggleSection`: Label for the icon that expands / collapses the section
	 */
	assistiveText: PropTypes.shape({
		toggleSection: PropTypes.string,
	}),
	/**
	 * Contents of the section
	 */
	children: PropTypes.node,
	/**
	 * Class names to be added to the `slds-section` classed node
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Unique identifier for the expandable section. The id is automatically generated if not provided
	 */
	id: PropTypes.string,
	/**
	 * Specifies whether the section is expanded or collapsed. If not provided, component will use its own state to manage this itself
	 */
	isOpen: PropTypes.bool,
	/**
	 * Specifies whether the section can be expanded or collapsed. Defaults to `false`
	 */
	nonCollapsible: PropTypes.bool,
	/**
	 * Callback for when the section is expanded or collapsed. Passes event object and data object with `isOpen` bool.
	 */
	onToggleOpen: PropTypes.func,
	/**
	 * The title for the section
	 */
	title: PropTypes.string.isRequired,
};

const defaultProps = {
	assistiveText: {
		toggleSection: 'Toggle visibility of section',
	},
	nonCollapsible: false,
};

/**
 * Toggle visibility of section content with the Expandable Section
 */
class ExpandableSection extends React.Component {
	constructor(props) {
		super(props);
		this.generatedId = shortid.generate();
		this.state = {
			isOpen: true,
		};
	}

	getId = () => this.props.id || this.generatedId;

	toggleOpen = (event) => {
		if (this.props.onToggleOpen) {
			this.props.onToggleOpen(event, {
				isOpen: this.props.isOpen,
			});
		} else {
			this.setState((prevState) => ({
				isOpen: !prevState.isOpen,
			}));
		}
	};

	render() {
		const contentId = `${this.getId()}-expanded-section-content`;
		const isOpen =
			this.props.isOpen !== undefined ? this.props.isOpen : this.state.isOpen;
		const buttonAriaProps = {
			'aria-controls': contentId,
			'aria-expanded': !!isOpen,
		};
		const titleNode = (
			<span
				className={classNames('slds-truncate', {
					'slds-p-horizontal_small': !!this.props.nonCollapsible,
				})}
				title={this.props.title}
			>
				{this.props.title}
			</span>
		);

		return (
			<div
				className={classNames(
					'slds-section',
					{
						'slds-is-open': isOpen,
					},
					this.props.className
				)}
			>
				<h3
					className={classNames('slds-section__title', {
						'slds-theme_shade': !!this.props.nonCollapsible,
					})}
				>
					{!this.props.nonCollapsible ? (
						<Button
							assistiveText={{
								icon: this.props.assistiveText.toggleSection,
							}}
							iconCategory="utility"
							iconClassName="slds-section__title-action-icon slds-button__icon_left"
							iconName="switch"
							onClick={this.toggleOpen}
							className="slds-section__title-action"
							variant="base"
							{...buttonAriaProps}
						>
							{titleNode}
						</Button>
					) : (
						titleNode
					)}
				</h3>
				<div
					aria-hidden={!isOpen}
					className="slds-section__content"
					id={contentId}
				>
					{this.props.children}
				</div>
			</div>
		);
	}
}

ExpandableSection.displayName = EXPANDABLE_SECTION;
ExpandableSection.propTypes = propTypes;
ExpandableSection.defaultProps = defaultProps;

export default ExpandableSection;
