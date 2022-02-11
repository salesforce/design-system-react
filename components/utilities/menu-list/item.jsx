/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

// # List Item Component

// ## Dependencies

// ### React
import React from 'react';

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
class ListItem extends React.Component {
	static displayName = LIST_ITEM;

	static propTypes = {
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
		isCheckmarkVariant: PropTypes.bool,
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
		tooltipContent: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
		tooltipTemplate: PropTypes.node,
		type: PropTypes.string,
		value: PropTypes.any,
	};

	static defaultProps = {
		data: {},
		href: '#',
		inverted: false,
		isSelected: false,
		label: '',
		labelRenderer: ListItemLabelRenderer,
		value: null,
	};

	getLabel = () => {
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
	};

	getIcon = (position) => {
		const classnames = ['slds-icon-text-default'];
		let iconProps = this.props[`${position}Icon`];

		if (position === 'left') {
			if (this.props.isCheckmarkVariant) {
				// eslint-disable-next-line fp/no-mutating-methods
				classnames.push('slds-icon_selected');
				iconProps = {
					category: 'utility',
					name: 'check',
				};
			}

			// eslint-disable-next-line fp/no-mutating-methods
			classnames.push('slds-m-right_x-small');
		} else {
			// eslint-disable-next-line fp/no-mutating-methods
			classnames.push('slds-m-left_small');
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
	};

	handleClick = (event) => {
		if (
			this.props.type !== 'link' ||
			this.props.href === 'javascript:void(0);' || // eslint-disable-line no-script-url
			this.props.href === '#'
		) {
			EventUtil.trapImmediate(event);
		}

		if (this.props.onSelect) {
			this.props.onSelect(this.props.index);
		}
	};

	handleMouseDown = (event) => {
		EventUtil.trapImmediate(event);
	};

	render() {
		switch (this.props.type) {
			case 'header': {
				return (
					<li
						className={classNames(
							'slds-dropdown__header',
							{
								'slds-has-divider_top-space': this.props.divider === 'top',
								'slds-has-divider_bottom-space':
									this.props.divider === 'bottom',
							},
							this.props.className
						)}
						onMouseDown={this.handleMouseDown}
						role="separator"
					>
						<span>{this.props.label}</span>
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
				/* eslint-disable jsx-a11y/role-supports-aria-props */
				let itemContents = (
					<a
						aria-checked={
							this.props.checkmark && this.props.isSelected ? true : undefined
						}
						aria-disabled={this.props['aria-disabled']}
						href={this.props.href}
						data-index={this.props.index}
						onClick={this.handleClick}
						role={this.props.checkmark ? 'menuitemcheckbox' : 'menuitem'}
						tabIndex="-1"
					>
						{this.getLabel()}
						{this.getIcon('right')}
					</a>
				);

				if (this.props.tooltipContent && this.props.tooltipTemplate) {
					const { ...tooltipTemplateProps } = this.props.tooltipTemplate.props;
					const tooltipProps = {
						...tooltipTemplateProps,
						content: this.props.tooltipContent,
						id: `${this.props.id}-tooltip`,
						triggerStyle: {
							width: '100%',
							...(tooltipTemplateProps.triggerStyle || {}),
						},
					};
					itemContents = React.cloneElement(
						this.props.tooltipTemplate,
						tooltipProps,
						itemContents
					);
				}

				return (
					/* eslint-disable jsx-a11y/role-supports-aria-props */
					// disabled eslint, but using aria-selected on presentation role seems suspicious...
					<li
						aria-selected={
							this.props.checkmark === null ? this.props.isSelected : null
						}
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
						{itemContents}
					</li>
				);
			}
		}
	}
}

export default ListItem;
