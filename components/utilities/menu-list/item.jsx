/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

// # List Item Component

// ## Dependencies

// ### React
import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

// ### classNames
import classNames from 'classnames';

// ### Icon
import Icon from '../../icon';

// ## Children
import ListItemLabelRenderer from './item-label';

// ### Event Helpers
import EventUtil from '../../../utilities/event';

// ## Constants
import { LIST_ITEM } from '../../../utilities/constants';

/**
 * Component description.
 */
const ListItem = createReactClass({
	displayName: LIST_ITEM,

	propTypes: {
		'aria-disabled': PropTypes.bool,
		className: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string,
		]),
		checkmark: PropTypes.bool,
		data: PropTypes.object,
		divider: PropTypes.oneOf(['top', 'bottom']),
		href: PropTypes.string,
		id: PropTypes.string.isRequired,
		index: PropTypes.number.isRequired,
		inverted: PropTypes.bool,
		isSelected: PropTypes.bool,
		label: PropTypes.string,
		labelRenderer: PropTypes.func,
		leftIcon: PropTypes.shape({
			category: PropTypes.string,
			name: PropTypes.string,
		}),
		onSelect: PropTypes.func.isRequired,
		rightIcon: PropTypes.shape({
			category: PropTypes.string,
			name: PropTypes.string,
		}),
		type: PropTypes.string,
		value: PropTypes.any,
	},

	getDefaultProps () {
		return {
			data: {},
			href: 'javascript:void(0);', // eslint-disable-line no-script-url
			inverted: false,
			isSelected: false,
			label: '',
			labelRenderer: ListItemLabelRenderer,
			value: null,
		};
	},

	getLabel () {
		const Label = this.props.labelRenderer;
		return (
			<Label
				checkmark={this.props.checkmark}
				data={this.props.data}
				icon={this.getIcon('left')}
				index={this.props.index}
				inverted={this.props.inverted}
				isSelected={this.props.isSelected}
				label={this.props.label}
				value={this.props.value}
			/>
		);
	},

	getIcon (position) {
		const classnames = ['slds-icon-text-default'];
		let iconProps = this.props[`${position}Icon`];

		if (position === 'left') {
			if (this.props.checkmark) {
				classnames.push('slds-icon--selected');
				iconProps = {
					category: 'utility',
					name: 'check',
				};
			}

			classnames.push('slds-m-right--x-small');
		} else {
			classnames.push('slds-m-left--small');
		}

		if (iconProps) {
			return (
				<Icon
					className={classNames(classnames)}
					position={position}
					size="x-small"
					{...iconProps}
				/>
			);
		}

		return null;
	},

	handleClick (event) {
		if (
			this.props.type !== 'link' ||
			this.props.href === 'javascript:void(0);' // eslint-disable-line no-script-url
		) {
			// eslint-disable-line no-script-url
			EventUtil.trapImmediate(event);
		}

		if (this.props.onSelect) {
			this.props.onSelect(this.props.index);
		}
	},

	handleMouseDown (event) {
		EventUtil.trapImmediate(event);
	},

	render () {
		switch (this.props.type) {
			case 'header': {
				return (
					<li
						className={classNames(
							'slds-dropdown__header',
							{
								'slds-has-divider--top-space': this.props.divider === 'top',
								'slds-has-divider--bottom-space':
									this.props.divider === 'bottom',
							},
							this.props.className
						)}
						onMouseDown={this.handleMouseDown}
						role="separator"
					>
						<span className="slds-text-title--caps">{this.props.label}</span>
					</li>
				);
			}
			case 'divider': {
				return (
					<li
						className={classNames('slds-has-divider', this.props.className)}
						onMouseDown={this.handleMouseDown}
						role="separator"
					/>
				);
			}
			case 'link':
			case 'item':
			default: {
				return (
					/* eslint-disable jsx-a11y/role-supports-aria-props */
					// disabled eslint, but using aria-selected on presentation role seems suspicious...
					<li
						aria-selected={this.props.isSelected}
						className={classNames(
							'slds-dropdown__item',
							{
								'slds-is-selected': this.props.isSelected,
							},
							this.props.className
						)}
						id={this.props.id}
						onMouseDown={this.handleMouseDown}
						role="presentation"
					>
						{/* eslint-disable jsx-a11y/role-supports-aria-props */}
						<a
							aria-disabled={this.props['aria-disabled']}
							href={this.props.href}
							data-index={this.props.index}
							onClick={this.handleClick}
							role="menuitem"
							tabIndex="-1"
						>
							{this.getLabel()}
							{this.getIcon('right')}
						</a>
					</li>
				);
			}
		}
	},
});

export default ListItem;
