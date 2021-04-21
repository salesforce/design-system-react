/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Filter

// Implements part of the [Panel design pattern](https://www.lightningdesignsystem.com/components/panels) in React.
// Based on SLDS v2.2.0-rc.1

// ## Dependencies

// ### React
import React from 'react';

import PropTypes from 'prop-types';

// ### assign
import assign from 'lodash.assign';

// ### classNames
import classNames from 'classnames';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

import Button from '../button';
import Popover from '../popover';

// ## Constants
import { FILTER } from '../../utilities/constants';

/**
 * A Filter is a popover with custom trigger. It can be used by [Panel Filtering](/components/panels/). Menus within a Filter Popover will need to not have "portal mounts" and be inline.
 */
class Filter extends React.Component {
	static displayName = FILTER;

	static propTypes = {
		/**
		 * Aligns the popover with the respective side of the trigger. That is `left` will place the `Popover` to the left of the Filter.
		 */
		align: PropTypes.oneOf(['left', 'right']),
		/**
		 * **Assistive text for accessibility**
		 * * `removeFilter`: Assistive text for removing a filter. The default is `Remove Filter: this.props.property this.props.predicate`.
		 * * `editFilter`: Assistive text for changing a filter.
		 * * `editFilterHeading`: Assistive text for Popover heading.
		 */
		assistiveText: PropTypes.shape({
			editFilter: PropTypes.string,
			editFilterHeading: PropTypes.string,
			removeFilter: PropTypes.string,
		}),
		/**
		 * Contents of popover. That is the dropdowns and inputs that set the filter criteria.
		 */
		children: PropTypes.node,
		/**
		 * Custom CSS classes for `slds-filters__item` node. Uses `classNames` [API](https://github.com/JedWatson/classnames).
		 */
		className: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string,
		]),
		/**
		 * Applies error state styling. Per filter error messages are outside this components.
		 */
		isError: PropTypes.bool,
		/**
		 * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button. An `id` will be generated if none is supplied.
		 */
		id: PropTypes.string,
		/**
		 * If true, the filter will not display an editing popover when clicked.
		 */
		isLocked: PropTypes.bool,
		/**
		 * Applies new filter styling.
		 */
		isNew: PropTypes.bool,
		/**
		 * If true, the filter will not include a remove button.
		 */
		isPermanent: PropTypes.bool,
		/**
		 * Will be triggered when Done within the Popover is clicked. This is the place to update the filter props displayed. Callback will recieve parameters: `clickEvent, { id }`. An index into your store may be a good setting for `id`, so that it will be passed back here.
		 */
		onChange: PropTypes.func,
		/**
		 * Will be triggered when "Remove Filter" button is clicked. Callback will recieve parameters: `clickEvent, { id }`. An index into your store may be a good setting for `id`, so that it will be passed back here.
		 */
		onRemove: PropTypes.func,
		/**
		 * Will be triggered when Filter is clicked. This is the place to close/open popover if a custom popover is passed in
		 */
		onClick: PropTypes.func,
		/**
		 * A `Popover` component. The props from this popover will be merged and override any default props. This also allows a Filter's Popover dialog to be a controlled component. _Tested with Mocha framework._
		 */
		popover: PropTypes.node,
		/**
		 * The criteria you are filtering for. For instance, if "Hair Color is PURPLE" is your filter, "is PURPLE" is your filter predicate.
		 */
		predicate: PropTypes.node,
		/**
		 * The property you are filtering. For instance, if "Hair Color is PURPLE" is your filter, "Hair Color" is your filter property.
		 */
		property: PropTypes.node,
	};

	static defaultProps = {
		align: 'left',
		assistiveText: {
			editFilter: 'Edit filter:',
			editFilterHeading: 'Choose filter criteria',
		},
		predicate: 'New Filter',
	};

	state = {
		popoverIsOpen: this.props.popover ? this.props.popover.props.isOpen : false,
	};

	constructor(props) {
		super(props);

		this.generatedId = shortid.generate();
	}

	getId = () => this.props.id || this.generatedId;

	getCustomPopoverProps = ({ assistiveText }) => {
		/*
		 * Generate the popover props based on passed in popover props. Using the default behavior if not provided by passed in popover
		 */
		const popoverBody = (
			<div>
				<h4
					className="slds-assistive-text"
					id={`${this.getId()}-popover-heading`}
				>
					{assistiveText.editFilterHeading}
				</h4>
				{this.props.children}
				<div className="slds-m-top_small slds-text-align_right">
					<Button
						className="slds-col_bump-left"
						label="Done"
						onClick={this.handleChange}
					/>
				</div>
			</div>
		);

		const defaultPopoverProps = {
			ariaLabelledby: `${this.getId()}-popover-heading`,
			align: this.props.align,
			body: popoverBody,
			heading: '',
			id: this.getId(),
			isOpen: this.state.popoverIsOpen,
			// MAGIC NUMBERS - REMOVE/REDESIGN WHEN DESIGN FOR RIGHT-ALIGNED FILTERS ARE ADDED TO SLDS
			offset: this.props.align === 'right' ? '0px -35px' : undefined,
			onClose: this.handleClose,
			onRequestClose: this.handleClose,
			position: 'overflowBoundaryElement',
			triggerClassName: 'slds-grow',
		};

		/* Mixin passed popover's props if there is any to override the default popover props */
		const popoverProps = assign(
			defaultPopoverProps,
			this.props.popover ? this.props.popover.props : {}
		);
		// eslint-disable-next-line fp/no-delete
		delete popoverProps.children;
		return popoverProps;
	};

	handleFilterClick = () => {
		this.setState({ popoverIsOpen: true });

		if (this.props.onClick) {
			this.props.onClick();
		}
	};

	handleClose = () => {
		this.setState({ popoverIsOpen: false });
	};

	handleChange = (event) => {
		this.setState({ popoverIsOpen: false });

		if (this.props.onChange) {
			this.props.onChange(event, { id: this.getId() });
		}
	};

	handleRemove = (event) => {
		if (this.props.onRemove) {
			this.props.onRemove(event, { id: this.getId() });
		}
	};

	render() {
		/* Remove at next breaking change */
		const assistiveText = {
			editFilter:
				this.props.assistiveTextEditFilter || // eslint-disable-line react/prop-types
				this.props.assistiveText.editFilter,
			editFilterHeading:
				this.props.assistiveTextEditFilterHeading || // eslint-disable-line react/prop-types
				this.props.assistiveText.editFilterHeading,
			removeFilter:
				this.props.assistiveTextRemoveFilter || // eslint-disable-line react/prop-types
				this.props.assistiveText.removeFilter ||
				`Remove Filter: ${this.props.property} ${this.props.predicate}`,
		};

		/* TODO: Button wrapper for property and predictate should be transitioned to `Button` component. `Button` needs to take custom children first though. */
		const popoverProps = this.getCustomPopoverProps({ assistiveText });
		return (
			<div
				className={classNames(
					'slds-filters__item',
					'slds-grid',
					'slds-grid_vertical-align-center',
					{
						'slds-is-locked': this.props.isLocked,
						'slds-is-new': this.props.isNew,
						'slds-has-error': this.props.isError,
					},
					this.props.className
				)}
			>
				{!this.props.isLocked && (this.props.children || this.props.popover) ? (
					<Popover {...popoverProps} silenceDeprecatedPropertyWarning>
						<button
							className="slds-button_reset slds-grow slds-has-blur-focus"
							onClick={this.handleFilterClick}
							aria-describedby={
								this.props.isError ? `${this.getId()}-error` : undefined
							}
							type="button"
						>
							<span className="slds-assistive-text">
								{assistiveText.editFilter}
							</span>
							{this.props.property ? (
								<span className="slds-show slds-text-body_small">
									{this.props.property}
								</span>
							) : null}
							<span className="slds-show">{this.props.predicate}</span>
						</button>
					</Popover>
				) : (
					<button
						aria-describedby={
							this.props.isError ? `${this.getId()}-error` : undefined
						}
						className="slds-button_reset slds-grow slds-has-blur-focus"
						disabled
						type="button"
					>
						<span className="slds-show slds-text-body_small">
							{this.props.property}
						</span>
						<span className="slds-show">{this.props.predicate}</span>
					</button>
				)}
				{
					// Remove button
					!this.props.isPermanent && !this.props.isLocked ? (
						<Button
							assistiveText={{ icon: assistiveText.removeFilter }}
							hint
							iconCategory="utility"
							iconName="delete"
							iconSize="small"
							iconVariant="bare"
							onClick={this.handleRemove}
							title={assistiveText.removeFilter}
							variant="icon"
						/>
					) : null
				}
			</div>
		);
	}
}

export default Filter;
