/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

// # List Item Component

// ## Dependencies

// ### React
import React, { type ComponentType, type ReactNode } from 'react';

// ### classNames
import classNames from 'classnames';

// ### Icon
import Icon from '../../icon';

// ## Children
import ListItemLabelRenderer, { type ListItemLabelProps } from './item-label';

// ### Event Helpers
import EventUtil from '../../../utilities/event';

// ## Constants
import { LIST_ITEM } from '../../../utilities/constants';

interface MenuListIconConfig {
	category?: string;
	name?: string;
}

export interface ListItemProps {
	'aria-disabled'?: boolean;
	className?: unknown[] | Record<string, unknown> | string;
	checkmark?: boolean;
	data?: Record<string, unknown>;
	disabled?: boolean;
	divider?: 'top' | 'bottom';
	groupedBy?: string;
	href?: string;
	id: string;
	index: number;
	inverted?: boolean;
	isSelected?: boolean;
	isCheckmarkVariant?: boolean;
	label?: string;
	labelRenderer?: ComponentType<ListItemLabelProps>;
	leftIcon?: MenuListIconConfig;
	/**
	 * Callback ref that receives the root `<li>` DOM node (or `null` on
	 * unmount). Used by parents that need the list item's DOM element for
	 * keyboard focus/scroll management. A DOM node is forwarded here rather
	 * than attaching a `ref` to this class component, which would yield the
	 * component instance instead of an element.
	 */
	nodeRef?: (node: HTMLLIElement | null) => void;
	onSelect: (index: number) => void;
	rightIcon?: MenuListIconConfig;
	tooltipContent?: ReactNode | string;
	tooltipTemplate?: React.ReactElement;
	type?: string;
	value?: unknown;
}

/**
 * Component description.
 */
class ListItem extends React.Component<ListItemProps> {
	static displayName = LIST_ITEM;

	static defaultProps: Partial<ListItemProps> = {
		data: {},
		href: '#',
		inverted: false,
		isSelected: false,
		label: '',
		labelRenderer: ListItemLabelRenderer,
		value: null,
	};

	getLabel = () => {
		const Label = this.props.labelRenderer ?? ListItemLabelRenderer;
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

	getIcon = (position: 'left' | 'right') => {
		const classnames = ['slds-icon-text-default'];
		let iconProps: MenuListIconConfig | undefined =
			position === 'left' ? this.props.leftIcon : this.props.rightIcon;

		if (position === 'left') {
			if (this.props.isCheckmarkVariant) {
				classnames.push('slds-icon_selected');
				iconProps = {
					category: 'utility',
					name: 'check',
				};
			}

			classnames.push('slds-m-right_x-small');
		} else {
			classnames.push('slds-m-left_small');
		}

		if (iconProps) {
			// `position` is not part of Icon's public props but is preserved for
			// backwards-compatible runtime behavior; spread through a permissive cast.
			const iconElementProps = {
				className: classNames(classnames),
				position,
				size: 'x-small',
				...iconProps,
			} as Record<string, unknown>;
			return <Icon {...iconElementProps} />;
		}

		return null;
	};

	handleClick = (event: React.MouseEvent) => {
		if (
			this.props.type !== 'link' ||
			this.props.href === 'javascript:void(0);' || // eslint-disable-line no-script-url
			this.props.href === '#'
		) {
			EventUtil.trapImmediate(event);
		}

		if (this.props.onSelect && !this.props.disabled) {
			this.props.onSelect(this.props.index);
		}
	};

	handleMouseDown = (event: React.MouseEvent) => {
		EventUtil.trapImmediate(event);
	};

	render() {
		switch (this.props.type) {
			case 'header': {
				return (
					<li
						ref={this.props.nodeRef}
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
						ref={this.props.nodeRef}
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
						tabIndex={-1}
					>
						{this.props.groupedBy && (
							<span className="slds-assistive-text">{`-${this.props.groupedBy}`}</span>
						)}
						{this.getLabel()}
						{this.getIcon('right')}
					</a>
				);

				if (this.props.tooltipContent && this.props.tooltipTemplate) {
					const { ...tooltipTemplateProps } = this.props.tooltipTemplate
						.props as Record<string, unknown>;
					const tooltipProps = {
						...tooltipTemplateProps,
						content: this.props.tooltipContent,
						id: `${this.props.id}-tooltip`,
						triggerStyle: {
							width: '100%',
							...((tooltipTemplateProps.triggerStyle as Record<
								string,
								unknown
							>) || {}),
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
						ref={this.props.nodeRef}
						aria-selected={
							this.props.checkmark === null
								? this.props.isSelected
								: undefined
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
